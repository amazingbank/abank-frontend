const TIME_UNITS = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 30,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
} as const;

type TimeUnit = keyof typeof TIME_UNITS;

export const getRelativeTimeUnit = (elapsed: number): [number, TimeUnit] => {
  for (const [unit, ms] of Object.entries(TIME_UNITS)) {
    const value = Math.floor(Math.abs(elapsed) / ms);
    if (value >= 1) {
      return [value, unit as TimeUnit];
    }
  }
  return [0, 'second'];
};

export const formatRelativeTime = (date: Date | number, locale = 'en'): string => {
  const elapsed = new Date(date).getTime() - new Date().getTime();
  const [value, unit] = getRelativeTimeUnit(elapsed);
  
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style: 'long'
  });
  
  return rtf.format(elapsed > 0 ? value : -value, unit);
};