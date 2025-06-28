'use client';

import React, { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/day');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(typeof err === 'string' ? err : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white border shadow-lg rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold font-raleway mb-4 text-center">Login</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            disabled={isLoading}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            disabled={isLoading}
          />
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
