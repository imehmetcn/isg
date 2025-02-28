import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const audit = await prisma.audit.findUnique({
      where: {
        id: params.id
      }
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Denetim kaydı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Denetim detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Denetim detayı getirilirken bir hata oluştu' },
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
    if (!data.title || !data.description || !data.date || !data.findings || !data.status) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const audit = await prisma.audit.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        date: new Date(data.date)
      }
    })

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Denetim güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Denetim güncellenirken bir hata oluştu' },
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

    await prisma.audit.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Denetim kaydı silindi' })
  } catch (error) {
    console.error('Denetim silme hatası:', error)
    return NextResponse.json(
      { error: 'Denetim silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 