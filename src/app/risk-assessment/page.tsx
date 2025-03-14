'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiskMatrix } from '@/components/risk/RiskMatrix';
import { HazardLibrary } from '@/components/risk/HazardLibrary';
import { RiskDashboard } from '@/components/risk/RiskDashboard';
import { Hazard, Severity, Probability, RiskAssessment } from '@/lib/types/risk';
import { Download } from 'lucide-react';
import { generateRiskReport } from '@/lib/utils/generateRiskReport';

export default function RiskAssessmentPage() {
  const [selectedCell, setSelectedCell] = useState<{ severity: Severity; probability: Probability }>();
  const [selectedHazards, setSelectedHazards] = useState<Hazard[]>([]);
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [assessor, setAssessor] = useState('');

  const handleGenerateReport = () => {
    if (!assessmentTitle || !department || !assessor) {
      alert('Lütfen değerlendirme başlığı, departman ve değerlendiren bilgilerini giriniz.');
      return;
    }

    const assessment: RiskAssessment = {
      id: Date.now().toString(),
      title: assessmentTitle,
      department,
      assessmentDate: new Date(),
      reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
      assessor,
      hazards: selectedHazards,
      status: 'draft'
    };

    const doc = generateRiskReport(assessment);
    doc.save(`risk-degerlendirme-${assessment.id}.pdf`);
  };

  const handleAddHazard = (hazard: Hazard) => {
    setSelectedHazards(prev => [...prev, hazard]);
  };

  const handleSelectHazard = (hazard: Hazard) => {
    if (!selectedHazards.find(h => h.id === hazard.id)) {
      setSelectedHazards(prev => [...prev, hazard]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Değerlendirmesi</h1>
        <p className="text-gray-600">
          Tehlikeleri belirleyin, risk seviyelerini değerlendirin ve kontrol önlemlerini planlayın.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Risk Matrisi</h2>
          <RiskMatrix
            onCellClick={(severity, probability) => setSelectedCell({ severity, probability })}
            selectedCell={selectedCell}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Değerlendirme Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Değerlendirme Başlığı
              </label>
              <input
                type="text"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Başlık giriniz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departman
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Departman giriniz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Değerlendiren
              </label>
              <input
                type="text"
                value={assessor}
                onChange={(e) => setAssessor(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="İsim giriniz"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {selectedHazards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <RiskDashboard selectedHazards={selectedHazards} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <HazardLibrary
          hazards={selectedHazards}
          onAddHazard={handleAddHazard}
          onSelectHazard={handleSelectHazard}
        />
      </motion.div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleGenerateReport}
        >
          <span>PDF Rapor</span>
          <Download size={20} />
        </button>
      </div>
    </div>
  );
} 