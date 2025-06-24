import React, { useState } from 'react';
import { Filters, Category } from '../../types';
import Button from '../ui/Button';
import { X, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  currentFilters: Filters;
  onApplyFilters: (filters: Filters) => void;
  availableColors?: string[];
  availableSizes?: string[];
  category?: Category;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  currentFilters,
  onApplyFilters,
  availableColors = [],
  availableSizes = [],
  category
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    ...currentFilters,
    category: category || currentFilters.category
  });
  
  const handleColorChange = (color: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    
    setFilters({
      ...filters,
      colors: newColors.length > 0 ? newColors : undefined
    });
  };
  
  const handleSizeChange = (size: string) => {
    const currentSizes = filters.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    
    setFilters({
      ...filters,
      sizes: newSizes.length > 0 ? newSizes : undefined
    });
  };
  
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    setFilters({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue
    });
  };
  
  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      inStock: e.target.checked
    });
  };
  
  const handleApply = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };
  
  const handleReset = () => {
    const resetFilters = { category: category };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };
  
  const hasActiveFilters = Object.keys(filters).some(key => 
    key !== 'category' && (filters as any)[key] !== undefined
  );
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button 
          variant={isOpen ? "primary" : "outline"} 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)} 
          icon={<SlidersHorizontal size={16} />}
        >
          {isOpen ? "Close" : "Filter"}
        </Button>
      </div>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Price Range</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            
            {/* Colors */}
            {availableColors.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const isSelected = filters.colors?.includes(color);
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isSelected
                            ? 'bg-rose-100 text-rose-700 border-rose-300'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        } border`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const isSelected = filters.sizes?.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isSelected
                            ? 'bg-rose-100 text-rose-700 border-rose-300'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        } border`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Availability */}
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Availability</h4>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={filters.inStock || false}
                  onChange={handleInStockChange}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                In Stock Only
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={!hasActiveFilters}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {filters.minPrice !== undefined && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              Min: ${filters.minPrice}
              <button 
                onClick={() => handlePriceChange('min', '')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          
          {filters.maxPrice !== undefined && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              Max: ${filters.maxPrice}
              <button 
                onClick={() => handlePriceChange('max', '')}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          
          {filters.colors?.map(color => (
            <span key={color} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              {color}
              <button 
                onClick={() => handleColorChange(color)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          
          {filters.sizes?.map(size => (
            <span key={size} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              Size: {size}
              <button 
                onClick={() => handleSizeChange(size)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          
          {filters.inStock && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              In Stock
              <button 
                onClick={() => setFilters({ ...filters, inStock: undefined })}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </span>
          )}
          
          <button
            onClick={handleReset}
            className="text-xs text-rose-600 hover:text-rose-700 ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;