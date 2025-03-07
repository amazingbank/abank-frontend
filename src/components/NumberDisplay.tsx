import React from 'react';
import { useAccessibleFormat } from '../hooks/useAccessibleFormat';
import { useCurrency } from '../hooks/useCurrency';

interface NumberDisplayProps {
  value: number;
  type?: 'number' | 'currency' | 'percentage';
  className?: string;
  ariaLabel?: string;
  showTrend?: boolean;
  previousValue?: number;
  compact?: boolean;
  sourceCurrency?: string;
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({
  value,
  type = 'number',
  className = '',
  ariaLabel,
  showTrend = false,
  previousValue,
  compact = false,
  sourceCurrency = 'USD'
}) => {
  const { formatAccessibleNumber, formatAccessibleMoney, formatAccessibleRate } = useAccessibleFormat();
  const { convertAmount, getPreferredCurrency } = useCurrency();

  const getConvertedValue = () => {
    if (type === 'currency') {
      const targetCurrency = getPreferredCurrency();
      return convertAmount(value, sourceCurrency, targetCurrency);
    }
    return value;
  };

  const convertedValue = getConvertedValue();
  const convertedPrevious = previousValue && type === 'currency' 
    ? convertAmount(previousValue, sourceCurrency, getPreferredCurrency())
    : previousValue;

  switch (type) {
    case 'currency':
      return formatAccessibleMoney(convertedValue, {
        className,
        ariaLabel: ariaLabel || `${value} ${sourceCurrency}`,
        wrapperElement: 'span'
      });
    case 'percentage':
      return formatAccessibleRate(convertedValue, {
        className,
        ariaLabel,
        wrapperElement: 'span'
      });
    default:
      return formatAccessibleNumber(convertedValue, {
        className,
        ariaLabel,
        wrapperElement: 'span'
      });
  }
};