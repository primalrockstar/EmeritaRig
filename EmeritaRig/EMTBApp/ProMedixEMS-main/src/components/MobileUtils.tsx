import React, { useEffect, useState } from 'react';

// Mobile utilities and hooks for better mobile experience
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return { isMobile, isTablet, orientation };
};

// Hook for detecting if user is on iOS device
export const useIOSDetection = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                     (window.navigator as any).standalone === true;
    
    setIsIOS(iOS);
    setIsStandalone(standalone);
  }, []);

  return { isIOS, isStandalone };
};

// Mobile-friendly button component
interface MobileButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'mobile-tap-highlight font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-10',
    md: 'px-4 py-3 text-base min-h-12',
    lg: 'px-6 py-4 text-lg min-h-14'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover-only:hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover-only:hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover-only:hover:bg-gray-600',
    ghost: 'text-gray-700 hover-only:hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover-only:hover:bg-gray-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Mobile-optimized card component
interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className = '',
  onClick,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const baseClasses = `bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${paddingClasses[padding]}`;
  const interactiveClasses = onClick ? 'mobile-tap-highlight hover-only:hover:shadow-md transition-shadow cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
};

// Mobile-optimized list item
interface MobileListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  className?: string;
}

export const MobileListItem: React.FC<MobileListItemProps> = ({
  children,
  onClick,
  rightElement,
  leftElement,
  className = ''
}) => {
  const baseClasses = 'flex items-center py-4 px-4 mobile-tap-highlight min-h-16';
  const interactiveClasses = onClick ? 'hover-only:hover:bg-gray-50 dark:hover-only:hover:bg-gray-800 cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
    >
      {leftElement && <div className="mr-4 flex-shrink-0">{leftElement}</div>}
      <div className="flex-1 min-w-0">{children}</div>
      {rightElement && <div className="ml-4 flex-shrink-0">{rightElement}</div>}
    </div>
  );
};

// Mobile pull-to-refresh component
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  return (
    <div className="relative">
      {isPulling && (
        <div 
          className="absolute top-0 left-0 right-0 flex justify-center items-center bg-blue-50 dark:bg-blue-900/20 transition-all duration-200"
          style={{ transform: `translateY(-${Math.max(0, 60 - pullDistance)}px)` }}
        >
          <div className="text-blue-600 text-sm font-medium py-2">
            {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        </div>
      )}
      <div className="mobile-scroll">
        {children}
      </div>
    </div>
  );
};

// Install prompt component for PWA
export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { isIOS, isStandalone } = useIOSDetection();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  if (isIOS) {
    return (
      <div className="fixed bottom-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-40 lg:hidden">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Install ProMedix EMS</h3>
            <p className="text-xs mt-1 opacity-90">
              Tap the share button in Safari and select "Add to Home Screen" for the best experience.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-40 lg:hidden">
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Install ProMedix EMS</h3>
          <p className="text-xs mt-1 opacity-90">
            Get quick access and work offline with our app.
          </p>
        </div>
        <div className="flex space-x-2">
          <MobileButton
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            Later
          </MobileButton>
          <MobileButton
            size="sm"
            variant="secondary"
            onClick={handleInstall}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Install
          </MobileButton>
        </div>
      </div>
    </div>
  );
};
