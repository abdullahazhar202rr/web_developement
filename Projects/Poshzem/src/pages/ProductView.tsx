import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  MessageSquare
} from 'lucide-react';

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customization, setCustomization] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [showCustomization, setShowCustomization] = useState(false);

  const product = state.products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary-200 text-primary-950 px-6 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { 
        product, 
        customization: customization || undefined,
        customerMessage: customerMessage || undefined
      } 
    });
    alert('Product added to cart!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-950 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-primary-400' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-serif font-bold text-primary-950 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <span className="text-green-600 font-medium">{product.stock} in stock</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary-950">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-primary-950 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-primary-950 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">Available: {product.stock}</span>
              </div>
            </div>

            {/* Customization Section */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="flex items-center text-lg font-semibold text-primary-950 mb-3 hover:text-primary-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Add Customization or Message
              </button>
              
              {showCustomization && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customization Details (Optional)
                    </label>
                    <input
                      type="text"
                      value={customization}
                      onChange={(e) => setCustomization(e.target.value)}
                      placeholder="e.g., Engraving text, size preference..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message to Seller (Optional)
                    </label>
                    <textarea
                      value={customerMessage}
                      onChange={(e) => setCustomerMessage(e.target.value)}
                      placeholder="Any special requests or questions..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-950 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-primary-400" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-primary-400" />
                  <span>Authentic Products</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RotateCcw className="w-5 h-5 text-primary-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}