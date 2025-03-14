import React from 'react'
import Link from 'next/link'

export default function Home() {
  const modules = [
    {
      title: 'Risk Değerlendirme',
      description: 'Risk analizi, değerlendirme ve önlem takibi',
      href: '/risk-assessment',
      color: 'bg-red-100 text-red-700'
    },
    {
      title: 'Olay Takibi',
      description: 'İş kazası ve ramak kala olayları yönetimi',
      href: '/incidents',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      title: 'Eğitim Yönetimi',
      description: 'Eğitim planlaması ve katılımcı takibi',
      href: '/trainings',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Denetim ve Kontrol',
      description: 'Saha denetimleri ve kontrol listeleri',
      href: '/inspections',
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Acil Durum Planı',
      description: 'Acil durum planı ve tatbikat yönetimi',
      href: '/emergency',
      color: 'bg-purple-100 text-purple-700'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        İş Güvenliği Yönetim Sistemi
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={`p-6 rounded-lg shadow-sm ${module.color} hover:opacity-90 transition-opacity`}
          >
            <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
            <p className="opacity-90">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
} 