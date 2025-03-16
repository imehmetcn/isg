"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { User, LogOut } from "lucide-react";

export function UserButton() {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
          {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
        </div>
      </button>

      {isUserMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white focus:outline-none z-50 border border-gray-100"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
          </div>
          
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin/users"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Yönetim
            </Link>
          )}
          
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 