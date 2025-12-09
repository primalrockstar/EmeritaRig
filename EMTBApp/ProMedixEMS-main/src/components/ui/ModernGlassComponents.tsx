import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'strong';
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
  hoverable = false,
  ...props
}) => {
  let baseClass = 'backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg ';
  if (intensity === 'low') {
    baseClass += 'bg-white/10 ';
  } else if (intensity === 'medium') {
    baseClass += 'bg-slate-800/60 ';
  } else {
    baseClass += 'bg-slate-800/80 ';
  }
  if (hoverable) {
    baseClass += 'hover:border-cyan-400/30 transition-all duration-200 ';
  }
  return (
    <div className={baseClass + className} {...props}>
      {children}
    </div>
  );
};

interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'glass' | 'default';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  size?: 'sm' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'default',
  onClick,
  className = '',
  size = 'md',
  icon,
  disabled = false,
  'aria-label': ariaLabel
}) => {
  let baseClass = 'font-semibold transition duration-200 flex items-center gap-2 ';
  if (size === 'sm') {
    baseClass += 'px-3 py-1.5 text-sm ';
  } else if (size === 'lg') {
    baseClass += 'px-6 py-3 text-lg ';
  } else {
    baseClass += 'px-4 py-2 ';
  }
  if (variant === 'gradient') {
    baseClass += 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg rounded-lg ';
  } else if (variant === 'glass') {
    baseClass += 'bg-white/10 backdrop-blur-md border border-white/20 text-slate-800 hover:bg-white/20 rounded-lg ';
  } else {
    baseClass += 'bg-blue-500 hover:bg-blue-600 text-white rounded-lg ';
  }
  if (disabled) {
    baseClass += 'opacity-50 cursor-not-allowed ';
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={baseClass + className}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
      {children}
    </button>
  );
};