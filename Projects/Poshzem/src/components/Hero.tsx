import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6 animate-fade-in">
          <Sparkles className="w-6 h-6 text-primary-200 mr-2" />
          <span className="text-primary-200 font-medium tracking-wide uppercase text-sm">
            Luxury Collection
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-slide-up">
          Exquisite
          <span className="block text-primary-200">Elegance</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Discover our curated collection of fine jewelry, luxury watches, and timeless accessories
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Link
            to="/shop"
            className="bg-primary-200 text-primary-950 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-300 transition-all duration-300 flex items-center justify-center group"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/categories"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-950 transition-all duration-300"
          >
            View Categories
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}