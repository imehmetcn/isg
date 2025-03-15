"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav
      className={cn(
        "fixed bottom-0 sm:bottom-auto sm:top-0 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 p-4 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-2 py-2 rounded-full shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative px-3 sm:px-4 py-2 rounded-full transition-colors duration-200",
                "text-sm font-medium",
                isActive
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500",
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{item.name}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 z-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/5 backdrop-blur-sm" />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full opacity-50">
                    <div className="absolute w-12 h-6 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 