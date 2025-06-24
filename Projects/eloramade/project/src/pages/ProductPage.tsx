import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/">
          <Button variant="primary" icon={<ArrowLeft size={16} />}>
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mt-8 mb-6">
        <Link to={`/category/${product.category}`} className="inline-flex items-center text-rose-500 hover:text-rose-600">
          <ArrowLeft size={16} className="mr-1" />
          Back to {product.category}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-rose-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {product.rating && (
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"}
                      stroke={i < Math.floor(product.rating) ? "#F59E0B" : "#D1D5DB"}
                      className={`${i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews?.length || 0} reviews)</span>
                </div>
              )}
              
              <span className="text-sm text-gray-500 capitalize">
                Category: <Link to={`/category/${product.category}`} className="text-rose-500 hover:underline">{product.category}</Link>
              </span>
            </div>
            
            <p className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-sm text-gray-700 mb-6">
              <p>{product.description}</p>
            </div>
          </div>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedColor === color
                        ? 'bg-rose-100 text-rose-700 border-rose-300'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedSize === size
                        ? 'bg-rose-100 text-rose-700 border-rose-300'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              icon={<ShoppingCart size={18} />}
              disabled={!product.inStock}
              fullWidth
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              icon={<Heart size={18} />}
              className="flex-1"
            >
              Add to Wishlist
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over 50000 Pkr</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">30-Day Returns</h4>
                  <p className="text-xs text-gray-500">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="mt-4 flex items-center">
            {product.inStock ? (
              <>
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                <span className="text-sm text-emerald-500 font-medium">In Stock</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm text-red-500 font-medium">Out of Stock</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-8">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "#F59E0B" : "none"}
                        stroke={i < review.rating ? "#F59E0B" : "#D1D5DB"}
                        className={`${i < review.rating ? "text-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">{review.userName}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review this product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;