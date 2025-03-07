import React from 'react';
import { useFormat } from './useFormat';
import { useLanguage } from '../contexts/LanguageContext';

interface TimeInterpolationOptions {
  wrapperComponent?: keyof JSX.IntrinsicElements;
  className?: string;
  includeTime?: boolean;
  includeRelative?: boolean;
}

export const useFormattedTime = () => {
  const { formatDate, formatRelativeTime } = useFormat();
  const { formatHtml } = useLanguage();

  const interpolateDateTime = (
    key: string,
    date: Date | number,
    options: TimeInterpolationOptions = {}
  ) => {
    const {
      wrapperComponent = 'time',
      className,
      includeTime = false,
      includeRelative = false
    } = options;

    const absolute = formatDate(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime ? {
        hour: '2-digit',
        minute: '2-digit'
      } : {})
    });

    const relative = includeRelative ? formatRelativeTime(date) : '';

    const Component = wrapperComponent;
    const formattedDate = (
      <Component 
        className={className}
        dateTime={new Date(date).toISOString()}
        title={absolute}
      >
        {relative || absolute}
      </Component>
    );

    return formatHtml(key, {
      date: formattedDate
    });
  };

  return {
    interpolateDateTime
  };
};