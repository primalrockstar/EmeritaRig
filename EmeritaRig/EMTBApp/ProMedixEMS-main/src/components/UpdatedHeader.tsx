// Updated ProMedixHeader Component - Centered Logo Design
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Home, BookOpen, Heart, FileText, Stethoscope, Calculator, Menu, ChevronDown, Bell, Users, User, Search, Brain, CheckSquare } from 'lucide-react';

const ProMedixHeader = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const primaryTabs = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Modules', path: '/modules', icon: BookOpen },
    { name: 'EMT-B Training', path: '/emtb', icon: Heart },
    { name: 'Protocols', path: '/protocols', icon: FileText },
    { name: 'Medications', path: '/medications', icon: Stethoscope },
    { name: 'Tools & Reference', path: '/tools', icon: Calculator },
  ];

  return (
    <header className="bg-white dark:bg-[#0f141a] border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      
      {/* Top Header Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Mobile Menu + Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Desktop dropdown menu */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-1 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showMobileMenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <Link to="/progress" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Progress</Link>
                      <Link to="/ai-assistant" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AI Assistant</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: ProMedix EMS Logo and Tagline */}
            <div className="flex-1 flex justify-center">
              <Link to="/" className="flex flex-col items-center space-y-1">
                <div className="flex items-center justify-center">
                  <img 
                    src="/assets/LOGOFINAL.png" 
                    alt="ProMedix EMS Logo" 
                    className="h-8 sm:h-10 md:h-12 object-contain"
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium text-center whitespace-nowrap">
                  The Next-Gen Education Tool for Emergency Medical Services
                </p>
              </Link>
            </div>

            {/* Right: Notifications + Login */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isDark ? <Users className="w-5 h-5" /> : <Users className="w-5 h-5" />}
              </button>

              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowLoginDropdown(false);
                          navigate('/login', { state: { redirectTo: '/student', prefillEmail: 'student@example.com' } });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Student Login</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowLoginDropdown(false);
                          navigate('/login', { state: { redirectTo: '/instructor', prefillEmail: 'instructor@example.com' } });
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Stethoscope className="w-4 h-4" />
                        <span>Instructor Login</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search protocols, medications, conditions, and study materials..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 overflow-x-auto">
          {primaryTabs.map((tab) => {
            const isActive = location.pathname === tab.path || 
              (tab.path !== '/' && location.pathname.startsWith(tab.path));
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Display current stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <BookOpen className="w-4 h-4" />
              <span>10 Modules</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FileText className="w-4 h-4" />
              <span>41 Chapters</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Brain className="w-4 h-4" />
              <span>AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <CheckSquare className="w-4 h-4" />
              <span>500+ Questions</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
