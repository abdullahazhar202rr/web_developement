import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: '',
    message: '',
    paymentMethod: 'JazzCash',
  });
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let screenshotUrl = null;

      if (screenshotFile) {
        const fileExt = screenshotFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `payment-screenshots/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('order-uploads')
          .upload(filePath, screenshotFile);

        if (uploadError) {
          console.error('Error uploading screenshot:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('order-uploads')
            .getPublicUrl(filePath);
          screenshotUrl = urlData.publicUrl;
        }
      }

      const orderNumber = `ELR${Date.now().toString().slice(-8)}`;

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: formData.customerName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          message: formData.message || null,
          total_price: getTotalPrice(),
          payment_method: formData.paymentMethod,
          payment_screenshot_url: screenshotUrl,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate(`/order-confirmation/${orderData.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const paymentAccounts = {
    JazzCash: '0300-1234567',
    EasyPaisa: '0321-7654321',
    NayaPay: '0345-9876543',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-light text-neutral-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h2 className="text-xl font-medium text-neutral-900 mb-6">
                Delivery Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Delivery Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Special Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    placeholder="Any custom requests or notes..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h2 className="text-xl font-medium text-neutral-900 mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  >
                    <option value="JazzCash">JazzCash</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                    <option value="NayaPay">NayaPay</option>
                  </select>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-neutral-900 mb-2">
                    Payment Instructions:
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    Please send Rs. {getTotalPrice().toLocaleString()} to:
                  </p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {paymentAccounts[formData.paymentMethod as keyof typeof paymentAccounts]}
                  </p>
                  <p className="text-xs text-neutral-500 mt-2">
                    Account Name: EloraMate
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Upload Payment Screenshot
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                      <span className="text-sm text-neutral-600">
                        {screenshotFile
                          ? screenshotFile.name
                          : 'Click to upload payment screenshot'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Order'}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 sticky top-24">
            <h2 className="text-xl font-medium text-neutral-900 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-neutral-900">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-neutral-300 pt-3 flex justify-between text-lg font-semibold text-neutral-900">
                <span>Total</span>
                <span>Rs. {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
