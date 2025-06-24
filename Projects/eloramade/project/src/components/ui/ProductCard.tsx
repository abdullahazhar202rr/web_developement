import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white">
      {/* Product Badge */}
      {product.featured && (
        <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded">
          Featured
        </div>
      )}
      {product.trending && (
        <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
          Trending
        </div>
      )}
      
      {/* Wishlist Button */}
      <button 
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-rose-500"
        aria-label="Add to wishlist"
      >
        <Heart size={18} />
      </button>
      
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-56 w-full overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Link to={`/category/${product.category}`} className="text-xs font-medium text-emerald-600 hover:underline capitalize">
            {product.category}
          </Link>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-amber-400">★</span>
              <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAddToCart}
            icon={<ShoppingCart size={16} />}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;