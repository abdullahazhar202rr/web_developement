import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { FilterType } from '../types';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const { state } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const filterOptions: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All Products', count: state.products.length },
    { value: 'rings', label: 'Rings', count: state.products.filter(p => p.category === 'rings').length },
    { value: 'watches', label: 'Watches', count: state.products.filter(p => p.category === 'watches').length },
    { value: 'necklaces', label: 'Necklaces', count: state.products.filter(p => p.category === 'necklaces').length },
    { value: 'earrings', label: 'Earrings', count: state.products.filter(p => p.category === 'earrings').length },
    { value: 'bracelets', label: 'Bracelets', count: state.products.filter(p => p.category === 'bracelets').length },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = state.products;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // Featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [state.products, activeFilter, searchTerm, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-950 via-primary-800 to-primary-900 text-white py-24">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Shop Collection
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Discover luxury pieces that define your unique style
            </p>
            
            {/* Advanced Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for luxury items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Sidebar Filters */}
          <div className="lg:w-80 space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-primary-950 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary-950 mb-4">Categories</h4>
                <div className="space-y-3">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setActiveFilter(option.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeFilter === option.value
                          ? 'bg-primary-200 text-primary-950 shadow-sm'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary-950 mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-primary-950">{filteredProducts.length}</span> products found
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-200 bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchTerm('');
                    setPriceRange([0, 5000]);
                  }}
                  className="bg-primary-200 text-primary-950 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                  : 'space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}