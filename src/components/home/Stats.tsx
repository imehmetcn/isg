'use client';

import { motion } from 'framer-motion';

export const Stats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <dt className="text-4xl font-bold tracking-tight text-blue-600">1000+</dt>
          <dd className="mt-2 text-sm leading-6 text-gray-600">Aktif Kullanıcı</dd>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <dt className="text-4xl font-bold tracking-tight text-blue-600">5000+</dt>
          <dd className="mt-2 text-sm leading-6 text-gray-600">Tamamlanan Risk</dd>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <dt className="text-4xl font-bold tracking-tight text-blue-600">10000+</dt>
          <dd className="mt-2 text-sm leading-6 text-gray-600">Düzenlenen Eğitim</dd>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <dt className="text-4xl font-bold tracking-tight text-blue-600">%98</dt>
          <dd className="mt-2 text-sm leading-6 text-gray-600">Müşteri Memnuniyeti</dd>
        </div>
      </dl>
    </motion.div>
  );
}; 