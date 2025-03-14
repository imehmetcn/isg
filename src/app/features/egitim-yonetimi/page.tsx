'use client'

import { motion } from "framer-motion"
import { GraduationCap, ArrowRight, Calendar, Award, Users, BookOpen, CheckCircle, BarChart2 } from "lucide-react"
import Link from "next/link"

export default function EgitimYonetimi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600 mb-6"
            >
              <GraduationCap className="w-6 h-6" />
              <span className="font-semibold">Eğitim Yönetimi</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Çalışan Eğitimlerinin Dijital Yönetimi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              İSG eğitimlerini planlamak, yönetmek ve takip etmek için kapsamlı dijital platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link 
                href="/demo"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                Demo İncele
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition"
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
                icon: <BookOpen className="w-8 h-8 text-green-600" />,
                title: "Online Eğitim İçerikleri",
                description: "Zengin içerikli eğitim materyalleri ve interaktif öğrenme deneyimi."
              },
              {
                icon: <Award className="w-8 h-8 text-green-600" />,
                title: "Sertifika Yönetimi",
                description: "Otomatik sertifika oluşturma ve yetkinlik takip sistemi."
              },
              {
                icon: <Calendar className="w-8 h-8 text-green-600" />,
                title: "Eğitim Takvimi",
                description: "Eğitim planlaması ve otomatik hatırlatma sistemi."
              },
              {
                icon: <Users className="w-8 h-8 text-green-600" />,
                title: "Katılım Takibi",
                description: "Eğitim katılım ve başarı durumu takibi."
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-green-600" />,
                title: "Performans Analizi",
                description: "Detaylı raporlar ve eğitim etkinliği analizi."
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
            Eğitim Yönetim Süreci
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "İhtiyaç Analizi",
                description: "Çalışanların eğitim ihtiyaçlarının belirlenmesi ve planlanması."
              },
              {
                step: "2",
                title: "Eğitim Planı",
                description: "Yıllık eğitim planının oluşturulması ve takvimlendirilmesi."
              },
              {
                step: "3",
                title: "Eğitim Uygulaması",
                description: "Online veya yüz yüze eğitimlerin gerçekleştirilmesi."
              },
              {
                step: "4",
                title: "Değerlendirme",
                description: "Eğitim etkinliğinin ölçülmesi ve raporlanması."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
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
                number: "10,000+",
                label: "Tamamlanan Eğitim",
                description: "Platformumuz üzerinden verilen toplam eğitim sayısı"
              },
              {
                number: "95%",
                label: "Memnuniyet Oranı",
                description: "Eğitim alan çalışanların memnuniyet oranı"
              },
              {
                number: "30%",
                label: "Verimlilik Artışı",
                description: "Eğitimler sonrası gözlemlenen ortalama verimlilik artışı"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Eğitim Süreçlerinizi Dijitalleştirin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Hemen ücretsiz demo hesabı oluşturun ve eğitim yönetim süreçlerinizi kolaylaştırın.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/register"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition inline-flex items-center gap-2"
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