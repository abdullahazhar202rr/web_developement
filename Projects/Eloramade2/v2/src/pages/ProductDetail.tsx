import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import type { Product } from '../lib/types';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-light text-neutral-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-neutral-900 mb-6">
            Rs. {product.price.toLocaleString()}
          </p>

          <div className="prose prose-neutral mb-8">
            <p className="text-neutral-600">{product.description}</p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto"
            size="lg"
          >
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </Button>

          {product.stock > 0 && product.stock < 10 && (
            <p className="mt-4 text-sm text-amber-600">
              Only {product.stock} left in stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
