import { useLanguage } from '../contexts/LanguageContext';
import { convertCurrency, getSupportedCurrencies, currencyFormats } from '../utils/currencyConverter';
import { getLocaleCurrency } from '../utils/formatUtils';

export const useCurrency = () => {
  const { currentLocale } = useLanguage();
  const defaultCurrency = getLocaleCurrency(currentLocale);

  const convertAmount = (
    amount: number,
    fromCurrency = 'USD',
    toCurrency = defaultCurrency
  ) => {
    try {
      return convertCurrency(amount, fromCurrency, toCurrency);
    } catch (error) {
      console.warn('Currency conversion failed:', error);
      return amount;
    }
  };

  const getPreferredCurrency = () => {
    return defaultCurrency;
  };

  const getCurrencySymbol = (currencyCode: string) => {
    return currencyFormats[currencyCode]?.symbol || currencyCode;
  };

  const getCurrencyPosition = (currencyCode: string) => {
    return currencyFormats[currencyCode]?.position || 'before';
  };

  const getAvailableCurrencies = () => {
    return getSupportedCurrencies();
  };

  return {
    convertAmount,
    getPreferredCurrency,
    getCurrencySymbol,
    getCurrencyPosition,
    getAvailableCurrencies,
    defaultCurrency
  };
};