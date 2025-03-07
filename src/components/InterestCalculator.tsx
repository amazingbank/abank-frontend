import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CurrencyInput } from './CurrencyInput';
import { NumberDisplay } from './NumberDisplay';
import { Calculator, RefreshCw } from 'lucide-react';
import { useCalculatorKeyboard } from '../hooks/useCalculatorKeyboard';
import LiveRegion from './LiveRegion';
import { useFormat } from '../hooks/useFormat';

interface CalculationResult {
  futureValue: number;
  totalInterest: number;
  monthlyInterest: number;
}

interface ValidationErrors {
  principal?: string;
  rate?: string;
  months?: string;
}

const InterestCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { formatMoney } = useFormat();
  const [principal, setPrincipal] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [announcement, setAnnouncement] = useState('');
  const [errorAnnouncement, setErrorAnnouncement] = useState('');

  // Refs for keyboard navigation
  const principalRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const monthsRef = useRef<HTMLInputElement>(null);
  const calculateRef = useRef<HTMLButtonElement>(null);

  const resetForm = useCallback(() => {
    setPrincipal(null);
    setRate(null);
    setMonths(null);
    setResult(null);
    setErrors({});
    setAnnouncement(t('calculator.announcements.reset'));
    principalRef.current?.focus();
  }, [t]);

  const validateInputs = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!principal) {
      newErrors.principal = t('calculator.error.required');
    } else if (principal <= 0) {
      newErrors.principal = t('calculator.error.positive');
    }

    if (!rate) {
      newErrors.rate = t('calculator.error.required');
    } else if (rate <= 0 || rate > 100) {
      newErrors.rate = t('calculator.error.rate_range');
    }

    if (!months) {
      newErrors.months = t('calculator.error.required');
    } else if (months < 1 || months > 360) {
      newErrors.months = t('calculator.error.months_range');
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join(', ');
      setErrorAnnouncement(t('calculator.announcements.error', { errors: errorMessages }));
    }
    
    return Object.keys(newErrors).length === 0;
  }, [principal, rate, months, t]);

  const calculateInterest = useCallback(() => {
    if (!validateInputs()) {
      return;
    }

    if (principal && rate && months) {
      const monthlyRate = (rate / 100) / 12;
      const futureValue = principal * Math.pow(1 + monthlyRate, months);
      const totalInterest = futureValue - principal;
      const monthlyInterest = totalInterest / months;

      const newResult = {
        futureValue,
        totalInterest,
        monthlyInterest
      };
      
      setResult(newResult);
      
      // Announce results to screen readers
      setAnnouncement(t('calculator.announcements.calculated', {
        amount: formatMoney(newResult.futureValue),
        interest: formatMoney(newResult.totalInterest),
        monthly: formatMoney(newResult.monthlyInterest)
      }));
    }
  }, [principal, rate, months, validateInputs, t, formatMoney]);

  const handlePrincipalChange = (value: number | null) => {
    setPrincipal(value);
    if (errors.principal) {
      setErrors(prev => ({ ...prev, principal: undefined }));
    }
  };

  const handleRateChange = (value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setRate(numValue);
    if (errors.rate) {
      setErrors(prev => ({ ...prev, rate: undefined }));
    }
  };

  const handleMonthsChange = (value: string) => {
    const numValue = value === '' ? null : parseInt(value);
    setMonths(numValue);
    if (errors.months) {
      setErrors(prev => ({ ...prev, months: undefined }));
    }
  };

  const { handleKeyDown, keyboardHints } = useCalculatorKeyboard({
    onCalculate: calculateInterest,
    onReset: resetForm,
    focusMap: {
      principal: () => principalRef.current?.focus(),
      rate: () => rateRef.current?.focus(),
      months: () => monthsRef.current?.focus(),
      calculate: () => calculateRef.current?.focus()
    }
  });

  return (
    <div 
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={t('calculator.title')}
    >
      <LiveRegion message={announcement} />
      <LiveRegion message={errorAnnouncement} isError={true} />
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Calculator className="h-6 w-6 text-blue-600 mr-2" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900">
              {t('calculator.title')}
            </h2>
          </div>
          <button
            onClick={resetForm}
            className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600"
            aria-label={t('calculator.reset')}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            {t('calculator.reset')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CurrencyInput
            ref={principalRef}
            label={t('calculator.principal')}
            value={principal || undefined}
            onChange={handlePrincipalChange}
            placeholder="0.00"
            sourceCurrency="USD"
            error={errors.principal}
          />

          <div className="relative">
            <label 
              htmlFor="rate-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t('calculator.rate')}
            </label>
            <input
              ref={rateRef}
              id="rate-input"
              type="number"
              value={rate ?? ''}
              onChange={(e) => handleRateChange(e.target.value)}
              placeholder="0.00"
              className={`block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.rate ? 'border-red-300' : ''}`}
              step="0.01"
              min="0"
              max="100"
              aria-invalid={errors.rate ? 'true' : 'false'}
              aria-describedby={errors.rate ? 'rate-error' : undefined}
            />
            {errors.rate && (
              <p 
                id="rate-error"
                className="mt-2 text-sm text-red-600"
                role="alert"
              >
                {errors.rate}
              </p>
            )}
          </div>

          <div className="relative">
            <label 
              htmlFor="months-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t('calculator.months')}
            </label>
            <input
              ref={monthsRef}
              id="months-input"
              type="number"
              value={months ?? ''}
              onChange={(e) => handleMonthsChange(e.target.value)}
              placeholder="12"
              className={`block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                ${errors.months ? 'border-red-300' : ''}`}
              min="1"
              max="360"
              aria-invalid={errors.months ? 'true' : 'false'}
              aria-describedby={errors.months ? 'months-error' : undefined}
            />
            {errors.months && (
              <p 
                id="months-error"
                className="mt-2 text-sm text-red-600"
                role="alert"
              >
                {errors.months}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            ref={calculateRef}
            onClick={calculateInterest}
            disabled={!principal || !rate || !months}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
            aria-describedby="keyboard-hints"
          >
            {t('calculator.calculate')}
          </button>
          <div id="keyboard-hints" className="mt-2 text-xs text-gray-500 text-center">
            <span className="mr-4">{keyboardHints.calculate}: {t('calculator.keyboard.calculate')}</span>
            <span className="mr-4">{keyboardHints.reset}: {t('calculator.keyboard.reset')}</span>
            <span>{keyboardHints.navigate}: {t('calculator.keyboard.navigate')}</span>
          </div>
        </div>

        {result && (
          <div 
            className="mt-8 border-t pt-6"
            role="region"
            aria-label={t('calculator.results')}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('calculator.results')}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">
                  {t('calculator.future_value')}
                </div>
                <NumberDisplay
                  value={result.futureValue}
                  type="currency"
                  className="text-lg font-bold text-gray-900"
                  sourceCurrency="USD"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">
                  {t('calculator.total_interest')}
                </div>
                <NumberDisplay
                  value={result.totalInterest}
                  type="currency"
                  className="text-lg font-bold text-green-600"
                  sourceCurrency="USD"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">
                  {t('calculator.monthly_interest')}
                </div>
                <NumberDisplay
                  value={result.monthlyInterest}
                  type="currency"
                  className="text-lg font-bold text-blue-600"
                  sourceCurrency="USD"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestCalculator;
