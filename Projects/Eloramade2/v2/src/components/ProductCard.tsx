import { Link } from 'react-router-dom';
import type { Product } from '../lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-neutral-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            {product.name}
          </h3>
          <p className="text-xl font-semibold text-neutral-900">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
