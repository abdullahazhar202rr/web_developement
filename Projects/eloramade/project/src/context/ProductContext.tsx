import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Filters } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  trendingProducts: Product[];
  productsByCategory: (category: Category) => Product[];
  getProductById: (id: string) => Product | undefined;
  applyFilters: (filters: Filters) => Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  filteredProducts: Product[];
  currentFilters: Filters;
  setCurrentFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    // Load products from localStorage if available, otherwise use initial products
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  
  const [currentFilters, setCurrentFilters] = useState<Filters>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(allProducts));
  }, [allProducts]);

  const featuredProducts = allProducts.filter(product => product.featured);
  const trendingProducts = allProducts.filter(product => product.trending);

  const productsByCategory = (category: Category): Product[] => {
    return allProducts.filter(product => product.category === category);
  };

  const getProductById = (id: string): Product | undefined => {
    return allProducts.find(product => product.id === id);
  };

  const applyFilters = (filters: Filters): Product[] => {
    const filtered = allProducts.filter(product => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      
      // Color filter
      if (filters.colors && filters.colors.length > 0 && 
          product.colors && !filters.colors.some(color => product.colors?.includes(color))) {
        return false;
      }
      
      // Size filter
      if (filters.sizes && filters.sizes.length > 0 && 
          product.sizes && !filters.sizes.some(size => product.sizes?.includes(size))) {
        return false;
      }
      
      // In stock filter
      if (filters.inStock === true && !product.inStock) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProducts(filtered);
    return filtered;
  };

  const addProduct = (product: Product) => {
    setAllProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setAllProducts(prev => 
      prev.map(item => item.id === product.id ? product : item)
    );
  };

  const removeProduct = (productId: string) => {
    setAllProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{
      products: allProducts,
      featuredProducts,
      trendingProducts,
      productsByCategory,
      getProductById,
      applyFilters,
      addProduct,
      updateProduct,
      removeProduct,
      filteredProducts,
      currentFilters,
      setCurrentFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
};