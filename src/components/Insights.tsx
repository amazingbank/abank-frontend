import React, { useEffect, useState } from 'react';
import { api } from '../hooks/useApi';
import { InsightSummary } from '../types';

const Insights: React.FC = () => {
  const [data, setData] = useState<InsightSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<InsightSummary>('/api/insights/summary')
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400">生成洞察中...</div>;
  if (!data) return <div className="text-center py-20 text-red-500">无法获取洞察</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">AI 财务洞察</h1>
      <p className="text-xs text-slate-400 mb-6">规则引擎 · 本地计算，无外部 LLM</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="总资产" value={`$${data.totalAssets.toLocaleString()}`} />
        <Stat label="月收入" value={`$${data.monthlyIncome.toLocaleString()}`} />
        <Stat label="月支出" value={`$${data.monthlySpending.toLocaleString()}`} />
        <Stat label="储蓄率" value={data.savingsRate} />
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-4">
        <h2 className="font-semibold text-slate-700 mb-2">消费分类</h2>
        <div className="space-y-2">
          {Object.entries(data.categoryBreakdown).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-slate-600">{k}</span>
              <span className="font-medium">${v.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-4">
        <h2 className="font-semibold text-slate-700 mb-2">财务建议</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {data.advice.map((a, i) => <li key={i}>• {a}</li>)}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-semibold text-slate-700 mb-2">智能预算规划 (50/30/20)</h2>
        <div className="space-y-2 text-sm">
          {Object.entries(data.budgetPlan).map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-slate-600">{k}</span>
              <span className="font-medium">${Number(v).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="text-lg font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

export default Insights;
