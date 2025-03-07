import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languageDetector from './utils/languageDetector';
import { getLocalePreferences } from './utils/formatUtils';

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    interpolation: {
      escapeValue: false,
      // Custom format function for numbers and dates
      format: (value, format, lng) => {
        if (!value) return '';
        
        const locale = lng === 'zh' ? 'zh-CN' : 'en-US';
        const prefs = getLocalePreferences(locale);
        
        if (value instanceof Date) {
          const dateFormat = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: format?.includes('time') ? '2-digit' : undefined,
            minute: format?.includes('time') ? '2-digit' : undefined
          });
          return dateFormat.format(value);
        }
        
        if (typeof value === 'number') {
          if (format === 'currency') {
            return new Intl.NumberFormat(locale, {
              style: 'currency',
              currency: locale === 'zh-CN' ? 'CNY' : 'USD',
              minimumFractionDigits: prefs.decimalPlaces,
              maximumFractionDigits: prefs.decimalPlaces
            }).format(value);
          }
          
          if (format === 'percent') {
            return new Intl.NumberFormat(locale, {
              style: 'percent',
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            }).format(value / 100);
          }
          
          if (format === 'compact') {
            return new Intl.NumberFormat(locale, {
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(value);
          }
        }
        
        return value;
      }
    },
    
    // React configuration
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
    },
    
    // Other options
    load: 'languageOnly',
    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator: '.',
    nsSeparator: ':',
    
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
    }
  });

export default i18n;