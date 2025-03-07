import { DetectorOptions } from 'i18next-browser-languagedetector';

// Define a more sophisticated language detector
const languageDetector = {
  type: 'languageDetector',
  
  init: () => {},
  
  // Detect the language on the client
  detect: (): string => {
    // Try to get language from localStorage
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) {
      return storedLang;
    }
    
    // Check URL query parameter for language setting
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'en' || langParam === 'zh') {
      return langParam;
    }
    
    // Detect browser language preference
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    
    // Default to English
    return 'en';
  },
  
  // Cache the language on the client
  cacheUserLanguage: (lng: string) => {
    localStorage.setItem('i18nextLng', lng);
    
    // Also store the language in a cookie for server rendering
    document.cookie = `i18nextLng=${lng}; path=/; max-age=31536000`; // 1 year
  }
};

export default languageDetector;