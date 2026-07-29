import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">注册新账户</h1>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
            <input className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required minLength={3} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
            <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">密码（至少6位）</label>
            <input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60">
            {loading ? '注册中...' : '注册并登录'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          已有账号？<Link to="/login" className="text-blue-600 hover:underline">登录</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
