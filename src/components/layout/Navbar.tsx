'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Shield,
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Siren,
} from "lucide-react";

const menuItems = [
  {
    title: "Ana Sayfa",
    href: "/",
    icon: Shield,
  },
  {
    title: "Risk Yönetimi",
    href: "#",
    icon: AlertTriangle,
    submenu: [
      {
        title: "Risk Değerlendirmesi",
        href: "/risk-assessment",
      },
      {
        title: "Risk Matrisi",
        href: "/risk-matrix",
      },
      {
        title: "Tehlike Kütüphanesi",
        href: "/hazard-library",
      },
    ],
  },
  {
    title: "Olay Takibi",
    href: "/incident-tracking",
    icon: Siren,
  },
  {
    title: "Eğitim Yönetimi",
    href: "/training",
    icon: BookOpen,
  },
  {
    title: "Denetim ve Kontrol",
    href: "/audit",
    icon: ClipboardCheck,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center space-x-2 text-blue-600 hover:text-blue-500"
            >
              <Shield className="h-6 w-6" />
              <span className="text-xl font-bold">İSG Yönetim</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <div key={item.title} className="relative">
                {item.submenu ? (
                  <div className="relative group">
                    <button
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${
                          isActive(item.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative bg-white p-2 space-y-1">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.title}
                              href={subitem.href}
                              className={`block px-4 py-2 text-sm rounded-md ${
                                isActive(subitem.href)
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              }`}
                            >
                              {subitem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        isActive(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <div>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(item.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        <span className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transform transition-transform ${
                            activeSubmenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeSubmenu === item.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1"
                          >
                            <div className="pl-6 space-y-1">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.title}
                                  href={subitem.href}
                                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive(subitem.href)
                                      ? "text-blue-600 bg-blue-50"
                                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subitem.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 