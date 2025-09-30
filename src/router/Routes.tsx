import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import UsersTable from '../pages/UsersTable';
import { AuthProvider, useAuth } from '../context/AuthContext.tsx';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/register" />;
};

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersTable />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
