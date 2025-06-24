import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import { ShoppingBag, Gift, Clock, CreditCard, Truck, BadgeCheck } from 'lucide-react';
import bouqute from '../assets/heart.jpg'; 
import box from '../assets/box.jpg';
import kitkat from '../assets/kitkat.jpg';
import wedding from '../assets/cake.jpg';


const HomePage: React.FC = () => {
  const { featuredProducts, trendingProducts } = useProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-500 to-pink-600 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/90 to-pink-600/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Thoughtful Gifts for Every Occasion
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Discover unique, personalized gifts that create lasting memories for your loved ones. From weddings to birthdays, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={<ShoppingBag size={18} />}
                  className='bg-pink-900 hover:bg-white hover:text-black'
                >
                  <Link to="/category/weddings">Shop Now</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Link to="/category/personalized">Personalized Gifts</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10 ">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg transform">
                    <img 
                      src={kitkat} 
                      alt="Gift box" 
                      className="w-full h-40 md:h-56 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={box}
                      alt="Anniversary gift" 
                      className="w-full h-40 md:h-48 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={wedding}
                      alt="Wedding gift" 
                      className="w-full h-40 md:h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                    <img 
                      src={bouqute} 
                      alt="Personalized gift" 
                      className="w-full h-40 md:h-56 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gift Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our carefully curated selection of gifts for every special occasion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Weddings', image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg', path: '/category/weddings' },
              { name: 'Birthdays', image: 'https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg', path: '/category/birthdays' },
              { name: 'Anniversaries', image: 'https://static.vecteezy.com/system/resources/thumbnails/003/031/475/small_2x/happy-anniversary-banner-template-with-gold-lettering-vector.jpg', path: '/category/anniversaries' },
              { name: 'Festivals', image: 'https://zishta.com/cdn/shop/articles/Unwrapping-Joy-Exploring-the-Art-of-Gifting-During-Festivals-in-India-Zishta-1226-107278.jpg?v=1724156027&width=2048', path: '/category/festivals' },
              { name: 'Personalized', image: 'https://albizco.com/cdn/shop/articles/why-personalized-gifts-reign-supreme-7-convincing-reasons.webp?v=1695000159', path: '/category/personalized' },
            ].map((category) => (
              <Link
                to={category.path}
                key={category.name}
                className="group relative overflow-hidden rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/category/all" 
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              View All
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts.slice(0, 4)} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Eloramade</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a unique gift shopping experience with quality products and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Gift className="h-10 w-10 text-rose-500" />, title: 'Unique Gifts', description: 'Carefully curated selection of unique gifts you won\'t find anywhere else' },
              { icon: <Truck className="h-10 w-10 text-rose-500" />, title: 'Fast Delivery', description: 'Quick and reliable shipping to get your gifts on time' },
              { icon: <BadgeCheck className="h-10 w-10 text-rose-500" />, title: 'Quality Guaranteed', description: 'Every product meets our high standards for quality and durability' },
              { icon: <CreditCard className="h-10 w-10 text-rose-500" />, title: 'Secure Payment', description: 'Multiple secure payment options for worry-free shopping' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            <Link 
              to="/category/all" 
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              View All
            </Link>
          </div>
          
          <ProductGrid products={trendingProducts.slice(0, 4)} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-pink-900 to-pink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-white/90 mb-8">
              Subscribe to get special offers, exclusive discounts, and early access to new products.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" className="px-6 py-3 bg-white text-emerald-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;