import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle, Instagram, Package } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container-custom max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Order Placed Successfully!
          </h1>

          {order && (
            <p className="text-muted-foreground text-lg mb-2">
              Order Number: <span className="font-semibold text-foreground">{order.order_number}</span>
            </p>
          )}

          <p className="text-muted-foreground mb-8">
            Thank you for your order! Your order is currently <span className="font-medium text-primary">pending confirmation</span>.
          </p>

          {/* Important Notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-serif text-xl font-semibold mb-4 text-center">
              Complete Your Order
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Please send your payment screenshot to our WhatsApp or Instagram to confirm your order.
              You will be notified via email once your order is confirmed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-full">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </Button>
              </a>
              <a
                href="https://instagram.com/eloramate"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full">
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </Button>
              </a>
            </div>
          </div>

          {/* Order Status Info */}
          <div className="bg-card rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-serif text-lg font-semibold mb-4">What happens next?</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Send Payment Screenshot</p>
                  <p className="text-sm text-muted-foreground">
                    Send your payment confirmation to our WhatsApp or Instagram
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    We'll verify your payment and confirm your order via email
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be crafted and shipped to your address
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button variant="outline" className="w-full sm:w-auto rounded-full">
                <Package className="h-4 w-4 mr-2" />
                View My Orders
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="w-full sm:w-auto btn-primary rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
