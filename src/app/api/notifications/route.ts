import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Bildirimleri getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.email
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error('Bildirimler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Bildirimler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni bildirim oluştur
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { title, message, type, category, link } = body

    if (!title || !message || !type || !category) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        category,
        link,
        userId: session.user.email
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Bildirim oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Bildirim oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 