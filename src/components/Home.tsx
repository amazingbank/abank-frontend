import React from 'react';
import { Shield, ArrowRight, PiggyBank, CreditCard, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormattedHtml } from '../hooks/useFormattedHtml';
import { NumberDisplay } from './NumberDisplay';
import { TrendIndicator } from './TrendIndicator';

const Home = () => {
  const { t } = useTranslation();
  const { formatHtml } = useLanguage();
  const { formatHtmlWithNumbers } = useFormattedHtml();
  
  // Example data
  const stats = {
    customers: 1250000,
    satisfaction: 98.5,
    growth: 15.7,
    assets: 25000000000,
    lastUpdated: new Date(),
    minBalance: 100,
    monthlyFee: 5,
    rates: {
      savings: 4.5,
      cd: 5.2,
      mortgage: 3.75
    },
    previousMonth: {
      assets: 24500000000,
      customers: 1200000
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  {formatHtml('home.hero.title', {
                    bold: <span className="text-blue-600" />
                  })}
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('home.hero.subtitle')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      {t('home.hero.cta')}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-blue-600" />
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {t('home.features.items.security.title')}
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  {t('home.features.items.security.description')}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <PiggyBank className="h-12 w-12 text-blue-600" />
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {t('home.features.items.convenience.title')}
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  {t('home.features.items.convenience.description')}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <CreditCard className="h-12 w-12 text-blue-600" />
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {t('home.features.items.support.title')}
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  {t('home.features.items.support.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('home.stats.title')}
            </h2>
            <div className="mt-4 text-sm text-gray-500 flex items-center justify-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              {formatHtmlWithNumbers(
                'home.rates.last_updated',
                { date: stats.lastUpdated },
                {
                  dateFormat: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  },
                  wrapperComponent: 'span',
                  className: 'font-medium'
                }
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Assets Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('home.stats.assets')}
                </h3>
                <TrendIndicator
                  currentValue={stats.assets}
                  previousValue={stats.previousMonth.assets}
                />
              </div>
              <div className="mt-2">
                <NumberDisplay
                  value={stats.assets}
                  type="currency"
                  className="text-2xl font-bold"
                  compact={true}
                />
              </div>
            </div>

            {/* Customer Growth Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('home.stats.customers')}
                </h3>
                <TrendIndicator
                  currentValue={stats.customers}
                  previousValue={stats.previousMonth.customers}
                />
              </div>
              <div className="mt-2">
                <NumberDisplay
                  value={stats.customers}
                  type="number"
                  className="text-2xl font-bold"
                  compact={true}
                />
              </div>
            </div>

            {/* Satisfaction Rate Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {t('home.stats.satisfaction')}
              </h3>
              <div className="mt-2">
                <NumberDisplay
                  value={stats.satisfaction}
                  type="percentage"
                  className="text-2xl font-bold text-blue-600"
                />
              </div>
            </div>

            {/* Growth Rate Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {t('home.stats.growth')}
              </h3>
              <div className="mt-2">
                <NumberDisplay
                  value={stats.growth}
                  type="percentage"
                  className="text-2xl font-bold text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Interest Rates Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Savings Rate */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="font-medium text-gray-900">
                {t('home.rates.savings')}
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <NumberDisplay
                  value={stats.minBalance}
                  type="currency"
                  ariaLabel={t('home.rates.min_balance', { amount: stats.minBalance })}
                />
              </div>
              <div className="mt-1">
                <NumberDisplay
                  value={stats.rates.savings}
                  type="percentage"
                  className="text-2xl font-bold text-blue-600"
                />
              </div>
            </div>

            {/* CD Rate */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="font-medium text-gray-900">
                {t('home.rates.cd')}
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <NumberDisplay
                  value={stats.monthlyFee}
                  type="currency"
                  ariaLabel={t('home.rates.monthly_fee', { amount: stats.monthlyFee })}
                />
              </div>
              <div className="mt-1">
                <NumberDisplay
                  value={stats.rates.cd}
                  type="percentage"
                  className="text-2xl font-bold text-blue-600"
                />
              </div>
            </div>

            {/* Mortgage Rate */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h3 className="font-medium text-gray-900">
                {t('home.rates.mortgage')}
              </h3>
              <div className="mt-1">
                <NumberDisplay
                  value={stats.rates.mortgage}
                  type="percentage"
                  className="text-2xl font-bold text-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {t('home.rich_content.title')}
            </h2>
          </div>

          <div className="mt-10 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              {formatHtml('home.rich_content.html_example', {
                bold: <span className="font-bold" />,
                highlight: <span className="bg-yellow-100 px-1" />
              })}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              {formatHtml('home.rich_content.link_example', {
                link: <a href="#" className="text-blue-600 hover:underline" />
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t('home.cta.title')}</span>
            <span className="block text-blue-200">{t('home.cta.subtitle')}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                {t('home.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
