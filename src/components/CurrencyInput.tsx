import React, { InputHTMLAttributes, useCallback } from 'react';
import { useCurrencyInput } from '../hooks/useCurrencyInput';
import { useFinancialKeyboard } from '../hooks/useFinancialKeyboard';
import { useTranslation } from 'react-i18next';

interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number;
  sourceCurrency?: string;
  onChange?: (value: number | null) => void;
  label?: string;
  error?: string;
  showCurrency?: boolean;
  step?: number;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  sourceCurrency,
  onChange,
  label,
  error,
  showCurrency = true,
  step = 1,
  className = '',
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const {
    value: inputValue,
    onChange: handleChange,
    formatDisplay,
    parsedValue
  } = useCurrencyInput({
    initialValue: value,
    sourceCurrency,
    onValueChange: onChange
  });

  const { handleKeyDown } = useFinancialKeyboard();

  const handleIncrement = useCallback(() => {
    const newValue = (parsedValue || 0) + step;
    onChange?.(newValue);
  }, [parsedValue, step, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = (parsedValue || 0) - step;
    if (newValue >= 0) {
      onChange?.(newValue);
    }
  }, [parsedValue, step, onChange]);

  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = `${inputId}-help`;

  return (
    <div className="relative">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div 
        className="relative rounded-md shadow-sm"
        role="group"
        aria-labelledby={label ? inputId : undefined}
      >
        {showCurrency && (
          <div 
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <span className="text-gray-500 sm:text-sm">
              {formatDisplay('').trim()}
            </span>
          </div>
        )}
        <input
          {...props}
          id={inputId}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, {
            allowDecimals: true,
            maxDecimals: 2,
            onIncrement: handleIncrement,
            onDecrement: handleDecrement
          })}
          className={`
            block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${showCurrency ? 'pl-12' : 'pl-3'}
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${errorId ? errorId + ' ' : ''}${helpId}`}
          role="spinbutton"
          aria-valuenow={parsedValue || undefined}
          aria-valuemin={0}
          aria-valuemax={props.max ? Number(props.max) : undefined}
        />
        <span id={helpId} className="sr-only">
          {t('common.keyboard_hints.currency_input', {
            defaultValue: 'Use up and down arrow keys to adjust value. Alt + arrows for larger steps.'
          })}
        </span>
      </div>
      {error && (
        <p 
          className="mt-2 text-sm text-red-600" 
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};