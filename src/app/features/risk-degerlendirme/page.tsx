'use client'

import { motion } from "framer-motion"
import { Shield, CheckCircle, ArrowRight, AlertTriangle, FileText, Users } from "lucide-react"
import Link from "next/link"

export default function RiskDegerlendirme() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-blue-600 mb-6"
            >
              <Shield className="w-6 h-6" />
              <span className="font-semibold">Risk Değerlendirme</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Kapsamlı Risk Analizi ve Tehlike Belirleme Sistemi
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              İşyeri güvenliğini en üst seviyeye çıkarmak için gelişmiş risk değerlendirme araçları ve metodolojileri.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link 
                href="/demo"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                Demo İncele
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition"
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
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "5x5 Matris ve Fine-Kinney",
                description: "Farklı risk değerlendirme metodolojileri ile kapsamlı analizler yapın."
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
                title: "Risk Skorlama",
                description: "Özelleştirilebilir risk skorlama sistemi ile tehlikeleri önceliklendirin."
              },
              {
                icon: <FileText className="w-8 h-8 text-green-600" />,
                title: "Otomatik Raporlama",
                description: "Detaylı ve profesyonel risk değerlendirme raporları oluşturun."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Ekip Yönetimi",
                description: "Risk değerlendirme ekiplerini oluşturun ve görevlendirmeleri yönetin."
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
                title: "DÖF Takibi",
                description: "Düzeltici ve önleyici faaliyetleri planlayın ve takip edin."
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
            Risk Değerlendirme Süreci
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Tehlike Tanımlama",
                description: "İşyerindeki potansiyel tehlikeleri belirleyin ve kategorize edin."
              },
              {
                step: "2",
                title: "Risk Analizi",
                description: "Belirlenen tehlikelerin olasılık ve şiddet değerlerini hesaplayın."
              },
              {
                step: "3",
                title: "Önlem Belirleme",
                description: "Risk skorlarına göre alınması gereken önlemleri planlayın."
              },
              {
                step: "4",
                title: "Uygulama ve Takip",
                description: "Belirlenen önlemleri uygulayın ve etkinliğini takip edin."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Risk Değerlendirme Sürecinizi Dijitalleştirin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Hemen ücretsiz demo hesabı oluşturun ve risk değerlendirme süreçlerinizi kolaylaştırın.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
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