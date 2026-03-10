'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const sizeChartData = {
  'T-Shirts': {
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)'],
    rows: [
      ['S', '38', '27', '17'],
      ['M', '40', '28', '18'],
      ['L', '42', '29', '19'],
      ['XL', '44', '30', '20'],
      ['XXL', '46', '31', '21'],
    ],
  },
  'Hoodies': {
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
    rows: [
      ['S', '40', '26', '24'],
      ['M', '42', '27', '25'],
      ['L', '44', '28', '26'],
      ['XL', '46', '29', '27'],
    ],
  },
  'Joggers': {
    headers: ['Size', 'Waist (in)', 'Length (in)', 'Hip (in)'],
    rows: [
      ['S', '28-30', '38', '38'],
      ['M', '30-32', '39', '40'],
      ['L', '32-34', '40', '42'],
      ['XL', '34-36', '41', '44'],
    ],
  },
};

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState(category || 'T-Shirts');
  const tabs = Object.keys(sizeChartData);
  const chart = sizeChartData[activeTab as keyof typeof sizeChartData] || sizeChartData['T-Shirts'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
          <h2 className="text-lg font-bold">Size Guide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-4 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                activeTab === tab
                  ? 'bg-[#111] text-white'
                  : 'bg-[#f5f5f5] text-[#555] hover:bg-[#e5e5e5]'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Size Chart Table */}
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                {chart.headers.map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-semibold text-[#333]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, i) => (
                <tr key={i} className="border-b border-[#f0f0f0] hover:bg-[#fafafa]">
                  {row.map((cell, j) => (
                    <td key={j} className={cn('py-3 px-4', j === 0 && 'font-semibold')}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tips */}
        <div className="p-4 pt-0">
          <h3 className="text-sm font-semibold mb-2">How to Measure</h3>
          <div className="text-xs text-[#777] space-y-1">
            <p>• <strong>Chest:</strong> Measure around the fullest part of your chest.</p>
            <p>• <strong>Length:</strong> Measure from the highest point of the shoulder to the hem.</p>
            <p>• <strong>Waist:</strong> Measure around your natural waistline.</p>
          </div>
          <p className="mt-3 text-xs text-[#999]">
            When in doubt, size up for a relaxed fit or size down for a snug fit.
          </p>
        </div>
      </div>
    </div>
  );
}
