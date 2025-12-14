import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'interactive' | 'bonus' | 'solid';
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'glass',
  onClick,
}) => {
  let baseClasses = 'rounded-xl shadow-xl';
  if (variant === 'solid') {
    baseClasses += ' bg-slate-900 border border-slate-800 text-slate-50';
  } else {
    baseClasses += ' bg-slate-800/60 backdrop-blur-md border border-white/10';
  }
  const interactiveClasses = variant === 'interactive' ? 'hover:bg-slate-800/70 hover:scale-[1.01] transition-all cursor-pointer' : '';
  const bonusClasses = variant === 'bonus' ? 'border-amber-500/30 shadow-amber-900/20' : '';
  const combinedClasses = `${baseClasses} ${interactiveClasses} ${bonusClasses} ${className}`.trim();

  if (variant === 'interactive' && onClick) {
    return (
      <div className={combinedClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default GlassCard;