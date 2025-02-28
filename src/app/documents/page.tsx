'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  category: string
  description: string
  fileUrl: string
  version: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [])

  async function fetchDocuments() {
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Dokümanlar yüklenemedi')
      }

      setDocuments(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getCategoryText(category: string): string {
    switch (category) {
      case 'PROCEDURE':
        return 'Prosedür'
      case 'INSTRUCTION':
        return 'Talimat'
      case 'FORM':
        return 'Form'
      case 'PLAN':
        return 'Plan'
      case 'REPORT':
        return 'Rapor'
      default:
        return 'Diğer'
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800'
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'DRAFT':
        return 'Taslak'
      case 'PUBLISHED':
        return 'Yayında'
      case 'ARCHIVED':
        return 'Arşivlenmiş'
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
        <h1 className="text-2xl font-bold text-gray-900">Doküman Yönetimi</h1>
        <Link
          href="/documents/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Doküman Ekle
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
                  Doküman Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Versiyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Güncelleme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/documents/${doc.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      {doc.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoryText(doc.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {getStatusText(doc.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.updatedAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      İndir
                    </a>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Henüz kayıtlı doküman bulunmuyor.
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