'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Severity, Probability, getRiskLevel } from '@/lib/types/risk';

interface RiskMatrixProps {
  onCellClick?: (severity: Severity, probability: Probability) => void;
  selectedCell?: { severity: Severity; probability: Probability };
}

export const RiskMatrix = ({ onCellClick, selectedCell }: RiskMatrixProps) => {
  const [hoveredCell, setHoveredCell] = useState<{ severity: Severity; probability: Probability } | null>(null);

  const severityLabels = {
    1: 'Çok Hafif',
    2: 'Hafif',
    3: 'Orta',
    4: 'Ciddi',
    5: 'Çok Ciddi'
  };

  const probabilityLabels = {
    1: 'Çok Düşük',
    2: 'Düşük',
    3: 'Orta',
    4: 'Yüksek',
    5: 'Çok Yüksek'
  };

  const renderCell = (severity: Severity, probability: Probability) => {
    const riskScore = getRiskLevel(severity, probability);
    const isSelected = selectedCell?.severity === severity && selectedCell?.probability === probability;
    const isHovered = hoveredCell?.severity === severity && hoveredCell?.probability === probability;

    return (
      <motion.div
        key={`${severity}-${probability}`}
        className={`w-24 h-24 flex items-center justify-center text-white font-semibold rounded-lg cursor-pointer
          ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
        style={{ backgroundColor: riskScore.color }}
        whileHover={{ scale: 1.05 }}
        onClick={() => onCellClick?.(severity, probability)}
        onMouseEnter={() => setHoveredCell({ severity, probability })}
        onMouseLeave={() => setHoveredCell(null)}
      >
        <div className="text-center">
          <div className="text-2xl">{riskScore.score}</div>
          {isHovered && (
            <div className="text-xs mt-1">
              {riskScore.level}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex">
        <div className="w-32 pt-32 pr-4">
          <div className="transform -rotate-90 translate-y-20 text-lg font-semibold text-gray-700">
            Olasılık
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-2">
            {/* Severity Labels */}
            {[1, 2, 3, 4, 5].map((severity) => (
              <div key={severity} className="h-24 flex items-center justify-center text-sm font-medium text-gray-700">
                {severityLabels[severity as Severity]}
              </div>
            ))}
            
            {/* Matrix Cells */}
            {[5, 4, 3, 2, 1].map((probability) => (
              <React.Fragment key={probability}>
                <div className="pr-4 flex items-center justify-end text-sm font-medium text-gray-700 w-32">
                  {probabilityLabels[probability as Probability]}
                </div>
                {[1, 2, 3, 4, 5].map((severity) => (
                  <div key={`${probability}-${severity}`}>
                    {renderCell(severity as Severity, probability as Probability)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-lg font-semibold text-gray-700">Şiddet</div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex justify-center gap-4">
        {['Düşük', 'Orta', 'Yüksek', 'Çok Yüksek'].map((level) => {
          const color = level === 'Düşük' ? '#4CAF50' :
                       level === 'Orta' ? '#FFC107' :
                       level === 'Yüksek' ? '#FF5722' : '#F44336';
          return (
            <div key={level} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
              <span className="text-sm text-gray-600">{level}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 