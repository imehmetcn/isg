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
          'min-h-screen font-sans antialiased',
          GeistSans.variable,
          inter.className
        )}
      >
        <AuthProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
} 