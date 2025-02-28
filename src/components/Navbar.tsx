'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="bg-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                İSG Yönetimi
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/risk-assessment"
                  className={`${
                    pathname?.startsWith('/risk-assessment')
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Risk Değerlendirme
                </Link>
                <Link
                  href="/incidents"
                  className={`${
                    pathname?.startsWith('/incidents')
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Olay Takibi
                </Link>
                <Link
                  href="/trainings"
                  className={`${
                    pathname?.startsWith('/trainings')
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Eğitim Yönetimi
                </Link>
                <Link
                  href="/audits"
                  className={`${
                    pathname?.startsWith('/audits')
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Denetim ve Kontrol
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-primary-100">{session.user?.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-primary-100 hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-primary-100 hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 