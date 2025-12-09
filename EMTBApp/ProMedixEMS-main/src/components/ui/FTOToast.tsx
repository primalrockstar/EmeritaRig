import React from 'react';

export interface FTOToastProps {
  message: string;
  onClose?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export const FTOToast: React.FC<FTOToastProps> = ({
  message,
  onClose,
  autoHide = true,
  duration = 4000
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`
      backdrop-blur-lg bg-gray-900/90 border border-gray-700/50 rounded-xl p-4 shadow-2xl
      transition-all duration-300 transform
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      max-w-md
    `}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">👨‍🚒</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-orange-400">Field Training Officer</span>
            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(), 300);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            )}
          </div>
          <p className="text-white mt-1">"{message}"</p>
        </div>
      </div>
    </div>
  );
};