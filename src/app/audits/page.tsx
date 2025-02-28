'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Audit {
  id: string
  title: string
  description: string
  date: string
  findings: string
  status: string
  createdAt: string
}

export default function AuditsPage() {
  const [audits, setAudits] = useState<Audit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAudits()
  }, [])

  async function fetchAudits() {
    try {
      const response = await fetch('/api/audits')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Denetimler yüklenemedi')
      }

      setAudits(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Beklemede'
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
        <h1 className="text-2xl font-bold text-gray-900">Denetim ve Kontrol</h1>
        <Link
          href="/audits/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Denetim Ekle
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {audits.map((audit) => (
            <li key={audit.id}>
              <Link href={`/audits/${audit.id}`}>
                <div className="block hover:bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900">{audit.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{audit.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-4">
                          Tarih: {new Date(audit.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          audit.status
                        )}`}
                      >
                        {getStatusText(audit.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {audits.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              Henüz kayıtlı denetim bulunmuyor.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
} 