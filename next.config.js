/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // SWC minifier kullanarak daha hızlı build
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
    formats: ['image/avif', 'image/webp'], // Modern resim formatlarını kullan
  },
  experimental: {
    // optimizeCss: true, // CSS optimizasyonu - build hatası veriyor
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast'
    ], // Paket optimizasyonu
    scrollRestoration: true, // Sayfa geçişlerinde scroll pozisyonunu koru
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Üretim ortamında console.log'ları kaldır
  },
  poweredByHeader: false, // X-Powered-By header'ı kaldır
  // Tek kullanıcılı sistem için optimizasyonlar
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Bundle boyutunu küçült
  webpack: (config, { dev, isServer }) => {
    // Production build optimizasyonları
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig 