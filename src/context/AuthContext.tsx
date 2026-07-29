import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { AuthResponse, User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('abank_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('abank_token'));

  const persist = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('abank_user', JSON.stringify(u));
    localStorage.setItem('abank_token', t);
  };

  const login = async (username: string, password: string) => {
    const res = await api.post<{ token: string }>('/api/auth/login', { username, password });
    const token = res.data.token;
    // 先写入令牌，确保后续 /me 请求带上 Authorization 头
    localStorage.setItem('abank_token', token);
    const me = await api.get<AuthResponse>('/api/auth/me');
    persist({ id: me.data.id, username: me.data.username, role: me.data.role as User['role'], kycStatus: me.data.kycStatus as User['kycStatus'] }, token);
  };

  const register = async (username: string, email: string, password: string) => {
    await api.post<AuthResponse>('/api/auth/register', { username, email, password });
    await login(username, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('abank_user');
    localStorage.removeItem('abank_token');
  };

  useEffect(() => {
    if (token && !user) {
      api.get<AuthResponse>('/api/auth/me')
        .then((me) => setUser({ id: me.data.id, username: me.data.username, role: me.data.role as User['role'], kycStatus: me.data.kycStatus as User['kycStatus'] }))
        .catch(() => logout());
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
