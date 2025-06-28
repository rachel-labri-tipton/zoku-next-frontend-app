import api from '@/utils/axios';
import { AuthResponse, User } from '@/types';
import axios from 'axios';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      // Check if we got the expected data
      if (!response.data.token) {
        throw new Error('No token received');
      }
      // Store token and user in localStorage
      localStorage.setItem('token', response.data.token);
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Optionally redirect to home/dashboard
      window.location.href = '/';

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log specific error information
        console.error('Login Error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await api.get<User>('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log specific error information
        console.error('Get User Error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to login page
  }
};