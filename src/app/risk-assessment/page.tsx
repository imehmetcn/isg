'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RiskAssessment {
  id: string
  title: string
  description: string
  location: string
  severity: number
  likelihood: number
  createdAt: string
}

export default function RiskAssessmentPage() {
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssessments()
  }, [])

  async function fetchAssessments() {
    try {
      const response = await fetch('/api/risk-assessment')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Risk değerlendirmeleri yüklenemedi')
      }

      setAssessments(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getRiskLevel(severity: number, likelihood: number): string {
    const riskScore = severity * likelihood
    if (riskScore >= 15) return 'Çok Yüksek'
    if (riskScore >= 10) return 'Yüksek'
    if (riskScore >= 5) return 'Orta'
    return 'Düşük'
  }

  function getRiskColor(severity: number, likelihood: number): string {
    const level = getRiskLevel(severity, likelihood)
    switch (level) {
      case 'Çok Yüksek':
        return 'bg-red-100 text-red-800'
      case 'Yüksek':
        return 'bg-orange-100 text-orange-800'
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
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
        <h1 className="text-2xl font-bold text-gray-900">Risk Değerlendirmeleri</h1>
        <Link
          href="/risk-assessment/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Değerlendirme
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {assessments.map((assessment) => (
            <li key={assessment.id}>
              <Link href={`/risk-assessment/${assessment.id}`}>
                <div className="block hover:bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900">{assessment.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{assessment.description}</p>
                      <p className="mt-1 text-sm text-gray-500">Konum: {assessment.location}</p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(
                          assessment.severity,
                          assessment.likelihood
                        )}`}
                      >
                        {getRiskLevel(assessment.severity, assessment.likelihood)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(assessment.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {assessments.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              Henüz risk değerlendirmesi bulunmuyor.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
} 