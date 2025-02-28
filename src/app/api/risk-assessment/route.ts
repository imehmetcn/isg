import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Risk değerlendirmeleri listesi
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const assessments = await prisma.riskAssessment.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(assessments)
  } catch (error) {
    console.error('Risk değerlendirmeleri getirme hatası:', error)
    return NextResponse.json(
      { error: 'Risk değerlendirmeleri getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni risk değerlendirmesi oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const { title, description, location, severity, likelihood } = await req.json()

    // Validasyon
    if (!title || !description || !location || !severity || !likelihood) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    if (severity < 1 || severity > 5 || likelihood < 1 || likelihood > 5) {
      return NextResponse.json(
        { error: 'Şiddet ve olasılık değerleri 1-5 arasında olmalıdır' },
        { status: 400 }
      )
    }

    const assessment = await prisma.riskAssessment.create({
      data: {
        title,
        description,
        location,
        severity,
        likelihood
      }
    })

    return NextResponse.json(assessment)
  } catch (error) {
    console.error('Risk değerlendirmesi oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Risk değerlendirmesi oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
} 