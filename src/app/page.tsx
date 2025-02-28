import Link from 'next/link'

export default function Home() {
  const modules = [
    {
      title: 'Risk Değerlendirme',
      description: 'Risk analizi ve değerlendirme araçları',
      href: '/risk-assessment',
      icon: '📊'
    },
    {
      title: 'Olay Takibi',
      description: 'İş kazaları ve olayların kaydı ve takibi',
      href: '/incidents',
      icon: '🚨'
    },
    {
      title: 'Eğitim Yönetimi',
      description: 'Eğitim ve sertifikasyon takibi',
      href: '/training',
      icon: '📚'
    },
    {
      title: 'Denetim ve Kontrol',
      description: 'Denetim takibi ve kontrol listeleri',
      href: '/audits',
      icon: '✓'
    }
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        İSG Yönetim Sistemi
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{module.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {module.title}
            </h2>
            <p className="text-gray-600">{module.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
} 