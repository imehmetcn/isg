'use client';

import React from 'react';
import { FeatureCard } from '@/components/home/FeatureCard';

export default function Home() {
  const features = [
    {
      title: 'Risk Değerlendirme',
      description: 'Çalışma ortamınızdaki potansiyel tehlikeleri belirleyin, risk seviyelerini değerlendirin ve önleyici tedbirleri planlayın.',
      features: [
        'Tehlike tanımlama ve risk analizi',
        'Önleyici tedbirlerin planlanması',
        'Düzenli risk değerlendirme takibi'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Doküman Yönetimi',
      description: 'İSG ile ilgili tüm belgeleri merkezi bir sistemde saklayın, düzenleyin ve gerektiğinde hızlıca erişin.',
      features: [
        'Merkezi doküman arşivi',
        'Otomatik belge hatırlatmaları',
        'Güvenli erişim kontrolü'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      reverse: true
    },
    {
      title: 'Eğitim Takibi',
      description: 'Çalışanlarınızın İSG eğitimlerini planlayın, takip edin ve yasal gerekliliklere uygunluğu sağlayın.',
      features: [
        'Eğitim planlaması ve takvimi',
        'Katılım ve sertifika takibi',
        'Eğitim yenileme hatırlatmaları'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Denetim ve Kontrol',
      description: 'İş yerinizdeki İSG uygulamalarını düzenli olarak denetleyin, eksiklikleri belirleyin ve iyileştirme aksiyonlarını takip edin.',
      features: [
        'Denetim kontrol listeleri',
        'Uygunsuzluk takibi',
        'Düzeltici faaliyet yönetimi'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      reverse: true
    },
    {
      title: 'Acil Durum Yönetimi',
      description: 'Acil durum planlarınızı oluşturun, tatbikatları yönetin ve acil durum ekiplerinin hazırlığını sağlayın.',
      features: [
        'Acil durum planları ve prosedürleri',
        'Tatbikat planlama ve raporlama',
        'Acil durum ekipmanları takibi'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            İSG Platform
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            İş Sağlığı ve Güvenliği yönetimini kolaylaştıran kapsamlı çözüm
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Hemen Başlayın
          </button>
          <p className="mt-4 text-sm text-gray-500">
            İş sağlığı ve güvenliği yönetimini kolaylaştırmak için tasarlandı
          </p>
        </div>
      </div>
    </div>
  );
} 