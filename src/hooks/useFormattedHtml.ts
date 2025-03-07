import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormat } from './useFormat';
import { TOptions } from 'i18next';

interface FormatHtmlWithNumbersOptions {
  numberFormat?: Intl.NumberFormatOptions;
  dateFormat?: Intl.DateTimeFormatOptions;
  wrapperComponent?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const useFormattedHtml = () => {
  const { formatHtml } = useLanguage();
  const { formatNumber, formatDate, formatCurrency, formatPercentage } = useFormat();

  const formatHtmlWithNumbers = (
    key: string,
    values: Record<string, number | Date | string>,
    options: FormatHtmlWithNumbersOptions = {},
    i18nOptions?: TOptions
  ) => {
    const formattedValues: Record<string, string> = {};
    const components: Record<string, React.ReactNode> = {};

    Object.entries(values).forEach(([key, value]) => {
      let formattedValue: string;
      
      if (value instanceof Date) {
        formattedValue = formatDate(value, options.dateFormat);
      } else if (typeof value === 'number') {
        if (options.numberFormat?.style === 'currency') {
          formattedValue = formatCurrency(value, options.numberFormat.currency);
        } else if (options.numberFormat?.style === 'percent') {
          formattedValue = formatPercentage(value);
        } else {
          formattedValue = formatNumber(value, options.numberFormat);
        }
      } else {
        formattedValue = value;
      }

      formattedValues[key] = formattedValue;
      if (options.wrapperComponent) {
        components[key] = React.createElement(
          options.wrapperComponent,
          { className: options.className },
          formattedValue
        );
      }
    });

    return formatHtml(key, components, { ...i18nOptions, ...formattedValues });
  };

  return {
    formatHtmlWithNumbers,
  };
};