interface FormatOptions {
  locale?: string;
  style?: string;
  currency?: string;
}

export const formatDate = (date: Date | string | number, locale = 'en', format: Intl.DateTimeFormatOptions = {}): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...format,
  }).format(dateObj);
};

export const formatCurrency = (
  amount: number,
  locale = 'en',
  currency = 'USD',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(amount);
};

export const formatNumber = (
  number: number,
  locale = 'en',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, options).format(number);
};

export const formatPercentage = (
  number: number,
  locale = 'en',
  decimals = 2
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number / 100);
};

// Map language codes to locale codes
export const localeMap: Record<string, string> = {
  en: 'en-US',
  zh: 'zh-CN',
};

// Get locale code from language code
export const getLocaleFromLang = (langCode: string): string => {
  return localeMap[langCode] || langCode;
};

// Currency code mapping for locales
export const localeCurrencyMap: Record<string, string> = {
  'en-US': 'USD',
  'zh-CN': 'CNY',
  'en-GB': 'GBP',
  'en-CA': 'CAD',
  'en-AU': 'AUD',
  'zh-HK': 'HKD',
  'zh-TW': 'TWD'
};

// Get default currency for locale
export const getLocaleCurrency = (locale: string): string => {
  return localeCurrencyMap[locale] || 'USD';
};

// Number formatting preferences by locale
const localePreferences: Record<string, {
  currencySpacing: boolean;
  decimalPlaces: number;
  useGrouping: boolean;
  compactThreshold: number;
}> = {
  'en-US': {
    currencySpacing: false,
    decimalPlaces: 2,
    useGrouping: true,
    compactThreshold: 1000000
  },
  'zh-CN': {
    currencySpacing: true,
    decimalPlaces: 2,
    useGrouping: true,
    compactThreshold: 10000
  },
  'zh-HK': {
    currencySpacing: true,
    decimalPlaces: 1,
    useGrouping: true,
    compactThreshold: 10000
  }
};

// Get preferences for a specific locale
export const getLocalePreferences = (locale: string) => {
  return localePreferences[locale] || localePreferences['en-US'];
};

// Intelligent number rounding based on locale and magnitude
export const formatIntelligentNumber = (
  number: number,
  locale: string,
  options: Intl.NumberFormatOptions = {}
): string => {
  const prefs = getLocalePreferences(locale);
  
  // Use compact notation based on locale preferences
  if (Math.abs(number) >= prefs.compactThreshold && !options.notation) {
    return formatNumber(number, locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
      ...options
    });
  }
  
  // Apply locale-specific grouping and decimal places
  return formatNumber(number, locale, {
    useGrouping: prefs.useGrouping,
    maximumFractionDigits: prefs.decimalPlaces,
    ...options
  });
};

// Format money amounts appropriately for the locale
export const formatMoney = (
  amount: number,
  locale: string,
  currency?: string,
  options: Intl.NumberFormatOptions = {}
): string => {
  const prefs = getLocalePreferences(locale);
  const localeCurrency = currency || getLocaleCurrency(locale);
  
  return formatCurrency(amount, locale, localeCurrency, {
    currencyDisplay: 'symbol',
    minimumFractionDigits: prefs.decimalPlaces,
    maximumFractionDigits: prefs.decimalPlaces,
    ...options
  });
};