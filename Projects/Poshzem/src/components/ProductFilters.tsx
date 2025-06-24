import React from 'react';
import { FilterType } from '../types';

interface ProductFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'rings', label: 'Rings' },
  { value: 'watches', label: 'Watches' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'bracelets', label: 'Bracelets' },
];

export default function ProductFilters({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeFilter === option.value
                  ? 'bg-primary-200 text-primary-950 shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}