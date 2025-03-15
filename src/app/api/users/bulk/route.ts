import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

interface BulkUser {
  name: string;
  email: string;
  role: string;
  company?: string;
}

export async function POST(request: Request) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const users: BulkUser[] = body.users;

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { error: "Geçerli kullanıcı listesi gönderilmedi" },
        { status: 400 }
      );
    }

    // Her kullanıcı için email kontrolü yap
    const emails = users.map((user) => user.email);
    const existingUsers = await db.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
      select: {
        email: true,
      },
    });

    if (existingUsers.length > 0) {
      return NextResponse.json(
        {
          error: "Bazı email adresleri zaten kullanılıyor",
          emails: existingUsers.map((user) => user.email),
        },
        { status: 400 }
      );
    }

    // Kullanıcıları oluştur
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        // Varsayılan şifre oluştur
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kullanıcıyı oluştur
        const createdUser = await db.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            role: user.role as Role,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        // Şifreyi döndür
        return {
          ...createdUser,
          password,
        };
      })
    );

    return NextResponse.json(
      {
        message: "Kullanıcılar başarıyla oluşturuldu",
        users: createdUsers,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating users:", error);
    return NextResponse.json(
      { error: "Kullanıcılar oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
} 