import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Olay listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const incidents = await prisma.incident.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Olaylar getirme hatası:', error)
    return NextResponse.json(
      { error: 'Olaylar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni olay kaydı oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const { title, description, location, date, severity, status } = await req.json()

    // Validasyon
    if (!title || !description || !location || !date || !severity) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        severity,
        status
      }
    })

    return NextResponse.json(incident)
  } catch (error) {
    console.error('Olay kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Olay kaydı oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 