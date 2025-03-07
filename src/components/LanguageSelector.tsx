import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Command } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supportedLanguages } from '../utils/supportedLanguages';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center space-x-1 text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors duration-300 disabled:opacity-70"
        aria-expanded={isOpen}
        aria-label={t('language.selector.aria_label', { defaultValue: 'Select language' })}
      >
        <Globe className="h-4 w-4" />
        <span className="ml-1">
          {currentLang?.flag} {currentLang?.nativeName}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Keyboard shortcut tooltip */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Alt</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">L</kbd>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1">
            {supportedLanguages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 flex items-center justify-between ${
                  currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } hover:bg-blue-100 hover:text-blue-700 group`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="flex items-center">
                  <span className="mr-2">{language.flag}</span>
                  <span>{language.nativeName}</span>
                </span>
                <div className="flex items-center">
                  {currentLanguage === language.code && (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  <kbd className="hidden group-hover:inline-block px-1.5 py-0.5 text-xs bg-gray-100 rounded">
                    Alt + {index + 1}
                  </kbd>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;