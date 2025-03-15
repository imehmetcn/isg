import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    // Oturumu kontrol et
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
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

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, role } = body;

    // Gerekli alanları kontrol et
    if (!name || !email || !role) {
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

    // Kullanıcıyı güncelle
    const user = await db.user.update({
      where: { id: params.id },
      data: {
        name,
        email,
        role: role as Role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 