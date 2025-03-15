'use client';

import { Hero } from './Hero';
import { Stats } from './Stats';

export function HomeContent() {
  return (
    <main className="flex-auto">
      <Hero />
      <Stats />
    </main>
  );
} 