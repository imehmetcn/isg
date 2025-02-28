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

    const training = await prisma.training.findUnique({
      where: {
        id: params.id
      }
    })

    if (!training) {
      return NextResponse.json(
        { error: 'Eğitim kaydı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(training)
  } catch (error) {
    console.error('Eğitim detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Eğitim detayı getirilirken bir hata oluştu' },
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
    if (!data.title || !data.description || !data.instructor || !data.startDate || !data.endDate || !data.capacity) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const training = await prisma.training.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      }
    })

    return NextResponse.json(training)
  } catch (error) {
    console.error('Eğitim güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Eğitim güncellenirken bir hata oluştu' },
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

    await prisma.training.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Eğitim kaydı silindi' })
  } catch (error) {
    console.error('Eğitim silme hatası:', error)
    return NextResponse.json(
      { error: 'Eğitim silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 