'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

interface Report {
  id: string
  title: string
  type: string
  period: string
  status: string
  fileUrl: string | null
  generatedAt: string | null
  createdAt: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchReports()
  }, [])

  async function fetchReports() {
    try {
      const response = await fetch('/api/reports')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Raporlar yüklenemedi')
      }

      setReports(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  async function generateReport(type: string, period: string) {
    try {
      setGenerating(true)
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, period })
      })

      if (!response.ok) {
        throw new Error('Rapor oluşturulamadı')
      }

      // Yeni raporu listeye ekle
      const newReport = await response.json()
      setReports(prevReports => [newReport, ...prevReports])
    } catch (error) {
      console.error('Rapor oluşturma hatası:', error)
    } finally {
      setGenerating(false)
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

  function getStatusColor(status: string): string {
    switch (status) {
      case 'GENERATING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => generateReport('INCIDENT', 'LAST_30_DAYS')}
            disabled={generating}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {generating ? 'Rapor Oluşturuluyor...' : 'Yeni Rapor Oluştur'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reports.map(report => (
            <li key={report.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900">
                      {report.title}
                    </h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getReportTypeText(report.type)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {report.period}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {format(new Date(report.createdAt), 'dd MMMM yyyy HH:mm', { locale: tr })}
                    </span>
                    {report.fileUrl && report.status === 'COMPLETED' && (
                      <a
                        href={report.fileUrl}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        İndir
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
          {reports.length === 0 && (
            <li>
              <div className="text-center py-8 text-gray-500">
                Henüz rapor bulunmuyor
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
} 