import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/lib/utils'
import './globals.css'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { Toaster } from "sonner"
import AuthProvider from '@/providers/auth-provider'
import { Inter } from "next/font/google"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/lib/uploadthing"

// Font optimizasyonu
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Font yüklenene kadar sistem fontunu kullan
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          GeistSans.variable,
          inter.className
        )}
      >
        <AuthProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow">
              {children}
            </div>
          </div>
          <Toaster position="top-right" closeButton richColors />
        </AuthProvider>
      </body>
    </html>
  )
} 