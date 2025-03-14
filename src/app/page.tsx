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
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              İş Güvenliği Yönetimini <span className="text-blue-600">Kolaylaştırın</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Tüm İSG süreçlerinizi tek bir platformda yönetin. Risk değerlendirmeden eğitim takibine, 
              denetimlerden raporlamalara kadar her şey kontrolünüz altında.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Link 
                href="/demo" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 group"
              >
                Demo İncele
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Bizimle İletişime Geçin
              </Link>
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
            Neler Sunuyoruz?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Shield className="text-blue-600" />,
                title: "Risk Yönetimi",
                description: "Kapsamlı risk değerlendirme araçları ile tehlikeleri önceden tespit edin ve önlem alın."
              },
              {
                icon: <Users className="text-blue-600" />,
                title: "Eğitim Takibi",
                description: "Çalışan eğitimlerini planlayin, takip edin ve sertifikalarını yönetin."
              },
              {
                icon: <FileText className="text-blue-600" />,
                title: "Doküman Yönetimi",
                description: "Tüm İSG dokümanlarınızı düzenli ve kolay erişilebilir şekilde saklayın."
              },
              {
                icon: <BarChart2 className="text-blue-600" />,
                title: "Raporlama",
                description: "Detaylı analizler ve özelleştirilebilir raporlarla verilerinizi değerlendirin."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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