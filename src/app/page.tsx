"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  FileText, 
  Users, 
  Activity, 
  Calendar, 
  PlusCircle, 
  FileUp,
  UserPlus,
  Search
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
          className="flex flex-col gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Hoş Geldiniz, {session?.user?.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              İSG Yönetim Sistemi'ne hoş geldiniz. Kontrol paneline giderek işlemlerinizi yapabilirsiniz.
            </p>
          </motion.div>

          {/* İstatistik Kartları */}
          <motion.div variants={item}>
            <h2 className="text-2xl font-semibold mb-4">Genel Bakış</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsItems.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                          <stat.icon size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="flex justify-center mt-4"
          >
            <Button 
              onClick={() => router.push("/dashboard")} 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              Kontrol Paneline Git
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
                  <span className="bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md text-sm font-medium">
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