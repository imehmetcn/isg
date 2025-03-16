'use client';

import React from 'react';
import { Hazard } from '@/lib/types/risk';
import { PieChart, BarChart, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface RiskDashboardProps {
  selectedHazards: Hazard[];
}

export const RiskDashboard = ({ selectedHazards }: RiskDashboardProps) => {
  const riskLevelCounts = {
    low: selectedHazards.filter(h => h.riskScore === 'low').length,
    medium: selectedHazards.filter(h => h.riskScore === 'medium').length,
    high: selectedHazards.filter(h => h.riskScore === 'high').length,
    critical: selectedHazards.filter(h => h.riskScore === 'critical').length,
  };

  const categoryCounts = selectedHazards.reduce((acc, hazard) => {
    acc[hazard.category] = (acc[hazard.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalHazards = selectedHazards.length;
  const criticalPercentage = (riskLevelCounts.critical / totalHazards) * 100 || 0;
  const controlledHazards = selectedHazards.filter(h => h.controlMeasures.length > 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Risk Seviyesi Dağılımı */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <PieChart className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Risk Dağılımı</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Düşük</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(riskLevelCounts.low / totalHazards) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{riskLevelCounts.low}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Orta</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${(riskLevelCounts.medium / totalHazards) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{riskLevelCounts.medium}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Yüksek</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(riskLevelCounts.high / totalHazards) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{riskLevelCounts.high}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Kritik</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(riskLevelCounts.critical / totalHazards) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{riskLevelCounts.critical}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Dağılımı */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <BarChart className="text-blue-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Kategori Dağılımı</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(categoryCounts).map(([category, count], index) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 truncate max-w-[150px]">{category}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(count / totalHazards) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kritik Risk Oranı */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Kritik Risk Oranı</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray={`${criticalPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{Math.round(criticalPercentage)}%</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Kritik risk seviyesindeki tehlikelerin oranı
          </p>
        </div>
      </div>

      {/* Kontrol Önlemleri */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-green-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Kontrol Durumu</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeDasharray={`${(controlledHazards / totalHazards) * 100}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{controlledHazards}/{totalHazards}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Kontrol önlemi tanımlanmış tehlike sayısı
          </p>
        </div>
      </div>
    </div>
  );
}; 