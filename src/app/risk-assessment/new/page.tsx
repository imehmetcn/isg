'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewRiskAssessmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      severity: parseInt(formData.get('severity') as string),
      likelihood: parseInt(formData.get('likelihood') as string),
    }

    try {
      const response = await fetch('/api/risk-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Risk değerlendirmesi oluşturulamadı')
      }

      router.push('/risk-assessment')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Yeni Risk Değerlendirmesi
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Başlık
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Açıklama
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Konum
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Şiddet (1-5)
            </label>
            <select
              name="severity"
              id="severity"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Seçiniz</option>
              <option value="1">1 - Çok Düşük</option>
              <option value="2">2 - Düşük</option>
              <option value="3">3 - Orta</option>
              <option value="4">4 - Yüksek</option>
              <option value="5">5 - Çok Yüksek</option>
            </select>
          </div>

          <div>
            <label htmlFor="likelihood" className="block text-sm font-medium text-gray-700">
              Olasılık (1-5)
            </label>
            <select
              name="likelihood"
              id="likelihood"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Seçiniz</option>
              <option value="1">1 - Çok Nadir</option>
              <option value="2">2 - Nadir</option>
              <option value="3">3 - Olası</option>
              <option value="4">4 - Sık</option>
              <option value="5">5 - Çok Sık</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
} 