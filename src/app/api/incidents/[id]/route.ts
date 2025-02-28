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

    const incident = await prisma.incident.findUnique({
      where: {
        id: params.id
      }
    })

    if (!incident) {
      return NextResponse.json(
        { error: 'Olay kaydı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(incident)
  } catch (error) {
    console.error('Olay detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Olay detayı getirilirken bir hata oluştu' },
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
    if (!data.title || !data.description || !data.location || !data.date || !data.severity || !data.status) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const incident = await prisma.incident.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        date: new Date(data.date)
      }
    })

    return NextResponse.json(incident)
  } catch (error) {
    console.error('Olay güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Olay güncellenirken bir hata oluştu' },
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

    await prisma.incident.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Olay kaydı silindi' })
  } catch (error) {
    console.error('Olay silme hatası:', error)
    return NextResponse.json(
      { error: 'Olay silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 