import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Personel listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const personnel = await prisma.personnel.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(personnel)
  } catch (error) {
    console.error('Personel listesi getirme hatası:', error)
    return NextResponse.json(
      { error: 'Personel listesi getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni personel kaydı oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const {
      employeeId,
      name,
      position,
      department,
      email,
      phone,
      safetyTrainingStatus,
      lastTrainingDate,
      nextTrainingDate
    } = await req.json()

    // Validasyon
    if (!employeeId || !name || !position || !department || !email || !phone || !lastTrainingDate || !nextTrainingDate) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const personnel = await prisma.personnel.create({
      data: {
        employeeId,
        name,
        position,
        department,
        email,
        phone,
        safetyTrainingStatus,
        lastTrainingDate: new Date(lastTrainingDate),
        nextTrainingDate: new Date(nextTrainingDate)
      }
    })

    return NextResponse.json(personnel)
  } catch (error) {
    console.error('Personel kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Personel kaydı oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 