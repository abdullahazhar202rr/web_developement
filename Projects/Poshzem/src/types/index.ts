export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'rings' | 'watches' | 'necklaces' | 'earrings' | 'bracelets';
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  featured?: boolean;
  specifications?: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: string;
  customerMessage?: string;
}

export interface User {
  email: string;
  isAdmin: boolean;
}

export interface AdminState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: 'cod' | 'jazzcash' | 'card';
  paymentDetails?: {
    cardNumber?: string;
    jazzcashNumber?: string;
  };
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  notes?: string;
}

export type FilterType = 'all' | 'rings' | 'watches' | 'necklaces' | 'earrings' | 'bracelets';