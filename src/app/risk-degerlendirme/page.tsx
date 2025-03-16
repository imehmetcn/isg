"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiskDegerlendirmePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const riskDegerlendirmeleri = [
    {
      id: 1,
      baslik: "2024 Q1 Risk Değerlendirmesi",
      tarih: "2024-01-15",
      durum: "Tamamlandı",
      riskSayisi: 12,
      onlemSayisi: 8,
    },
    {
      id: 2,
      baslik: "Üretim Hattı Risk Analizi",
      tarih: "2024-02-20",
      durum: "Devam Ediyor",
      riskSayisi: 8,
      onlemSayisi: 3,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Risk Değerlendirme</h1>
          <p className="text-muted-foreground">
            Risk değerlendirmelerini görüntüleyin ve yönetin
          </p>
        </div>
        <Button onClick={() => router.push("/risk-degerlendirme/yeni")}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Değerlendirme
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Toplam Risk</CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">
              Tespit edilen toplam risk sayısı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Alınan Önlemler</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">
              Tamamlanan önlem sayısı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Değerlendirmeler</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Toplam değerlendirme sayısı
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Değerlendirmeleri</CardTitle>
          <CardDescription>
            Tüm risk değerlendirmelerinizi görüntüleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {riskDegerlendirmeleri.map((risk) => (
              <div
                key={risk.id}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-accent/50 px-4 rounded-lg"
                onClick={() => router.push(`/risk-degerlendirme/${risk.id}`)}
              >
                <div className="space-y-1">
                  <p className="font-medium">{risk.baslik}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Tarih: {risk.tarih}</span>
                    <span>Durum: {risk.durum}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="font-medium">{risk.riskSayisi}</p>
                    <p className="text-muted-foreground">Risk</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{risk.onlemSayisi}</p>
                    <p className="text-muted-foreground">Önlem</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 