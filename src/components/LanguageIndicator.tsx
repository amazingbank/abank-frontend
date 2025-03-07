import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLanguageByCode } from '../utils/supportedLanguages';

interface LanguageIndicatorProps {
  showLabel?: boolean;
  showFlag?: boolean;
  className?: string;
}

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ 
  showLabel = false, 
  showFlag = true,
  className = '' 
}) => {
  const { currentLanguage } = useLanguage();
  const language = getLanguageByCode(currentLanguage);
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="relative">
        <Globe className="h-4 w-4 text-blue-600" />
        <span className="absolute -top-1 -right-2 w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-700 text-xs font-bold">
            {currentLanguage === 'en' ? 'E' : '中'}
          </span>
        </span>
      </div>
      
      {showLabel && language && (
        <span className="ml-2 text-sm text-gray-600">
          {showFlag && language.flag ? language.flag + ' ' : ''}
          {language.nativeName}
        </span>
      )}
    </div>
  );
};

export default LanguageIndicator;