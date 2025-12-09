import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { DEMO_MESSAGES, UPGRADE_URL } from '../config/demoLimits';

interface DemoUpgradeBannerProps {
  message?: string;
  fullWidth?: boolean;
}

export const DemoUpgradeBanner: React.FC<DemoUpgradeBannerProps> = ({ 
  message = DEMO_MESSAGES.UPGRADE_CTA,
  fullWidth = false 
}) => {
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white ${fullWidth ? 'w-full' : 'rounded-lg'} p-6 shadow-xl`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">You're in Demo Mode</h3>
          <p className="text-sm text-white/90 mb-4">
            {message}
          </p>
          <a
            href={UPGRADE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Lock className="w-4 h-4" />
            {DEMO_MESSAGES.UPGRADE_CTA}
          </a>
        </div>
      </div>
    </div>
  );
};

export const DemoLimitModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  limitMessage: string;
}> = ({ isOpen, onClose, limitMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Limit Reached</h2>
          <p className="text-gray-600 mb-6">{limitMessage}</p>
          
          <div className="space-y-3">
            <a
              href={UPGRADE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Unlock Full Access - $49.99
            </a>
            <button
              onClick={onClose}
              className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continue Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
