'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Personnel {
  id: string
  employeeId: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  safetyTrainingStatus: string
  lastTrainingDate: string
  nextTrainingDate: string
  createdAt: string
}

export default function PersonnelPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPersonnel()
  }, [])

  async function fetchPersonnel() {
    try {
      const response = await fetch('/api/personnel')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Personel listesi yüklenemedi')
      }

      setPersonnel(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getTrainingStatusColor(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'EXPIRED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getTrainingStatusText(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'Tamamlandı'
      case 'PENDING':
        return 'Beklemede'
      case 'EXPIRED':
        return 'Süresi Doldu'
      default:
        return 'Bilinmiyor'
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
        <h1 className="text-2xl font-bold text-gray-900">Personel Yönetimi</h1>
        <Link
          href="/personnel/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Personel Ekle
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sicil No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pozisyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İSG Eğitimi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Eğitim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sonraki Eğitim
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {personnel.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/personnel/${person.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrainingStatusColor(
                        person.safetyTrainingStatus
                      )}`}
                    >
                      {getTrainingStatusText(person.safetyTrainingStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(person.lastTrainingDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(person.nextTrainingDate).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
              {personnel.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Henüz kayıtlı personel bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 