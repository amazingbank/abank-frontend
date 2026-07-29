import React, { useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { Portfolio } from '../types';

const Investment: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [calc, setCalc] = useState({ principal: 10000, rate: 5, years: 3, frequency: 12 });
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    api.get<Portfolio>('/api/investment/portfolio').then((r) => setPortfolio(r.data)).catch(() => {});
  }, []);

  const calculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.get<any>(
      `/api/investment/interest?principal=${calc.principal}&rate=${calc.rate}&years=${calc.years}&frequency=${calc.frequency}`);
    setResult(res.data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">投资服务</h1>

      {portfolio && (
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="font-semibold text-slate-700 mb-2">投资组合概览</h2>
          <p className="text-sm text-slate-500 mb-3">总资产 ${portfolio.totalAssets.toLocaleString()} · {portfolio.accountCount} 个账户</p>
          <div className="space-y-2 text-sm">
            {Object.entries(portfolio.byType).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-slate-600">{k}</span>
                <span className="font-medium">${Number(v).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={calculate} className="bg-white rounded-xl shadow p-5 space-y-3">
        <h2 className="font-semibold text-slate-700">利率计算器</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label="本金" value={calc.principal} onChange={(v) => setCalc({ ...calc, principal: v })} />
          <Field label="年利率 %" value={calc.rate} onChange={(v) => setCalc({ ...calc, rate: v })} />
          <Field label="年限" value={calc.years} onChange={(v) => setCalc({ ...calc, years: v })} />
          <Field label="复利频率/年" value={calc.frequency} onChange={(v) => setCalc({ ...calc, frequency: v })} />
        </div>
        <button className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700">计算</button>
      </form>

      {result && (
        <div className="mt-4 bg-slate-50 rounded-xl p-5 text-sm space-y-1">
          <p>简单利息：<b>${Number(result.simpleInterest).toLocaleString()}</b></p>
          <p>复利利息：<b>${Number(result.compoundInterest).toLocaleString()}</b></p>
          <p>单利本息合计：<b>${Number(result.totalWithSimple).toLocaleString()}</b></p>
          <p>复利本息合计：<b>${Number(result.totalWithCompound).toLocaleString()}</b></p>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs text-slate-500 mb-1">{label}</label>
    <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2"
      value={value} onChange={(e) => onChange(Number(e.target.value))} />
  </div>
);

export default Investment;
