'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const menuItems = [
  {
    title: 'Ana Sayfa',
    href: '/',
  },
  {
    title: 'Risk Yönetimi',
    href: '#',
    submenu: [
      {
        title: 'Risk Değerlendirmesi',
        href: '/risk-assessment',
      },
      {
        title: 'Risk Matrisi',
        href: '/risk-matrix',
      },
      {
        title: 'Tehlike Kütüphanesi',
        href: '/hazard-library',
      },
    ],
  },
  {
    title: 'Olay Takibi',
    href: '/incident-tracking',
  },
  {
    title: 'Eğitim Yönetimi',
    href: '/training',
  },
  {
    title: 'Denetim ve Kontrol',
    href: '/audit',
  },
  {
    title: 'Acil Durum',
    href: '/emergency',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">İSG Yönetim</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <div key={item.title} className="relative">
                {item.submenu ? (
                  <div className="relative group">
                    <button
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md
                        ${isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.href}
                            className={`block px-4 py-2 text-sm ${
                              isActive(subitem.href)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    {item.title}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transform transition-transform ${
                        activeSubmenu === item.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: activeSubmenu === item.title ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className={`block px-3 py-2 text-sm font-medium rounded-md ${
                            isActive(subitem.href)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}; 