import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;