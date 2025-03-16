'use client';

import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Hazard } from '@/lib/types/risk';
import { AddHazardModal } from './AddHazardModal';

interface HazardLibraryProps {
  hazards: Hazard[];
  onAddHazard: (hazard: Hazard) => void;
  onSelectHazard: (hazard: Hazard) => void;
}

export const HazardLibrary = ({ hazards, onAddHazard, onSelectHazard }: HazardLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = Array.from(new Set(hazards.map(h => h.category)));

  const filteredHazards = hazards.filter(hazard => {
    const matchesSearch = hazard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hazard.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || hazard.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tehlike Kütüphanesi</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Yeni Tehlike</span>
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tehlike ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredHazards.map(hazard => (
          <div
            key={hazard.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={() => onSelectHazard(hazard)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{hazard.description}</h3>
                <p className="text-sm text-gray-600">{hazard.category} - {hazard.subCategory}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(hazard.riskScore)}`}>
                {hazard.riskScore.charAt(0).toUpperCase() + hazard.riskScore.slice(1)}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Olası Sonuçlar:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {hazard.potentialConsequences.map((consequence, index) => (
                    <li key={index}>{consequence}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Kontrol Önlemleri:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {hazard.controlMeasures.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {filteredHazards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Arama kriterlerine uygun tehlike bulunamadı.
          </div>
        )}
      </div>

      <AddHazardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddHazard}
      />
    </div>
  );
}; 