import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity, color, size } = item;
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };
  
  return (
    <div className="flex py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-medium text-gray-900 hover:text-rose-500">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500 capitalize">
              {product.category}
              {color && ` • ${color}`}
              {size && ` • ${size}`}
            </p>
          </div>
          <p className="text-base font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-rose-500"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-900">{quantity}</span>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-rose-500"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex items-center">
            <p className="font-medium">
              ${(product.price * quantity).toFixed(2)}
            </p>
            <button
              type="button"
              className="ml-4 text-gray-400 hover:text-red-500"
              onClick={() => onRemove(product.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;