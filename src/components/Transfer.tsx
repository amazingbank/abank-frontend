import React, { useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { Account } from '../types';

interface BatchRow { toAccountId: string; amount: string; }

const Transfer: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [batch, setBatch] = useState<BatchRow[]>([{ toAccountId: '', amount: '' }]);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get<Account[]>('/api/accounts/me').then((r) => {
      setAccounts(r.data);
      if (r.data.length) setFromAccountId(String(r.data[0].id));
    }).catch(() => {});
  }, []);

  const single = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      const res = await api.post('/api/transactions/transfer', {
        fromAccountId: Number(fromAccountId), toAccountId: Number(toAccountId), amount: Number(amount),
      });
      setMsg({ type: 'ok', text: (res.message || '转账成功') + ` (TX: ${res.data.transactionId})` });
      setAmount('');
    } catch (err) { setMsg({ type: 'err', text: (err as Error).message }); }
    finally { setLoading(false); }
  };

  const batchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      const items = batch.filter((b) => b.toAccountId && b.amount)
        .map((b) => ({ toAccountId: Number(b.toAccountId), amount: Number(b.amount) }));
      const res = await api.post('/api/transactions/batch-transfer', { fromAccountId: Number(fromAccountId), items });
      const ok = res.data.filter((d: any) => d.status === 'SUCCESS').length;
      const fail = res.data.length - ok;
      setMsg({ type: 'ok', text: `批量完成：成功 ${ok}，失败 ${fail}` });
    } catch (err) { setMsg({ type: 'err', text: (err as Error).message }); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">转账</h1>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'single' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>单笔转账</button>
        <button onClick={() => setMode('batch')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'batch' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>批量转账</button>
      </div>

      {msg && <div className={`mb-4 text-sm rounded-lg px-3 py-2 ${msg.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{msg.text}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">转出账户</label>
        <select className="w-full border border-slate-300 rounded-lg px-3 py-2" value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.accountType} · {a.accountNumber} (${a.balance})</option>)}
        </select>
      </div>

      {mode === 'single' ? (
        <form onSubmit={single} className="space-y-4 bg-white rounded-xl shadow p-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">转入账户 ID</label>
            <input className="w-full border border-slate-300 rounded-lg px-3 py-2" type="number"
              value={toAccountId} onChange={(e) => setToAccountId(e.target.value)} placeholder="目标账户数字ID" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">金额</label>
            <input className="w-full border border-slate-300 rounded-lg px-3 py-2" type="number" step="0.01"
              value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <p className="text-xs text-slate-400 mt-1">单笔上限 $50,000 · 日累计 $200,000</p>
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 disabled:opacity-60">
            {loading ? '处理中...' : '确认转账'}
          </button>
        </form>
      ) : (
        <form onSubmit={batchSubmit} className="space-y-3 bg-white rounded-xl shadow p-5">
          {batch.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 border border-slate-300 rounded-lg px-3 py-2" type="number" placeholder="目标账户ID"
                value={row.toAccountId} onChange={(e) => setBatch(batch.map((b, j) => j === i ? { ...b, toAccountId: e.target.value } : b))} />
              <input className="flex-1 border border-slate-300 rounded-lg px-3 py-2" type="number" step="0.01" placeholder="金额"
                value={row.amount} onChange={(e) => setBatch(batch.map((b, j) => j === i ? { ...b, amount: e.target.value } : b))} />
              <button type="button" onClick={() => setBatch(batch.filter((_, j) => j !== i))}
                className="px-3 text-red-500">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setBatch([...batch, { toAccountId: '', amount: '' }])}
            className="text-sm text-blue-600">+ 添加一笔</button>
          <button disabled={loading} className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 disabled:opacity-60">
            {loading ? '处理中...' : '批量提交'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Transfer;
