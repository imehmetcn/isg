import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const task = await prisma.task.findUnique({
      where: {
        id: params.id
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Görev bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Görev detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Görev detayı getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const data = await req.json()

    // Validasyon
    if (!data.title || !data.description || !data.type || !data.priority || !data.status || !data.dueDate || !data.assignedTo) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const task = await prisma.task.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        dueDate: new Date(data.dueDate)
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Görev güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Görev güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    await prisma.task.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Görev silindi' })
  } catch (error) {
    console.error('Görev silme hatası:', error)
    return NextResponse.json(
      { error: 'Görev silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 