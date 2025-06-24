import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import poshzemlogo from '../asstes/logo.png';

export default function Header() {
  const { state } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={poshzemlogo} alt="Logo"  className='w-[100px] h-[60px]'  />

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary-950 border-b-2 border-primary-200' : 'text-gray-600 hover:text-primary-950'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive('/shop') ? 'text-primary-950 border-b-2 border-primary-200' : 'text-gray-600 hover:text-primary-950'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-colors ${
                isActive('/categories') ? 'text-primary-950 border-b-2 border-primary-200' : 'text-gray-600 hover:text-primary-950'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-primary-950 border-b-2 border-primary-200' : 'text-gray-600 hover:text-primary-950'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-950 border-b-2 border-primary-200' : 'text-gray-600 hover:text-primary-950'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-950 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/admin/login" className="p-2 text-gray-600 hover:text-primary-950 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-950 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-950 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-600 hover:text-primary-950 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-gray-600 hover:text-primary-950 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary-950 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary-950 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <Link to="/admin/login" className="p-2 text-gray-600 hover:text-primary-950 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-950 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}