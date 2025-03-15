import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    // Sadece kendi profilini veya admin tüm profilleri görebilir
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    // Kullanıcıyı getir
    const user = await db.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Kullanıcı yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, role, currentPassword, newPassword } = body;

    // Sadece kendi profilini veya admin tüm profilleri düzenleyebilir
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    // Admin olmayan kullanıcılar sadece isim ve şifre değiştirebilir
    if (session.user.role !== "ADMIN" && (email || role)) {
      return NextResponse.json(
        { error: "Bu alanları değiştirme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Kullanıcıyı getir
    const user = await db.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Şifre değişikliği kontrolü
    let hashedPassword = undefined;
    if (currentPassword && newPassword) {
      // Mevcut şifreyi kontrol et
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password!
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Mevcut şifre yanlış" },
          { status: 400 }
        );
      }

      // Yeni şifreyi hashle
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // Admin değilse email benzersizlik kontrolü yapma
    if (session.user.role === "ADMIN" && email && email !== user.email) {
      // Email formatını kontrol et
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Geçersiz email formatı" },
          { status: 400 }
        );
      }

      // Email'in benzersiz olduğunu kontrol et
      const existingUser = await db.user.findFirst({
        where: {
          email,
          NOT: {
            id: params.id,
          },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Bu email adresi zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    // Kullanıcıyı güncelle
    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        name: name || undefined,
        email: email || undefined,
        role: (role as Role) || undefined,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    // Kullanıcının kendisini silmesini engelle
    if (session.user.id === params.id) {
      return NextResponse.json(
        { error: "Kendinizi silemezsiniz" },
        { status: 400 }
      );
    }

    // Kullanıcıyı sil
    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Kullanıcı silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 