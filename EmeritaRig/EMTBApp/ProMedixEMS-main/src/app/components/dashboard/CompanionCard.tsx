import React from 'react';
import { GlassCard } from '../../../components/ui/ModernGlassComponents';

export type CompanionCardProps = {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
  icon: string;
  type: 'scenario' | 'quiz' | 'reference';
  onAction: () => void;
};

export const CompanionCard: React.FC<CompanionCardProps> = ({
  title,
  description,
  estimatedTime,
  priority,
  icon,
  onAction,
}) => {
  const priorityStyles = {
    high: 'border-red-300/50 bg-red-50/20 hover:bg-red-50/30',
    medium: 'border-yellow-300/50 bg-yellow-50/20 hover:bg-yellow-50/30',
    low: 'border-green-300/50 bg-green-50/20 hover:bg-green-50/30',
  };

  return (
    <GlassCard
      className={`p-4 cursor-pointer border-2 ${priorityStyles[priority]}`}
      onClick={onAction}
      intensity="medium"
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <p className="text-gray-600 text-xs mt-1">{description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{estimatedTime} min</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              priority === 'high' ? 'bg-red-100 text-red-800' :
              priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {priority}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};