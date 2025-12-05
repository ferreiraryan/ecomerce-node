import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import * as authService from '../services/authService';
import type { User } from '../types/User';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (data: authService.LoginDTO) => Promise<void>;
  register: (data: authService.RegisterDTO) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem('@Ecommerce:token');
      const storedUser = localStorage.getItem('@Ecommerce:user');

      if (storedToken && storedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        try {
          const response = await api.get('/auth/profile');
          setUser(response.data.user || JSON.parse(storedUser));
        } catch (error) {
          console.error("Token inválido ou expirado.", error);
          signOut();
        }
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async ({ email, password }: authService.LoginDTO) => {
    const response = await authService.login({ email, password });
    const { token, user } = response;

    localStorage.setItem('@Ecommerce:token', token);
    localStorage.setItem('@Ecommerce:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const register = async ({ name, email, password }: authService.RegisterDTO) => {
    const response = await authService.registerUser({ name, email, password });
    const { token, user } = response;

    localStorage.setItem('@Ecommerce:token', token);
    localStorage.setItem('@Ecommerce:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem('@Ecommerce:token');
    localStorage.removeItem('@Ecommerce:user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 text-sm font-medium animate-pulse">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
