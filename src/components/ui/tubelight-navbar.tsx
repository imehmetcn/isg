"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon, Bell, Settings, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    name: "Risk Değerlendirme",
    href: "/features/risk-degerlendirme",
  },
  {
    name: "Olay Takibi",
    href: "/features/olay-takibi",
  },
  {
    name: "Eğitim Yönetimi",
    href: "/features/egitim-yonetimi",
  },
  {
    name: "Denetim ve Kontrol",
    href: "/features/denetim-ve-kontrol",
  },
  {
    name: "Acil Durum",
    href: "/features/acil-durum-ve-eylem-plani",
  },
]

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications] = useState(3)
  const { scrolled, scrollDirection } = useScroll(10)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={scrollDirection === "down" && scrolled ? "hidden" : "visible"}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-white dark:bg-gray-950 border-b border-transparent",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="İSG Yönetim"
                  fill
                  className={cn(
                    "transition-transform duration-200",
                    scrolled ? "scale-90" : "scale-100"
                  )}
                />
              </div>
              <motion.span
                initial={false}
                animate={{ width: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold text-gray-900 dark:text-gray-100 overflow-hidden whitespace-nowrap"
              >
                İSG Yönetim
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center -space-x-3">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500"
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="w-5 h-5" />
            </button>
            <Link
              href="/risk-assessment"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-blue-600 text-white shadow hover:bg-blue-500 h-9 px-4"
            >
              Hemen Başla
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950"
          >
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
              <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                <Bell className="w-5 h-5" />
                <span>Bildirimler</span>
                {notifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                <Settings className="w-5 h-5" />
                <span>Ayarlar</span>
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 