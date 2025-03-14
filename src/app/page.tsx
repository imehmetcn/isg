'use client'

import { ArrowRight, BarChart2, FileText, Shield, Users, CheckCircle, AlertTriangle, GraduationCap, ClipboardCheck, Siren, Star, ChevronRight } from "lucide-react"
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
        {/* Navigation - Updated with glass effect */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-gray-200/20 shadow-sm"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text cursor-pointer"
              >
                İSG Yönetim
              </motion.div>
              <div className="flex items-center gap-8">
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
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-2 group font-medium"
                  >
                    Ücretsiz Dene
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section - Updated with modern design */}
        <motion.section 
          ref={heroRef}
          style={{ opacity, scale, y: heroY }}
          className="min-h-screen pt-24 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-blue-50/50 to-transparent rounded-[100%] blur-3xl opacity-70" />
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
              className="absolute top-40 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl"
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
              className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-blue-700/20 rounded-full blur-2xl"
            />
          </div>
          
          {/* Main Content */}
          <div className="container mx-auto px-4 pt-20 relative">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-6 bg-gradient-to-r from-blue-600/10 to-blue-700/10 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-blue-100"
              >
                Türkiye'nin En Kapsamlı İSG Yazılımı
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text"
              >
                İş Güvenliği Yönetimini{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-transparent bg-clip-text">Dijitalleştirin</span>
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-blue-100 to-blue-50 z-0 rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto"
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
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-3 group font-medium shadow-lg shadow-blue-500/20"
                >
                  <span>Demo İncele</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition font-medium shadow-lg shadow-gray-200/20"
                >
                  Bizimle İletişime Geçin
                </Link>
              </motion.div>

              {/* Statistics */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="grid md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto"
              >
                {[
                  { number: "1000+", label: "Aktif Kullanıcı" },
                  { number: "5000+", label: "Tamamlanan Risk Değerlendirmesi" },
                  { number: "10000+", label: "Düzenlenen Eğitim" },
                  { number: "%98", label: "Müşteri Memnuniyeti" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-xl shadow-gray-100/20"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features - Keep existing features section but update colors */}
        <motion.section 
          ref={featuresRef}
          style={{ y: featuresY }}
          className="py-32 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-20"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 text-transparent bg-clip-text mb-6"
              >
                Ana Hizmetlerimiz
              </motion.h2>
              <p className="text-gray-600 text-lg">
                İş güvenliği süreçlerinizi dijitalleştirmek için ihtiyacınız olan tüm araçlar tek platformda.
              </p>
            </motion.div>

            {/* Keep existing features grid but with updated styling */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              className="grid lg:grid-cols-2 gap-8 mb-8"
            >
              {[
                {
                  icon: <Shield className="text-blue-600 w-8 h-8" />,
                  title: "Risk Değerlendirme",
                  description: "Kapsamlı risk analizi ve tehlike belirleme sistemi",
                  features: [
                    "5x5 Matris ve Fine-Kinney metodları",
                    "Özelleştirilebilir risk skorlama",
                    "Otomatik risk raporu oluşturma",
                    "Tehlike kütüphanesi ve şablonlar",
                    "Düzeltici önleyici faaliyet takibi"
                  ],
                  color: "blue"
                },
                {
                  icon: <AlertTriangle className="text-orange-600 w-8 h-8" />,
                  title: "Olay Takibi",
                  description: "İş kazaları ve ramak kala olayları yönetimi",
                  features: [
                    "Kaza bildirim formları",
                    "Kök neden analizi araçları",
                    "İstatistiksel analiz ve raporlama",
                    "Mobil uygulama ile anında bildirim",
                    "SGK entegrasyonu"
                  ],
                  color: "orange"
                },
                {
                  icon: <GraduationCap className="text-green-600 w-8 h-8" />,
                  title: "Eğitim Yönetimi",
                  description: "Çalışan eğitimlerinin dijital yönetimi",
                  features: [
                    "Online eğitim içerikleri",
                    "Sertifika ve yetkinlik takibi",
                    "Eğitim takvimi ve hatırlatmalar",
                    "Eğitim katılım ve başarı takibi",
                    "Özelleştirilebilir eğitim materyalleri"
                  ],
                  color: "green"
                },
                {
                  icon: <ClipboardCheck className="text-purple-600 w-8 h-8" />,
                  title: "Denetim ve Kontrol",
                  description: "Saha denetimleri ve ekipman kontrolleri",
                  features: [
                    "Dijital kontrol formları",
                    "Periyodik kontrol takibi",
                    "Mobil saha denetimi",
                    "Uygunsuzluk yönetimi",
                    "Fotoğraflı raporlama"
                  ],
                  color: "purple"
                },
                {
                  icon: <Siren className="text-red-600 w-8 h-8" />,
                  title: "Acil Durum ve Eylem Planı",
                  description: "Acil durum yönetimi ve müdahale planlaması",
                  features: [
                    "Acil durum ekip yönetimi",
                    "Tatbikat planlama ve takibi",
                    "Tahliye planı oluşturma",
                    "Acil durum talimatları",
                    "Olay sonrası değerlendirme"
                  ],
                  color: "red"
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
                  className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition group border-t-4 border-${feature.color}-500`}
                >
                  <div className="flex items-start gap-6">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      className={`w-16 h-16 bg-${feature.color}-50 rounded-lg flex items-center justify-center shrink-0`}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <motion.h3 
                        whileHover={{ x: 5 }}
                        className="text-2xl font-semibold text-gray-900 mb-2"
                      >
                        {feature.title}
                      </motion.h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.features.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <CheckCircle className={`w-5 h-5 text-${feature.color}-500 shrink-0`} />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="mt-8"
                      >
                        <Link 
                          href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`inline-flex items-center text-${feature.color}-600 hover:text-${feature.color}-700 transition font-semibold`}
                        >
                          Detaylı Bilgi
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Footer - Updated with modern design */}
        <footer className="bg-gray-900 text-gray-400 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <div className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">
                  İSG Yönetim
                </div>
                <p className="text-gray-400 leading-relaxed">
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
              className="border-t border-gray-800 mt-16 pt-8 text-sm text-center"
            >
              © {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
            </motion.div>
          </div>
        </footer>

        {/* Scroll Progress Bar - Updated with gradient */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>
    </AnimatePresence>
  )
} 