import { Metadata } from "next"
import Link from "next/link"
import { UserLoginForm } from "@/components/auth/user-login-form"

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "İş Güvenliği Yönetim Sistemi giriş sayfası",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hoş Geldiniz
          </h1>
          <p className="text-sm text-muted-foreground">
            Email adresiniz ve şifreniz ile giriş yapın
          </p>
        </div>
        <UserLoginForm />
      </div>
    </div>
  )
} 