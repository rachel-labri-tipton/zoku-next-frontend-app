'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/utils/axios';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Raw response:', response); // Debug log

      // Fixed token extraction
      const newToken = response.data?.token
      console.log('Extracted token:', newToken); // Debug log
      if (!newToken) {
        throw new Error('No token received in response');
      }

      localStorage.setItem('token', newToken);
      setToken(newToken);
      console.log('Token set:', newToken); // Debug log
      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        error,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  return (
    <AuthContext.Provider 
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}