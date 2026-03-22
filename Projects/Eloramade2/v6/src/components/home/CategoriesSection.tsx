import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesSection = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
              Browse Categories
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
              Shop By Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-medium tracking-widest text-sm mb-3 uppercase">
            Browse Categories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image_url || '/placeholder.svg'}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-primary-foreground/80 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-primary-foreground text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
