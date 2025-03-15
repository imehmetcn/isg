'use client'

import { motion } from "framer-motion"
import { ClipboardCheck, ArrowRight, CheckSquare, Camera, Bell, FileText, BarChart2, Calendar } from "lucide-react"
import Link from "next/link"

export default function DenetimVeKontrol() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-purple-600 mb-6"
            >
              <ClipboardCheck className="w-6 h-6" />
              <span className="font-semibold">Denetim ve Kontrol</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Saha Denetimleri ve Ekipman Kontrolleri
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              İş güvenliği denetimlerini ve periyodik kontrolleri dijital ortamda yönetin, raporlayın ve takip edin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link 
                href="/risk-assessment"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Hemen Başla
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition"
              >
                Daha Fazla Bilgi
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
                icon: <CheckSquare className="w-8 h-8 text-purple-600" />,
                title: "Dijital Kontrol Formları",
                description: "Özelleştirilebilir dijital kontrol listeleri ve denetim formları."
              },
              {
                icon: <Calendar className="w-8 h-8 text-purple-600" />,
                title: "Periyodik Kontrol Takibi",
                description: "Ekipman ve makine kontrollerinin otomatik takibi ve hatırlatmaları."
              },
              {
                icon: <Camera className="w-8 h-8 text-purple-600" />,
                title: "Fotoğraflı Raporlama",
                description: "Saha denetimlerinde fotoğraf ekleme ve görsel dokümantasyon."
              },
              {
                icon: <Bell className="w-8 h-8 text-purple-600" />,
                title: "Uygunsuzluk Bildirimi",
                description: "Anlık uygunsuzluk bildirimi ve aksiyon takibi."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-purple-600" />,
                title: "Analiz ve Raporlama",
                description: "Detaylı denetim analizleri ve trend raporları."
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
            Denetim ve Kontrol Süreci
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Denetim Planı",
                description: "Periyodik denetim ve kontrol planlarının oluşturulması."
              },
              {
                step: "2",
                title: "Saha Denetimi",
                description: "Mobil uygulama ile sahada denetim ve kontrollerin yapılması."
              },
              {
                step: "3",
                title: "Raporlama",
                description: "Denetim sonuçlarının raporlanması ve dokümantasyonu."
              },
              {
                step: "4",
                title: "Aksiyon Takibi",
                description: "Tespit edilen uygunsuzlukların giderilmesi ve takibi."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
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
                number: "50%",
                label: "Zaman Tasarrufu",
                description: "Dijital denetim sistemi ile sağlanan ortalama zaman tasarrufu"
              },
              {
                number: "98%",
                label: "Uygunluk Oranı",
                description: "Düzenli denetimler sonrası yasal uygunluk oranı"
              },
              {
                number: "40%",
                label: "Maliyet Azalması",
                description: "Önleyici kontroller ile sağlanan maliyet avantajı"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Denetim Süreçlerinizi Dijitalleştirin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Hemen ücretsiz demo hesabı oluşturun ve denetim süreçlerinizi kolaylaştırın.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/register"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition inline-flex items-center gap-2"
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