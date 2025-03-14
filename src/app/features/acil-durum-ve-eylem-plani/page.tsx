'use client'

import { motion } from "framer-motion"
import { Siren, ArrowRight, Users, Calendar, FileText, Phone, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AcilDurumVeEylemPlani() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-600 mb-6"
            >
              <Siren className="w-6 h-6" />
              <span className="font-semibold">Acil Durum ve Eylem Planı</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Acil Durum Yönetimi ve Müdahale Planlaması
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              Acil durumları etkin bir şekilde yönetin, müdahale planlarınızı hazırlayın ve ekiplerinizi koordine edin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link 
                href="/demo"
                className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                Demo İncele
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg hover:bg-red-50 transition"
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
                icon: <Users className="w-8 h-8 text-red-600" />,
                title: "Ekip Yönetimi",
                description: "Acil durum ekiplerinin oluşturulması ve görev dağılımı."
              },
              {
                icon: <Calendar className="w-8 h-8 text-red-600" />,
                title: "Tatbikat Planlama",
                description: "Periyodik tatbikatların planlanması ve değerlendirilmesi."
              },
              {
                icon: <MapPin className="w-8 h-8 text-red-600" />,
                title: "Tahliye Planları",
                description: "Detaylı tahliye planları ve güzergah belirleme."
              },
              {
                icon: <FileText className="w-8 h-8 text-red-600" />,
                title: "Acil Durum Talimatları",
                description: "Kolay erişilebilir acil durum prosedürleri ve talimatlar."
              },
              {
                icon: <Phone className="w-8 h-8 text-red-600" />,
                title: "İletişim Yönetimi",
                description: "Acil durum iletişim ağı ve bildirim sistemi."
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
            Acil Durum Yönetim Süreci
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Risk Değerlendirmesi",
                description: "Potansiyel acil durumların belirlenmesi ve risk analizi."
              },
              {
                step: "2",
                title: "Plan Hazırlama",
                description: "Detaylı acil durum eylem planlarının oluşturulması."
              },
              {
                step: "3",
                title: "Ekip Eğitimi",
                description: "Acil durum ekiplerinin eğitimi ve tatbikatların yapılması."
              },
              {
                step: "4",
                title: "Sürekli İyileştirme",
                description: "Planların periyodik gözden geçirilmesi ve güncellenmesi."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
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
                number: "5dk",
                label: "Müdahale Süresi",
                description: "Ortalama acil durum müdahale süresi"
              },
              {
                number: "100%",
                label: "Yasal Uyumluluk",
                description: "Acil durum yönetmeliklerine uygunluk oranı"
              },
              {
                number: "4x",
                label: "Daha Hızlı Tahliye",
                description: "Dijital planlar ile tahliye hızında artış"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Acil Durum Yönetiminizi Güçlendirin
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Hemen ücretsiz demo hesabı oluşturun ve acil durum yönetim süreçlerinizi dijitalleştirin.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/register"
                className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2"
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