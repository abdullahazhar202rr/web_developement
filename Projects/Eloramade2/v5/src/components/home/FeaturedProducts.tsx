import { Link } from 'react-router-dom';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Blush Rose Bouquet',
    slug: 'blush-rose-bouquet',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=600&fit=crop',
    category: 'Bouquets',
  },
  {
    id: '2',
    name: 'Golden Calligraphy Nikah Pen',
    slug: 'golden-calligraphy-nikah-pen',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop',
    category: 'Nikah Pens',
  },
  {
    id: '3',
    name: 'Premium Gift Hamper',
    slug: 'premium-gift-hamper',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop',
    category: 'Gifts',
  },
  {
    id: '4',
    name: 'Wedding Memory Box',
    slug: 'wedding-memory-box',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
    category: 'Wedding Items',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
              Handpicked for You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
              Featured Products
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="btn-outline rounded-full group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
