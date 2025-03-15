"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Activity, Users, FileText, Calendar } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalDocuments: number;
  upcomingTrainings: number;
  activeInspections: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDocuments: 0,
    upcomingTrainings: 0,
    activeInspections: 0,
  });

  useEffect(() => {
    // TODO: API'den istatistikleri çek
    // Şimdilik örnek veriler
    setStats({
      totalUsers: 25,
      totalDocuments: 150,
      upcomingTrainings: 3,
      activeInspections: 5,
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">
          Kontrol Paneli
        </h1>
        <p className="text-muted-foreground">
          İSG Yönetim Sistemi istatistikleri ve özet bilgiler
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Sistemde kayıtlı kullanıcı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokümanlar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Toplam doküman sayısı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yaklaşan Eğitimler</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingTrainings}</div>
            <p className="text-xs text-muted-foreground">
              Önümüzdeki 30 gün içinde
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Denetimler</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeInspections}</div>
            <p className="text-xs text-muted-foreground">
              Devam eden denetim sayısı
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* TODO: Aktivite listesi eklenecek */}
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Yeni doküman yüklendi</p>
                  <p className="text-xs text-muted-foreground">2 saat önce</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Denetim raporu oluşturuldu</p>
                  <p className="text-xs text-muted-foreground">5 saat önce</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Yeni kullanıcı eklendi</p>
                  <p className="text-xs text-muted-foreground">1 gün önce</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Yaklaşan Eğitimler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* TODO: Eğitim listesi eklenecek */}
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">İş Güvenliği Temel Eğitimi</p>
                  <p className="text-xs text-muted-foreground">15 Nisan 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">İlk Yardım Eğitimi</p>
                  <p className="text-xs text-muted-foreground">20 Nisan 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Yangın Güvenliği</p>
                  <p className="text-xs text-muted-foreground">25 Nisan 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 