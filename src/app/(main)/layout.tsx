import React from "react";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded mr-2">
                <span className="font-bold">İSG</span>
              </div>
              <span className="font-medium text-blue-500">Platform</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 mx-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-500 font-medium">
              Anasayfa
            </Link>
            <Link href="/dashboard" className="text-blue-500 border-b-2 border-blue-500 font-medium">
              Dashboard
            </Link>
            <Link href="/isg-yonetimi" className="text-gray-700 hover:text-blue-500 font-medium">
              İSG Yönetimi
            </Link>
            <Link href="/kayitlar" className="text-gray-700 hover:text-blue-500 font-medium">
              Kayıtlar
            </Link>
            <Link href="/raporlar" className="text-gray-700 hover:text-blue-500 font-medium">
              Raporlar
            </Link>
            <Link href="/ayarlar" className="text-gray-700 hover:text-blue-500 font-medium">
              Ayarlar
            </Link>
          </nav>
          
          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </header>
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20 pb-16">
        {children}
      </main>
    </>
  );
} 