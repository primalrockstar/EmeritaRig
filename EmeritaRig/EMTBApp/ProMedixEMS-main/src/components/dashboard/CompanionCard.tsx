import React from 'react';
import { Clock } from 'lucide-react';
import { GlassCard, ModernButton } from '../ui/ModernGlassComponents';

export interface CompanionCardProps {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  onAction: () => void;
  type: 'scenario' | 'flashcards' | 'quiz' | 'reference' | 'progress';
  completed?: boolean;
  disabled?: boolean;
}

const iconMap = {
  scenario: '⚡',
  flashcards: '🔄',
  quiz: '🧠',
  reference: '📖',
  progress: '📈'
};

const CompanionCard: React.FC<CompanionCardProps> = ({
  id,
  title,
  description,
  estimatedTime,
  priority,
  icon,
  onAction,
  type,
  completed = false,
  disabled = false
}) => {
  const priorityBorderClasses = {
    high: 'border-l-4 border-rose-500',
    medium: 'border-l-4 border-amber-500',
    low: 'border-l-4 border-emerald-500'
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) onAction();
    }
  };

  return (
    <GlassCard
      className={`p-6 cursor-pointer transition-all duration-300 ${
        priorityBorderClasses[priority]
      } ${completed ? 'opacity-60' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      hoverable={!disabled}
      onClick={disabled ? undefined : onAction}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`${title} - ${description} - Estimated time: ${estimatedTime} minutes`}
      aria-disabled={disabled}
    >
      {/* Top Section: Icon + Title + Priority Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{icon}</div>
          <h3 className={`text-lg font-bold text-gray-900 dark:text-white ${completed ? 'line-through' : ''}`}>
            {title}
          </h3>
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${
          priority === 'high' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300' :
          priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
        }`}>
          {priority}
        </div>
      </div>

      {/* Middle Section: Description */}
      <p className={`text-sm text-gray-600 dark:text-gray-400 mb-6 ${completed ? 'line-through' : ''}`}>
        {description}
      </p>

      {/* Bottom Section: Estimated Time + Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{estimatedTime} min</span>
        </div>
        <ModernButton
          variant={completed ? 'glass' : 'gradient'}
          size="sm"
          onClick={(e) => {
            if (e) e.stopPropagation();
            if (!disabled) onAction();
          }}
          disabled={disabled}
          aria-label={completed ? `Mark ${title} as incomplete` : `Start ${title}`}
        >
          {completed ? 'Review' : 'Start'}
        </ModernButton>
      </div>

      {/* Optional: Completion Checkmark */}
      {completed && (
        <div className="absolute top-4 right-4 text-green-600 dark:text-green-400">
          ✓
        </div>
      )}
    </GlassCard>
  );
};

export default CompanionCard;