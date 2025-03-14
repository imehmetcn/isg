'use client'

import { ArrowRight, BarChart2, FileText, Shield, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuroraBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">İSG Yönetim</div>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">Hakkında</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">İletişim</Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 group"
              >
                Ücretsiz Dene
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-20 relative overflow-hidden">
        {/* Main Content */}
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 bg-white/80 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
            >
              Türkiye'nin En Kapsamlı İSG Yazılımı
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl font-bold text-gray-900 mb-8 leading-tight"
            >
              İş Güvenliği Yönetimini{" "}
              <span className="relative">
                <span className="relative z-10 text-blue-600">Dijitalleştirin</span>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-2 left-0 h-3 bg-blue-100 z-0"
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed"
            >
              Tüm İSG süreçlerinizi tek platformda yönetin. Risk değerlendirmeden eğitim takibine,
              denetimlerden raporlamalara kadar her şey kontrolünüz altında.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-6 justify-center"
            >
              <Link 
                href="/demo" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center gap-3 group shadow-lg shadow-blue-500/20"
              >
                <span>Demo İncele</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/80 backdrop-blur-sm text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition shadow-lg shadow-blue-500/10"
              >
                Bizimle İletişime Geçin
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Ana Hizmetlerimiz
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          >
            {[
              {
                icon: <Shield className="text-blue-600 w-8 h-8" />,
                title: "Risk Değerlendirme",
                description: "Kapsamlı risk analizi, tehlike belirleme, önleyici tedbirler ve risk skorlama sistemleri ile işyeri güvenliğini en üst seviyeye çıkarın."
              },
              {
                icon: <FileText className="text-blue-600 w-8 h-8" />,
                title: "Olay Takibi",
                description: "İş kazaları, ramak kala olayları ve meslek hastalıklarını detaylı raporlama ve analiz araçlarıyla takip edin."
              },
              {
                icon: <Users className="text-blue-600 w-8 h-8" />,
                title: "Eğitim Yönetimi",
                description: "Çalışan eğitimlerini planlayin, online eğitim içerikleri oluşturun ve sertifika süreçlerini otomatik takip edin."
              },
              {
                icon: <BarChart2 className="text-blue-600 w-8 h-8" />,
                title: "Denetim ve Kontrol",
                description: "Periyodik kontroller, ekipman denetimleri ve saha gözlemlerini mobil uygulama desteğiyle gerçekleştirin."
              },
              {
                icon: <Shield className="text-red-600 w-8 h-8" />,
                title: "Acil Durum ve Eylem Planı",
                description: "Acil durum planları oluşturun, tatbikat takibi yapın ve müdahale ekiplerini organize edin."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <Link 
                  href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 transition group"
                >
                  Detaylı Bilgi
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-white mb-4">İSG Yönetim</div>
              <p className="text-sm">
                İş güvenliği süreçlerinizi dijitalleştirin, 
                verimliliğinizi artırın.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Ürün</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Özellikler</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Fiyatlandırma</Link></li>
                <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Şirket</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">Hakkımızda</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">İletişim</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Yasal</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Kullanım Koşulları</Link></li>
                <li><Link href="/gdpr" className="hover:text-white transition">KVKK</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
} 