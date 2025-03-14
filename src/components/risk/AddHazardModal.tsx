'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Hazard, Severity, Probability, getRiskLevel } from '@/lib/types/risk';

interface AddHazardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (hazard: Hazard) => void;
}

const hazardCategories = [
  'Fiziksel Tehlikeler',
  'Kimyasal Tehlikeler',
  'Biyolojik Tehlikeler',
  'Ergonomik Tehlikeler',
  'Psikososyal Tehlikeler',
  'Elektrik Tehlikeleri',
  'Yangın Tehlikeleri',
  'Mekanik Tehlikeler'
];

export const AddHazardModal = ({ isOpen, onClose, onAdd }: AddHazardModalProps) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [consequences, setConsequences] = useState<string[]>(['']);
  const [measures, setMeasures] = useState<string[]>(['']);
  const [severity, setSeverity] = useState<Severity>(3);
  const [probability, setProbability] = useState<Probability>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const riskScore = getRiskLevel(severity, probability);
    
    const newHazard: Hazard = {
      id: Date.now().toString(),
      category,
      subCategory,
      description,
      potentialConsequences: consequences.filter(c => c.trim() !== ''),
      controlMeasures: measures.filter(m => m.trim() !== ''),
      riskScore
    };

    onAdd(newHazard);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCategory('');
    setSubCategory('');
    setDescription('');
    setConsequences(['']);
    setMeasures(['']);
    setSeverity(3);
    setProbability(3);
  };

  const addConsequence = () => setConsequences([...consequences, '']);
  const removeConsequence = (index: number) => {
    setConsequences(consequences.filter((_, i) => i !== index));
  };

  const addMeasure = () => setMeasures([...measures, '']);
  const removeMeasure = (index: number) => {
    setMeasures(measures.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Yeni Tehlike Ekle</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seçiniz</option>
                  {hazardCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Kategori
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Alt kategori giriniz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tehlike Tanımı
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
                placeholder="Tehlikeyi detaylı olarak tanımlayın"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Olası Sonuçlar
              </label>
              {consequences.map((consequence, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={consequence}
                    onChange={(e) => {
                      const newConsequences = [...consequences];
                      newConsequences[index] = e.target.value;
                      setConsequences(newConsequences);
                    }}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Olası sonucu giriniz"
                  />
                  {consequences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeConsequence(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addConsequence}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Sonuç Ekle</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kontrol Önlemleri
              </label>
              {measures.map((measure, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={measure}
                    onChange={(e) => {
                      const newMeasures = [...measures];
                      newMeasures[index] = e.target.value;
                      setMeasures(newMeasures);
                    }}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Kontrol önlemini giriniz"
                  />
                  {measures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMeasure(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMeasure}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Önlem Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şiddet
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value) as Severity)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={1}>Çok Hafif</option>
                  <option value={2}>Hafif</option>
                  <option value={3}>Orta</option>
                  <option value={4}>Ciddi</option>
                  <option value={5}>Çok Ciddi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Olasılık
                </label>
                <select
                  value={probability}
                  onChange={(e) => setProbability(Number(e.target.value) as Probability)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={1}>Çok Düşük</option>
                  <option value={2}>Düşük</option>
                  <option value={3}>Orta</option>
                  <option value={4}>Yüksek</option>
                  <option value={5}>Çok Yüksek</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Tehlike Ekle
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}; 