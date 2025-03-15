import type { Metadata } from "next"
import { HomeContent } from "@/components/home/HomeContent"
import { HeroSection } from "@/components/ui/hero-section"

export const metadata: Metadata = {
  title: "İSG Yönetim Sistemi",
  description: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
}

export default function Home() {
  return (
    <HeroSection
      title="İş Sağlığı ve Güvenliği Yönetimi"
      subtitle={{
        regular: "İş güvenliğinizi ",
        gradient: "dijital dünyaya taşıyın",
      }}
      description="İSG Yönetim ile iş sağlığı ve güvenliği süreçlerinizi dijitalleştirin, riskleri önceden tespit edin, çalışanlarınızı koruyun ve yasal yükümlülüklerinizi kolayca yerine getirin."
      ctaText="Hemen Başlayın"
      ctaHref="/features/risk-degerlendirme"
      bottomImage={{
        light: "/dashboard-dark.png",
        dark: "/dashboard-dark.png",
      }}
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#2a2a2a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
} 