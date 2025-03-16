/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // SWC minifier kullanarak daha hızlı build
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
    formats: ['image/avif', 'image/webp'], // Modern resim formatlarını kullan
  },
  experimental: {
    optimizeCss: true, // CSS optimizasyonu
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'], // Paket optimizasyonu
    scrollRestoration: true, // Sayfa geçişlerinde scroll pozisyonunu koru
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Üretim ortamında console.log'ları kaldır
  },
  poweredByHeader: false, // X-Powered-By header'ı kaldır
}

module.exports = nextConfig 