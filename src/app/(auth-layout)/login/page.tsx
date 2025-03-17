"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AtSign, Lock, LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
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

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md px-4"
    >
      <Card className="overflow-hidden border shadow-lg rounded-xl bg-white">
        <CardHeader className="space-y-1 pb-6 pt-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-500 p-3 shadow-md"
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
            <div className="space-y-2">
              <div className="flex items-center">
                <AtSign className="mr-2 h-4 w-4 text-gray-500" />
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
              </div>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@sirket.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 pl-3 pr-3 py-2 rounded-lg transition-all duration-200"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Lock className="mr-2 h-4 w-4 text-gray-500" />
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Şifre
                </label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 pl-3 pr-10 py-2 rounded-lg transition-all duration-200"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-md border border-red-200"
              >
                {error}
              </motion.div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
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
      </Card>
    </motion.div>
  );
} 