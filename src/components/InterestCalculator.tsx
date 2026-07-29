import React, { useState } from 'react';
import { Calculator, TrendingUp, RefreshCw } from 'lucide-react';
import { InterestResult } from '../types';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('3.5');
  const [years, setYears] = useState('5');
  const [frequency, setFrequency] = useState('12');
  const [result, setResult] = useState<InterestResult | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseInt(frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) return;

    const simpleInterest = p * r * t;
    const compoundInterest = p * Math.pow(1 + r / n, n * t) - p;
    const totalWithSimple = p + simpleInterest;
    const totalWithCompound = p + compoundInterest;

    setResult({
      principal: p,
      rate: parseFloat(rate),
      years: t,
      simpleInterest: Math.round(simpleInterest * 100) / 100,
      compoundInterest: Math.round(compoundInterest * 100) / 100,
      totalWithSimple: Math.round(totalWithSimple * 100) / 100,
      totalWithCompound: Math.round(totalWithCompound * 100) / 100,
      frequency: n,
    });
  };

  const reset = () => {
    setPrincipal('10000');
    setRate('3.5');
    setYears('5');
    setFrequency('12');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            利率计算器
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            计算储蓄账户的简单利息与复利收益
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                本金 ($)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="10000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年利率 (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="3.5"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                期限 (年)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="5"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                复利频率 (次/年)
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="1">年复利 (1次/年)</option>
                <option value="4">季复利 (4次/年)</option>
                <option value="12">月复利 (12次/年)</option>
                <option value="365">日复利 (365次/年)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={calculate}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-sm"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              计算收益
            </button>
            <button
              onClick={reset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              重置
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              计算结果
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Simple Interest Card */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">简单利息</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${result.simpleInterest.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  到期总金额: <span className="font-semibold text-gray-700">${result.totalWithSimple.toLocaleString()}</span>
                </p>
              </div>

              {/* Compound Interest Card */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">复利收益 (年{result.frequency}次复利)</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${result.compoundInterest.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  到期总金额: <span className="font-semibold text-blue-700">${result.totalWithCompound.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                💡 采用{result.frequency === 365 ? '日' : result.frequency === 12 ? '月' : result.frequency === 4 ? '季' : '年'}复利，相比简单利息可多赚{' '}
                <span className="font-bold">
                  ${(result.totalWithCompound - result.totalWithSimple).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestCalculator;
