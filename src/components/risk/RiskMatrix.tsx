'use client';

import React from 'react';
import { Severity, Probability, getRiskLevel } from '@/lib/types/risk';

interface RiskMatrixProps {
  onCellClick?: (severity: Severity, probability: Probability) => void;
  selectedCell?: { severity: Severity; probability: Probability };
}

export const RiskMatrix = ({ onCellClick, selectedCell }: RiskMatrixProps) => {
  const severityLevels: Severity[] = [5, 4, 3, 2, 1];
  const probabilityLevels: Probability[] = [1, 2, 3, 4, 5];

  const getRiskColor = (severity: Severity, probability: Probability) => {
    const riskLevel = getRiskLevel(severity, probability);
    switch (riskLevel) {
      case 'low':
        return '#4CAF50';
      case 'medium':
        return '#FFC107';
      case 'high':
        return '#FF5722';
      case 'critical':
        return '#F44336';
      default:
        return '#E5E7EB';
    }
  };

  const getCellStyle = (severity: Severity, probability: Probability) => {
    const isSelected = selectedCell?.severity === severity && selectedCell?.probability === probability;
    const baseStyle = 'w-16 h-16 flex items-center justify-center cursor-pointer transition-colors';
    const backgroundColor = getRiskColor(severity, probability);
    const textColor = backgroundColor === '#E5E7EB' ? 'text-gray-700' : 'text-white';
    const selectedStyle = isSelected ? 'ring-4 ring-blue-500' : '';

    return `${baseStyle} ${textColor} ${selectedStyle}`;
  };

  return (
    <div className="inline-block">
      <div className="flex">
        <div className="w-16" /> {/* Boş köşe */}
        {probabilityLevels.map(prob => (
          <div key={prob} className="w-16 h-12 flex items-center justify-center text-sm font-medium text-gray-700">
            {prob}
          </div>
        ))}
      </div>
      {severityLevels.map(severity => (
        <div key={severity} className="flex">
          <div className="w-16 h-16 flex items-center justify-center text-sm font-medium text-gray-700">
            {severity}
          </div>
          {probabilityLevels.map(probability => (
            <div
              key={`${severity}-${probability}`}
              className={getCellStyle(severity, probability)}
              style={{ backgroundColor: getRiskColor(severity, probability) }}
              onClick={() => onCellClick?.(severity, probability)}
            >
              {severity * probability}
            </div>
          ))}
        </div>
      ))}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#4CAF50' }} />
          <span className="text-sm text-gray-600">Düşük Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#FFC107' }} />
          <span className="text-sm text-gray-600">Orta Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#FF5722' }} />
          <span className="text-sm text-gray-600">Yüksek Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#F44336' }} />
          <span className="text-sm text-gray-600">Kritik Risk</span>
        </div>
      </div>
    </div>
  );
}; 