"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon, Bell, Settings, User, Menu, X, AlertTriangle, Activity, GraduationCap, ClipboardCheck, Siren, ChevronDown, LogOut, UserCircle, FileText, Home, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

const navigationItems = [
  {
    name: "Ana Sayfa",
    href: "/",
    icon: Home
  },
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
  {
    name: "İstatistikler",
    href: "/admin/stats",
    icon: BarChart
  }
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg"
          : "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl transition-all duration-300 shadow-md group-hover:shadow-blue-300/50 dark:group-hover:shadow-blue-500/30">
                <Image
                  src="/logo.svg"
                  alt="İSG Yönetim"
                  fill
                  className={cn(
                    "transition-all duration-300 scale-110",
                    scrolled ? "scale-100" : "scale-110",
                    "group-hover:scale-125"
                  )}
                />
              </div>
              <motion.span
                initial={false}
                animate={{ width: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 overflow-hidden whitespace-nowrap"
              >
                İSG Yönetim
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className={cn(
              "flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-2xl backdrop-blur-sm transition-all duration-300 shadow-lg",
              scrolled ? "shadow-sm" : "shadow-xl"
            )}>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20 dark:shadow-blue-600/20 scale-105 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md hover:scale-105"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-blue-500 dark:text-blue-400")} />
                    {item.name}
                  </Link>
                )
              })}

              {isAdmin && (
                <div className="relative admin-menu">
                  <button
                    onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                      pathname.startsWith('/admin')
                        ? "text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-md shadow-purple-500/20 dark:shadow-purple-600/20 scale-105 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md hover:scale-105"
                    )}
                  >
                    <Settings className={cn("w-4 h-4", pathname.startsWith('/admin') ? "text-white" : "text-purple-500 dark:text-purple-400")} />
                    Yönetim
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isAdminMenuOpen && "transform rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isAdminMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-10 border border-gray-100 dark:border-gray-700"
                      >
                        {adminItems.map((item) => {
                          const isActive = pathname.startsWith(item.href)
                          const Icon = item.icon

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 mx-2 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg",
                                isActive
                                  ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-600 dark:text-purple-400 font-medium"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              )}
                            >
                              <Icon className={cn("w-4 h-4", isActive ? "text-purple-500" : "text-gray-500 dark:text-gray-400")} />
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
          <div className="hidden md:flex items-center space-x-3">
            <button className="relative p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-md">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md transform -translate-y-1 translate-x-1">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* User Menu */}
            <div className="relative user-menu">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex items-center justify-center">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
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
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-10 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex items-center justify-center">
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt={session.user.name || "User"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{session?.user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session?.user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                      >
                        <UserCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        Profil
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        Ayarlar
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1 px-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıkış Yap
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:shadow-md"
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
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 dark:shadow-blue-600/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-blue-500 dark:text-blue-400")} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}

              {isAdmin && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                    <div className="px-4 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20 dark:shadow-purple-600/20"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-purple-500 dark:text-purple-400")} />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                <div className="px-4 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hesap
                </div>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl">
                  <Bell className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium">Bildirimler</span>
                  {notifications > 0 && (
                    <span className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                      {notifications}
                    </span>
                  )}
                </button>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                >
                  <UserCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium">Profil</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                >
                  <Settings className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium">Ayarlar</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 