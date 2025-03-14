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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Risk Değerlendirmesi</h1>
        <p className="text-gray-600 mb-8">
          Çalışma alanındaki tehlikeleri belirleyin, riskleri değerlendirin ve kontrol önlemlerini planlayın.
        </p>

        {/* Değerlendirme Bilgileri */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Değerlendirme Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        {/* Dashboard */}
        {selectedHazards.length > 0 && (
          <div className="mb-8">
            <RiskDashboard hazards={selectedHazards} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Kolon - Risk Matrisi ve İstatistikler */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Risk Matrisi</h2>
              <RiskMatrix
                onCellClick={(severity, probability) => setSelectedCell({ severity, probability })}
                selectedCell={selectedCell || undefined}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="text-blue-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Toplam</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{selectedHazards.length}</p>
                <p className="text-sm text-gray-600">Tehlike</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Yüksek</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedHazards.filter(h => h.riskScore.level === 'Yüksek' || h.riskScore.level === 'Çok Yüksek').length}
                </p>
                <p className="text-sm text-gray-600">Risk Seviyesi</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-green-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Düşük</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedHazards.filter(h => h.riskScore.level === 'Düşük').length}
                </p>
                <p className="text-sm text-gray-600">Risk Seviyesi</p>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Tehlike Kütüphanesi ve Seçili Tehlikeler */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tehlike Kütüphanesi</h2>
              <HazardLibrary onHazardSelect={handleHazardSelect} />
            </div>

            {selectedHazards.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Seçili Tehlikeler</h2>
                <div className="space-y-4">
                  {selectedHazards.map(hazard => (
                    <div
                      key={hazard.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{hazard.description}</h3>
                          <p className="text-sm text-gray-600">{hazard.category}</p>
                        </div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: hazard.riskScore.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleGenerateReport}
          >
            <span>PDF Rapor</span>
            <Download size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
} 