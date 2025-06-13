'use client';

import { MenuItem } from '@/lib/types';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isSelected: boolean;
}

export default function MenuCard({ item, onSelect, isSelected }: MenuCardProps) {
  return (
    <div 
      className={`card p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(item)}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{item.image}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {item.plate}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {item.description}
        </p>
        {item.price && (
          <div className="text-lg font-bold text-primary-600">
            {item.price.toFixed(2)}€
          </div>
        )}
        {isSelected && (
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              ✓ Sélectionné
            </span>
          </div>
        )}
      </div>
    </div>
  );
}