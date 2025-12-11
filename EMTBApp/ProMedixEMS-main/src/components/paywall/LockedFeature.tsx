import React, { useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { useEntitlement } from '../../hooks/useEntitlement';
import UpgradeModal from './UpgradeModal';

interface LockedFeatureProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showPreview?: boolean;
}

const LockedFeature: React.FC<LockedFeatureProps> = ({ 
  feature, 
  children, 
  fallback,
  showPreview = false 
}) => {
  const { canAccessFeature, isPremium } = useEntitlement();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Allow access if user has permission
  if (canAccessFeature(feature) || isPremium) {
    return <>{children}</>;
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default locked state
  return (
    <>
      <div className="relative">
        {/* Blurred preview if enabled */}
        {showPreview && (
          <div className="pointer-events-none blur-sm opacity-50">
            {children}
          </div>
        )}
        
        {/* Lock overlay */}
        <div className={`${showPreview ? 'absolute inset-0' : ''} flex items-center justify-center p-8`}>
          <div className="text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              Premium Feature
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Unlock unlimited access to all flashcards, scenarios, and clinical tools.
            </p>
            
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Upgrade to Premium
            </button>
            
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Starting at $19.99/month • Cancel anytime
            </p>
          </div>
        </div>
      </div>
      
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </>
  );
};

export default LockedFeature;
