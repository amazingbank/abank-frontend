import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2" />
                <span>{t('footer.contact.email')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
              {t('footer.links.privacy')}
            </a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
              {t('footer.links.terms')}
            </a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
              {t('footer.links.security')}
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
