import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage.tsx';
import ProductsPage from '../pages/ProductsPage.tsx';
import { AuthProvider, useAuth } from '../context/AuthContext.tsx';
import type { JSX } from 'react';
import CartPage from '../pages/CartPage.tsx';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/register" />;
};

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/products/*"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          >
            <Route path="category/:category" element={<ProductsPage />} />
            <Route path="search" element={<ProductsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/register" />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
