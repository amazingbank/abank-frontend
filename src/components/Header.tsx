import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Landmark, Globe } from 'lucide-react';

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Landmark className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">{t('header.bankName')}</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">{t('header.home')}</Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">{t('header.personal')}</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">{t('header.business')}</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">{t('header.about')}</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              {t('header.onlineBanking')}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 hover:shadow-md transform hover:scale-105"
            >
              <Globe className="h-4 w-4" />
              <span>{i18n.language === 'en' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
