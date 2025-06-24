import React from 'react';
import { Product } from '../../types';
import ProductCard from '../ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showEmpty?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  showEmpty = true 
}) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        showEmpty && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No products found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductGrid;