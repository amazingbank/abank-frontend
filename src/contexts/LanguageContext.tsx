import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import { TOptions } from 'i18next';
import { Trans, useTranslation } from 'react-i18next';
import { getLocaleFromLang } from '../utils/formatUtils';
import { useFormat } from '../hooks/useFormat';

interface LanguageContextType {
  currentLanguage: string;
  currentLocale: string;
  changeLanguage: (lang: string) => void;
  isLoading: boolean;
  formatMessage: (key: string, options?: TOptions) => string;
  formatHtml: (
    key: string, 
    components?: Record<string, React.ReactNode>,
    options?: TOptions
  ) => React.ReactNode;
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  formatPercentage: (number: number, decimals?: number) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  currentLocale: 'en-US',
  changeLanguage: () => {},
  isLoading: false,
  formatMessage: (key) => key,
  formatHtml: (key) => key,
  formatDate: () => '',
  formatCurrency: () => '',
  formatNumber: () => '',
  formatPercentage: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const format = useFormat();

  const currentLocale = getLocaleFromLang(currentLanguage);

  useEffect(() => {
    // Set initial language based on localStorage or navigator
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) {
      setCurrentLanguage(storedLang);
    }

    // Add event listener for language loaded
    const handleLoaded = () => {
      setIsLoading(false);
    };

    i18n.on('languageChanged', handleLoaded);

    return () => {
      i18n.off('languageChanged', handleLoaded);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    setIsLoading(true);
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    // Fallback in case the event doesn't fire
    setTimeout(() => setIsLoading(false), 500);
  };

  // Helper function to format messages
  const formatMessage = (key: string, options?: TOptions): string => {
    return t(key, options);
  };

  // Helper function to support HTML in translations
  const formatHtml = (
    key: string, 
    components?: Record<string, React.ReactNode>,
    options?: TOptions
  ): React.ReactNode => {
    return (
      <Trans 
        i18nKey={key} 
        components={components} 
        values={options}
      />
    );
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage,
      currentLocale,
      changeLanguage,
      isLoading,
      formatMessage,
      formatHtml,
      ...format
    }}>
      {children}
    </LanguageContext.Provider>
  );
};