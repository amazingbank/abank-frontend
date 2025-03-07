import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getNextLanguage, supportedLanguages } from '../utils/supportedLanguages';

export const useKeyboardShortcuts = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Alt + L for cycling through languages
      if (event.altKey && event.key === 'l') {
        event.preventDefault();
        const nextLang = getNextLanguage(currentLanguage);
        changeLanguage(nextLang.code);
        return;
      }

      // Alt + number for direct language selection
      if (event.altKey && /^[1-9]$/.test(event.key)) {
        const index = parseInt(event.key) - 1;
        if (index < supportedLanguages.length) {
          event.preventDefault();
          changeLanguage(supportedLanguages[index].code);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentLanguage, changeLanguage]);

  return {
    shortcuts: {
      cycleLangs: 'Alt + L',
      selectLang: 'Alt + (1-9)'
    }
  };
};