import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { Category } from '../types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { 
    productsByCategory, 
    applyFilters, 
    filteredProducts, 
    currentFilters, 
    setCurrentFilters,
    products
  } = useProducts();
  
  const validCategory = category as Category;
  
  // Get all unique colors and sizes for this category
  const categoryProducts = category === 'all' ? products : productsByCategory(validCategory);
  const availableColors = Array.from(
    new Set(
      categoryProducts
        .filter(product => product.colors && product.colors.length > 0)
        .flatMap(product => product.colors || [])
    )
  );
  
  const availableSizes = Array.from(
    new Set(
      categoryProducts
        .filter(product => product.sizes && product.sizes.length > 0)
        .flatMap(product => product.sizes || [])
    )
  );
  
  // Apply filters whenever currentFilters change
  useEffect(() => {
    if (category) {
      setCurrentFilters({
        ...currentFilters,
        category: category === 'all' ? undefined : validCategory
      });
    }
  }, [category]);
  
  useEffect(() => {
    applyFilters(currentFilters);
  }, [currentFilters]);
  
  const handleApplyFilters = (newFilters: Record<string, any>) => {
    setCurrentFilters({
      ...newFilters,
      category: category === 'all' ? undefined : validCategory
    });
  };
  
  const categoryTitle = category === 'all'
    ? 'All Products'
    : `${category?.charAt(0).toUpperCase()}${category?.slice(1)} Gifts`;
  
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">{categoryTitle}</h1>
      
      <ProductFilters
        currentFilters={currentFilters}
        onApplyFilters={handleApplyFilters}
        availableColors={availableColors}
        availableSizes={availableSizes}
        category={validCategory}
      />
      
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default CategoryPage;