import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import type { Product } from '../lib/types';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setFeaturedProducts(data || []);
      }
      setLoading(false);
    }

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: 'Gifts', image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Bouquets', image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Nikah Pens', image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Wedding Items', image: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider text-neutral-900 mb-6">
            EloraMate
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 font-light">
            Handcrafted gifts for your special moments
          </p>
          <Link to="/shop">
            <Button size="lg">Shop Now</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-light text-center text-neutral-900 mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="mt-4 text-center text-lg font-medium text-neutral-900">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-light text-center text-neutral-900 mb-12">
          Featured Products
        </h2>
        {loading ? (
          <div className="text-center text-neutral-600">Loading...</div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-600">
            No featured products available
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
