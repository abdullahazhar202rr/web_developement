import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Package,
  LogOut,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Clock,
  Truck,
  MapPin,
  Search,
  RefreshCw,
  ShoppingBag,
  BoxIcon,
} from 'lucide-react';
import ProductManagement from '@/components/admin/ProductManagement';

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

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth', { state: { from: '/admin' } });
    }
  }, [user, isAdmin, authLoading, navigate]);

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['admin-orders', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as OrderStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user && isAdmin,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      // Send email notification
      const order = orders?.find(o => o.id === orderId);
      if (order) {
        await supabase.functions.invoke('send-order-notification', {
          body: {
            email: order.customer_email,
            orderNumber: order.order_number,
            customerName: order.customer_name,
            status,
            items: order.items,
            totalAmount: order.total_amount,
          },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated and customer notified');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const order = orders?.find(o => o.id === orderId);
      
      // Delete payment screenshot if exists
      if (order?.payment_screenshot_url) {
        const path = order.payment_screenshot_url.split('/').slice(-2).join('/');
        await supabase.storage.from('payment-screenshots').remove([path]);
      }

      const { error } = await supabase.from('orders').delete().eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      setDeleteConfirmId(null);
      toast.success('Order deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete order');
    },
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

  const filteredOrders = orders?.filter((order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(query) ||
      order.customer_name.toLowerCase().includes(query) ||
      order.customer_email.toLowerCase().includes(query) ||
      order.customer_phone.includes(query)
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-xl font-semibold">EloraMate Admin</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-muted-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <BoxIcon className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = orders?.filter((o) => o.status === key).length || 0;
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`bg-card rounded-xl p-4 text-left transition-all hover:shadow-md ${
                      statusFilter === key ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground capitalize">{key}</span>
                    </div>
                    <p className="text-2xl font-semibold">{count}</p>
                  </button>
                );
              })}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order #, name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Orders List */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : !filteredOrders || filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status as OrderStatus];
                  const StatusIcon = status.icon;
                  const items = order.items as unknown as OrderItem[];

                  return (
                    <div
                      key={order.id}
                      className="bg-card rounded-xl p-4 md:p-6 border border-border"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="font-mono text-sm text-primary font-semibold">
                            {order.order_number}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <Badge className={`${status.color} gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Customer</p>
                          <p className="font-medium text-sm">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Address</p>
                          <p className="text-sm">{order.address}</p>
                          <p className="text-sm">{order.city}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Order Details</p>
                          <p className="text-sm">{items.length} item(s)</p>
                          <p className="font-semibold text-primary">{formatPrice(order.total_amount)}</p>
                          <p className="text-sm capitalize">{order.payment_method}</p>
                        </div>
                      </div>

                      {order.message && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Customer Message</p>
                          <p className="text-sm">{order.message}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>

                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            updateStatusMutation.mutate({ orderId: order.id, status: value as OrderStatus })
                          }
                        >
                          <SelectTrigger className="w-36 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key}>
                                {config.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {order.payment_screenshot_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(order.payment_screenshot_url, '_blank')}
                          >
                            View Screenshot
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="destructive"
                          className="ml-auto"
                          onClick={() => setDeleteConfirmId(order.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.order_number}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">{selectedOrder.payment_method}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p>{selectedOrder.address}</p>
                  <p>{selectedOrder.city}</p>
                </div>
              </div>

              {selectedOrder.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Customer Message</p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p>{selectedOrder.message}</p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Order Items</p>
                <div className="space-y-3">
                  {(selectedOrder.items as OrderItem[]).map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.payment_screenshot_url && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Payment Screenshot</p>
                  <img
                    src={selectedOrder.payment_screenshot_url}
                    alt="Payment screenshot"
                    className="w-full max-w-sm rounded-lg border"
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-serif text-2xl font-semibold text-primary">
                  {formatPrice(selectedOrder.total_amount)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order? This action cannot be undone and 
              will also delete the payment screenshot if one exists.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteOrderMutation.mutate(deleteConfirmId)}
              disabled={deleteOrderMutation.isPending}
            >
              {deleteOrderMutation.isPending ? 'Deleting...' : 'Delete Order'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;