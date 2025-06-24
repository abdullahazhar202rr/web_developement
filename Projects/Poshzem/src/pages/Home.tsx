import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <FeaturedProducts />
      
      {/* Brand Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary-950 mb-6">
                Crafted for Eternity
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At PoshZem, we believe that luxury is not just about owning beautiful things, 
                but about celebrating life's precious moments with pieces that tell your unique story.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Each piece in our collection is carefully selected for its exceptional quality, 
                timeless design, and the emotion it evokes. From engagement rings that mark new 
                beginnings to watches that celebrate achievements.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary-950 mb-2">500+</h3>
                  <p className="text-gray-600">Curated Pieces</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-950 mb-2">10k+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury jewelry craftsmanship"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-200 p-6 rounded-2xl shadow-lg">
                <p className="text-primary-950 font-semibold">Premium Quality</p>
                <p className="text-primary-800 text-sm">Lifetime Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}