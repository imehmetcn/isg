import React from 'react';

interface Activity {
  id: string;
  title: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Yeni doküman yüklendi',
    time: '2 saat önce'
  },
  {
    id: '2',
    title: 'Denetim raporu oluşturuldu',
    time: '5 saat önce'
  },
  {
    id: '3',
    title: 'Yeni kullanıcı eklendi',
    time: '1 gün önce'
  }
];

export default function ActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 