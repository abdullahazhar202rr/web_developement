import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/">
            <Button variant="primary" icon={<ShoppingCart size={18} />}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Cart Items ({totalItems})
            </h2>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.color}-${item.size}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <p>Shipping</p>
                <p>{subtotal > 50 ? 'Free' : '$5.00'}</p>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <p>Tax</p>
                <p>${(subtotal * 0.07).toFixed(2)}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
                <p>Total</p>
                <p>
                  ${(
                    subtotal + 
                    (subtotal > 50 ? 0 : 5) + 
                    (subtotal * 0.07)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/checkout">
                <Button 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  icon={<ArrowRight size={18} />}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
            
            <div className="mt-4">
              <Link to="/">
                <Button 
                  variant="outline" 
                  fullWidth
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            {/* Secure Checkout Notice */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;