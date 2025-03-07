import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from './useCurrency';
import { parseLocaleNumber, formatLocaleNumber } from '../utils/numberInputHandler';

interface UseCurrencyInputOptions {
  initialValue?: number;
  sourceCurrency?: string;
  onValueChange?: (value: number | null) => void;
}

export const useCurrencyInput = (options: UseCurrencyInputOptions = {}) => {
  const { currentLocale } = useLanguage();
  const { convertAmount, getPreferredCurrency, getCurrencySymbol } = useCurrency();
  const [inputValue, setInputValue] = useState(() => {
    if (options.initialValue !== undefined) {
      const converted = convertAmount(
        options.initialValue,
        options.sourceCurrency,
        getPreferredCurrency()
      );
      return formatLocaleNumber(converted, currentLocale, 2);
    }
    return '';
  });

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    
    const parsedValue = parseLocaleNumber(value, currentLocale);
    if (parsedValue !== null && options.onValueChange) {
      // Convert back to source currency if needed
      const sourceValue = options.sourceCurrency ? 
        convertAmount(parsedValue, getPreferredCurrency(), options.sourceCurrency) :
        parsedValue;
      
      options.onValueChange(sourceValue);
    } else if (parsedValue === null && options.onValueChange) {
      options.onValueChange(null);
    }
  }, [currentLocale, options.onValueChange, options.sourceCurrency]);

  const formatDisplayValue = useCallback((value: string) => {
    const symbol = getCurrencySymbol(getPreferredCurrency());
    return `${symbol} ${value}`;
  }, [getPreferredCurrency]);

  return {
    value: inputValue,
    onChange: handleInputChange,
    formatDisplay: formatDisplayValue,
    parsedValue: parseLocaleNumber(inputValue, currentLocale)
  };
};