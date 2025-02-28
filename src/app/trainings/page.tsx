'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Training {
  id: string
  title: string
  description: string
  instructor: string
  startDate: string
  endDate: string
  status: string
  capacity: number
  participants: number
  createdAt: string
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrainings()
  }, [])

  async function fetchTrainings() {
    try {
      const response = await fetch('/api/trainings')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Eğitimler yüklenemedi')
      }

      setTrainings(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'PLANNED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'PLANNED':
        return 'Planlandı'
      case 'IN_PROGRESS':
        return 'Devam Ediyor'
      case 'COMPLETED':
        return 'Tamamlandı'
      default:
        return 'İptal Edildi'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Eğitim Yönetimi</h1>
        <Link
          href="/trainings/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Eğitim Ekle
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {trainings.map((training) => (
            <li key={training.id}>
              <Link href={`/trainings/${training.id}`}>
                <div className="block hover:bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900">{training.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{training.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-4">Eğitmen: {training.instructor}</span>
                        <span className="mr-4">
                          Tarih: {new Date(training.startDate).toLocaleDateString('tr-TR')} -{' '}
                          {new Date(training.endDate).toLocaleDateString('tr-TR')}
                        </span>
                        <span>
                          Katılımcı: {training.participants}/{training.capacity}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          training.status
                        )}`}
                      >
                        {getStatusText(training.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {trainings.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              Henüz kayıtlı eğitim bulunmuyor.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
} 