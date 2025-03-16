"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon, Bell, Settings, User, Menu, X, AlertTriangle, Activity, GraduationCap, ClipboardCheck, Siren, ChevronDown, LogOut, UserCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

const navigationItems = [
  {
    name: "Risk Değerlendirme",
    href: "/risk-degerlendirme",
    icon: AlertTriangle
  },
  {
    name: "Olay Takibi",
    href: "/features/olay-takibi",
    icon: Activity
  },
  {
    name: "Eğitim Yönetimi",
    href: "/features/egitim-yonetimi",
    icon: GraduationCap
  },
  {
    name: "Denetim ve Kontrol",
    href: "/features/denetim-ve-kontrol",
    icon: ClipboardCheck
  },
  {
    name: "Acil Durum",
    href: "/features/acil-durum-ve-eylem-plani",
    icon: Siren
  },
]

const adminItems = [
  {
    name: "Kullanıcılar",
    href: "/admin/users",
    icon: User
  },
  {
    name: "Şirketler",
    href: "/admin/companies",
    icon: FileText
  },
]

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const [notifications] = useState(3)
  const { scrolled, scrollDirection } = useScroll(10)
  const pathname = usePathname()
  const { data: session } = useSession()

  const isAdmin = session?.user?.role === "ADMIN"

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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen || isAdminMenuOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('.user-menu') && !target.closest('.admin-menu')) {
          setIsUserMenuOpen(false)
          setIsAdminMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen, isAdminMenuOpen])

  // Close menus when navigating
  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
    setIsAdminMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

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
            <div className={cn(
              "flex items-center space-x-1 bg-gray-100/50 dark:bg-gray-900/50 px-3 py-1.5 rounded-full",
              scrolled ? "bg-gray-100/50 dark:bg-gray-900/50" : "bg-gray-100 dark:bg-gray-900"
            )}>
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2",
                      isActive
                        ? "text-blue-600 dark:text-blue-500 bg-white dark:bg-gray-800 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-white/50 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}

              {isAdmin && (
                <div className="relative admin-menu">
                  <button
                    onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2",
                      pathname.startsWith('/admin')
                        ? "text-blue-600 dark:text-blue-500 bg-white dark:bg-gray-800 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-white/50 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <Settings className="w-4 h-4" />
                    Yönetim
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isAdminMenuOpen && "transform rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isAdminMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-1 z-10"
                      >
                        {adminItems.map((item) => {
                          const isActive = pathname.startsWith(item.href)
                          const Icon = item.icon

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200",
                                isActive
                                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500"
                                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {item.name}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
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
            
            {/* User Menu */}
            <div className="relative user-menu">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                {session?.user?.name && (
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {session.user.name}
                  </span>
                )}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isUserMenuOpen && "transform rotate-180")} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-1 z-10"
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{session?.user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session?.user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <UserCircle className="w-4 h-4" />
                      Profil
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <Settings className="w-4 h-4" />
                      Ayarlar
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon

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
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {isAdmin && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Yönetim
                  </div>
                  {adminItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const Icon = item.icon

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
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </>
              )}

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
              <Link
                href="/profile"
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
              >
                <UserCircle className="w-5 h-5" />
                <span>Profil</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
              >
                <Settings className="w-5 h-5" />
                <span>Ayarlar</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 