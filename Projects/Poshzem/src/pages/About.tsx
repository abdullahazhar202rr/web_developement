import React from 'react';
import { Star, Award, Users, Heart } from 'lucide-react';
import jibes1 from '../asstes/jibes1.jpg';
import jibes2 from '../asstes/jibes2.jpg';
import meenalapi from '../asstes/meenalapi.jpg';

export default function About() {
  const teamMembers = [
    {
      name: 'Meenal Tanveer',
      role: 'Founder & CEO',
      image: meenalapi,
    },
    {
      name: 'Abdullah Azhar',
      role: 'Marketing Manager & Designer',
      image: jibes2,
    },
    {
      name: 'Laiba Tanveer',
      role: 'Product Specialist',
      image: jibes1,
    },
    
  ];

  const values = [
    {
      icon: <Star className="w-8 h-8 text-primary-400" />,
      title: 'Premium Quality',
      description: 'We curate only the finest pieces that meet our strict quality standards.',
    },
    {
      icon: <Award className="w-8 h-8 text-primary-400" />,
      title: 'Exceptional Service',
      description: 'Our commitment to customer satisfaction drives everything we do.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary-400" />,
      title: 'Community Focus',
      description: 'Building a community of fashion lovers who express their individuality.',
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-400" />,
      title: 'Passion for Fashion',
      description: 'Fashion is an expression of individuality, and we celebrate that.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-950 mb-6">
              About PoshZem
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your one-stop online store for premium, stylish, and affordable fashion essentials
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-16 place-items-start">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary-950 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Welcome to Poshzem, your one-stop online store for premium, stylish, and affordable fashion essentials. At Poshzem, we believe fashion is an expression of individuality, and our mission is to bring you the latest trends with top quality and unbeatable service.
                </p>
                <p>
                  Whether you're looking for everyday basics or statement pieces, Poshzem has you covered with carefully curated collections that make you look and feel your best.
                </p>
                <p>
                  Our commitment to customer satisfaction drives us to provide a seamless shopping experience, fast shipping, and responsive support. Join our growing community of fashion lovers and discover your perfect style with Poshzem today!
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="PoshZem luxury collection"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-200 p-6 rounded-2xl shadow-lg">
                <p className="text-primary-950 font-semibold text-lg">Since 2024</p>
                <p className="text-primary-800">Crafting Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-950 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at PoshZem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-950 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-950 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind PoshZem's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl  shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden ">
                  <img
                    src={member.image}
                    alt={member.name}
                    className=" object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary-950 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary-950 mb-2">10k+</h3>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-950 mb-2">500+</h3>
              <p className="text-gray-600 font-medium">Premium Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-950 mb-2">50+</h3>
              <p className="text-gray-600 font-medium">Countries Served</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-950 mb-2">99%</h3>
              <p className="text-gray-600 font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}