import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    // Email kontrolü
    const existingUser = await db.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      )
    }

    // Şifreyi hashleme
    const hashedPassword = await hash(password, 10)

    // Kullanıcı oluşturma
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "SAFETY_EXPERT"
      }
    })

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    )
  }
} 