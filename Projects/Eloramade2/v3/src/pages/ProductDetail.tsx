import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingBag, Heart, Minus, Plus, ChevronLeft, Check } from 'lucide-react';

// Sample products data
const productsData: Record<string, any> = {
  'blush-rose-bouquet': {
    id: '1',
    name: 'Blush Rose Bouquet',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=800&fit=crop',
    ],
    category: 'Bouquets',
    description: 'A stunning arrangement of soft blush roses, perfect for weddings, anniversaries, or any special occasion. Each bouquet is carefully handcrafted with premium quality roses and wrapped in elegant kraft paper with a satin ribbon.',
    features: [
      'Premium quality fresh roses',
      'Handcrafted arrangement',
      'Elegant kraft paper wrapping',
      'Satin ribbon finish',
      'Long-lasting freshness',
    ],
    inStock: true,
  },
  'golden-calligraphy-nikah-pen': {
    id: '2',
    name: 'Golden Calligraphy Nikah Pen',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&h=800&fit=crop',
    ],
    category: 'Nikah Pens',
    description: 'An exquisite nikah pen featuring beautiful Islamic calligraphy with gold accents. Perfect for signing your nikah nama with elegance and grace. Makes a cherished keepsake for the couple.',
    features: [
      'Hand-engraved calligraphy',
      '24K gold plated accents',
      'Smooth writing experience',
      'Comes in velvet gift box',
      'Can be personalized with names',
    ],
    inStock: true,
  },
  'premium-gift-hamper': {
    id: '3',
    name: 'Premium Gift Hamper',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&h=800&fit=crop',
    ],
    category: 'Gifts',
    description: 'A luxurious gift hamper curated with premium products. Perfect for Eid, birthdays, or corporate gifting. Includes an assortment of gourmet treats, scented candles, and decorative items.',
    features: [
      'Curated premium products',
      'Beautiful presentation box',
      'Includes personalized card',
      'Suitable for all occasions',
      'Customizable contents',
    ],
    inStock: true,
  },
  'wedding-memory-box': {
    id: '4',
    name: 'Wedding Memory Box',
    price: 6200,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579541671172-43429ce17aca?w=800&h=800&fit=crop',
    ],
    category: 'Wedding Items',
    description: 'A beautifully crafted memory box to store your precious wedding mementos. Features elegant Islamic geometric patterns with gold detailing. The perfect keepsake for newlyweds.',
    features: [
      'Handcrafted wooden box',
      'Islamic geometric patterns',
      'Gold detailing',
      'Velvet lined interior',
      'Personalization available',
    ],
    inStock: true,
  },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productsData[slug] : null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  if (!product) {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                {product.images.map((image: string, index: number) => (
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
            </div>

            {/* Details */}
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-primary mb-6">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-serif text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
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
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-muted-foreground">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
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
