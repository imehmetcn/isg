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

    const personnel = await prisma.personnel.findUnique({
      where: {
        id: params.id
      }
    })

    if (!personnel) {
      return NextResponse.json(
        { error: 'Personel bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(personnel)
  } catch (error) {
    console.error('Personel detayı getirme hatası:', error)
    return NextResponse.json(
      { error: 'Personel detayı getirilirken bir hata oluştu' },
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
    if (!data.employeeId || !data.name || !data.position || !data.department || !data.email || !data.phone || !data.safetyTrainingStatus || !data.lastTrainingDate || !data.nextTrainingDate) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const personnel = await prisma.personnel.update({
      where: {
        id: params.id
      },
      data: {
        ...data,
        lastTrainingDate: new Date(data.lastTrainingDate),
        nextTrainingDate: new Date(data.nextTrainingDate)
      }
    })

    return NextResponse.json(personnel)
  } catch (error) {
    console.error('Personel güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Personel güncellenirken bir hata oluştu' },
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

    await prisma.personnel.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Personel kaydı silindi' })
  } catch (error) {
    console.error('Personel silme hatası:', error)
    return NextResponse.json(
      { error: 'Personel silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 