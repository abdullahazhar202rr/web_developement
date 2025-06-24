import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, AdminState, User, Order } from '../types';
import { initialProducts } from '../data/products';

interface AppState {
  products: Product[];
  cart: CartItem[];
  admin: AdminState;
  orders: Order[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; customization?: string; customerMessage?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADMIN_LOGIN'; payload: User }
  | { type: 'ADMIN_LOGOUT' }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  products: initialProducts,
  cart: [],
  admin: {
    isAuthenticated: false,
    user: null,
  },
  orders: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { 
                  ...item, 
                  quantity: item.quantity + 1,
                  customization: action.payload.customization || item.customization,
                  customerMessage: action.payload.customerMessage || item.customerMessage
                }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { 
          product: action.payload.product, 
          quantity: 1,
          customization: action.payload.customization,
          customerMessage: action.payload.customerMessage
        }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADMIN_LOGIN':
      return {
        ...state,
        admin: {
          isAuthenticated: true,
          user: action.payload,
        },
      };
    case 'ADMIN_LOGOUT':
      return {
        ...state,
        admin: {
          isAuthenticated: false,
          user: null,
        },
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('poshzem-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('poshzem-state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}