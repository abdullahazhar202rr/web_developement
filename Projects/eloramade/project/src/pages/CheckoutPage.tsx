import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { CreditCard, CheckCircle } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    sameAddress: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Payment validation
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
    if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate order processing
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOrderComplete(true);
        clearCart();
      }, 1500);
    }
  };
  
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-gray-600 mb-8">
            Your order number is: <span className="font-medium">EM-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <p className="text-gray-600 mb-8">
            You will receive an email confirmation shortly with your order details.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                
                <Input
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                
                <Input
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
              
              <div className="mb-4">
                <Input
                  label="Address"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                />
                
                <Input
                  label="State/Province"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                />
                
                <Input
                  label="ZIP/Postal Code"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={errors.zipCode}
                />
              </div>
              
              <div className="mt-4">
                <Select
                  label="Country"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'UK', label: 'United Kingdom' },
                    { value: 'AU', label: 'Australia' }
                  ]}
                />
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>
              
              <div className="mb-4">
                <Input
                  label="Name on Card"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  error={errors.cardName}
                />
              </div>
              
              <div className="mb-4">
                <Input
                  label="Card Number"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  error={errors.cardNumber}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  error={errors.cardExpiry}
                />
                
                <Input
                  label="CVC"
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  placeholder="XXX"
                  error={errors.cardCvc}
                />
              </div>
              
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="sameAddress"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-700">
                  Billing address is the same as shipping address
                </label>
              </div>
            </div>
            
            <Button 
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              icon={<CreditCard size={18} />}
              disabled={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? 'Processing...' : 'Complete Order'}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex py-4 border-b border-gray-200">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item.quantity}
                        {item.color && ` • ${item.color}`}
                        {item.size && ` • ${item.size}`}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm font-medium mt-auto">
                      <p className="text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <p>Shipping</p>
                <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <p>Tax</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;