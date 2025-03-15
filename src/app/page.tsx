import type { Metadata } from "next"
import { HomeContent } from "@/components/home/HomeContent"

export const metadata: Metadata = {
  title: "İSG Yönetim Sistemi",
  description: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
}

export default function Home() {
  return <HomeContent />
} 