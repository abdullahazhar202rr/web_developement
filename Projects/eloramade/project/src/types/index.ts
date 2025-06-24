// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
  rating?: number;
  reviews?: Review[];
  customizationInfo?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type Category = 'weddings' | 'birthdays' | 'anniversaries' | 'festivals' | 'personalized' | 'corporate';

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

// User Types
export interface User {
  email: string;
  isAdmin: boolean;
}

// Filter Types
export interface Filters {
  category?: Category;
  colors?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}