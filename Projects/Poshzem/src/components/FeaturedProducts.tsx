import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  const { state } = useApp();
  const featuredProducts = state.products.filter(product => product.featured).slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-950 mb-6">
            Featured Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that represent the pinnacle of luxury and craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center bg-primary-950 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-800 transition-colors group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}