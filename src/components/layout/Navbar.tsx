"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  Home, 
  Users, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Firmalar", href: "/companies", icon: Users },
  { name: "Belgeler", href: "/documents", icon: FileText },
  { name: "Risk Değerlendirmeleri", href: "/risk-assessments", icon: AlertTriangle },
  { name: "Takvim", href: "/calendar", icon: Calendar },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll olduğunda navbar'ın görünümünü değiştir
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

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-white"
      )}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo ve Mobil Menü Butonu */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold">
                  İSG
                </div>
                <span className="font-bold text-lg text-gray-900">İSG Yönetim</span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors",
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn("mr-2 h-4 w-4", isActive ? "text-blue-600" : "text-gray-500")} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Arama, Bildirimler ve Profil */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ara..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="relative p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative ml-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">
                    {session?.user?.name || "Kullanıcı"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {session?.user?.email || "kullanici@example.com"}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Kullanıcı"} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {session?.user?.name?.charAt(0) || "K"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Ayarlar
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center",
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Kullanıcı"} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {session?.user?.name?.charAt(0) || "K"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {session?.user?.name || "Kullanıcı"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {session?.user?.email || "kullanici@example.com"}
                  </div>
                </div>
                <button className="ml-auto p-1 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profil
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Ayarlar
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
