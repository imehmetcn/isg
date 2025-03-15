'use client';

import { motion } from 'framer-motion';

const stats = [
  { id: 1, value: '1000+', label: 'Aktif Kullanıcı' },
  { id: 2, value: '5000+', label: 'Tamamlanan Risk' },
  { id: 3, value: '10000+', label: 'Düzenlenen Eğitim' },
  { id: 4, value: '%98', label: 'Müşteri Memnuniyeti' },
];

export function Stats() {
  return (
    <section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <dt className="text-4xl font-bold tracking-tight text-blue-600">{stat.value}</dt>
              <dd className="mt-2 text-sm leading-6 text-gray-600">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
} 