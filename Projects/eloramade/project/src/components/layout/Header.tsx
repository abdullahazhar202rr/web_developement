import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const categories = [
    { name: 'Weddings', path: '/category/weddings' },
    { name: 'Birthdays', path: '/category/birthdays' },
    { name: 'Anniversaries', path: '/category/anniversaries' },
    { name: 'Festivals', path: '/category/festivals' },
    { name: 'Personalized', path: '/category/personalized' },
    { name: 'Corporate', path: '/category/corporate' }
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Gift className="h-8 w-8 text-rose-500" />
            <span className="text-xl font-bold tracking-tight text-gray-900">Eloramade</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map(category => (
              <Link 
                key={category.path}
                to={category.path}
                className={`text-sm font-medium hover:text-rose-500 transition-colors ${
                  location.pathname === category.path 
                    ? 'text-rose-500' 
                    : isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Search, Cart, User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 lg:w-60 h-9 pl-8 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 text-sm"
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </form>
            
            {/* Admin Link */}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-rose-500">
                <User className="h-5 w-5" />
              </Link>
            )}
            
            {/* Login/Logout */}
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-gray-700 hover:text-rose-500"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/admin/login" 
                className="text-sm font-medium text-gray-700 hover:text-rose-500"
              >
                Admin
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </form>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              {categories.map(category => (
                <Link 
                  key={category.path}
                  to={category.path}
                  className={`text-base font-medium py-2 ${
                    location.pathname === category.path 
                      ? 'text-rose-500' 
                      : 'text-gray-900'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <Button onClick={handleLogout} variant="outline" fullWidth>
                    Logout
                  </Button>
                ) : (
                  <Link to="/admin/login">
                    <Button variant="outline" fullWidth>
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;