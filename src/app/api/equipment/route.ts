import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Ekipman listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const equipment = await prisma.equipment.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Ekipman listesi getirme hatası:', error)
    return NextResponse.json(
      { error: 'Ekipmanlar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni ekipman kaydı oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const { name, type, serialNumber, location, status, lastMaintenanceDate, nextMaintenanceDate } = await req.json()

    // Validasyon
    if (!name || !type || !serialNumber || !location || !lastMaintenanceDate || !nextMaintenanceDate) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const equipment = await prisma.equipment.create({
      data: {
        name,
        type,
        serialNumber,
        location,
        status,
        lastMaintenanceDate: new Date(lastMaintenanceDate),
        nextMaintenanceDate: new Date(nextMaintenanceDate)
      }
    })

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Ekipman kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Ekipman kaydı oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 