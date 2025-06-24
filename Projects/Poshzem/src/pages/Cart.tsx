import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link
              to="/shop"
              className="bg-primary-200 text-primary-950 px-8 py-3 rounded-full font-semibold hover:bg-primary-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div key={item.product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary-950">{item.product.title}</h3>
                    <p className="text-gray-600 capitalize">{item.product.category}</p>
                    {item.customization && (
                      <p className="text-sm text-primary-600 mt-1">
                        <strong>Customization:</strong> {item.customization}
                      </p>
                    )}
                    {item.customerMessage && (
                      <p className="text-sm text-primary-600 mt-1">
                        <strong>Message:</strong> {item.customerMessage}
                      </p>
                    )}
                    <p className="text-xl font-bold text-primary-950 mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-primary-950 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-primary-950">Total</span>
                  <span className="text-lg font-bold text-primary-950">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-primary-950 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-800 transition-colors mb-4 text-center"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              to="/shop"
              className="block text-center text-primary-700 hover:text-primary-950 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}