import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'İSG Yönetim Sistemi',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20 pb-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 