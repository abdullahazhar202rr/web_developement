import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Instagram, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import type { Order } from '../lib/types';

export function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching order:', error);
      } else {
        setOrder(data);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-4xl font-light text-neutral-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-neutral-600">
          Thank you for your order
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-neutral-200">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Order Number</p>
            <p className="font-semibold text-neutral-900">{order.order_number}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-1">Order Status</p>
            <p className="font-semibold text-neutral-900 capitalize">{order.status}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-neutral-900 mb-3">Delivery Information</h3>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>{order.customer_name}</p>
            <p>{order.phone}</p>
            <p>{order.address}</p>
            <p>{order.city}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-neutral-900 mb-3">Payment Details</h3>
          <div className="space-y-2 text-sm text-neutral-600">
            <p>Method: {order.payment_method}</p>
            <p className="text-lg font-semibold text-neutral-900">
              Total: Rs. {order.total_price.toLocaleString()}
            </p>
          </div>
        </div>

        {order.message && (
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-neutral-900 mb-1">Your Message</p>
            <p className="text-sm text-neutral-600">{order.message}</p>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-neutral-900 mb-3">Next Steps</h3>
        <p className="text-neutral-700 mb-4">
          Please send your payment screenshot to our WhatsApp or Instagram DM to finalize
          your order. Our team will review and confirm your order within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Send to WhatsApp
          </a>
          <a
            href="https://instagram.com/eloramate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Send to Instagram
          </a>
        </div>
      </div>

      <div className="text-center">
        <Link to="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
