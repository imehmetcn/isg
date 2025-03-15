"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon, Bell, Settings, User, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications] = useState(3) // Örnek bildirim sayısı

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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="İSG Yönetim" width={32} height={32} />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                İSG Yönetim
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-900/50 px-2 py-1.5 rounded-full">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => setActiveTab(item.name)}
                    className={cn(
                      "relative px-4 py-2 rounded-full transition-colors duration-200",
                      "text-sm font-medium",
                      isActive
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500",
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute inset-0 z-0 bg-white dark:bg-gray-800 rounded-full shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
      <motion.div
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-950"
      >
        <div className="px-4 py-2 space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name)
                  setIsMenuOpen(false)
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900",
                )}
              >
                <Icon className="w-5 h-5" />
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
    </nav>
  )
} 