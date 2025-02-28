import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Eğitim listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const trainings = await prisma.training.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(trainings)
  } catch (error) {
    console.error('Eğitimler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Eğitimler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni eğitim kaydı oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const { title, description, instructor, startDate, endDate, capacity, status, participants } = await req.json()

    // Validasyon
    if (!title || !description || !instructor || !startDate || !endDate || !capacity) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const training = await prisma.training.create({
      data: {
        title,
        description,
        instructor,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        capacity,
        status,
        participants
      }
    })

    return NextResponse.json(training)
  } catch (error) {
    console.error('Eğitim kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Eğitim kaydı oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 