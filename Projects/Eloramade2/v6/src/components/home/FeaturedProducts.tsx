import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name)')
        .eq('featured', true)
        .eq('in_stock', true)
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

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
          {products.map((product, index) => (
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
