import React, { useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { Transaction } from '../types';

const Transactions: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<Transaction[]>('/api/transactions/me').then((r) => setTxs(r.data)).catch((e) => setError(e.message));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">交易记录</h1>
      {error && <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</div>}
      <div className="space-y-3">
        {txs.length === 0 && <p className="text-slate-400 text-sm">暂无交易</p>}
        {txs.map((t) => (
          <div key={t.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-slate-800">{t.type} · ${t.amount.toLocaleString()}</p>
              <p className="text-xs text-slate-400">#{t.transactionId.slice(0, 8)} · {new Date(t.createdAt).toLocaleString()}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
