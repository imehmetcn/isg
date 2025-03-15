import { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';

export const metadata: Metadata = {
  title: 'Ana Sayfa | İSG Yönetim Sistemi',
  description: 'İş Sağlığı ve Güvenliği Yönetim Sistemi - Risk değerlendirmeden eğitim takibine tüm İSG süreçlerinizi tek platformda yönetin.',
};

export default async function Home() {
  return (
    <main className="flex-auto">
      <Hero />
      <Stats />
    </main>
  );
}
