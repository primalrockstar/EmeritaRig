import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Mic, Package } from 'lucide-react';

const BottomDock: React.FC = () => {
  const location = useLocation();

  const dockItems = [
    { icon: Home, label: 'Dispatch', path: '/', key: 'home' },
    { icon: BookOpen, label: 'Manual', path: '/study', key: 'manual' },
    { icon: Mic, label: 'PCR', path: '/pcr-practice', key: 'pcr' },
    { icon: Package, label: 'Inventory', path: '/medications', key: 'inventory' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="glass-panel rounded-lg mx-auto max-w-md">
        <div className="flex justify-around items-center p-2">
          {dockItems.map(({ icon: Icon, label, path, key }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={key}
                to={path}
                className={`flex flex-col items-center p-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'text-neon-500 bg-slate-800/50 shadow-lg shadow-neon-500/20'
                    : 'text-slate-400 hover:text-neon-400 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-mono">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomDock;