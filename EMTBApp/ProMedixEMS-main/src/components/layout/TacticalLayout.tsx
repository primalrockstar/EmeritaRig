import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Activity, Brain, ClipboardList, Menu, X } from 'lucide-react';
import { getCurrentTimeMilitary } from '../../utils/timeUtils';

interface TacticalLayoutProps {
  children: React.ReactNode;
}

const TacticalLayout: React.FC<TacticalLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTimeMilitary());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTimeMilitary());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Field Manual', href: '/study-notes', icon: BookOpen },
    { name: 'Scenarios', href: '/scenarios', icon: Activity },
    { name: 'Flashcards (HUD)', href: '/flashcards', icon: Brain },
    { name: 'Report Writer', href: '/pcr-practice', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Status Bar Header */}
      <header className="h-12 bg-black text-emerald-500 font-mono flex items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <span>UNIT: EMT-B01</span>
          <span>SHIFT TIMER: {currentTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Connectivity Status: ONLINE</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-12 px-4 bg-black">
            <span className="text-emerald-500 font-mono">MDT CONSOLE</span>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="mt-8">
            <div className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'border-l-4 border-amber-500 bg-slate-800 text-amber-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 bg-slate-900 min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalLayout;