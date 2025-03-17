import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

// ActionType enum'u henüz Prisma Client'ta oluşturulmadığı için string olarak tanımlıyoruz
const ActionType = {
  VIEW_DOCUMENT: "VIEW_DOCUMENT",
  CREATE_USER: "CREATE_USER",
  DELETE_USER: "DELETE_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  CREATE_DOCUMENT: "CREATE_DOCUMENT",
  UPDATE_DOCUMENT: "UPDATE_DOCUMENT",
  DELETE_DOCUMENT: "DELETE_DOCUMENT",
} as const;

export async function GET() {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    // Kullanıcıları getir (silinmemiş olanlar)
    const users = await db.user.findMany({
      where: {
        deletedAt: null, // Sadece silinmemiş kullanıcıları getir
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        phoneNumber: true,
        lastLoginAt: true,
        createdAt: true,
        companies: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.VIEW_DOCUMENT,
        description: "Kullanıcı listesi görüntülendi",
        userId: session.user.id,
        ipAddress: "127.0.0.1", // İstek nesnesinden alınabilir
        userAgent: "API Call", // İstek nesnesinden alınabilir
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Kullanıcılar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role, profileImage, phoneNumber, companyId } = body;

    // Gerekli alanları kontrol et
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçersiz email formatı" },
        { status: 400 }
      );
    }

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    // Email'in benzersiz olduğunu kontrol et
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role,
        profileImage,
        phoneNumber,
        lastLoginAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    // Eğer şirket ID'si belirtilmişse, kullanıcıyı şirkete ekle
    if (companyId) {
      await db.companyUser.create({
        data: {
          userId: user.id,
          companyId,
          role: role as Role,
        },
      });
    }

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.CREATE_USER,
        description: `${user.name} adlı kullanıcı oluşturuldu`,
        userId: session.user.id,
        companyId: companyId || null,
        ipAddress: "127.0.0.1", // İstek nesnesinden alınabilir
        userAgent: "API Call", // İstek nesnesinden alınabilir
        metadata: { userId: user.id },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Kullanıcıları toplu silme (soft delete)
export async function DELETE(request: Request) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userIds } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "Geçerli kullanıcı ID'leri belirtilmelidir" },
        { status: 400 }
      );
    }

    // Soft delete - kullanıcıları sil
    const now = new Date();
    await db.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        deletedAt: now,
      },
    });

    // Aktivite günlüğüne kaydet
    await db.activityLog.create({
      data: {
        action: ActionType.DELETE_USER,
        description: `${userIds.length} kullanıcı silindi`,
        userId: session.user.id,
        ipAddress: "127.0.0.1", // İstek nesnesinden alınabilir
        userAgent: "API Call", // İstek nesnesinden alınabilir
        metadata: { userIds },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting users:", error);
    return NextResponse.json(
      { error: "Kullanıcılar silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 