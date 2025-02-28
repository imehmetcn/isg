import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Denetim listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const audits = await prisma.audit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(audits)
  } catch (error) {
    console.error('Denetimler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Denetimler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni denetim kaydı oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const { title, description, date, findings, status } = await req.json()

    // Validasyon
    if (!title || !description || !date || !findings) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const audit = await prisma.audit.create({
      data: {
        title,
        description,
        date: new Date(date),
        findings,
        status
      }
    })

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Denetim kaydı oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Denetim kaydı oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 