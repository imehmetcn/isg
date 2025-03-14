'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hazard } from '@/lib/types/risk';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps
} from 'recharts';

interface RiskDashboardProps {
  hazards: Hazard[];
}

export const RiskDashboard = ({ hazards }: RiskDashboardProps) => {
  // Risk seviyelerine göre dağılım
  const riskLevelDistribution = hazards.reduce((acc, hazard) => {
    acc[hazard.riskScore.level] = (acc[hazard.riskScore.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(riskLevelDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Kategorilere göre dağılım
  const categoryDistribution = hazards.reduce((acc, hazard) => {
    acc[hazard.category] = (acc[hazard.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(categoryDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Risk seviyelerine göre renkler
  const COLORS = {
    'Düşük': '#4CAF50',
    'Orta': '#FFC107',
    'Yüksek': '#FF5722',
    'Çok Yüksek': '#F44336'
  };

  const renderPieLabel = ({ name, percent }: PieLabelRenderProps) => {
    return `${name} (${((percent || 0) * 100).toFixed(0)}%)`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Risk Analizi</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Seviyesi Dağılımı */}
        <div className="h-80">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Risk Seviyesi Dağılımı</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderPieLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Kategori Dağılımı */}
        <div className="h-80">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Kategori Dağılımı</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-600">Toplam Tehlike</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">{hazards.length}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-600">Ortalama Risk Skoru</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {(hazards.reduce((acc, h) => acc + h.riskScore.score, 0) / hazards.length).toFixed(1)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-600">En Riskli Kategori</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {Object.entries(categoryDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-600">Yüksek Riskli Tehlike</h4>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {hazards.filter(h => h.riskScore.level === 'Yüksek' || h.riskScore.level === 'Çok Yüksek').length}
          </p>
        </div>
      </div>
    </div>
  );
}; 