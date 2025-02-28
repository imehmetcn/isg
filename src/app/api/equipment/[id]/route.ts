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

    const equipment = await prisma.equipment.findUnique({
      where: {
        id: params.id
      }
    })

    if (!equipment) {
      return NextResponse.json(
        { error: 'Ekipman kaydı bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Ekipman detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Ekipman detayı getirilirken bir hata oluştu' },
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
    if (!data.name || !data.type || !data.serialNumber || !data.location || !data.status || !data.lastMaintenanceDate || !data.nextMaintenanceDate) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const equipment = await prisma.equipment.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        lastMaintenanceDate: new Date(data.lastMaintenanceDate),
        nextMaintenanceDate: new Date(data.nextMaintenanceDate)
      }
    })

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Ekipman güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Ekipman güncellenirken bir hata oluştu' },
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

    await prisma.equipment.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Ekipman kaydı silindi' })
  } catch (error) {
    console.error('Ekipman silme hatası:', error)
    return NextResponse.json(
      { error: 'Ekipman silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 