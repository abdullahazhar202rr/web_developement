import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CreditCard, MessageCircle, Instagram, Upload, Check } from 'lucide-react';

const paymentMethods = [
  {
    id: 'jazzcash',
    name: 'JazzCash',
    account: '0300-1234567',
    accountTitle: 'EloraMate',
  },
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    account: '0300-1234567',
    accountTitle: 'EloraMate',
  },
  {
    id: 'nayapay',
    name: 'NayaPay',
    account: '0300-1234567',
    accountTitle: 'EloraMate',
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'confirm'>('details');
  const [selectedPayment, setSelectedPayment] = useState('jazzcash');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    message: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirmOrder = async () => {
    if (!user) {
      toast.error('Please sign in to place an order');
      return;
    }

    setLoading(true);

    try {
      const orderItems = state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          customer_name: formData.name,
          customer_email: formData.email || user.email || '',
          customer_phone: formData.phone,
          address: formData.address,
          city: formData.city,
          message: formData.message || null,
          items: orderItems,
          total_amount: state.total,
          payment_method: selectedPayment,
          payment_screenshot_url: screenshotUrl || null,
          status: 'pending' as const,
        }])
        .select()
        .single();

      if (error) throw error;

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { state: { order: data } });
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container-custom section-padding">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-12">
            {['Details', 'Payment', 'Confirm'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= ['details', 'payment', 'confirm'].indexOf(step)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">{s}</span>
                {i < 2 && (
                  <div
                    className={`w-12 md:w-24 h-0.5 mx-4 ${
                      i < ['details', 'payment', 'confirm'].indexOf(step)
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit} className="bg-card rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-xl font-semibold mb-6">Shipping Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="03XX-XXXXXXX"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, house number"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City name"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Special Request (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any customization or special instructions..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary rounded-full mt-8 h-12">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="bg-card rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {method.account} - {method.accountTitle}
                            </p>
                          </div>
                        </div>
                        {selectedPayment === method.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 mb-8">
                    <h3 className="font-medium mb-3">Payment Instructions:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Send the total amount to the account shown above</li>
                      <li>Take a screenshot of your payment</li>
                      <li>Complete your order on the next step</li>
                      <li>Send payment screenshot via WhatsApp or Instagram</li>
                    </ol>
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="screenshot">Payment Screenshot URL (Optional)</Label>
                    <Input
                      id="screenshot"
                      value={screenshotUrl}
                      onChange={(e) => setScreenshotUrl(e.target.value)}
                      placeholder="Paste image URL here"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can also send the screenshot directly via WhatsApp after placing the order
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('details')}
                      className="flex-1 rounded-full h-12"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 btn-primary rounded-full h-12">
                      Continue
                    </Button>
                  </div>
                </form>
              )}

              {step === 'confirm' && (
                <div className="bg-card rounded-2xl p-6 md:p-8">
                  <h2 className="font-serif text-xl font-semibold mb-6">Confirm Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Shipping Details</h3>
                      <div className="bg-muted/50 rounded-xl p-4 text-sm space-y-1">
                        <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                        <p><span className="text-muted-foreground">Address:</span> {formData.address}, {formData.city}</p>
                        {formData.message && (
                          <p><span className="text-muted-foreground">Note:</span> {formData.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <div className="bg-muted/50 rounded-xl p-4 text-sm">
                        <p>{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <p className="text-sm text-center">
                        After placing your order, please send your payment screenshot to our 
                        <span className="font-medium text-primary"> WhatsApp </span> 
                        or 
                        <span className="font-medium text-primary"> Instagram </span>
                        to confirm your order. You will be notified via email once confirmed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('payment')}
                      className="flex-1 rounded-full h-12"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleConfirmOrder}
                      disabled={loading}
                      className="flex-1 btn-primary rounded-full h-12"
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 sticky top-28">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(state.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
