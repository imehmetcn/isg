"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  FileText, 
  Users, 
  Activity, 
  Calendar, 
  PlusCircle, 
  FileUp,
  UserPlus,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load the animated background for better initial load performance
const AnimatedBackground = lazy(() => import("@/components/ui/animated-background").then(mod => ({ default: mod.AnimatedBackground })));

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    documents: 0,
    users: 0,
    trainings: 0,
    inspections: 0
  });
  const [showActions, setShowActions] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Örnek istatistikleri yükle
  useEffect(() => {
    // Gerçek uygulamada burada API çağrısı yapılabilir
    setStats({
      documents: 24,
      users: 8,
      trainings: 3,
      inspections: 12
    });
    
    // Sayfa yüklendikten sonra lazy components'leri yükle
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statsItems = [
    { title: "Toplam Doküman", value: stats.documents, icon: FileText, color: "from-blue-500 to-blue-700" },
    { title: "Kullanıcılar", value: stats.users, icon: Users, color: "from-purple-500 to-purple-700" },
    { title: "Eğitimler", value: stats.trainings, icon: Calendar, color: "from-green-500 to-green-700" },
    { title: "Denetimler", value: stats.inspections, icon: Activity, color: "from-amber-500 to-amber-700" }
  ];

  const quickActions = [
    { title: "Doküman Yükle", icon: FileUp, href: "/documents/upload", color: "bg-blue-500" },
    { title: "Kullanıcı Ekle", icon: UserPlus, href: "/admin/users/new", color: "bg-purple-500", adminOnly: true },
    { title: "Arama", icon: Search, href: "/search", color: "bg-green-500" }
  ];

  const features = [
    {
      title: "Risk Değerlendirme",
      description: "Kapsamlı risk değerlendirme araçları ile iş yerinizdeki tehlikeleri belirleyin ve önlem alın.",
      icon: Activity,
      href: "/risk-degerlendirme",
      color: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      title: "Doküman Yönetimi",
      description: "Tüm İSG dokümanlarınızı tek bir yerde saklayın, düzenleyin ve paylaşın.",
      icon: FileText,
      href: "/documents",
      color: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      title: "Eğitim Takibi",
      description: "Çalışanlarınızın eğitim ihtiyaçlarını belirleyin, eğitimleri planlayın ve takip edin.",
      icon: Calendar,
      href: "/egitim-yonetimi",
      color: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      title: "Denetim ve Kontrol",
      description: "Düzenli denetimler planlayın, gerçekleştirin ve sonuçları raporlayın.",
      icon: Search,
      href: "/denetim-ve-kontrol",
      color: "bg-gradient-to-br from-amber-500 to-amber-700"
    }
  ];

  return (
    <>
      {/* Lazy load the animated background */}
      {isLoaded && (
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
      )}
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-16 pt-8">
        <motion.div 
          className="flex flex-col gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Hero Section */}
          <motion.div 
            variants={item}
            className="flex flex-col items-center text-center py-12 md:py-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-md"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                İş Sağlığı ve Güvenliği Yönetim Sistemi
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              İSG Süreçlerinizi <br className="hidden md:block" />
              <span className="text-blue-600">Dijitalleştirin</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Hoş geldiniz, {session?.user?.name}! İSG Yönetim Sistemi ile tüm iş sağlığı ve güvenliği süreçlerinizi kolayca yönetin.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                onClick={() => router.push("/dashboard")} 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-0 shadow-md hover:shadow-lg transition-shadow px-8"
              >
                Kontrol Paneline Git
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => router.push("/documents")} 
                variant="outline"
                size="lg"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Dokümanları Görüntüle
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* İstatistik Kartları */}
          <motion.div 
            variants={item}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {statsItems.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-0 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div variants={item} className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Öne Çıkan Özellikler
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => router.push(feature.href)}
                  className="cursor-pointer"
                >
                  <Card className="h-full border-0 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${feature.color} text-white`}>
                          <feature.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-600 mb-4">{feature.description}</p>
                          <div className="flex items-center text-blue-600 font-medium">
                            <span>Daha Fazla</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Hızlı Eylemler Menüsü */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Button
            onClick={() => setShowActions(!showActions)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <PlusCircle size={24} />
          </Button>
        </motion.div>

        {showActions && (
          <motion.div 
            className="absolute bottom-16 right-0 mb-2 space-y-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {quickActions.map((action, index) => (
              (!action.adminOnly || session?.user?.role === "ADMIN") && (
                <motion.div
                  key={index}
                  className="flex items-center justify-end space-x-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-md text-sm font-medium">
                    {action.title}
                  </span>
                  <Button
                    onClick={() => router.push(action.href)}
                    className={`h-10 w-10 rounded-full ${action.color} text-white shadow-md`}
                  >
                    <action.icon size={18} />
                  </Button>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
} 