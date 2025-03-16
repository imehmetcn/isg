import React from 'react';

interface Training {
  id: string;
  title: string;
  date: string;
}

const trainings: Training[] = [
  {
    id: '1',
    title: 'İş Güvenliği Temel Eğitimi',
    date: '15 Nisan 2024'
  },
  {
    id: '2',
    title: 'İlk Yardım Eğitimi',
    date: '20 Nisan 2024'
  },
  {
    id: '3',
    title: 'Yangın Güvenliği',
    date: '25 Nisan 2024'
  }
];

export default function TrainingList() {
  return (
    <div className="space-y-4">
      {trainings.map((training) => (
        <div key={training.id} className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex-1">
            <p className="text-sm font-medium">{training.title}</p>
            <p className="text-xs text-muted-foreground">{training.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 