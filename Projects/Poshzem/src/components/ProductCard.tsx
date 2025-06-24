import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { dispatch } = useApp();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { product } });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative overflow-hidden rounded-xl w-32 h-32 flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-primary-400 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                Sale
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-primary-950 group-hover:text-primary-700 transition-colors">
                  {product.title}
                </h3>
                <span className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full capitalize">
                  {product.category}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <Link 
                  to={`/product/${product.id}`}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              <span className="text-sm text-gray-500">{product.stock} in stock</span>
            </div>
            
            <p className="text-gray-600 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-950">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-primary-200 text-primary-950 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-colors flex items-center space-x-2 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group  bg-white rounded-2xl  shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 animate-scale-in">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <h3 className="text-lg font-semibold text-primary-950 mb-2 group-hover:text-primary-700 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-primary-200 text-primary-950 px-4 py-2 rounded-full font-semibold hover:bg-primary-300 transition-colors flex items-center space-x-2 group"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Add</span>
          </button>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span className="capitalize">{product.category}</span>
          <span>{product.stock} in stock</span>
        </div>
      </div>
    </div>
  );
}