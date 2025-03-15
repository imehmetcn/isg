"use client";

import { Shield, AlertTriangle, BookOpen, ClipboardCheck, Siren, FileWarning } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const menuItems = [
  {
    name: "Ana Sayfa",
    url: "/",
    icon: Shield,
  },
  {
    name: "Risk Yönetimi",
    url: "/risk-assessment",
    icon: AlertTriangle,
  },
  {
    name: "Olay Takibi",
    url: "/incident-tracking",
    icon: Siren,
  },
  {
    name: "Eğitim Yönetimi",
    url: "/training",
    icon: BookOpen,
  },
  {
    name: "Acil Durum Planı",
    url: "/emergency-plan",
    icon: FileWarning,
  },
  {
    name: "Denetim",
    url: "/audit",
    icon: ClipboardCheck,
  },
];

export function Navbar() {
  return (
    <NavBar items={menuItems} className="sm:relative sm:mb-6" />
  );
} 