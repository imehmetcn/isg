'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold">
                İSG
              </div>
              <span className="font-bold text-lg text-gray-900">İSG Yönetim</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              İş Sağlığı ve Güvenliği süreçlerinizi dijital ortamda yönetmenizi sağlayan modern bir platform.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Firmalar
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Belgeler
                </Link>
              </li>
              <li>
                <Link href="/risk-assessments" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Risk Değerlendirmeleri
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Takvim
                </Link>
              </li>
            </ul>
          </div>

          {/* Destek */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Destek
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-sm text-gray-600">
                  Atatürk Mah. Ataşehir Bulvarı No: 123 Ataşehir, İstanbul
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="ml-3 text-sm text-gray-600">
                  +90 (212) 123 45 67
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="ml-3 text-sm text-gray-600">
                  info@isgyonetim.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="py-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} İSG Yönetim. Tüm hakları saklıdır.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <a href="https://github.com/imehmetcn/isg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors flex items-center">
              <Github className="h-4 w-4 mr-1" />
              <span className="text-xs">GitHub</span>
            </a>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-xs text-gray-500">
              <span className="font-medium">v1.0.0</span> - Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 