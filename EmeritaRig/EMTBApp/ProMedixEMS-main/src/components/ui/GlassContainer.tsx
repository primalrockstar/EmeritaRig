import React from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen w-full p-4 md:p-8 space-y-6 ${className}`.trim()}>
      {children}
    </div>
  );
};

export default GlassContainer;