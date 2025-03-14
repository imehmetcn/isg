'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, ChevronDown, ChevronUp, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Hazard } from '@/lib/types/risk';
import { AddHazardModal } from './AddHazardModal';

interface HazardLibraryProps {
  onHazardSelect: (hazard: Hazard) => void;
}

const defaultHazards: Hazard[] = [
  {
    id: '1',
    category: 'Fiziksel Tehlikeler',
    subCategory: 'Yüksekte Çalışma',
    description: 'Yüksekte çalışma sırasında düşme riski',
    potentialConsequences: ['Ciddi yaralanma', 'Ölüm', 'İş gücü kaybı'],
    controlMeasures: [
      'Emniyet kemeri kullanımı',
      'Korkuluk sistemleri',
      'Çalışma platformu',
      'Eğitim ve yetkinlik kontrolü'
    ],
    riskScore: {
      severity: 5,
      probability: 3,
      score: 15,
      level: 'Yüksek',
      color: '#FF5722'
    }
  },
  // Daha fazla hazır tehlike eklenebilir
];

type SortField = 'category' | 'riskScore' | 'date';
type SortOrder = 'asc' | 'desc';

export const HazardLibrary = ({ onHazardSelect }: HazardLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hazards, setHazards] = useState<Hazard[]>(defaultHazards);
  const [sortField, setSortField] = useState<SortField>('category');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all');

  const categories = Array.from(new Set(hazards.map(h => h.category)));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedHazards = useMemo(() => {
    let result = hazards.filter(hazard =>
      (searchTerm === '' || 
       hazard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       hazard.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (hazard.subCategory?.toLowerCase() || '').includes(searchTerm.toLowerCase())) &&
      (filterRiskLevel === 'all' || hazard.riskScore.level === filterRiskLevel)
    );

    return result.sort((a, b) => {
      if (sortField === 'category') {
        return sortOrder === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (sortField === 'riskScore') {
        return sortOrder === 'asc'
          ? a.riskScore.score - b.riskScore.score
          : b.riskScore.score - a.riskScore.score;
      }
      return 0;
    });
  }, [hazards, searchTerm, sortField, sortOrder, filterRiskLevel]);

  const handleAddHazard = (newHazard: Hazard) => {
    setHazards(prev => [...prev, newHazard]);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Arama ve Filtreler */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tehlike ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <select
                value={filterRiskLevel}
                onChange={(e) => setFilterRiskLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Risk Seviyeleri</option>
                <option value="Düşük">Düşük Risk</option>
                <option value="Orta">Orta Risk</option>
                <option value="Yüksek">Yüksek Risk</option>
                <option value="Çok Yüksek">Çok Yüksek Risk</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleSort('category')}
                className={`p-2 rounded-lg border ${
                  sortField === 'category' ? 'border-blue-500 text-blue-500' : 'border-gray-300'
                }`}
                title="Kategoriye göre sırala"
              >
                {sortField === 'category' && sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
              </button>
              <button
                onClick={() => handleSort('riskScore')}
                className={`p-2 rounded-lg border ${
                  sortField === 'riskScore' ? 'border-blue-500 text-blue-500' : 'border-gray-300'
                }`}
                title="Risk skoruna göre sırala"
              >
                {sortField === 'riskScore' && sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Tehlike Listesi */}
        <div className="space-y-4">
          {categories.map(category => {
            const categoryHazards = filteredAndSortedHazards.filter(h => h.category === category);
            const isExpanded = expandedCategories.includes(category);

            if (categoryHazards.length === 0) return null;

            return (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                  onClick={() => toggleCategory(category)}
                >
                  <span className="font-medium text-gray-700">{category}</span>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="divide-y divide-gray-200"
                  >
                    {categoryHazards.map(hazard => (
                      <motion.div
                        key={hazard.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => onHazardSelect(hazard)}
                        whileHover={{ x: 4 }}
                      >
                        <div className="font-medium text-gray-800 mb-1">
                          {hazard.subCategory}
                        </div>
                        <div className="text-sm text-gray-600">
                          {hazard.description}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: hazard.riskScore.color }}
                          />
                          <span className="text-xs text-gray-500">
                            {hazard.riskScore.level}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            Skor: {hazard.riskScore.score}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>Yeni Tehlike Ekle</span>
        </button>
      </div>

      <AddHazardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHazard}
      />
    </>
  );
}; 