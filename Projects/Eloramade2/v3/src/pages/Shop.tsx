import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';

// Sample products data
const allProducts = [
  {
    id: '1',
    name: 'Blush Rose Bouquet',
    slug: 'blush-rose-bouquet',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=600&fit=crop',
    category: 'Bouquets',
    categorySlug: 'bouquets',
  },
  {
    id: '2',
    name: 'Golden Calligraphy Nikah Pen',
    slug: 'golden-calligraphy-nikah-pen',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop',
    category: 'Nikah Pens',
    categorySlug: 'nikah-pens',
  },
  {
    id: '3',
    name: 'Premium Gift Hamper',
    slug: 'premium-gift-hamper',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop',
    category: 'Gifts',
    categorySlug: 'gifts',
  },
  {
    id: '4',
    name: 'Wedding Memory Box',
    slug: 'wedding-memory-box',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
    category: 'Wedding Items',
    categorySlug: 'wedding-items',
  },
  {
    id: '5',
    name: 'Elegant White Bouquet',
    slug: 'elegant-white-bouquet',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop',
    category: 'Bouquets',
    categorySlug: 'bouquets',
  },
  {
    id: '6',
    name: 'Crystal Nikah Pen Set',
    slug: 'crystal-nikah-pen-set',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=600&fit=crop',
    category: 'Nikah Pens',
    categorySlug: 'nikah-pens',
  },
  {
    id: '7',
    name: 'Personalized Gift Box',
    slug: 'personalized-gift-box',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=600&fit=crop',
    category: 'Gifts',
    categorySlug: 'gifts',
  },
  {
    id: '8',
    name: 'Islamic Calligraphy Frame',
    slug: 'islamic-calligraphy-frame',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1579541671172-43429ce17aca?w=600&h=600&fit=crop',
    category: 'Wedding Items',
    categorySlug: 'wedding-items',
  },
];

const categories = [
  { id: 'all', name: 'All Products', slug: '' },
  { id: 'gifts', name: 'Gifts', slug: 'gifts' },
  { id: 'bouquets', name: 'Bouquets', slug: 'bouquets' },
  { id: 'nikah-pens', name: 'Nikah Pens', slug: 'nikah-pens' },
  { id: 'wedding-items', name: 'Wedding Items', slug: 'wedding-items' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = !categoryParam || product.categorySlug === categoryParam;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (slug: string) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Our Collection
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our handcrafted gifts, elegant bouquets, and personalized wedding essentials
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full bg-card border-border"
                />
              </div>
              <Button
                variant="outline"
                className="md:hidden rounded-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside
                className={`lg:w-64 flex-shrink-0 ${
                  showFilters ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="bg-card rounded-2xl p-6 sticky top-28">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Categories
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                          (categoryParam || '') === category.slug
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground/70 hover:bg-muted'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground text-sm">
                    Showing {filteredProducts.length} products
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg mb-4">
                      No products found
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
