import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

const LanguageTransition: React.FC = () => {
  const { isLoading, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      // Delay hiding to ensure smooth transition
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;
  
  return (
    <div 
      className={`fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" aria-hidden="true" />
        <p className="mt-4 text-lg font-medium text-gray-800">
          {t('common.accessibility.loading')}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {t('language.switching_to', {
            language: currentLanguage === 'en' ? 'English' : '中文',
            defaultValue: 'Switching to {{language}}...'
          })}
        </p>
      </div>
    </div>
  );
};

export default LanguageTransition;