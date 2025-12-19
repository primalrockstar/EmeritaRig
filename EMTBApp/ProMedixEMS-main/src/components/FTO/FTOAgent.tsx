import React, { useState, useEffect } from 'react';
import { MessageCircle, X, AlertTriangle } from 'lucide-react';
import { EnhancedQuizQuestion } from '../../data/enhanced-quiz-system';

const GENERIC_ADMONISHMENTS = [
  "Review your protocols. That was a critical fail.",
  "You just killed the patient. Try again.",
  "Speed is fine, accuracy is final. You had neither.",
  "Don't guess. Know.",
  "If you do that on the street, you lose your patch.",
  "My grandmother drives faster than you think.",
  "Is that really your final answer?",
  "Scene safety isn't just a checkbox, rookie."
];

interface FTOAgentProps {
  currentScenario: EnhancedQuizQuestion | null;
  lastAnswerCorrect: boolean | null;
}

export const FTOAgent: React.FC<FTOAgentProps> = ({
  currentScenario,
  lastAnswerCorrect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (lastAnswerCorrect === false && currentScenario) {
      setIsExpanded(true);
      setShowMessage(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
        setIsExpanded(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [lastAnswerCorrect, currentScenario]);

  const getGuidance = () => {
    if (currentScenario?.fto_guidance) return currentScenario.fto_guidance;
    // Pick a random generic quote based on the scenario ID (pseudo-random) so it stays consistent for that specific question
    const index = currentScenario?.id
      ? currentScenario.id.charCodeAt(currentScenario.id.length - 1) % GENERIC_ADMONISHMENTS.length
      : 0;
    return GENERIC_ADMONISHMENTS[index];
  };

  const guidance = getGuidance();

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-50">
      {/* Minimized State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="relative bg-slate-900 border-2 border-green-400 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6 text-green-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-slate-900 border border-green-400 rounded-lg shadow-2xl max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-green-400/30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm font-bold">FTO AGENT</span>
            </div>
            <button
              onClick={() => {
                setIsExpanded(false);
                setShowMessage(false);
              }}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Content */}
          {showMessage && (
            <div className="p-4">
              <div className="bg-slate-800 border border-green-400/30 rounded p-3">
                <p className="text-green-300 font-mono text-sm leading-relaxed">
                  {guidance}
                </p>
              </div>
              <div className="mt-3 text-xs text-green-400/70 font-mono">
                [SECURE TRANSMISSION - FTO OVERRIDE]
              </div>
            </div>
          )}

          {/* Status Indicator */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 text-xs text-green-400/70 font-mono">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>ACTIVE MONITORING</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};