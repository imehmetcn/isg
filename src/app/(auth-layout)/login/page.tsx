"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AtSign, Lock, LogIn, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Eğer kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Geçersiz email veya şifre");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklenirken loading göster
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md px-4"
    >
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-gray-900 to-black rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl"></div>
        
        <CardHeader className="relative z-10 space-y-1 pb-6 pt-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3 shadow-lg"
          >
            <LogIn className="h-full w-full text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center text-white">Giriş Yap</CardTitle>
          <CardDescription className="text-center text-gray-400">
            İş Güvenliği Yönetim Sistemine hoş geldiniz
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center">
                <AtSign className="mr-2 h-4 w-4 text-gray-400" />
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email
                </label>
              </div>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@sirket.com"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 pl-3 pr-3 py-2 rounded-lg transition-all duration-200"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-gray-400" />
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Şifre
                </label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-gray-800/50 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500 pl-3 pr-3 py-2 rounded-lg transition-all duration-200"
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-3 rounded-md border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Giriş Yap
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="relative z-10 flex justify-center pb-8 pt-0">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
          >
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Ana Sayfaya Dön
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 