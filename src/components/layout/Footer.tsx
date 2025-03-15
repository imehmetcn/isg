"use client";

import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  hizmetler: [
    { name: "Risk Değerlendirmesi", href: "/risk-assessment" },
    { name: "Olay Takibi", href: "/incident-tracking" },
    { name: "Eğitim Yönetimi", href: "/training" },
    { name: "Denetim ve Kontrol", href: "/audit" },
  ],
  kaynaklar: [
    { name: "Blog", href: "/blog" },
    { name: "Dokümantasyon", href: "/docs" },
    { name: "SSS", href: "/faq" },
    { name: "İletişim", href: "/contact" },
  ],
  yasal: [
    { name: "Gizlilik Politikası", href: "/privacy" },
    { name: "Kullanım Şartları", href: "/terms" },
    { name: "KVKK", href: "/kvkk" },
  ],
};

const contactInfo = {
  email: "info@isgyonetim.com",
  phone: "+90 (555) 123 45 67",
  address: "Ankara, Türkiye",
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link
              href="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-500"
            >
              <Shield className="h-8 w-8" />
              <span className="text-2xl font-bold">İSG Yönetim</span>
            </Link>
            <p className="text-gray-500 text-sm">
              İş sağlığı ve güvenliği yönetimini dijitalleştirerek daha güvenli
              çalışma ortamları oluşturuyoruz.
            </p>
            <div className="flex space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Hizmetler
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.hizmetler.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-500 hover:text-blue-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Kaynaklar
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.kaynaklar.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-500 hover:text-blue-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Yasal
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.yasal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-500 hover:text-blue-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  İletişim
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center text-gray-500 hover:text-blue-600"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{contactInfo.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="flex items-center text-gray-500 hover:text-blue-600"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{contactInfo.phone}</span>
                    </a>
                  </li>
                  <li className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{contactInfo.address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} İSG Yönetim. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 