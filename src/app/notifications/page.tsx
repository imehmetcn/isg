'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  category: string
  isRead: boolean
  link: string | null
  createdAt: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  async function fetchNotifications() {
    try {
      const response = await fetch('/api/notifications')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bildirimler yüklenemedi')
      }

      setNotifications(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  async function markAsRead(id: string) {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT'
      })

      if (!response.ok) {
        throw new Error('Bildirim güncellenemedi')
      }

      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      ))
    } catch (error) {
      console.error('Bildirim güncelleme hatası:', error)
    }
  }

  function getNotificationTypeStyle(type: string): string {
    switch (type) {
      case 'INFO':
        return 'bg-blue-50 border-blue-200'
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-200'
      case 'DANGER':
        return 'bg-red-50 border-red-200'
      case 'SUCCESS':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  function getNotificationIcon(type: string): string {
    switch (type) {
      case 'INFO':
        return '📋'
      case 'WARNING':
        return '⚠️'
      case 'DANGER':
        return '🚨'
      case 'SUCCESS':
        return '✅'
      default:
        return 'ℹ️'
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bildirimler</h1>
      
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Henüz bildirim bulunmuyor
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${getNotificationTypeStyle(notification.type)} ${
                notification.isRead ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(notification.createdAt), 'dd MMMM yyyy HH:mm', { locale: tr })}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {notification.category}
                      </span>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Okundu olarak işaretle
                        </button>
                      )}
                    </div>
                    {notification.link && (
                      <a
                        href={notification.link}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Detayları görüntüle →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 