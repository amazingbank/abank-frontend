interface LocaleNumberFormat {
  decimalSeparator: string;
  groupSeparator: string;
  groupSize: number;
}

const localeNumberFormats: Record<string, LocaleNumberFormat> = {
  'en-US': {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3
  },
  'zh-CN': {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3
  },
  'de-DE': {
    decimalSeparator: ',',
    groupSeparator: '.',
    groupSize: 3
  }
};

export const getLocaleNumberFormat = (locale: string): LocaleNumberFormat => {
  return localeNumberFormats[locale] || localeNumberFormats['en-US'];
};

export const parseLocaleNumber = (value: string, locale: string): number | null => {
  const format = getLocaleNumberFormat(locale);
  
  // Remove group separators and normalize decimal separator
  const normalized = value
    .replace(new RegExp(`\\${format.groupSeparator}`, 'g'), '')
    .replace(format.decimalSeparator, '.');
  
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
};

export const formatLocaleNumber = (
  value: number,
  locale: string,
  decimalPlaces?: number
): string => {
  const format = getLocaleNumberFormat(locale);
  
  // Convert to string with fixed decimal places if specified
  let parts = value.toFixed(decimalPlaces ?? 2).split('.');
  
  // Add group separators to the integer part
  if (format.groupSize > 0) {
    const integerPart = parts[0];
    const groups = [];
    let i = integerPart.length;
    
    while (i > 0) {
      groups.unshift(integerPart.slice(Math.max(0, i - format.groupSize), i));
      i -= format.groupSize;
    }
    
    parts[0] = groups.join(format.groupSeparator);
  }
  
  // Join with locale-specific decimal separator
  return parts.join(format.decimalSeparator);
};