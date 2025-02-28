import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { type, period } = body

    if (!type || !period) {
      return NextResponse.json(
        { error: 'Rapor türü ve dönemi gereklidir' },
        { status: 400 }
      )
    }

    // Rapor başlığını oluştur
    const title = `${getReportTypeText(type)} - ${getPeriodText(period)}`

    // Raporu oluştur
    const report = await prisma.report.create({
      data: {
        title,
        type,
        period,
        status: 'GENERATING',
        parameters: JSON.stringify({ type, period })
      }
    })

    // Gerçek bir rapor oluşturma işlemi burada yapılacak
    // Şimdilik simüle ediyoruz
    setTimeout(async () => {
      try {
        await prisma.report.update({
          where: { id: report.id },
          data: {
            status: 'COMPLETED',
            fileUrl: `/reports/${report.id}.pdf`,
            generatedAt: new Date()
          }
        })
      } catch (error) {
        console.error('Rapor güncelleme hatası:', error)
        await prisma.report.update({
          where: { id: report.id },
          data: {
            status: 'FAILED'
          }
        })
      }
    }, 5000) // 5 saniye sonra tamamlandı olarak işaretle

    return NextResponse.json(report)
  } catch (error) {
    console.error('Rapor oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Rapor oluşturulurken bir hata oluştu' },
      { status: 500 }
    )
  }
}

function getReportTypeText(type: string): string {
  switch (type) {
    case 'INCIDENT':
      return 'Olay Raporu'
    case 'TRAINING':
      return 'Eğitim Raporu'
    case 'RISK':
      return 'Risk Değerlendirme Raporu'
    case 'AUDIT':
      return 'Denetim Raporu'
    case 'EQUIPMENT':
      return 'Ekipman Raporu'
    case 'PERSONNEL':
      return 'Personel Raporu'
    default:
      return type
  }
}

function getPeriodText(period: string): string {
  switch (period) {
    case 'LAST_7_DAYS':
      return 'Son 7 Gün'
    case 'LAST_30_DAYS':
      return 'Son 30 Gün'
    case 'LAST_90_DAYS':
      return 'Son 90 Gün'
    case 'THIS_MONTH':
      return 'Bu Ay'
    case 'LAST_MONTH':
      return 'Geçen Ay'
    case 'THIS_YEAR':
      return 'Bu Yıl'
    case 'LAST_YEAR':
      return 'Geçen Yıl'
    default:
      return period
  }
} 