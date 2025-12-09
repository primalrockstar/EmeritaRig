// Ultra-Modern Header with Glass Morphism Design
// Features: Responsive navigation, glass effects, search integration

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Settings, 
  BookOpen, 
  Calculator, 
  Heart, 
  Award,
  Bell,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
  TrendingUp
} from 'lucide-react';
import ProMedixLogo from './ProMedixLogo';
import { GlassCard, ModernButton, GlassSearchBar } from './ui/ModernGlassComponents';

interface ModernHeaderProps {
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onThemeToggle?: () => void;
  onSearch?: (query: string) => void;
  isDarkMode?: boolean;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ 
  user, 
  onThemeToggle, 
  onSearch,
  isDarkMode = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: BookOpen,
      description: 'Your learning progress'
    },
    {
      title: 'Curriculum',
      href: '/curriculum',
      icon: BookOpen,
      description: 'Complete EMT-B course'
    },
    {
      title: 'Progress',
      href: '/progress',
      icon: TrendingUp,
      description: 'Track your achievements'
    },
    {
      title: 'Calculators',
      href: '/calculators',
      icon: Calculator,
      description: 'Clinical tools & assessments'
    },
    {
      title: 'Scenarios',
      href: '/scenarios',
      icon: Heart,
      description: 'Interactive patient cases'
    },
    {
      title: 'Practice',
      href: '/practice',
      icon: Award,
      description: 'Quizzes & assessments'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg border-b border-white/20' 
          : 'backdrop-blur-md bg-white/50 dark:bg-gray-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                  <ProMedixLogo 
                    variant="header" 
                    size="xl" 
                    animated
                    className="px-3 py-2"
                  />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`group relative px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <GlassCard className="px-3 py-2 text-sm whitespace-nowrap" intensity="strong">
                        {item.description}
                      </GlassCard>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <GlassSearchBar
                placeholder="Search courses, topics, scenarios..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={() => handleSearch(searchQuery)}
                className="w-full"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Theme Toggle */}
              <ModernButton
                variant="glass"
                size="sm"
                onClick={onThemeToggle}
                icon={isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                className="hidden sm:flex"
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </ModernButton>

              {/* Notifications */}
              {user && (
                <ModernButton
                  variant="glass"
                  size="sm"
                  icon={<Bell className="w-4 h-4" />}
                  className="hidden sm:flex relative"
                >
                  {/* Notification badge */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </ModernButton>
              )}

              {/* User Menu - Only show if user exists */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.role}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 z-50">
                      <GlassCard className="py-2" intensity="strong">
                        <div className="px-4 py-3 border-b border-gray-200/20">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.role}
                          </div>
                        </div>
                        
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20"
                          >
                            <User className="w-4 h-4 mr-3" />
                            Profile Settings
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20"
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Preferences
                          </Link>
                          <div className="border-t border-gray-200/20 my-1" />
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/20 dark:hover:bg-red-900/20">
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </GlassCard>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <ModernButton
                variant="glass"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                icon={isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                className="lg:hidden"
              >
                Menu
              </ModernButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-black/20"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw]">
            <GlassCard className="h-full p-6" intensity="strong">
              {/* Mobile Search */}
              <div className="mb-6 pt-16">
                <GlassSearchBar
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={() => handleSearch(searchQuery)}
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200/20 space-y-3">
                <ModernButton
                  variant="glass"
                  size="sm"
                  onClick={onThemeToggle}
                  icon={isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </ModernButton>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ModernHeader;