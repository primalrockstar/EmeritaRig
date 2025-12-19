import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Heart, Calculator, Menu } from 'lucide-react';

// Bottom Navigation Component for Mobile
const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const bottomNavItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Study', path: '/', icon: BookOpen },
    { name: 'EMT-B', path: '/', icon: Heart },
    { name: 'Tools', path: '/', icon: Calculator },
    { name: 'More', path: '/', icon: Menu },
  ];

  const handleNavigation = (item: any) => {
    setActiveTab(item.name);
    
    // Always navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
    }
    
    // Then scroll to appropriate section based on the button
    setTimeout(() => {
      let targetId = '';
      switch (item.name) {
        case 'Study':
          targetId = 'study';
          break;
        case 'EMT-B':
          targetId = 'emtb';
          break;
        case 'Tools':
          targetId = 'tools';
          break;
        case 'More':
          targetId = 'more';
          break;
        default:
          // Dashboard - scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
      }
      
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => {
          const isActive = activeTab === item.name;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
