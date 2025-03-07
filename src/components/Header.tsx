import React, { useState } from 'react';
import { Landmark, Globe, Menu, X, Loader2, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageIndicator from './LanguageIndicator';
import LanguageSelector from './LanguageSelector';
import { getNextLanguage } from '../utils/supportedLanguages';

function Header() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleLanguage = () => {
    const nextLang = getNextLanguage(currentLanguage);
    changeLanguage(nextLang.code);
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Landmark className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              {t('header.bank_name')}
            </span>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleLanguage}
              disabled={isLoading}
              className="mr-4 flex items-center justify-center w-8 h-8 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              aria-label="Switch language"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LanguageIndicator />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              {t('header.nav.home')}
            </Link>
            <Link to="/calculator" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <Calculator className="h-4 w-4 mr-1" />
              {t('header.nav.calculator')}
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              {t('header.nav.personal')}
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              {t('header.nav.business')}
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              {t('header.nav.about')}
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              {t('header.nav.online_banking')}
            </button>
            
            {/* Replace simple toggle button with dropdown for future language expansion */}
            <LanguageSelector />
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              {t('header.nav.home')}
            </Link>
            <Link to="/calculator" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              <Calculator className="h-4 w-4 mr-1" />
              {t('header.nav.calculator')}
            </Link>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              {t('header.nav.personal')}
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              {t('header.nav.business')}
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              {t('header.nav.about')}
            </a>
            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white">
              {t('header.nav.online_banking')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
