"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Users, FileText, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Risk Yönetimi",
    description: "Kapsamlı risk değerlendirme ve önleyici tedbirler",
  },
  {
    icon: Users,
    title: "Çalışan Takibi",
    description: "Eğitim, sağlık ve KKD takibi",
  },
  {
    icon: FileText,
    title: "Doküman Yönetimi",
    description: "Tüm İSG dokümanlarınız tek bir yerde",
  },
  {
    icon: Bell,
    title: "Hatırlatmalar",
    description: "Önemli tarihleri ve görevleri kaçırmayın",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-background to-secondary/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            İş Sağlığı ve Güvenliği Yönetim Sistemi
          </h1>
          <p className="text-xl text-muted-foreground">
            İSG süreçlerinizi dijitalleştirin, daha güvenli bir çalışma ortamı oluşturun
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Hemen Başlayın <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Giriş Yap
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Modern ve kullanıcı dostu arayüzümüz ile İSG süreçlerinizi kolayca yönetin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Avantajlarımız
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              İSG yönetimini kolaylaştıran özelliklerimizle tanışın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "7/24 teknik destek",
              "Kolay kullanılabilir arayüz",
              "Otomatik hatırlatmalar",
              "Detaylı raporlama",
              "Mobil uyumlu tasarım",
              "Güvenli veri depolama",
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-card rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-primary-foreground"
        >
          <h2 className="text-3xl font-bold mb-4">
            Hemen Ücretsiz Deneyin
          </h2>
          <p className="text-lg mb-8 opacity-90">
            14 gün ücretsiz deneme süresi ile tüm özelliklere erişin
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              Ücretsiz Başlayın <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
} 