import { useLanguage } from '../contexts/LanguageContext';
import { 
  formatDate, 
  formatCurrency, 
  formatNumber, 
  formatPercentage,
  formatIntelligentNumber,
  formatMoney,
  getLocaleFromLang,
  getLocaleCurrency 
} from '../utils/formatUtils';
import { formatRelativeTime } from '../utils/relativeTimeFormatter';

export const useFormat = () => {
  const { currentLanguage } = useLanguage();
  const locale = getLocaleFromLang(currentLanguage);
  const defaultCurrency = getLocaleCurrency(locale);

  return {
    formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => 
      formatDate(date, locale, options),
    
    formatCurrency: (amount: number, currency = defaultCurrency) =>
      formatCurrency(amount, locale, currency),
    
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) =>
      formatNumber(number, locale, options),
    
    formatPercentage: (number: number, decimals = 2) =>
      formatPercentage(number, locale, decimals),
      
    formatRelativeTime: (date: Date | number) =>
      formatRelativeTime(date, locale),

    formatIntelligentNumber: (number: number, options?: Intl.NumberFormatOptions) =>
      formatIntelligentNumber(number, locale, options),

    formatMoney: (amount: number, currency?: string) =>
      formatMoney(amount, locale, currency),
      
    currentLocale: locale,
    defaultCurrency
  };
};