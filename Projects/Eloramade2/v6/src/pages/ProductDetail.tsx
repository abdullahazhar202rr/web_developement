import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingBag, Heart, Minus, Plus, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name)')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '/placeholder.svg',
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-2xl" />
                <div className="flex gap-4">
                  <Skeleton className="w-20 h-20 rounded-xl" />
                  <Skeleton className="w-20 h-20 rounded-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link to="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder.svg'];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container-custom section-padding">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                {product.category?.name || 'Uncategorized'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-primary mb-6">
                {formatPrice(product.price)}
              </p>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-border rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary rounded-full h-12"
                  size="lg"
                  disabled={!product.in_stock}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12"
                  onClick={() => toast.success('Added to wishlist')}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-muted-foreground">
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
