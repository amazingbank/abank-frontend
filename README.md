English | [中文](README_cn.md)

# 奇迹银行 (The Amazing Bank) - Frontend Application

## Business Background
The Amazing Bank is a modern banking platform designed to provide seamless online banking experiences to both personal and business customers. Our mission is to make banking simple, secure, and accessible to everyone.

## Technical Summary
This project is a React-based frontend application built with:
- React 18
- TypeScript
- Tailwind CSS
- Vite build tool
- React Router for navigation
- i18next for internationalization

## Components
The application consists of several key components:
- **Header**: Contains the bank logo and main navigation
- **Footer**: Contains copyright and legal information
- **Home**: Main landing page
- **InterestCalculator**: Tool for calculating interest rates

## Features
- Responsive design for all devices
- Smooth animations and transitions
- Online banking portal access
- Personal and business banking sections
- Interest rate calculator
- Multi-language support (English/Chinese)

## Internationalization

The application supports multiple languages with easy switching between them:

- Language selection button in the navigation header
- Translations stored in separate resource files (`/public/locales/[lang]/translation.json`)
- Automatically detects and remembers user's language preference
- Smooth transitions when switching languages

### Key Internationalization Features

1. **Language Detection**: Automatically detects the user's preferred language from browser settings, URL parameters, or previous visits.

2. **Language Context**: Global React context for language information and state management.

3. **Translation Loading**: Asynchronous loading of translation files with loading indicators.

4. **Rich Content Support**: HTML formatting in translations for advanced formatting needs.

5. **Extensible System**: Support for adding additional languages without code changes.

6. **Persistent Preferences**: Remembers user's language preference across visits.

### Project Structure

```
src/
  i18n.ts                   # i18n configuration
  contexts/
    LanguageContext.tsx     # Language state management
  components/
    LanguageIndicator.tsx   # Shows current language
    LanguageSelector.tsx    # Dropdown for language selection
    LanguageTransition.tsx  # Loading overlay during language switch
  utils/
    languageDetector.ts     # Custom language detection
    supportedLanguages.ts   # Language definitions
public/
  locales/
    en/
      translation.json      # English translations
    zh/
      translation.json      # Chinese translations
```

### Adding New Translations

To add translations for components:

1. Add translation keys and values to `/public/locales/en/translation.json` and `/public/locales/zh/translation.json`
2. Use the `useTranslation` hook to access translations in components:
   ```jsx
   const { t } = useTranslation();
   return <div>{t('your.translation.key')}</div>;
   ```

### HTML Formatting in Translations

For rich content with HTML formatting:

1. Define translations with HTML tags in the translation files:
   ```json
   {
     "welcome": "Welcome to <bold>The Amazing Bank</bold>"
   }
   ```

2. Use the `formatHtml` helper:
   ```jsx
   const { formatHtml } = useLanguage();
   return <div>{formatHtml('welcome', {
     bold: <span className="font-bold" />
   })}</div>;
   ```

### Supporting Additional Languages

To add a new language:

1. Create a new translation file at `/public/locales/[lang-code]/translation.json`
2. Add the language definition to `src/utils/supportedLanguages.ts`
3. The language will automatically appear in the language selector

## Contribution
We welcome contributions to this project! Please follow these guidelines:
1. Fork the repository
2. Create a new branch for your feature
3. Submit a pull request with detailed description of changes

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## License
MIT License - See [LICENSE](LICENSE) file for details
