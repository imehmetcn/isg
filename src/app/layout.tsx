import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'İSG Yönetim Sistemi',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <Header />
            <Navbar />
          </div>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 