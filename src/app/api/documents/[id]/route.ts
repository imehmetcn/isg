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

    const document = await prisma.document.findUnique({
      where: {
        id: params.id
      }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Doküman bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(document)
  } catch (error) {
    console.error('Doküman detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Doküman detayı getirilirken bir hata oluştu' },
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
    if (!data.title || !data.category || !data.description || !data.version || !data.fileUrl || !data.status) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const document = await prisma.document.update({
      where: {
        id: params.id
      },
      data
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error('Doküman güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Doküman güncellenirken bir hata oluştu' },
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

    await prisma.document.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Doküman silindi' })
  } catch (error) {
    console.error('Doküman silme hatası:', error)
    return NextResponse.json(
      { error: 'Doküman silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 