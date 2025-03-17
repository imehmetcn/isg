"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Users, FileText, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  activeCompanies: number;
  pendingTasks: number;
  riskAssessments: number;
  totalDocuments: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    activeCompanies: 12,
    pendingTasks: 28,
    riskAssessments: 45,
    totalDocuments: 342,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          Hoş Geldiniz, {session?.user?.name?.split(' ')[0] || 'Kullanıcı'}
        </h1>
        <p className="text-muted-foreground text-sm">
          İSG süreçlerinizi takip edin ve yönetin
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Aktif Firmalar" 
          value={stats.activeCompanies} 
          icon={<Users className="h-5 w-5 text-emerald-500" />}
        />
        <StatCard 
          title="Bekleyen Görevler" 
          value={stats.pendingTasks} 
          icon={<Clock className="h-5 w-5 text-rose-500" />}
        />
        <StatCard 
          title="Risk Değerlendirmeleri" 
          value={stats.riskAssessments} 
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
        />
        <StatCard 
          title="Toplam Belgeler" 
          value={stats.totalDocuments} 
          icon={<FileText className="h-5 w-5 text-blue-500" />}
        />
      </div>

      {/* Tasks */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Bekleyen Görevler</CardTitle>
            <Link href="/tasks" className="text-xs text-blue-500 hover:underline">Tümünü Gör</Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TaskItem 
              title="ABC Ltd. Risk Değerlendirmesi" 
              dueDate="Son 2 gün"
              priority="high"
            />
            <TaskItem 
              title="XYZ A.Ş. Eğitim Planlaması" 
              dueDate="Son 5 gün"
              priority="medium"
            />
            <TaskItem 
              title="DEF Corp. Saha Denetimi" 
              dueDate="Son Bugün"
              priority="urgent"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon }: { 
  title: string; 
  value: number; 
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Task Item Component
function TaskItem({ title, dueDate, priority }: { 
  title: string; 
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-rose-100 text-rose-800",
    urgent: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          priority === 'urgent' ? 'bg-red-500' : 
          priority === 'high' ? 'bg-rose-500' : 
          priority === 'medium' ? 'bg-amber-500' : 
          'bg-blue-500'
        }`} />
        <span className="font-medium text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {dueDate}
        </span>
      </div>
    </div>
  );
} 