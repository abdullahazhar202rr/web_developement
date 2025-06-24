import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Crown, Watch, Heart, Gem } from 'lucide-react';

export default function Categories() {
  const { state } = useApp();

  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      description: 'Elegant rings for every occasion, from engagement to everyday luxury',
      icon: <Crown className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: state.products.filter(p => p.category === 'rings').length,
      color: 'from-rose-400 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
    },
    {
      id: 'watches',
      name: 'Watches',
      description: 'Precision timepieces that blend functionality with luxury design',
      icon: <Watch className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: state.products.filter(p => p.category === 'watches').length,
      color: 'from-blue-400 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      description: 'Statement pieces and delicate chains to complement your style',
      icon: <Gem className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: state.products.filter(p => p.category === 'necklaces').length,
      color: 'from-emerald-400 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      id: 'earrings',
      name: 'Earrings',
      description: 'From subtle studs to dramatic drops, perfect for any look',
      icon: <Sparkles className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: state.products.filter(p => p.category === 'earrings').length,
      color: 'from-purple-400 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      description: 'Elegant wrist accessories that add sophistication to any outfit',
      icon: <Heart className="w-8 h-8" />,
      image: 'https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: state.products.filter(p => p.category === 'bracelets').length,
      color: 'from-amber-400 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
  ];

  const featuredProducts = state.products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 animate-fade-in">
      {/* Artistic Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-primary-200"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200 mb-8">
            <Sparkles className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-800 font-medium">Curated Collections</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary-950 mb-8 leading-tight">
            Explore by
            <span className="block bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Category
            </span>
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Each category tells a story of craftsmanship, elegance, and timeless beauty
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${category.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={category.textColor}>
                      {category.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-primary-200 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-white/90 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {category.count} items
                    </span>
                    
                    <div className="flex items-center text-white group-hover:text-primary-200 transition-colors">
                      <span className="font-semibold mr-2">Explore</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-300 rounded-3xl transition-colors duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-primary-950 mb-6">
              Featured Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked pieces from each category that represent the pinnacle of luxury and design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < Math.floor(product.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary-950 group-hover:text-primary-700 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-primary-950">
                      ${product.price.toLocaleString()}
                    </span>
                    <Link
                      to="/shop"
                      className="bg-primary-200 text-primary-950 px-4 py-2 rounded-xl font-semibold hover:bg-primary-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center bg-primary-950 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary-800 transition-colors group"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Stats */}
      <section className="py-20 bg-gradient-to-r from-primary-950 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {categories.map((category) => (
              <div key={category.id} className="space-y-3">
                <div className="text-4xl font-bold text-primary-200">
                  {category.count}
                </div>
                <div className="text-primary-100 font-medium">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}