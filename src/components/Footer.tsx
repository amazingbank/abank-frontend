import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.products.title')}</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.products.checking')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.products.savings')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.products.creditCards')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.products.loans')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.company.title')}</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.company.about')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.company.careers')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.company.press')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.company.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.resources.title')}</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.resources.blog')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.resources.helpCenter')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.resources.security')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.resources.privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('footer.legal.title')}</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.legal.terms')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.legal.privacy')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.legal.cookies')}</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-200">{t('footer.legal.licenses')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-base text-gray-400">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
