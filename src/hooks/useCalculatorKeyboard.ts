import { useCallback, KeyboardEvent } from 'react';
import { useFinancialKeyboard } from './useFinancialKeyboard';

interface UseCalculatorKeyboardOptions {
  onCalculate: () => void;
  onReset?: () => void;
  focusMap: {
    principal: () => void;
    rate: () => void;
    months: () => void;
    calculate: () => void;
  };
}

export const useCalculatorKeyboard = (options: UseCalculatorKeyboardOptions) => {
  const { handleKeyDown: handleFinancialKeyDown } = useFinancialKeyboard();

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    // Allow financial keyboard handling for input fields
    if (event.target instanceof HTMLInputElement) {
      handleFinancialKeyDown(event as KeyboardEvent<HTMLInputElement>);
      return;
    }

    // Global calculator shortcuts
    if (event.altKey) {
      switch (event.key) {
        case 'c':  // Alt + C to calculate
          event.preventDefault();
          options.onCalculate();
          break;
        case 'r':  // Alt + R to reset
          event.preventDefault();
          options.onReset?.();
          break;
      }
    }

    // Field navigation with arrow keys
    if (event.ctrlKey) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          options.focusMap.principal();
          break;
        case 'ArrowDown':
          event.preventDefault();
          options.focusMap.months();
          break;
        case 'Enter':
          event.preventDefault();
          options.focusMap.calculate();
          break;
      }
    }
  }, [options, handleFinancialKeyDown]);

  return {
    handleKeyDown,
    keyboardHints: {
      calculate: 'Alt + C',
      reset: 'Alt + R',
      navigate: 'Ctrl + ↑/↓',
      confirm: 'Ctrl + Enter'
    }
  };
};