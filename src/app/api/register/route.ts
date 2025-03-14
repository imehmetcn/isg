import { type NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { db } from "@/lib/db"
import * as z from "zod"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const registerSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir email adresi giriniz.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır.",
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = registerSchema.parse(body)

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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error(error)
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    )
  }
} 