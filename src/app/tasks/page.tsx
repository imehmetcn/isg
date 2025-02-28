'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  description: string
  type: string
  priority: string
  status: string
  dueDate: string
  assignedTo: string
  createdBy: string
  createdAt: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const response = await fetch('/api/tasks')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Görevler yüklenemedi')
      }

      setTasks(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  function getTaskTypeText(type: string): string {
    switch (type) {
      case 'INSPECTION':
        return 'Denetim'
      case 'MAINTENANCE':
        return 'Bakım'
      case 'TRAINING':
        return 'Eğitim'
      case 'DOCUMENTATION':
        return 'Dokümantasyon'
      case 'IMPROVEMENT':
        return 'İyileştirme'
      default:
        return 'Diğer'
    }
  }

  function getPriorityColor(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'bg-blue-100 text-blue-800'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800'
      case 'HIGH':
        return 'bg-orange-100 text-orange-800'
      case 'CRITICAL':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getPriorityText(priority: string): string {
    switch (priority) {
      case 'LOW':
        return 'Düşük'
      case 'MEDIUM':
        return 'Orta'
      case 'HIGH':
        return 'Yüksek'
      case 'CRITICAL':
        return 'Kritik'
      default:
        return 'Bilinmiyor'
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'TODO':
        return 'bg-gray-100 text-gray-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'REVIEW':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'TODO':
        return 'Yapılacak'
      case 'IN_PROGRESS':
        return 'Devam Ediyor'
      case 'REVIEW':
        return 'İncelemede'
      case 'COMPLETED':
        return 'Tamamlandı'
      case 'CANCELLED':
        return 'İptal Edildi'
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
        <h1 className="text-2xl font-bold text-gray-900">Görev Takibi</h1>
        <Link
          href="/tasks/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Yeni Görev Ekle
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
                  Görev
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öncelik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Tarih
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      {task.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTaskTypeText(task.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {getPriorityText(task.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Henüz kayıtlı görev bulunmuyor.
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