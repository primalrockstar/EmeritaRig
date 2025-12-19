import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface LandingNavbarProps {
  onLogin?: () => void;
  onStartTraining?: () => void;
}

const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onLogin,
  onStartTraining
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { title: 'Features', href: '#features' },
    { title: 'Scenarios', href: '#scenarios' },
    { title: 'Pricing', href: '#pricing' }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links for same page scrolling
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl'
          : 'bg-slate-900/50 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo - Far Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {/* Logo placeholder - using text for now, replace with actual logo */}
                <div className="text-2xl font-bold text-white tracking-tight">
                  THE RIG
                </div>
                <div className="hidden sm:block text-xs text-slate-400 uppercase tracking-widest">
                  Emerita Clinical
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Login
            </button>
            <button
              onClick={onStartTraining}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Training
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                {item.title}
              </button>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-slate-700/50 space-y-3">
              <button
                onClick={() => {
                  onLogin?.();
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium text-left"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onStartTraining?.();
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;