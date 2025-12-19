// ProMedix EMS Unified Logo Component
// Ensures consistent logo usage throughout the platform

import React from 'react';
import { Link } from 'react-router-dom';

export interface ProMedixLogoProps {
  variant?: 'full' | 'compact' | 'icon-only' | 'header' | 'landing';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  linkTo?: string;
  className?: string;
  animated?: boolean;
  glassEffect?: boolean;
}

const ProMedixLogo: React.FC<ProMedixLogoProps> = ({
  variant = 'full',
  size = 'md',
  showTagline = true,
  linkTo = '/',
  className = '',
  animated = false,
  glassEffect = false
}) => {
  const sizeConfigs = {
    xs: { wordmark: 'text-sm', tagline: 'text-[11px]', inlineGap: 'gap-1.5', stackGap: 'gap-1.5', icon: 'h-6 w-6' },
    sm: { wordmark: 'text-base', tagline: 'text-xs', inlineGap: 'gap-2', stackGap: 'gap-2', icon: 'h-8 w-8' },
    md: { wordmark: 'text-xl', tagline: 'text-sm', inlineGap: 'gap-3', stackGap: 'gap-2.5', icon: 'h-10 w-10' },
    lg: { wordmark: 'text-2xl', tagline: 'text-base', inlineGap: 'gap-4', stackGap: 'gap-3', icon: 'h-12 w-12' },
    xl: { wordmark: 'text-3xl md:text-4xl', tagline: 'text-lg', inlineGap: 'gap-4', stackGap: 'gap-3.5', icon: 'h-14 w-14' },
    '2xl': { wordmark: 'text-4xl md:text-5xl', tagline: 'text-xl', inlineGap: 'gap-5', stackGap: 'gap-4', icon: 'h-16 w-16' }
  } as const;

  const variantConfigs = {
    full: { layout: 'vertical', showText: true, defaultTagline: true },
    compact: { layout: 'horizontal', showText: true, defaultTagline: false },
    'icon-only': { layout: 'icon', showText: false, defaultTagline: false },
    header: { layout: 'horizontal', showText: true, defaultTagline: true },
    landing: { layout: 'vertical', showText: true, defaultTagline: true }
  } as const;

  const config = variantConfigs[variant];
  const sizes = sizeConfigs[size];

  const glassClasses = glassEffect
    ? 'backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl'
    : '';

  const animationClasses = animated
    ? 'transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg'
    : '';

  const gradientWordmark = (
    <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
      EMS
    </span>
  );

  const wordmarkElement = config.showText && (
    <div className={`font-black tracking-tight uppercase ${sizes.wordmark} text-gray-900 dark:text-white flex items-baseline gap-1`}
      aria-label="ProMedix EMS">
      <span className="leading-none">ProMedix</span>
      <span className="leading-none">{gradientWordmark}</span>
    </div>
  );

  const taglineElement = (config.defaultTagline || showTagline) && (
    <div className={`${sizes.tagline} text-gray-600 dark:text-gray-300 font-medium text-center max-w-xs`}
      aria-label="Next-Gen Education Tool for Emergency Medical Services">
      Next-Gen Education Tool for Emergency Medical Services
    </div>
  );

  const iconElement = (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 shadow-md ${sizes.icon}`}
      aria-hidden
    >
      <span className="absolute h-[55%] w-[18%] rounded-full bg-white/85" />
      <span className="absolute h-[18%] w-[55%] rounded-full bg-white/85" />
      <span className="sr-only">ProMedix icon</span>
    </div>
  );

  const renderLogo = () => {
    switch (config.layout) {
      case 'vertical':
        return (
          <div className={`flex flex-col items-center ${sizes.stackGap}`}>
            {wordmarkElement}
            {taglineElement}
          </div>
        );
      case 'horizontal':
        return (
          <div className={`flex items-center ${sizes.inlineGap}`}>
            <div className="flex flex-col">
              {wordmarkElement}
              {taglineElement}
            </div>
          </div>
        );
      case 'icon':
      default:
        return iconElement;
    }
  };

  const logoContent = (
    <div className={`${glassClasses} ${animationClasses} ${className}`}>
      {renderLogo()}
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="inline-block" aria-label="Go to home">
      {logoContent}
    </Link>
  ) : (
    <div aria-label="ProMedix EMS" role="img">
      {logoContent}
    </div>
  );
};

export default ProMedixLogo;