'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  type: string
  serialNumber: string
  location: string
  status: string
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  createdAt: string
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEquipment()
  }, [])

  async function fetchEquipment() {
    try {
      const response = await fetch('/api/equipment')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ekipmanlar yüklenemedi')
      }

      setEquipment(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'MAINTENANCE':
        return 'bg-yellow-100 text-yellow-800'
      case 'REPAIR':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Aktif'
      case 'MAINTENANCE':
        return 'Bakımda'
      case 'REPAIR':
        return 'Onarımda'
      default:
        return 'Kullanım Dışı'
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
        <h1 className="text-2xl font-bold text-gray-900">Ekipman Takibi</h1>
        <Link
          href="/equipment/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Ekipman Ekle
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
                  Ekipman Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seri No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Konum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Bakım
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sonraki Bakım
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipment.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/equipment/${item.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastMaintenanceDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.nextMaintenanceDate).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
              {equipment.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Henüz kayıtlı ekipman bulunmuyor.
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