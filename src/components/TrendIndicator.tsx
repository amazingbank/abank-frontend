import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useFinancialFormat } from '../hooks/useFinancialFormat';

interface TrendIndicatorProps {
  currentValue: number;
  previousValue: number;
  className?: string;
  showPercentage?: boolean;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  currentValue,
  previousValue,
  className = '',
  showPercentage = true
}) => {
  const { formatChange } = useFinancialFormat();
  const change = formatChange(currentValue, previousValue);
  
  const getIcon = () => {
    switch (change.icon) {
      case 'trend-up':
        return (
          <TrendingUp 
            className="h-4 w-4" 
            aria-label="Increasing trend"
          />
        );
      case 'trend-down':
        return (
          <TrendingDown 
            className="h-4 w-4" 
            aria-label="Decreasing trend"
          />
        );
      default:
        return (
          <Minus 
            className="h-4 w-4" 
            aria-label="No change"
          />
        );
    }
  };

  return (
    <div 
      className={`flex items-center ${change.className} ${className}`}
      role="status"
      aria-label={`Trend: ${change.value}`}
    >
      {getIcon()}
      {showPercentage && (
        <span className="ml-1" aria-hidden="true">
          {change.value}
        </span>
      )}
    </div>
  );
};