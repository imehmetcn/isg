'use client';

import React from 'react';
import { Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-gray-800"
            >
              İş Sağlığı ve Güvenliği Yönetim Sistemi
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
              >
                <div className="bg-gray-200 rounded-full p-1">
                  <User className="h-5 w-5" />
                </div>
                <span className="hidden md:block text-sm font-medium">Kullanıcı Adı</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 