"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Calendar, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface StatsItem {
  title: string;
  value: number;
  icon: any;
  color: string;
}

interface StatsSectionProps {
  stats: {
    documents: number;
    users: number;
    trainings: number;
    inspections: number;
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  const statsItems: StatsItem[] = [
    { title: "Toplam Doküman", value: stats.documents, icon: FileText, color: "from-blue-500 to-blue-700" },
    { title: "Kullanıcılar", value: stats.users, icon: Users, color: "from-purple-500 to-purple-700" },
    { title: "Eğitimler", value: stats.trainings, icon: Calendar, color: "from-green-500 to-green-700" },
    { title: "Denetimler", value: stats.inspections, icon: Activity, color: "from-amber-500 to-amber-700" }
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Genel Bakış</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsItems.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
} 