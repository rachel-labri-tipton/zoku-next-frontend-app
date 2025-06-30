'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import api from '@/utils/axios';
import { User } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      if (isLoggedIn && token) {
        try {
          const { data } = await api.get('/users/me');
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
      setIsLoading(false);
    }

    fetchUser();
  }, [isLoggedIn, token]);

  return (
    <UserContext.Provider 
      value={{
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}