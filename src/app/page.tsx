"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Users, Activity, Calendar } from "lucide-react";
import { AnimatedHeader } from "@/components/ui/animated-header";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const quickLinks = [
    {
      title: "Kullanıcı Yönetimi",
      description: "Kullanıcıları görüntüle, ekle, düzenle ve yönet",
      icon: Users,
      href: "/admin/users",
      adminOnly: true,
    },
    {
      title: "Dokümanlar",
      description: "İSG dokümanlarını görüntüle ve yönet",
      icon: FileText,
      href: "/documents",
      adminOnly: false,
    },
    {
      title: "Eğitimler",
      description: "Eğitimleri planla, katılımcıları yönet",
      icon: Calendar,
      href: "/trainings",
      adminOnly: false,
    },
    {
      title: "Denetimler",
      description: "Denetimleri planla ve raporla",
      icon: Activity,
      href: "/inspections",
      adminOnly: false,
    },
  ];

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

  return (
    <>
      <AnimatedHeader />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20 pb-16">
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
              İSG Yönetim Sistemi'ne hoş geldiniz. Aşağıdaki bağlantıları kullanarak hızlıca işlem yapabilirsiniz.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              (!link.adminOnly || session?.user?.role === "ADMIN") && (
                <motion.div
                  key={link.href}
                  variants={item}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer border-t-4 border-t-blue-500 overflow-hidden" onClick={() => router.push(link.href)}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                      <link.icon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                      <div className="flex items-center pt-4">
                        <Button variant="link" className="p-0 h-auto font-normal text-blue-600 hover:text-purple-600 transition-colors" onClick={() => router.push(link.href)}>
                          Görüntüle
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </div>

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
    </>
  );
} 