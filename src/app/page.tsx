'use client'

import { ArrowRight, BarChart2, FileText, Shield, Users } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef } from "react"

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
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  
  // Parallax refs and effects
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  })
  
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"])
  const featuresY = useTransform(featuresProgress, [0, 1], ["0%", "25%"])
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-white"
      >
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-blue-600 cursor-pointer"
              >
                İSG Yönetim
              </motion.div>
              <div className="flex items-center gap-6">
                <motion.div whileHover={{ y: -2 }}>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">Hakkında</Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">İletişim</Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/register" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 group"
                  >
                    Ücretsiz Dene
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          style={{ opacity, scale, y: heroY }}
          className="min-h-screen pt-20 relative overflow-hidden"
        >
          {/* Floating Shapes */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 left-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-40 right-20 w-32 h-32 bg-blue-600/10 rounded-full blur-xl"
          />
          
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
        </motion.section>

        {/* Features */}
        <motion.section 
          ref={featuresRef}
          style={{ y: featuresY }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Ana Hizmetlerimiz
            </motion.h2>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
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
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition group"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6"
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    whileHover={{ x: 5 }}
                    className="text-2xl font-semibold text-gray-900 mb-4"
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <motion.div
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="mt-6"
                  >
                    <Link 
                      href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition"
                    >
                      Detaylı Bilgi
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
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
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-t border-gray-800 mt-12 pt-8 text-sm text-center"
            >
              © {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
            </motion.div>
          </div>
        </footer>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>
    </AnimatePresence>
  )
} 