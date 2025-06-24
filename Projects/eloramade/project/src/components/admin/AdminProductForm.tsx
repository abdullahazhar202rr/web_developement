import React, { useState } from 'react';
import { Product, Category } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface AdminProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const categoryOptions = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'anniversaries', label: 'Anniversaries' },
  { value: 'festivals', label: 'Festivals' },
  { value: 'personalized', label: 'Personalized' },
  { value: 'corporate', label: 'Corporate' }
];

const emptyProduct: Partial<Product> = {
  name: '',
  price: 0,
  images: [''],
  description: '',
  category: 'weddings',
  inStock: true,
  colors: [],
  sizes: [],
  customizationInfo: ''
};

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || emptyProduct
  );
  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value as Category }));
  };

  const handleAddColor = () => {
    if (colorInput && !formData.colors?.includes(colorInput)) {
      setFormData(prev => ({
        ...prev,
        colors: [...(prev.colors || []), colorInput]
      }));
      setColorInput('');
    }
  };

  const handleRemoveColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors?.filter(c => c !== color)
    }));
  };

  const handleAddSize = () => {
    if (sizeInput && !formData.sizes?.includes(sizeInput)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...(prev.sizes || []), sizeInput]
      }));
      setSizeInput('');
    }
  };

  const handleRemoveSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes?.filter(s => s !== size)
    }));
  };

  const handleAddImage = () => {
    if (imageInput && !formData.images?.includes(imageInput)) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageInput]
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== image)
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than zero';
    if (!formData.images || formData.images.length === 0 || !formData.images[0]) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <Input
            label="Product Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (Pkr )"
              id="price"
              name="price"
              type="number"
              value={formData.price?.toString()}
              onChange={handleChange}
              step="0.01"
              min="0"
              error={errors.price}
              required
            />
            
            <Select
              label="Category"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              options={categoryOptions}
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
            />
            <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
              In Stock
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured Product
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="trending"
              name="trending"
              checked={formData.trending}
              onChange={(e) => setFormData(prev => ({ ...prev, trending: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
            />
            <label htmlFor="trending" className="ml-2 text-sm text-gray-700">
              Trending Product
            </label>
          </div>
        </div>
        
        {/* Colors and Sizes */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customization Information
            </label>
            <textarea
              id="customizationInfo"
              name="customizationInfo"
              value={formData.customizationInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Enter customization options and instructions (e.g., 'Add your name, Select font style, Maximum characters: 20')"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
          
          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Colors
            </label>
            <div className="flex">
              <Input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Add color (e.g. Red)"
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={handleAddColor} 
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            
            {formData.colors && formData.colors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.colors.map((color) => (
                  <span 
                    key={color} 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Sizes
            </label>
            <div className="flex">
              <Input
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder="Add size (e.g. M, L, XL)"
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={handleAddSize} 
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {formData.sizes && formData.sizes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.sizes.map((size) => (
                  <span 
                    key={size} 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="flex">
              <Input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Image URL"
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={handleAddImage} 
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {formData.images && formData.images.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-4">
    {formData.images.map((img) => (
      <div key={img} className="relative">
        <img
          src={img}
          alt="Product"
          className="w-20 h-20 object-cover rounded border border-gray-300"
        />
        <button
          type="button"
          onClick={() => handleRemoveImage(img)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}

            {errors.images && (
              <p className="mt-1 text-sm text-red-500">{errors.images}</p>
            )}
            {formData.images && formData.images.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {formData.images.map((img) => (
                  <li key={img} className="flex justify-between items-center">
                    <span className="truncate">{img}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProductForm;
