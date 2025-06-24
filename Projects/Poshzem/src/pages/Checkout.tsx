import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreditCard, Smartphone, Truck, MapPin, Phone, Mail, User } from 'lucide-react';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'card'>('cod');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    jazzcashNumber: '',
  });

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      items: state.cart,
      customerInfo,
      paymentMethod,
      paymentDetails: paymentMethod === 'card' ? { cardNumber: paymentDetails.cardNumber } : 
                     paymentMethod === 'jazzcash' ? { jazzcashNumber: paymentDetails.jazzcashNumber } : undefined,
      total,
      status: 'pending' as const,
      orderDate: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    navigate('/');
  };

  if (state.cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-primary-200 text-primary-950' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-200' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-primary-200 text-primary-950' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary-200' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? 'bg-primary-200 text-primary-950' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-primary-950 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3" />
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                      placeholder="03xxxxxxxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                      placeholder="Your city"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300 resize-none"
                      placeholder="Your complete address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={customerInfo.postalCode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                      placeholder="Postal code (optional)"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => setStep(2)}
                  disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city}
                  className="w-full mt-6 bg-primary-950 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-primary-950 mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-6">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-primary-400 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-primary-600" />
                      <div>
                        <h3 className="font-semibold text-primary-950">Cash on Delivery</h3>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </div>
                  </div>

                  {/* JazzCash */}
                  <div
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'jazzcash' ? 'border-primary-400 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 text-primary-600" />
                      <div>
                        <h3 className="font-semibold text-primary-950">JazzCash</h3>
                        <p className="text-sm text-gray-600">Pay via JazzCash mobile wallet</p>
                      </div>
                    </div>
                    {paymentMethod === 'jazzcash' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">JazzCash Number</label>
                        <input
                          type="tel"
                          value={paymentDetails.jazzcashNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, jazzcashNumber: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                          placeholder="03xxxxxxxxx"
                        />
                      </div>
                    )}
                  </div>

                  {/* Credit/Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-primary-400 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-primary-600" />
                      <div>
                        <h3 className="font-semibold text-primary-950">Credit/Debit Card</h3>
                        <p className="text-sm text-gray-600">Pay securely with your card</p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              value={paymentDetails.expiryDate}
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              value={paymentDetails.cvv}
                              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary-950 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-primary-950 mb-6">Order Review</h2>
                
                {/* Customer Info Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-primary-950 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Delivery Information
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <p><strong>Phone:</strong> {customerInfo.phone}</p>
                    <p><strong>Address:</strong> {customerInfo.address}, {customerInfo.city}</p>
                    {customerInfo.postalCode && <p><strong>Postal Code:</strong> {customerInfo.postalCode}</p>}
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-primary-950 mb-3">Payment Method</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     paymentMethod === 'jazzcash' ? 'JazzCash' : 'Credit/Debit Card'}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-950 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {state.cart.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-primary-950">{item.product.title}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          {item.customization && (
                            <p className="text-sm text-primary-600">Customization: {item.customization}</p>
                          )}
                          {item.customerMessage && (
                            <p className="text-sm text-primary-600">Message: {item.customerMessage}</p>
                          )}
                        </div>
                        <span className="font-semibold text-primary-950">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-primary-950 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
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

            {/* Contact Info */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-primary-950 mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>03140632577</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>abdullahazhar202rr@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}