'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiskMatrix } from '@/components/risk/RiskMatrix';
import { HazardLibrary } from '@/components/risk/HazardLibrary';
import { RiskDashboard } from '@/components/risk/RiskDashboard';
import { Hazard, Severity, Probability, RiskAssessment } from '@/lib/types/risk';
import { FileText, AlertTriangle, CheckCircle, ArrowRight, Download } from 'lucide-react';
import { generateRiskReport } from '@/lib/utils/generateRiskReport';

export default function RiskAssessmentPage() {
  const [selectedCell, setSelectedCell] = useState<{ severity: Severity; probability: Probability } | null>(null);
  const [selectedHazards, setSelectedHazards] = useState<Hazard[]>([]);
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [assessor, setAssessor] = useState('');

  const handleHazardSelect = (hazard: Hazard) => {
    setSelectedHazards(prev => [...prev, hazard]);
  };

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