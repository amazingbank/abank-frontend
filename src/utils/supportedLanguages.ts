// Define all supported languages in the application
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

// List of all supported languages
export const supportedLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  // For future expansion, add more languages here:
  // {
  //   code: 'es',
  //   name: 'Spanish',
  //   nativeName: 'Español',
  //   flag: '🇪🇸'
  // },
  // {
  //   code: 'fr',
  //   name: 'French',
  //   nativeName: 'Français',
  //   flag: '🇫🇷'
  // }
];

// Get a language by code
export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};

// Get the next language in rotation
export const getNextLanguage = (currentCode: string): Language => {
  const currentIndex = supportedLanguages.findIndex(lang => lang.code === currentCode);
  if (currentIndex === -1) return supportedLanguages[0];
  
  const nextIndex = (currentIndex + 1) % supportedLanguages.length;
  return supportedLanguages[nextIndex];
};

// Format language for display
export const formatLanguageDisplay = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? `${language.flag || ''} ${language.nativeName}` : code;
};