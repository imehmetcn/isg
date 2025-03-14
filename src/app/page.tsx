'use client'

import { ArrowRight, BarChart2, FileText, Shield, Users, CheckCircle2, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

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
      <section className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('/pattern.svg')]"
          />
          {/* Floating Safety Icons */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-[10%] text-blue-500 opacity-20"
          >
            <Shield size={60} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-[15%] text-red-500 opacity-20"
          >
            <Users size={50} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, 3, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-40 left-[20%] text-green-500 opacity-20"
          >
            <FileText size={40} />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
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
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition shadow-lg shadow-blue-500/10"
              >
                Bizimle İletişime Geçin
              </Link>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-20 bg-white p-8 rounded-2xl shadow-xl shadow-blue-500/5 backdrop-blur-sm"
            >
              {[
                { number: "1000+", label: "Aktif Kullanıcı" },
                { number: "5000+", label: "Risk Değerlendirmesi" },
                { number: "98%", label: "Müşteri Memnuniyeti" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
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

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Neden Bizi Tercih Etmelisiniz?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <CheckCircle2 className="text-green-600" />,
                title: "Kolay Kullanım",
                description: "Sezgisel arayüz ile tüm işlemlerinizi hızlıca tamamlayın."
              },
              {
                icon: <Shield className="text-blue-600" />,
                title: "Güvenli Altyapı",
                description: "Verileriniz en üst düzey güvenlik önlemleriyle korunur."
              },
              {
                icon: <Star className="text-yellow-500" />,
                title: "7/24 Destek",
                description: "Teknik ekibimiz her zaman yanınızda."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { number: "1000+", label: "Aktif Kullanıcı" },
              { number: "5000+", label: "Tamamlanan Risk Değerlendirmesi" },
              { number: "98%", label: "Müşteri Memnuniyeti" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Müşterilerimiz Ne Diyor?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Ahmet Yılmaz",
                role: "İSG Uzmanı",
                company: "ABC İnşaat",
                content: "İSG süreçlerimizi çok daha verimli yönetiyoruz. Kullanımı kolay ve kapsamlı bir sistem."
              },
              {
                name: "Ayşe Demir",
                role: "İK Müdürü",
                company: "XYZ Üretim",
                content: "Çalışan eğitimlerini takip etmek artık çok daha kolay. Raporlama özellikleri muhteşem."
              },
              {
                name: "Mehmet Kaya",
                role: "İş Güvenliği Müdürü",
                company: "DEF Holding",
                content: "Risk değerlendirme süreçlerimiz artık çok daha sistematik. Kesinlikle tavsiye ediyorum."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Hemen Ücretsiz Denemeye Başlayın
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              14 gün boyunca tüm özellikleri ücretsiz kullanın, risksiz deneyin.
            </p>
            <Link 
              href="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition inline-flex items-center gap-2 group"
            >
              Hemen Başla
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
          </motion.div>
        </div>
      </section>

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
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  )
} 