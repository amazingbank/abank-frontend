import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../hooks/useApi';
import { Account, InsightSummary } from '../types';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [insight, setInsight] = useState<InsightSummary | null>(null);
  const [error, setError] = useState('');

  // 存款 / 取款
  const [opAccount, setOpAccount] = useState('');
  const [opAmount, setOpAmount] = useState('');
  const [opType, setOpType] = useState<'deposit' | 'withdraw'>('deposit');
  const [opMsg, setOpMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [opLoading, setOpLoading] = useState(false);

  const refresh = () => {
    api.get<Account[]>('/api/accounts/me').then((r) => {
      setAccounts(r.data);
      if (!opAccount && r.data.length) setOpAccount(String(r.data[0].id));
    }).catch((e) => setError(e.message));
  };

  useEffect(() => {
    refresh();
    api.get<InsightSummary>('/api/insights/summary').then((r) => setInsight(r.data)).catch(() => {});
  }, []);

  const doOperate = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpMsg(null);
    setOpLoading(true);
    try {
      await api.post(`/api/transactions/${opType}`, { accountId: Number(opAccount), amount: Number(opAmount) });
      setOpMsg({ type: 'ok', text: opType === 'deposit' ? '存款成功' : '取款成功' });
      setOpAmount('');
      refresh();
    } catch (err) {
      setOpMsg({ type: 'err', text: (err as Error).message });
    } finally {
      setOpLoading(false);
    }
  };

  const total = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">欢迎, {user?.username}</h1>
          <p className="text-sm text-slate-500">总资产 ${total.toLocaleString()} · KYC: {user?.kycStatus}</p>
        </div>
        <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">{user?.role}</span>
      </div>

      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>}

      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="text-lg font-semibold text-slate-700 mb-3">存款 / 取款</h2>
        <form onSubmit={doOperate} className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">账户</label>
            <select className="border border-slate-300 rounded-lg px-3 py-2" value={opAccount}
              onChange={(e) => setOpAccount(e.target.value)} required>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>{a.accountType} · {a.accountNumber} (${a.balance})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">金额</label>
            <input type="number" step="0.01" min="0.01" className="w-32 border border-slate-300 rounded-lg px-3 py-2"
              value={opAmount} onChange={(e) => setOpAmount(e.target.value)} placeholder="0.00" required />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpType('deposit')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${opType === 'deposit' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>存款</button>
            <button type="button" onClick={() => setOpType('withdraw')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${opType === 'withdraw' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>取款</button>
          </div>
          <button type="submit" disabled={opLoading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
            {opLoading ? '处理中...' : '确认'}
          </button>
        </form>
        {opMsg && <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${opMsg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{opMsg.text}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/accounts" className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
          <p className="text-sm text-slate-500">我的账户</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{accounts.length}</p>
        </Link>
        <Link to="/transfer" className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
          <p className="text-sm text-slate-500">转账 / 批量</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">→</p>
        </Link>
        <Link to="/investment" className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
          <p className="text-sm text-slate-500">投资组合</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">$</p>
        </Link>
      </div>

      <h2 className="text-lg font-semibold text-slate-700 mb-3">我的账户</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500">{a.accountType} · {a.accountNumber}</p>
                <p className="text-xl font-bold text-slate-800 mt-1">${a.balance.toLocaleString()}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{a.status}</span>
            </div>
          </div>
        ))}
      </div>

      {insight && (
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-5">
          <p className="text-sm opacity-80">AI 财务洞察</p>
          <p className="text-lg font-semibold mt-1">储蓄率 {insight.savingsRate} · 净流入 ${insight.netCashFlow.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-2">{insight.advice[0]}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
