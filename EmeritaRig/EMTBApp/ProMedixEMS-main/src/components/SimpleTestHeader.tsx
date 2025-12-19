import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, User, Shield, Bell, Sun, Moon, Search, Home, BookOpen, FileText, Pill, Settings } from 'lucide-react';

const SimpleTestHeader = () => {
  const [isDark, setIsDark] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [hideMobileNav, setHideMobileNav] = useState(false);
  const location = useLocation();

  const bottomNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'modules', label: 'Modules', icon: BookOpen, path: '/modules' },
    { id: 'protocols', label: 'Protocols', icon: FileText, path: '/protocols' },
    { id: 'medications', label: 'Medications', icon: Pill, path: '/medications' },
    { id: 'tools', label: 'Tools', icon: Settings, path: '/tools' }
  ];

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 10) {
        setHideMobileNav(false);
      } else if (delta > 6) {
        setHideMobileNav(true);
      } else if (delta < -6) {
        setHideMobileNav(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div style={{backgroundColor: '#00ff00', color: 'black', padding: '10px', textAlign: 'center', fontWeight: 'bold'}}>
          🎯 HEADER + BOTTOM NAV TEST! - {new Date().toLocaleTimeString()}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">ProMedix EMS</h1>
            <p className="text-sm text-gray-600">Test Bottom Navigation</p>
          </div>
        </div>
      </header>

      <div style={{height: '150vh', padding: '20px'}}>
        <h2>Scroll down to test the bottom navigation auto-hide feature!</h2>
        <p>The bottom navigation should appear at the bottom of your screen and hide when scrolling down.</p>
        <div style={{marginTop: '50px'}}>
          <h3>Bottom Navigation Features:</h3>
          <ul>
            <li>✅ 5 navigation items: Dashboard, Modules, Protocols, Medications, Tools</li>
            <li>✅ Auto-hide on scroll down</li>
            <li>✅ Show on scroll up</li>
            <li>✅ Active state highlighting</li>
            <li>✅ Icons with labels</li>
          </ul>
        </div>
      </div>

      <nav
        className={`fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 z-50 transition-transform duration-200 ${hideMobileNav ? 'translate-y-full' : 'translate-y-0'}`}
        aria-label="Primary mobile navigation"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="grid grid-cols-5">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path ||
                             (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="mt-0.5">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SimpleTestHeader;