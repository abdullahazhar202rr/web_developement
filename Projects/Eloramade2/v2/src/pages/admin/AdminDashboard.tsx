import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ExternalLink, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/Button';
import type { Order, OrderItem } from '../../lib/types';

interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');

  useEffect(() => {
    const isAdmin = localStorage.getItem('eloramate_admin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setLoading(true);
    let query = supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data as OrderWithItems[] || []);
    }
    setLoading(false);
  }

  async function updateOrderStatus(orderId: string, status: 'confirmed' | 'rejected') {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    } else {
      fetchOrders();
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('eloramate_admin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-neutral-900">EloraMate Admin</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">Orders Management</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'pending'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'confirmed'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'rejected'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-neutral-600">No orders found</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-neutral-200 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {order.order_number}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : order.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-neutral-900 mb-2">Customer Details</h4>
                    <div className="text-sm text-neutral-600 space-y-1">
                      <p>{order.customer_name}</p>
                      <p>{order.phone}</p>
                      <p>{order.address}</p>
                      <p>{order.city}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-900 mb-2">Order Details</h4>
                    <div className="text-sm text-neutral-600 space-y-1">
                      {order.order_items?.map((item) => (
                        <p key={item.id}>
                          {item.product_name} x{item.quantity} - Rs.{' '}
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      ))}
                      <p className="font-semibold text-neutral-900 pt-2">
                        Total: Rs. {order.total_price.toLocaleString()}
                      </p>
                      <p>Payment: {order.payment_method}</p>
                    </div>
                  </div>
                </div>

                {order.message && (
                  <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-neutral-900 mb-1">
                      Customer Message
                    </p>
                    <p className="text-sm text-neutral-600">{order.message}</p>
                  </div>
                )}

                {order.payment_screenshot_url && (
                  <div className="mb-4">
                    <a
                      href={order.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Payment Screenshot
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}

                {order.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-neutral-200">
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      size="sm"
                      variant="primary"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Order
                    </Button>
                    <Button
                      onClick={() => updateOrderStatus(order.id, 'rejected')}
                      size="sm"
                      variant="secondary"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Order
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
