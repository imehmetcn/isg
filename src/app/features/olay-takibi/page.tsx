'use client'

import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, FileText, BarChart2, Bell, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OlayTakibi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-orange-600 mb-6"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="font-semibold">Olay Takibi</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              İş Kazaları ve Ramak Kala Olayları Yönetimi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              İş kazalarını önlemek ve ramak kala olaylarını etkin bir şekilde yönetmek için gelişmiş takip sistemi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link 
                href="/demo"
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                Demo İncele
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition"
              >
                İletişime Geçin
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-orange-600" />,
                title: "Kaza Bildirim Formları",
                description: "Standart ve özelleştirilebilir kaza bildirim formları ile hızlı raporlama."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-orange-600" />,
                title: "İstatistiksel Analiz",
                description: "Detaylı raporlar ve trend analizleri ile proaktif önlemler alın."
              },
              {
                icon: <Bell className="w-8 h-8 text-orange-600" />,
                title: "Anlık Bildirimler",
                description: "Mobil uygulama ile anında bildirim ve hızlı müdahale imkanı."
              },
              {
                icon: <Clock className="w-8 h-8 text-orange-600" />,
                title: "Zaman Takibi",
                description: "Olay sonrası süreç yönetimi ve yasal sürelerin takibi."
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-orange-600" />,
                title: "SGK Entegrasyonu",
                description: "Otomatik SGK bildirimleri ve form doldurma desteği."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Olay Takip Süreci
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Olay Bildirimi",
                description: "Kazanın veya ramak kala olayının hızlı ve detaylı bildirimi."
              },
              {
                step: "2",
                title: "İlk Müdahale",
                description: "Gerekli ilk yardım ve güvenlik önlemlerinin alınması."
              },
              {
                step: "3",
                title: "Kök Neden Analizi",
                description: "Olayın nedenlerinin detaylı analizi ve raporlanması."
              },
              {
                step: "4",
                title: "Önleyici Tedbirler",
                description: "Benzer olayların yaşanmaması için önlemlerin alınması."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "60%",
                label: "Kaza Oranlarında Azalma",
                description: "Sistemimizi kullanan işletmelerde görülen ortalama iyileşme"
              },
              {
                number: "15dk",
                label: "Ortalama Müdahale Süresi",
                description: "Olay bildirimi sonrası hızlı aksiyon alma süresi"
              },
              {
                number: "98%",
                label: "Yasal Uyumluluk",
                description: "SGK ve diğer yasal bildirimlerde uyumluluk oranı"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              İş Kazalarını Önlemek İçin Harekete Geçin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Hemen ücretsiz demo hesabı oluşturun ve olay takip süreçlerinizi dijitalleştirin.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/register"
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition inline-flex items-center gap-2"
              >
                Ücretsiz Deneyin
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 