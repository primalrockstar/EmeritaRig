import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/ModernGlassComponents';
import { X, Share, Download } from 'lucide-react';

const InstallPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const checkInstallStatus = () => {
      // Check if already installed
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) return;

      // Check platform
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      const isAndroidDevice = /android/.test(userAgent);

      if (isIOSDevice) {
        setIsIOS(true);
        setIsVisible(true);
      } else if (isAndroidDevice) {
        setIsAndroid(true);
        setIsVisible(true);
      }
    };

    // Check after component mounts
    const timer = setTimeout(checkInstallStatus, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to prevent showing again
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <GlassCard className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Install The Rig
            </h3>
            <p className="text-sm text-blue-100">
              Add to Home Screen for the full full-screen experience.
            </p>
          </div>
          <button
            onClick={dismiss}
            className="p-1 text-blue-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isIOS && (
          <div className="flex items-center gap-3 text-sm text-blue-100">
            <Share className="w-5 h-5" />
            <span>Tap the Share icon, then "Add to Home Screen"</span>
          </div>
        )}

        {isAndroid && (
          <div className="flex items-center gap-3 text-sm text-blue-100">
            <Download className="w-5 h-5" />
            <span>Open menu, then "Add to Home Screen"</span>
          </div>
        )}

        <button
          onClick={dismiss}
          className="w-full mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
        >
          Not Now
        </button>
      </GlassCard>
    </div>
  );
};

export default InstallPrompt;