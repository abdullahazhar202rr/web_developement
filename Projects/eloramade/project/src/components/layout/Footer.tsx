import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Gift className="h-8 w-8 text-rose-400" />
              <span className="text-xl font-bold">Eloramade</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for unique, thoughtful gifts for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Elora/100071185982981/?rdid=X4siofVqUpP1Lfz8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CFfPvJrWv%2F" target='_blacnk' className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/_eloramade_" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/weddings" className="text-gray-400 hover:text-white transition-colors">
                  Wedding Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/birthdays" className="text-gray-400 hover:text-white transition-colors">
                  Birthday Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/anniversaries" className="text-gray-400 hover:text-white transition-colors">
                  Anniversary Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/festivals" className="text-gray-400 hover:text-white transition-colors">
                  Festival Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/personalized" className="text-gray-400 hover:text-white transition-colors">
                  Personalized Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/corporate" className="text-gray-400 hover:text-white transition-colors">
                  Corporate Gifts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-rose-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  The University of Faisalabad<br />
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-rose-400 mr-2" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  03140632577
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-rose-400 mr-2" />
                <a href="mailto:info@eloramade.com" className="text-gray-400 hover:text-white transition-colors">
                  eloramade11@gmail.com
                </a>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Eloramade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;