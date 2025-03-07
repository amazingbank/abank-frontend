import { useFormat } from './useFormat';

interface BalanceOptions {
  showZero?: boolean;
  colorize?: boolean;
  compact?: boolean;
}

interface RateOptions {
  decimals?: number;
  includePlus?: boolean;
}

export const useFinancialFormat = () => {
  const { formatMoney, formatIntelligentNumber, formatPercentage, defaultCurrency } = useFormat();

  const formatBalance = (amount: number, options: BalanceOptions = {}) => {
    const { showZero = false, colorize = true, compact = false } = options;
    
    if (amount === 0 && !showZero) {
      return '—';
    }

    const formatted = compact 
      ? formatIntelligentNumber(amount, { style: 'currency', currency: defaultCurrency })
      : formatMoney(amount);

    if (colorize) {
      return {
        value: formatted,
        className: amount > 0 ? 'text-green-600' : amount < 0 ? 'text-red-600' : 'text-gray-600'
      };
    }

    return formatted;
  };

  const formatRate = (rate: number, options: RateOptions = {}) => {
    const { decimals = 2, includePlus = false } = options;
    
    const value = formatPercentage(rate, decimals);
    return includePlus && rate > 0 ? `+${value}` : value;
  };

  const formatChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const formatted = formatRate(change, { includePlus: true });
    
    return {
      value: formatted,
      className: change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600',
      icon: change > 0 ? 'trend-up' : change < 0 ? 'trend-down' : 'minus'
    };
  };

  return {
    formatBalance,
    formatRate,
    formatChange
  };
};