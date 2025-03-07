import { KeyboardEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocaleNumberFormat } from '../utils/numberInputHandler';

export const useFinancialKeyboard = () => {
  const { currentLocale } = useLanguage();
  const format = getLocaleNumberFormat(currentLocale);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    options: {
      allowDecimals?: boolean;
      maxDecimals?: number;
      onIncrement?: () => void;
      onDecrement?: () => void;
    } = {}
  ) => {
    const {
      allowDecimals = true,
      maxDecimals = 2,
      onIncrement,
      onDecrement
    } = options;

    const input = event.currentTarget;
    const value = input.value;

    // Handle up/down arrow keys for incrementing/decrementing
    if (event.key === 'ArrowUp' && onIncrement) {
      event.preventDefault();
      onIncrement();
      return;
    }
    if (event.key === 'ArrowDown' && onDecrement) {
      event.preventDefault();
      onDecrement();
      return;
    }

    // Allow navigation keys
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Tab' ||
      event.key === 'Enter' ||
      (event.ctrlKey || event.metaKey)
    ) {
      return;
    }

    // Only allow numbers and special characters
    if (!/[\d\.\,\-]/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Handle decimal separator
    if (event.key === '.' || event.key === ',') {
      if (!allowDecimals || value.includes(format.decimalSeparator)) {
        event.preventDefault();
        return;
      }
      // Replace typed separator with locale-specific one
      if (event.key !== format.decimalSeparator) {
        event.preventDefault();
        const newValue = value + format.decimalSeparator;
        input.value = newValue;
        return;
      }
    }

    // Check decimal places
    if (allowDecimals && value.includes(format.decimalSeparator)) {
      const parts = value.split(format.decimalSeparator);
      if (parts[1] && parts[1].length >= maxDecimals) {
        event.preventDefault();
        return;
      }
    }
  };

  return {
    handleKeyDown
  };
};