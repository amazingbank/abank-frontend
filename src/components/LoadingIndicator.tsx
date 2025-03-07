import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  translucent?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  size = 'medium',
  fullScreen = false,
  translucent = true
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const content = (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        className={`text-blue-600 animate-spin ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      {message && (
        <p className={`mt-2 font-medium ${size === 'small' ? 'text-sm' : 'text-base'}`}>
          {message}
        </p>
      )}
      <div className="sr-only" role="status">
        {message || t('common.accessibility.loading')}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          translucent ? 'bg-white bg-opacity-70' : 'bg-white'
        }`}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingIndicator;