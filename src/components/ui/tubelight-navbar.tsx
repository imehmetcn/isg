"use client"

import React, { useState, memo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, Sun, Moon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"

// Logo bileşenini memoize et
const Logo = memo(() => (
  <Link href="/" className="flex items-center group">
    <motion.div
      whileHover={{ rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src="/logo.svg"
        alt="İSG Yönetim"
        width={36}
        height={36}
        className="mr-2"
        priority
      />
    </motion.div>
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500"
    >
      İSG Yönetim
    </motion.span>
  </Link>
));

// Navbar menü öğeleri
const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Dokümanlar", href: "/documents" },
  { 
    name: "Modüller", 
    href: "#",
    submenu: [
      { name: "Risk Değerlendirme", href: "/risk-degerlendirme" },
      { name: "Eğitim Yönetimi", href: "/egitim-yonetimi" },
      { name: "Denetim ve Kontrol", href: "/denetim-ve-kontrol" },
      { name: "Acil Durum", href: "/emergency-plan" },
    ]
  },
];

// Tema değiştirme butonu
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      aria-label="Tema değiştir"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

// UserMenu bileşeni
const UserMenu = memo(({ session, isUserMenuOpen, setIsUserMenuOpen }: {
  session: any;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (value: boolean) => void;
}) => {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
          {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
        </div>
        <span className="text-sm font-medium hidden sm:block">{session?.user?.name || 'Kullanıcı'}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white/80 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
            </div>
            
            <div className="py-1">
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Profil
              </Link>
              
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin/users"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Yönetim
                </Link>
              )}
            </div>
            
            <div className="py-1 border-t border-gray-100">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Dropdown menü bileşeni
const DropdownMenu = ({ item, isOpen, setIsOpen, isMobile = false }: {
  item: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isMobile?: boolean;
}) => {
  const pathname = usePathname();
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          isMobile 
            ? "flex w-full items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            : "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
        )}
      >
        {item.name}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isMobile ? 'ml-auto' : 'ml-1'}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "z-50 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-gray-100 overflow-hidden",
              isMobile ? "mt-1 w-full" : "absolute left-0 mt-1 w-48"
            )}
          >
            <div className="py-1">
              {item.submenu.map((subitem: any) => {
                const isActive = pathname === subitem.href || pathname.startsWith(subitem.href);
                return (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    className={cn(
                      "block px-4 py-2 text-sm",
                      isActive 
                        ? "bg-blue-50 text-blue-600 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {subitem.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavBar = memo(function NavBar({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown menüyü aç/kapat
  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  // Tıklama olaylarını dinle (dropdown dışına tıklandığında kapat)
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
      setIsUserMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Dropdown ve kullanıcı menüsü için tıklama olaylarını durdur
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-white",
        className
      )}
      onClick={handleMenuClick}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
            
            <div className="hidden md:flex md:ml-8 space-x-1">
              {menuItems.map((item) => {
                if (item.submenu) {
                  return (
                    <DropdownMenu
                      key={item.name}
                      item={item}
                      isOpen={openDropdown === item.name}
                      setIsOpen={() => toggleDropdown(item.name)}
                    />
                  );
                }
                
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <div className="hidden md:block">
              <UserMenu 
                session={session} 
                isUserMenuOpen={isUserMenuOpen} 
                setIsUserMenuOpen={setIsUserMenuOpen} 
              />
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => {
                if (item.submenu) {
                  return (
                    <DropdownMenu
                      key={item.name}
                      item={item}
                      isOpen={openDropdown === item.name}
                      setIsOpen={() => toggleDropdown(item.name)}
                      isMobile={true}
                    />
                  );
                }
                
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-2 text-base font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-600 rounded-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-6 w-6" />}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                
                {session?.user?.role === "ADMIN" && (
                  <Link
                    href="/admin/users"
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Yönetim
                  </Link>
                )}
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}); 