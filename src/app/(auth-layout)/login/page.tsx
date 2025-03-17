"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AtSign, Lock, LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Geçersiz email veya şifre");
        setIsLoading(false);
        return;
      }

      // Başarılı giriş sonrası yönlendirme
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      router.push(callbackUrl);
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full max-w-md px-4">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70 -z-10 rounded-xl"></div>
      <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-10 -z-10 rounded-xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <Card className="overflow-hidden border-0 shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
          
          <CardHeader className="space-y-1 pb-6 pt-8 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="mx-auto mb-5 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
              }}
            >
              <LogIn className="h-full w-full text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">Giriş Yap</CardTitle>
            <CardDescription className="text-gray-500">
              İş Güvenliği Yönetim Sistemine hoş geldiniz
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center">
                  <AtSign className="mr-2 h-4 w-4 text-blue-500" />
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                </div>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@sirket.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 pl-4 pr-4 py-3 rounded-xl transition-all duration-200 group-hover:border-blue-300"
                    autoComplete="email"
                  />
                  <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/20 pointer-events-none transition-all duration-300"></div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center">
                  <Lock className="mr-2 h-4 w-4 text-blue-500" />
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Şifre
                  </label>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/80 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500 pl-4 pr-12 py-3 rounded-xl transition-all duration-200 group-hover:border-blue-300"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/20 pointer-events-none transition-all duration-300"></div>
                </div>
              </motion.div>
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50/80 backdrop-blur-sm py-3 px-4 rounded-xl border border-red-200 shadow-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                      <span>Giriş yapılıyor...</span>
                    </div>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-5 w-5" />
                      Giriş Yap
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 