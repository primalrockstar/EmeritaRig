import React from 'react';

interface BadgeProps {
  label: string;
  color: 'blue' | 'amber' | 'emerald' | 'red';
}

const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-300',
    amber: 'bg-amber-500/20 text-amber-300',
    emerald: 'bg-emerald-500/20 text-emerald-300',
    red: 'bg-red-500/20 text-red-300',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {label}
    </span>
  );
};

export default Badge;