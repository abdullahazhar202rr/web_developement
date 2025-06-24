import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types';
import AdminProductForm from '../../components/admin/AdminProductForm';
import Button from '../../components/ui/Button';
import { PlusCircle, Edit, Trash2, LogOut, Package, DollarSign, User, ShoppingBag } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const handleAddNew = () => {
    setCurrentProduct(undefined);
    setShowForm(true);
  };
  
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };
  
  const handleDelete = (productId: string) => {
    setConfirmDelete(productId);
  };
  
  const confirmDeleteProduct = () => {
    if (confirmDelete) {
      removeProduct(confirmDelete);
      setConfirmDelete(null);
    }
  };
  
  const handleSubmit = (product: Partial<Product>) => {
    if (currentProduct) {
      // Update existing product
      updateProduct({ ...currentProduct, ...product });
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        rating: 0,
        reviews: []
      } as Product;
      
      addProduct(newProduct);
    }
    
    setShowForm(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const stats = [
    { name: 'Total Products', value: products.length, icon: <Package className="h-5 w-5 text-rose-400" /> },
    { name: 'Featured Products', value: products.filter(p => p.featured).length, icon: <DollarSign className="h-5 w-5 text-emerald-400" /> },
    { name: 'Out of Stock', value: products.filter(p => !p.inStock).length, icon: <ShoppingBag className="h-5 w-5 text-amber-400" /> },
    { name: 'Customers', value: 28, icon: <User className="h-5 w-5 text-indigo-400" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          icon={<LogOut size={16} />}
        >
          Logout
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
          >
            <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {showForm ? (
        <AdminProductForm
          product={currentProduct}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            <Button 
              variant="primary"
              onClick={handleAddNew}
              icon={<PlusCircle size={16} />}
            >
              Add New Product
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.featured 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.featured ? 'Featured' : 'Regular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={confirmDeleteProduct}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;