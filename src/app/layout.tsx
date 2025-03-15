import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/lib/utils'
import './globals.css'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { Toaster } from "sonner"
import AuthProvider from '@/providers/session-provider'
import { Inter } from "next/font/google"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/lib/uploadthing"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'İSG Yönetim Sistemi',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          inter.className
        )}
      >
        <AuthProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <NavBar />
          <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20 pb-16">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
} 