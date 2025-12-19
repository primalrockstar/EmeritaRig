import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface DisclaimerIntroProps {
  onComplete: () => void;
}

const DisclaimerIntro: React.FC<DisclaimerIntroProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20 z-[101] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Disclaimer Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-red-800 dark:text-red-200">
            IMPORTANT DISCLAIMER
          </h1>
          
          <p className="text-lg text-red-600 dark:text-red-300 font-medium">
            Please read carefully before proceeding
          </p>
        </div>

        {/* Critical Disclaimer Content */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800/60 rounded-xl p-8 shadow-lg">
            <div className="space-y-6 text-red-900 dark:text-red-100">
              <div className="bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700/60 rounded-lg p-6">
                <h2 className="font-bold text-red-800 dark:text-red-200 text-xl mb-3 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  CRITICAL LEGAL DISCLAIMER
                </h2>
                <p className="text-red-700 dark:text-red-300 font-medium leading-relaxed">
                  This educational platform is designed exclusively for EMT training and study purposes. 
                  The content provided does NOT constitute medical advice, diagnosis, treatment recommendations, 
                  or official emergency medical protocols for real patient care.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 text-lg">⚠️ Educational Use Only</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li>All content is for educational and training purposes only</li>
                    <li>Information may not reflect current local protocols</li>
                    <li>Not a substitute for formal EMS education programs</li>
                    <li>Always verify with current textbooks and instructors</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 text-lg">🚫 Clinical Practice Prohibition</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-red-700 dark:text-red-300">
                    <li><strong>NEVER use for actual patient care decisions</strong></li>
                    <li>Follow current local EMS protocols and medical direction</li>
                    <li>Obtain proper authorization before performing procedures</li>
                    <li>Practice only within certified scope and training level</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700/60 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 text-lg mb-2">📋 Protocol Compliance Required</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <strong>EMERGENCY SITUATIONS:</strong> Always contact 911 immediately and follow your agency's 
                  established procedures. This platform does not replace proper emergency response protocols 
                  or medical oversight.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700/60 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    By continuing, you acknowledge and agree to these terms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-progress countdown */}
        <div className="text-center">
          <div className="text-sm text-red-500 dark:text-red-400">
            {countdown > 0 ? (
              <>Automatically continuing in <span className="font-mono font-bold text-red-600 dark:text-red-300 text-lg">{countdown}s</span></>
            ) : (
              'Proceeding to welcome...'
            )}
          </div>
          
          {/* Visual countdown indicator */}
          <div className="mt-4 w-64 mx-auto bg-red-200 dark:bg-red-800/40 rounded-full h-2">
            <div 
              className="bg-red-600 dark:bg-red-400 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <p className="text-xs text-red-400 dark:text-red-500">
            © 2025 ProMedix EMS™ Educational Platform - Legal Disclaimer & Terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerIntro;
