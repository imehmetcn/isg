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

    const assessment = await prisma.riskAssessment.findUnique({
      where: {
        id: params.id
      }
    })

    if (!assessment) {
      return NextResponse.json(
        { error: 'Risk değerlendirmesi bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(assessment)
  } catch (error) {
    console.error('Risk değerlendirmesi getirme hatası:', error)
    return NextResponse.json(
      { error: 'Risk değerlendirmesi getirilirken bir hata oluştu' },
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

    const assessment = await prisma.riskAssessment.update({
      where: {
        id: params.id
      },
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
    console.error('Risk değerlendirmesi güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Risk değerlendirmesi güncellenirken bir hata oluştu' },
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

    await prisma.riskAssessment.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Risk değerlendirmesi silindi' })
  } catch (error) {
    console.error('Risk değerlendirmesi silme hatası:', error)
    return NextResponse.json(
      { error: 'Risk değerlendirmesi silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 