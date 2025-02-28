'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface DashboardStats {
  totalTasks: number
  completedTasks: number
  pendingTrainings: number
  upcomingAudits: number
  equipmentNeedingMaintenance: number
  recentIncidents: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  async function fetchDashboardStats() {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'İstatistikler yüklenemedi')
      }

      setStats(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-6 w-1/2" />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const metrics = [
    {
      title: 'Toplam Görevler',
      value: stats.totalTasks,
      description: 'Sistemdeki toplam görev sayısı',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Tamamlanan Görevler',
      value: stats.completedTasks,
      description: 'Tamamlanan görev sayısı',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Bekleyen Eğitimler',
      value: stats.pendingTrainings,
      description: 'Planlanmış eğitim sayısı',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Yaklaşan Denetimler',
      value: stats.upcomingAudits,
      description: 'Önümüzdeki 30 gün içindeki denetimler',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Bakım Gereken Ekipmanlar',
      value: stats.equipmentNeedingMaintenance,
      description: 'Bakım zamanı gelen ekipman sayısı',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      title: 'Son Olaylar',
      value: stats.recentIncidents,
      description: 'Son 30 gündeki olay sayısı',
      color: 'bg-red-100 text-red-800'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gösterge Paneli</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index} className={`p-6 ${metric.color}`}>
            <h3 className="text-lg font-semibold">{metric.title}</h3>
            <p className="text-3xl font-bold mt-2">{metric.value}</p>
            <p className="text-sm mt-1 opacity-75">{metric.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
} 