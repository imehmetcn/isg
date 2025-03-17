import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { SessionProvider } from "@/components/session-provider"
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Giriş Yap - İSG Yönetim',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi Giriş Sayfası',
}

// Bu layout, RootLayout'u override eder
export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={cn(
        inter.className,
        "min-h-screen bg-black font-sans antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <div className="min-h-screen flex items-center justify-center">
              {children}
            </div>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 