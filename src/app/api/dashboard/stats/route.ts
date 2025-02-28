import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      )
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Görev istatistikleri
    const totalTasks = await prisma.task.count()
    const completedTasks = await prisma.task.count({
      where: { status: 'COMPLETED' }
    })

    // Eğitim istatistikleri
    const pendingTrainings = await prisma.training.count({
      where: {
        status: 'PENDING',
        startDate: {
          gte: new Date()
        }
      }
    })

    // Denetim istatistikleri
    const upcomingAudits = await prisma.audit.count({
      where: {
        date: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 30))
        }
      }
    })

    // Ekipman bakım istatistikleri
    const equipmentNeedingMaintenance = await prisma.equipment.count({
      where: {
        nextMaintenanceDate: {
          lte: new Date(new Date().setDate(new Date().getDate() + 30))
        }
      }
    })

    // Son olaylar
    const recentIncidents = await prisma.incident.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTrainings,
      upcomingAudits,
      equipmentNeedingMaintenance,
      recentIncidents
    })
  } catch (error) {
    console.error('Dashboard istatistikleri getirme hatası:', error)
    return NextResponse.json(
      { error: 'İstatistikler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 