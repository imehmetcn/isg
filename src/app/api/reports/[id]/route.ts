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

    const report = await prisma.report.findUnique({
      where: {
        id: params.id
      }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Rapor bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Rapor detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Rapor detayı getirilirken bir hata oluştu' },
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
    if (!data.title || !data.type || !data.period || !data.status) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const report = await prisma.report.update({
      where: {
        id: params.id
      },
      data
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Rapor güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Rapor güncellenirken bir hata oluştu' },
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

    await prisma.report.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Rapor silindi' })
  } catch (error) {
    console.error('Rapor silme hatası:', error)
    return NextResponse.json(
      { error: 'Rapor silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 