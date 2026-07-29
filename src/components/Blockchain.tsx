import React, { useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { Transaction } from '../types';

const Blockchain: React.FC = () => {
  const [txId, setTxId] = useState('');
  const [result, setResult] = useState<{ transactionId: string; result: string } | null>(null);
  const [error, setError] = useState('');
  const [myTxs, setMyTxs] = useState<Transaction[]>([]);

  const verify = async (id: string) => {
    if (!id) return;
    setTxId(id);
    setError(''); setResult(null);
    try {
      const res = await api.get<{ transactionId: string; result: string }>(`/api/transactions/verify/${id}`);
      setResult(res.data);
    } catch (err) { setError((err as Error).message); }
  };

  useEffect(() => {
    api.get<Transaction[]>('/api/transactions/me').then((r) => setMyTxs(r.data)).catch(() => {});
  }, []);

  const valid = result?.result.startsWith('VALID');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">区块链存证验证</h1>
      <p className="text-xs text-slate-400 mb-6">交易关键字段经 SHA-256 哈希存证（演示级，本地计算）</p>

      <form onSubmit={(e) => { e.preventDefault(); verify(txId); }} className="bg-white rounded-xl shadow p-5 space-y-3">
        <input className="w-full border border-slate-300 rounded-lg px-3 py-2" placeholder="输入交易号 transactionId（或点击下方交易自动填入）"
          value={txId} onChange={(e) => setTxId(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700">验证存证</button>
      </form>

      <div className="mt-6">
        <h2 className="text-sm font-semibold text-slate-600 mb-2">我的交易（点击直接验证）</h2>
        <div className="space-y-2">
          {myTxs.length === 0 && <p className="text-xs text-slate-400">暂无交易，先去存款/转账产生一笔吧</p>}
          {myTxs.map((t) => (
            <button key={t.id} onClick={() => verify(t.transactionId)}
              className="w-full text-left bg-white rounded-lg shadow px-4 py-3 hover:ring-2 hover:ring-blue-400 transition">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-800">{t.type} · ${t.amount}</span>
                <span className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 break-all">#{t.transactionId}</p>
            </button>
          ))}
        </div>
      </div>

      {error && <div className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</div>}
      {result && (
        <div className={`mt-4 rounded-xl p-5 ${valid ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className={`font-semibold ${valid ? 'text-green-700' : 'text-red-600'}`}>
            {valid ? '✓ 存证有效 (VALID)' : '✗ 数据被篡改 (TAMPERED)'}
          </p>
          <p className="text-xs text-slate-500 mt-2 break-all">TX: {result.transactionId}</p>
          {valid && <p className="text-xs text-slate-500 break-all mt-1">HASH: {result.result.replace('VALID:', '')}</p>}
        </div>
      )}
    </div>
  );
};

export default Blockchain;
