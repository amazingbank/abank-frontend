// Example exchange rates - in a real application, these would come from an API
const exchangeRates: Record<string, number> = {
  USD: 1,
  CNY: 7.25,
  HKD: 7.82,
  TWD: 31.45,
  GBP: 0.79,
  EUR: 0.92,
  JPY: 148.35,
  CAD: 1.35,
  AUD: 1.52
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  const normalizedFromCurrency = fromCurrency.toUpperCase();
  const normalizedToCurrency = toCurrency.toUpperCase();
  
  if (!exchangeRates[normalizedFromCurrency] || !exchangeRates[normalizedToCurrency]) {
    throw new Error(`Unsupported currency: ${fromCurrency} or ${toCurrency}`);
  }
  
  // Convert to USD first (as base currency), then to target currency
  const amountInUSD = amount / exchangeRates[normalizedFromCurrency];
  return amountInUSD * exchangeRates[normalizedToCurrency];
};

export const getSupportedCurrencies = (): string[] => {
  return Object.keys(exchangeRates);
};

// Currency symbols and formatting preferences by currency code
export const currencyFormats: Record<string, { symbol: string, position: 'before' | 'after' }> = {
  USD: { symbol: '$', position: 'before' },
  CNY: { symbol: '¥', position: 'before' },
  HKD: { symbol: 'HK$', position: 'before' },
  TWD: { symbol: 'NT$', position: 'before' },
  GBP: { symbol: '£', position: 'before' },
  EUR: { symbol: '€', position: 'after' },
  JPY: { symbol: '¥', position: 'before' },
  CAD: { symbol: 'C$', position: 'before' },
  AUD: { symbol: 'A$', position: 'before' }
};