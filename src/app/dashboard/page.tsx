"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState, memo, Suspense } from "react";
import { Activity, Users, FileText, Calendar } from "lucide-react";
import dynamic from "next/dynamic";

// Memoize edilmiş bileşenler
const StatCard = memo(({ title, value, description, icon: Icon }: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </CardContent>
  </Card>
));

// Dinamik olarak yüklenen bileşenler
const ActivityList = dynamic(() => import('@/components/dashboard/activity-list'), {
  loading: () => <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
    ))}
  </div>,
  ssr: false
});

const TrainingList = dynamic(() => import('@/components/dashboard/training-list'), {
  loading: () => <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
    ))}
  </div>,
  ssr: false
});

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // TODO: API'den istatistikleri çek
    // Şimdilik örnek veriler
    const fetchStats = async () => {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setStats({
        totalUsers: 25,
        totalDocuments: 150,
        upcomingTrainings: 3,
        activeInspections: 5,
      });
      
      setIsLoaded(true);
    };
    
    fetchStats();
  }, []);

  const statItems = [
    { title: "Toplam Kullanıcı", value: stats.totalUsers, description: "Sistemde kayıtlı kullanıcı", icon: Users },
    { title: "Dokümanlar", value: stats.totalDocuments, description: "Toplam doküman sayısı", icon: FileText },
    { title: "Yaklaşan Eğitimler", value: stats.upcomingTrainings, description: "Önümüzdeki 30 gün içinde", icon: Calendar },
    { title: "Aktif Denetimler", value: stats.activeInspections, description: "Devam eden denetim sayısı", icon: Activity },
  ];

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
        {statItems.map((item, index) => (
          <StatCard 
            key={index}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>

      {isLoaded && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                  ))}
                </div>
              }>
                <ActivityList />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Yaklaşan Eğitimler</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                  ))}
                </div>
              }>
                <TrainingList />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 