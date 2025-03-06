import React from 'react';
import { Shield, ArrowRight, PiggyBank, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left animate-slide-up">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">{t('home.hero.title1')}</span>
                  <span className="block text-blue-600">{t('home.hero.title2')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('home.hero.description')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                      {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transform hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt={t('home.hero.imageAlt')}
          />
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t('home.features.subtitle')}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('home.features.title')}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start transform hover:scale-105 transition-all duration-300 hover:shadow-lg p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <Shield className="h-12 w-12 text-blue-600 animate-float" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('home.features.security.title')}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t('home.features.security.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start transform hover:scale-105 transition-all duration-300 hover:shadow-lg p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <PiggyBank className="h-12 w-12 text-blue-600 animate-float" style={{ animationDelay: '0.2s' }} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('home.features.savings.title')}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t('home.features.savings.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start transform hover:scale-105 transition-all duration-300 hover:shadow-lg p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <CreditCard className="h-12 w-12 text-blue-600 animate-float" style={{ animationDelay: '0.4s' }} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('home.features.creditCards.title')}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t('home.features.creditCards.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t('home.cta.title1')}</span>
            <span className="block text-blue-200">{t('home.cta.title2')}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                {t('home.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
