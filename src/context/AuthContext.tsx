import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType | undefined>(initialAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  });

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
