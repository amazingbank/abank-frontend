import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShortcutSection {
  title: string;
  shortcuts: {
    key: string;
    description: string;
  }[];
}

const KeyboardShortcutsGuide: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '?' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setIsVisible(prev => !prev);
      } else if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  const sections: ShortcutSection[] = [
    {
      title: t('keyboard.sections.general'),
      shortcuts: [
        { key: '?', description: t('keyboard.shortcuts.show_help') },
        { key: 'Alt + L', description: t('keyboard.shortcuts.change_language') },
        { key: 'Esc', description: t('keyboard.shortcuts.close') }
      ]
    },
    {
      title: t('keyboard.sections.calculator'),
      shortcuts: [
        { key: 'Alt + C', description: t('keyboard.shortcuts.calculate') },
        { key: 'Alt + R', description: t('keyboard.shortcuts.reset') },
        { key: 'Ctrl + ↑/↓', description: t('keyboard.shortcuts.navigate') },
        { key: 'Ctrl + Enter', description: t('keyboard.shortcuts.confirm') }
      ]
    },
    {
      title: t('keyboard.sections.inputs'),
      shortcuts: [
        { key: '↑/↓', description: t('keyboard.shortcuts.adjust_value') },
        { key: 'Alt + ↑/↓', description: t('keyboard.shortcuts.adjust_large') },
        { key: 'Tab', description: t('keyboard.shortcuts.next_field') },
        { key: 'Shift + Tab', description: t('keyboard.shortcuts.prev_field') }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="relative max-w-2xl w-full mx-4 bg-white rounded-lg shadow-xl"
        role="dialog"
        aria-label={t('keyboard.title')}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('keyboard.title')}
          </h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-500"
            aria-label={t('keyboard.close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {section.title}
              </h3>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {section.shortcuts.map((shortcut, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between"
                  >
                    <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-gray-600">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-b-lg border-t text-sm text-gray-500">
          {t('keyboard.tip')}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsGuide;