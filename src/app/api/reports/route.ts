import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Raporları getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(reports)
  } catch (error) {
    console.error('Raporlar getirme hatası:', error)
    return NextResponse.json(
      { error: 'Raporlar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Yeni rapor oluşturma
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 })
    }

    const data = await req.json()

    // Validasyon
    if (!data.title || !data.type || !data.startDate || !data.endDate) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    const report = await prisma.report.create({
      data: {
        title: data.title,
        type: data.type,
        period: data.period,
        status: data.status,
        parameters: data.parameters,
        fileUrl: null,
        generatedAt: null
      }
    })

    // Rapor oluşturma işlemini başlat
    generateReport(report)

    return NextResponse.json(report)
  } catch (error) {
    console.error('Rapor oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Rapor oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Rapor oluşturma işlemi (asenkron)
async function generateReport(report: any) {
  try {
    // Rapor türüne göre veri toplama
    let data
    switch (report.type) {
      case 'INCIDENT':
        data = await prisma.incident.findMany({
          where: {
            date: {
              gte: new Date(report.parameters.startDate),
              lte: new Date(report.parameters.endDate)
            },
            ...(report.parameters.severity && {
              severity: report.parameters.severity
            })
          }
        })
        break
      case 'TRAINING':
        data = await prisma.training.findMany({
          where: {
            startDate: {
              gte: new Date(report.parameters.startDate)
            },
            endDate: {
              lte: new Date(report.parameters.endDate)
            },
            ...(report.parameters.status && {
              status: report.parameters.status
            })
          }
        })
        break
      case 'PERSONNEL':
        data = await prisma.personnel.findMany({
          where: {
            ...(report.parameters.department && {
              department: report.parameters.department
            }),
            ...(report.parameters.trainingStatus && {
              safetyTrainingStatus: report.parameters.trainingStatus
            })
          }
        })
        break
      // Diğer rapor türleri için benzer sorgular eklenebilir
    }

    // Rapor dosyası oluşturma ve kaydetme işlemleri burada yapılacak
    // Örnek olarak sadece durum güncelleniyor
    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: 'COMPLETED',
        generatedAt: new Date(),
        fileUrl: '/reports/example.pdf' // Gerçek dosya URL'si burada olacak
      }
    })
  } catch (error) {
    console.error('Rapor oluşturma hatası:', error)
    await prisma.report.update({
      where: { id: report.id },
      data: {
        status: 'FAILED'
      }
    })
  }
} 