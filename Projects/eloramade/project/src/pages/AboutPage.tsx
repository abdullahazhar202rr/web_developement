import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Gift, Heart, Users, Sparkles } from 'lucide-react';
import jibes1 from '../assets/jibes1.jpg';
import jibes2 from '../assets/jibes2.jpg';
import meenalapi from '../assets/meenalapi.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-500 to-pink-600 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/90 to-pink-600/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Eloramade</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Where thoughtfulness meets creativity to create unforgettable gift experiences
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Eloramade was born out of a simple belief: that giving a gift should be as meaningful as receiving one. 
                Our founder, Jibes Elora, struggled to find unique, personalized gifts that truly captured the emotions 
                and connections they wanted to convey to  loved ones.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In 2020, they decided to create a platform that would bring together artisans, 
                designers, and creative minds to offer truly special gifts for every occasion. 
                What started as a small collection of handcrafted items has grown into a 
                comprehensive gift destination loved by thousands.
              </p>
              <p className="text-lg text-gray-700">
                Today, Eloramade continues to grow with the same passion and commitment to helping 
                people celebrate life's special moments with gifts that create lasting memories.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.pinimg.com/736x/b0/cd/ad/b0cdade93fe128554185fb8a2b32089a.jpg" 
                    alt="Team working" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.pinimg.com/736x/9c/e2/e3/9ce2e381620ac55615a1263750f4dcf8.jpg" 
                    alt="Gift wrapping" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg ">
                  <img 
                    src="https://i.pinimg.com/736x/db/7a/d9/db7ad96cd62cd663aeb93298f129d45f.jpg" 
                    alt="Gift shop display" 
                    className="w-full h-48 object-cover "
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://i.pinimg.com/736x/43/a7/d9/43a7d916e5fc9c00e457be620dfbb0e9.jpg" 
                    alt="Gift design" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            To help people create meaningful connections through thoughtful, 
            personalized gifts that celebrate special moments and relationships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <Gift className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Thoughtful Curation</h3>
              <p className="text-gray-600">
                We carefully select each product to ensure it meets our standards for quality, uniqueness, and gift-worthiness.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaningful Personalization</h3>
              <p className="text-gray-600">
                We believe that personalization transforms a simple gift into a treasured keepsake.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-6">
                <Sparkles className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Celebration of Moments</h3>
              <p className="text-gray-600">
                We help you celebrate life's big and small moments with gifts that convey your feelings perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Eloramade who work tirelessly to bring you the perfect gifts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Laiba Tanveer', role: 'Founder & CEO', image: jibes1 },
              { name: 'Abdullah Azhar', role: 'Creative Director', image: jibes2 },
              { name: 'Meenal Tanveer', role: 'Product Curator', image: meenalapi },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-rose-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-rose-500/90 to-pink-600/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find the perfect gift?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Explore our collection of thoughtfully curated gifts for every occasion.
          </p>
          <Link to="/category/all">
            <Button 
              variant="secondary" 
              size="lg" 
              className=" bg-rose-800 hover:bg-white hover:text-black"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;