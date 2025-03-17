import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Giriş Yap - İSG Yönetim',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi Giriş Sayfası',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white flex items-center justify-center py-10">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
      >
        {children}
      </ThemeProvider>
    </div>
  )
} 