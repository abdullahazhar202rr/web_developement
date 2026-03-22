import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'gifts',
    name: 'Gifts',
    description: 'Thoughtful presents for every occasion',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop',
    color: 'from-blush/50 to-cream/30',
  },
  {
    id: 'bouquets',
    name: 'Bouquets',
    description: 'Fresh & preserved flower arrangements',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop',
    color: 'from-sage/50 to-cream/30',
  },
  {
    id: 'nikah-pens',
    name: 'Nikah Pens',
    description: 'Elegant pens for your special day',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600&h=600&fit=crop',
    color: 'from-primary/20 to-cream/30',
  },
  {
    id: 'wedding-items',
    name: 'Wedding Items',
    description: 'Customized wedding essentials',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
    color: 'from-blush/40 to-sage/20',
  },
];

const CategoriesSection = () => {
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
              to={`/shop?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {category.description}
                </p>
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
