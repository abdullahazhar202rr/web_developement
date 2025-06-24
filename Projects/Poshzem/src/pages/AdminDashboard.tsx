import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Package,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingBag,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck
} from 'lucide-react';

export default function AdminDashboard() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    dispatch({ type: 'ADMIN_LOGOUT' });
    navigate('/');
  };

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!state.admin.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [state.admin.isAuthenticated, navigate]);

  const totalProducts = state.products.length;
  const totalValue = state.products.reduce((sum, product) => sum + product.price, 0);
  const totalStock = state.products.reduce((sum, product) => sum + product.stock, 0);
  const avgRating = state.products.reduce((sum, product) => sum + product.rating, 0) / totalProducts;
  const totalOrders = state.orders.length;
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-serif font-bold text-primary-950">Admin Panel</h2>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'dashboard' ? 'bg-primary-50 text-primary-950 border-r-2 border-primary-200' : 'text-gray-600'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'orders' ? 'bg-primary-50 text-primary-950 border-r-2 border-primary-200' : 'text-gray-600'
              }`}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('add-product')}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'add-product' ? 'bg-primary-50 text-primary-950 border-r-2 border-primary-200' : 'text-gray-600'
              }`}
            >
              <Plus className="w-5 h-5 mr-3" />
              Add Product
            </button>
            <button
              onClick={() => setActiveTab('manage-products')}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'manage-products' ? 'bg-primary-50 text-primary-950 border-r-2 border-primary-200' : 'text-gray-600'
              }`}
            >
              <Edit className="w-5 h-5 mr-3" />
              Manage Products
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 transition-colors mt-4"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Dashboard Overview</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Products</p>
                      <p className="text-2xl font-bold text-primary-950">{totalProducts}</p>
                    </div>
                    <Package className="w-10 h-10 text-primary-200" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Orders</p>
                      <p className="text-2xl font-bold text-primary-950">{totalOrders}</p>
                    </div>
                    <ShoppingBag className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-primary-950">
                        ${totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Avg Rating</p>
                      <p className="text-2xl font-bold text-primary-950">{avgRating.toFixed(1)}</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-primary-950 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-gray-600 font-medium">Order ID</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Customer</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Total</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b border-gray-50">
                          <td className="py-3 font-medium text-primary-950">#{order.id}</td>
                          <td className="py-3 text-gray-600">{order.customerInfo.name}</td>
                          <td className="py-3 font-semibold text-primary-950">${order.total}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-600">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-primary-950 mb-4">Recent Products</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-gray-600 font-medium">Product</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Category</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Price</th>
                        <th className="text-left py-3 text-gray-600 font-medium">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.products.slice(0, 5).map((product) => (
                        <tr key={product.id} className="border-b border-gray-50">
                          <td className="py-3 flex items-center space-x-3">
                            <img src={product.image} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-primary-950">{product.title}</span>
                          </td>
                          <td className="py-3 text-gray-600 capitalize">{product.category}</td>
                          <td className="py-3 font-semibold text-primary-950">${product.price}</td>
                          <td className="py-3 text-gray-600">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && <OrdersManagement />}
          {activeTab === 'add-product' && <AddProductForm />}
          {activeTab === 'manage-products' && <ManageProducts />}
        </div>
      </div>
    </div>
  );
}

// Orders Management Component
function OrdersManagement() {
  const { state, dispatch } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status: newStatus } });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const selectedOrderData = state.orders.find(order => order.id === selectedOrder);

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Orders Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-primary-950">All Orders ({state.orders.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-600 font-medium">Order</th>
                    <th className="text-left px-6 py-4 text-gray-600 font-medium">Customer</th>
                    <th className="text-left px-6 py-4 text-gray-600 font-medium">Total</th>
                    <th className="text-left px-6 py-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-primary-950">#{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-primary-950">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary-950">${order.total}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {selectedOrderData ? (
            <div>
              <h3 className="text-lg font-bold text-primary-950 mb-4">Order Details</h3>
              
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-primary-950 mb-2">Customer Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Name:</strong> {selectedOrderData.customerInfo.name}</p>
                  <p><strong>Email:</strong> {selectedOrderData.customerInfo.email}</p>
                  <p><strong>Phone:</strong> {selectedOrderData.customerInfo.phone}</p>
                  <p><strong>Address:</strong> {selectedOrderData.customerInfo.address}</p>
                  <p><strong>City:</strong> {selectedOrderData.customerInfo.city}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-primary-950 mb-2">Payment Information</h4>
                <p className="text-sm text-gray-600 capitalize">
                  {selectedOrderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                   selectedOrderData.paymentMethod === 'jazzcash' ? 'JazzCash' : 'Credit/Debit Card'}
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-950 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrderData.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.title}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        {item.customization && (
                          <p className="text-xs text-primary-600">Custom: {item.customization}</p>
                        )}
                        {item.customerMessage && (
                          <p className="text-xs text-primary-600">Note: {item.customerMessage}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-950 mb-2">Update Status</h4>
                <select
                  value={selectedOrderData.status}
                  onChange={(e) => handleStatusUpdate(selectedOrderData.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="text-lg font-bold text-primary-950">
                Total: ${selectedOrderData.total}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add Product Form Component (existing code with minor updates)
function AddProductForm() {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    category: 'rings' as const,
    description: '',
    stock: '',
    rating: '4.5',
    reviews: '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      description: formData.description,
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    
    // Reset form
    setFormData({
      title: '',
      price: '',
      image: '',
      category: 'rings',
      description: '',
      stock: '',
      rating: '4.5',
      reviews: '0',
    });

    alert('Product added successfully!');
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Add New Product</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              >
                <option value="rings">Rings</option>
                <option value="watches">Watches</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
            />
          </div>
          
          <button
            type="submit"
            className="bg-primary-950 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

// Manage Products Component (existing code)
function ManageProducts() {
  const { state, dispatch } = useApp();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-primary-950 mb-8">Manage Products</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Product</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Price</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Stock</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-primary-950">{product.title}</p>
                        <p className="text-sm text-gray-600">{product.description.slice(0, 50)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-primary-950">${product.price}</td>
                  <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}