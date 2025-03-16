"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Shield, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Risk {
  id: string;
  tehlike: string;
  risk: string;
  onlem: string;
  seviye: string;
}

interface RiskDegerlendirme {
  id: string;
  baslik: string;
  tarih: string;
  aciklama: string | null;
  riskler: Risk[];
  createdAt: string;
}

export default function RiskDegerlendirmeDetayPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RiskDegerlendirme | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/risk-degerlendirme/${params.id}`);
        if (!response.ok) {
          throw new Error("Veri getirilemedi");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!data) {
    return <div>Risk değerlendirme bulunamadı.</div>;
  }

  const getSeverityColor = (seviye: string) => {
    switch (seviye) {
      case "dusuk":
        return "bg-green-500";
      case "orta":
        return "bg-yellow-500";
      case "yuksek":
        return "bg-orange-500";
      case "kritik":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{data.baslik}</h1>
          <p className="text-muted-foreground">
            Risk değerlendirmesi detayları
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam Risk
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.riskler.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kritik Riskler
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.riskler.filter((r) => r.seviye === "kritik").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Önlem Sayısı
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.riskler.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Değerlendirme Tarihi
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(data.tarih)}</div>
          </CardContent>
        </Card>
      </div>

      {data.aciklama && (
        <Card>
          <CardHeader>
            <CardTitle>Açıklama</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.aciklama}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Riskler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.riskler.map((risk) => (
            <div
              key={risk.id}
              className="space-y-4 p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{risk.tehlike}</h3>
                <Badge className={getSeverityColor(risk.seviye)}>
                  {risk.seviye.charAt(0).toUpperCase() + risk.seviye.slice(1)}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Risk</h4>
                  <p className="text-muted-foreground">{risk.risk}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Önlem</h4>
                  <p className="text-muted-foreground">{risk.onlem}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 