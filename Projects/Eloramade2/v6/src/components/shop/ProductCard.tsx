import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card group animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            className="flex-1 btn-primary rounded-full"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success('Added to wishlist');
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-primary font-semibold mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
