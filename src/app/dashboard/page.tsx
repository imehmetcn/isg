"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Users, FileText, AlertTriangle, Clock, ChevronRight, BarChart3, Calendar, Bell } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface DashboardStats {
  activeCompanies: number;
  pendingTasks: number;
  riskAssessments: number;
  totalDocuments: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    activeCompanies: 0,
    pendingTasks: 0,
    riskAssessments: 0,
    totalDocuments: 0,
  });
  
  const [loading, setLoading] = useState(true);

  // Animasyon için sayıları kademeli olarak artır
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setStats({
        activeCompanies: 12,
        pendingTasks: 28,
        riskAssessments: 45,
        totalDocuments: 342,
      });
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Hoş Geldiniz, {session?.user?.name?.split(' ')[0] || 'Kullanıcı'}
              </h1>
              <p className="mt-1 text-blue-100">
                {currentDate}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <Calendar className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
                <BarChart3 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <p className="max-w-2xl text-blue-100 mt-2">
            İSG süreçlerinizi takip edin ve yönetin. Bugün 3 görev bekliyor ve 2 risk değerlendirmesi yaklaşıyor.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Aktif Firmalar" 
          value={stats.activeCompanies} 
          icon={<Users className="h-6 w-6 text-white" />}
          color="from-emerald-400 to-teal-500"
          loading={loading}
        />
        <StatCard 
          title="Bekleyen Görevler" 
          value={stats.pendingTasks} 
          icon={<Clock className="h-6 w-6 text-white" />}
          color="from-rose-400 to-pink-500"
          loading={loading}
        />
        <StatCard 
          title="Risk Değerlendirmeleri" 
          value={stats.riskAssessments} 
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="from-amber-400 to-orange-500"
          loading={loading}
        />
        <StatCard 
          title="Toplam Belgeler" 
          value={stats.totalDocuments} 
          icon={<FileText className="h-6 w-6 text-white" />}
          color="from-blue-400 to-indigo-500"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow border-0 overflow-hidden">
          <CardHeader className="pb-2 border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center">
                <Clock className="h-5 w-5 mr-2 text-rose-500" />
                Bekleyen Görevler
              </CardTitle>
              <Link href="/tasks" className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center group">
                Tümünü Gör
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <TaskItem 
                title="ABC Ltd. Risk Değerlendirmesi" 
                dueDate="Son 2 gün"
                priority="high"
                progress={75}
              />
              <TaskItem 
                title="XYZ A.Ş. Eğitim Planlaması" 
                dueDate="Son 5 gün"
                priority="medium"
                progress={45}
              />
              <TaskItem 
                title="DEF Corp. Saha Denetimi" 
                dueDate="Son Bugün"
                priority="urgent"
                progress={90}
              />
              <TaskItem 
                title="GHI Holding Acil Durum Planı" 
                dueDate="Son 1 hafta"
                priority="low"
                progress={20}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-md hover:shadow-lg transition-shadow border-0 overflow-hidden">
          <CardHeader className="pb-2 border-b bg-gray-50/50">
            <CardTitle className="text-lg font-bold flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-500" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <ActivityItem 
                title="Risk değerlendirmesi tamamlandı" 
                description="ABC Ltd. için risk değerlendirmesi tamamlandı"
                time="10 dakika önce"
                icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
              />
              <ActivityItem 
                title="Yeni belge yüklendi" 
                description="XYZ A.Ş. için yeni belge yüklendi"
                time="1 saat önce"
                icon={<FileText className="h-4 w-4 text-blue-500" />}
              />
              <ActivityItem 
                title="Yeni firma eklendi" 
                description="DEF Corp. sisteme eklendi"
                time="3 saat önce"
                icon={<Users className="h-4 w-4 text-emerald-500" />}
              />
              <ActivityItem 
                title="Eğitim planlandı" 
                description="GHI Holding için eğitim planlandı"
                time="5 saat önce"
                icon={<Calendar className="h-4 w-4 text-indigo-500" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color, loading }: { 
  title: string; 
  value: number; 
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className={`bg-gradient-to-r ${color} p-4 text-white`}>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-white/90">{title}</p>
              <div className="bg-white/20 p-2 rounded-lg">
                {icon}
              </div>
            </div>
            <p className="text-3xl font-bold mt-2">
              {loading ? (
                <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
              ) : (
                value
              )}
            </p>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-emerald-500 font-medium">↑ 12%</span>
              <span className="ml-2">son 30 günden</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Task Item Component
function TaskItem({ title, dueDate, priority, progress }: { 
  title: string; 
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
}) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-rose-100 text-rose-800",
    urgent: "bg-red-100 text-red-800",
  };

  const progressColors = {
    low: "bg-blue-500",
    medium: "bg-amber-500",
    high: "bg-rose-500",
    urgent: "bg-red-500",
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-10 rounded-full ${
            priority === 'urgent' ? 'bg-red-500' : 
            priority === 'high' ? 'bg-rose-500' : 
            priority === 'medium' ? 'bg-amber-500' : 
            'bg-blue-500'
          }`} />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
            {dueDate}
          </span>
        </div>
      </div>
      <div className="pl-5">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>İlerleme</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" indicatorClassName={progressColors[priority]} />
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ title, description, time, icon }: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
} 