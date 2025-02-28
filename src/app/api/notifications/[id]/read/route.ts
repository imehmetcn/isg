import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const notification = await prisma.notification.update({
      where: {
        id: params.id,
        userId: session.user.email
      },
      data: {
        isRead: true
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Bildirim güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Bildirim güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 