import React from 'react';
import { useFormat } from './useFormat';
import { useLanguage } from '../contexts/LanguageContext';
import { useFinancialFormat } from './useFinancialFormat';

interface AccessibleNumberProps {
  wrapperElement?: keyof JSX.IntrinsicElements;
  className?: string;
  ariaLabel?: string;
}

export const useAccessibleFormat = () => {
  const { currentLocale } = useLanguage();
  const { formatIntelligentNumber, formatMoney } = useFormat();
  const { formatBalance, formatRate } = useFinancialFormat();

  const formatAccessibleNumber = (
    number: number,
    options: AccessibleNumberProps = {}
  ): React.ReactElement => {
    const {
      wrapperElement = 'span',
      className,
      ariaLabel
    } = options;

    const formatted = formatIntelligentNumber(number);
    const Element = wrapperElement;

    return React.createElement(
      Element,
      {
        className,
        'aria-label': ariaLabel || `${number.toLocaleString(currentLocale)}`,
        role: 'text',
      },
      formatted
    );
  };

  const formatAccessibleMoney = (
    amount: number,
    options: AccessibleNumberProps = {}
  ): React.ReactElement => {
    const {
      wrapperElement = 'span',
      className,
      ariaLabel
    } = options;

    const balanceResult = formatBalance(amount);
    const Element = wrapperElement;

    return React.createElement(
      Element,
      {
        className: `${className || ''} ${balanceResult.className || ''}`,
        'aria-label': ariaLabel || `${amount.toLocaleString(currentLocale)} ${amount > 0 ? 'credit' : amount < 0 ? 'debit' : ''}`,
        role: 'text',
      },
      balanceResult.value
    );
  };

  const formatAccessibleRate = (
    rate: number,
    options: AccessibleNumberProps = {}
  ): React.ReactElement => {
    const {
      wrapperElement = 'span',
      className,
      ariaLabel
    } = options;

    const formatted = formatRate(rate);
    const Element = wrapperElement;

    return React.createElement(
      Element,
      {
        className,
        'aria-label': ariaLabel || `${rate.toLocaleString(currentLocale)} percent`,
        role: 'text',
      },
      formatted
    );
  };

  return {
    formatAccessibleNumber,
    formatAccessibleMoney,
    formatAccessibleRate
  };
};