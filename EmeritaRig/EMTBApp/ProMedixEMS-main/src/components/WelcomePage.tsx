import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Zap } from 'lucide-react';

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
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
    }, 300); // Wait for fade out animation
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-transparent z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* Welcome Content */}
        <div className="text-center mb-8 animate-fade-in max-w-6xl mx-auto">
          
          {/* Welcome Message */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 md:mb-12">
            Welcome to
          </h1>

          {/* ProMedix EMS Logo - Centered with Transparent Background */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
            <img 
              src="/assets/LOGOFINAL.png" 
              alt="ProMedix EMS Logo" 
              className="w-[450px] h-36 sm:w-[600px] sm:h-48 md:w-[800px] md:h-64 lg:w-[1000px] lg:h-80 xl:w-[1200px] xl:h-96 object-contain max-w-[90vw] mb-4"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
            />
            {/* Tagline directly under logo */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed px-4 whitespace-nowrap">
              The Next-Gen Education Tool for Emergency Medical Services
            </p>
          </div>
        </div>

        {/* Auto-progress countdown */}
        <div className="text-center px-4">
          <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
            {countdown > 0 ? (
              <>Automatically proceeding in <span className="font-mono font-bold text-blue-600 text-base sm:text-lg md:text-xl">{countdown}s</span></>
            ) : (
              'Loading disclaimer...'
            )}
          </div>
          
          {/* Visual countdown indicator */}
          <div className="mt-4 md:mt-6 w-64 sm:w-80 mx-auto bg-blue-200 dark:bg-blue-800/40 rounded-full h-2 md:h-3">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 md:h-3 rounded-full transition-all duration-1000 ease-linear shadow-lg"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-6 right-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            © 2025 ProMedix EMS™ Educational Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
