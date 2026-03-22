import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Header() {
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-light tracking-wider text-neutral-900">
            EloraMate
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Shop
            </Link>
            {/* <Link to="/about" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              About
            </Link> */}
            <Link to="/contact" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-neutral-900" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-900" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-900" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-neutral-700 hover:text-neutral-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-neutral-700 hover:text-neutral-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-neutral-700 hover:text-neutral-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-neutral-700 hover:text-neutral-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
