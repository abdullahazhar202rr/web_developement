import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['shop-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['shop-products', categoryParam],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*, category:categories(name, slug)')
        .eq('in_stock', true)
        .order('created_at', { ascending: false });

      if (categoryParam) {
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categoryParam)
          .single();
        if (cat) {
          query = query.eq('category_id', cat.id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = products?.filter((product) => {
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCategoryChange = (slug: string) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const isLoading = categoriesLoading || productsLoading;

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
                    <button
                      onClick={() => handleCategoryChange('')}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                        !categoryParam
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground/70 hover:bg-muted'
                      }`}
                    >
                      All Products
                    </button>
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                          categoryParam === category.slug
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
                    Showing {filteredProducts?.length || 0} products
                  </p>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square rounded-2xl" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : filteredProducts && filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: product.images?.[0] || '/placeholder.svg',
                          category: product.category?.name || 'Uncategorized',
                        }}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
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
