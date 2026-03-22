import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'rejected' | 'shipped' | 'delivered';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800', icon: MapPin },
};

const Orders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/orders' } });
    }
  }, [user, authLoading, navigate]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container-custom section-padding">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
            My Orders
          </h1>
          <p className="text-muted-foreground mb-8">
            Track your order status and view order history
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                Start shopping to place your first order
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="btn-primary rounded-full px-8 py-3"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const status = statusConfig[order.status as OrderStatus];
                const StatusIcon = status.icon;
                const items = order.items as unknown as OrderItem[];

                return (
                  <div
                    key={order.id}
                    className="bg-card rounded-2xl p-6 border border-border"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                        <p className="font-mono font-semibold text-primary">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <Badge className={`${status.color} gap-2`}>
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Items</p>
                        <div className="space-y-3">
                          {items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(item.price)} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                        <div className="bg-muted/50 rounded-xl p-4 text-sm">
                          <p className="font-medium">{order.customer_name}</p>
                          <p>{order.address}</p>
                          <p>{order.city}</p>
                          <p className="text-muted-foreground mt-2">{order.customer_phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p className="font-medium capitalize">{order.payment_method}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-serif text-xl font-semibold text-primary">
                          {formatPrice(order.total_amount)}
                        </p>
                      </div>
                    </div>

                    {order.status === 'pending' && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          Your order is pending confirmation. Please ensure you've sent the payment 
                          screenshot via WhatsApp or Instagram.
                        </p>
                      </div>
                    )}

                    {order.status === 'confirmed' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-sm text-green-800">
                          Your order has been confirmed! Thank you for shopping with EloraMate.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;