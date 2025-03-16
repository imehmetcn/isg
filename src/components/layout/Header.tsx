'use client';

import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-lg font-semibold text-gray-800">
              İş Sağlığı ve Güvenliği Yönetim Sistemi
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 relative transition-transform hover:scale-105 active:scale-95"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            </button>

            {/* Settings */}
            <button
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95"
              >
                <div className="bg-gray-200 rounded-full p-1">
                  <User className="h-5 w-5" />
                </div>
                <span className="hidden md:block text-sm font-medium">Kullanıcı Adı</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 