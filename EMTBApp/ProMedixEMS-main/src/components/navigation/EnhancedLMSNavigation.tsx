import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Moon, 
  Sun,
  ChevronDown,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Calculator,
  MessageSquare,
  FileText,
  TestTube,
  Home,
  Menu,
  X
} from 'lucide-react';

interface EnhancedLMSNavigationProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const EnhancedLMSNavigation: React.FC<EnhancedLMSNavigationProps> = ({
  isDarkMode = false,
  toggleDarkMode = () => {}
}) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Professional Curriculum Modules (14 Advanced Modules)
  const curriculumModules = [
    {
      id: 'module-1',
      title: 'Module 1: Foundations of EMS Practice',
      description: 'EMS System Fundamentals, Responder Safety & Resilience',
      chapters: ['Ch 1: EMS Ecosystem Essentials', 'Ch 2: Safety Protocols', 'Ch 3: Legal Frameworks', 'Ch 4: Documentation'],
      route: '/curriculum/module-1'
    },
    {
      id: 'module-2', 
      title: 'Module 2: Clinical Foundations',
      description: 'Medical Language, Anatomy, Development',
      chapters: ['Ch 5: Medical Terminology', 'Ch 6: Body Systems', 'Ch 7: Lifespan Care', 'Ch 8: Patient Movement', 'Ch 9: Team Dynamics'],
      route: '/curriculum/module-2'
    },
    {
      id: 'module-3',
      title: 'Module 3: Patient Assessment',
      description: 'Comprehensive Patient Evaluation',
      chapters: ['Ch 10: Comprehensive Assessment'],
      route: '/curriculum/module-3'
    },
    {
      id: 'module-4',
      title: 'Module 4: Airway Management',
      description: 'Advanced Airway Interventions', 
      chapters: ['Ch 11: Airway Techniques'],
      route: '/curriculum/module-4'
    }
  ];

  // Existing navigation items (PRESERVE ALL)
  const existingNavItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Study Materials', path: '/emtb', icon: BookOpen },
    { name: 'Study Notes', path: '/emtb/study-notes', icon: FileText },
    { name: 'Flashcards', path: '/emtb/flashcards', icon: ClipboardList }
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
           
          {/* Center: ProMedix EMS Logo and Tagline */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex flex-col items-center space-y-1">
              <div className="flex items-center justify-center">
                <img 
                  src="/assets/LOGOFINAL.png" 
                  alt="ProMedix EMS Logo" 
                  className="h-8 sm:h-10 object-contain"
                  style={{ background: 'transparent', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center whitespace-nowrap hidden sm:block">
                The Next-Gen Education Tool for Emergency Medical Services
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Existing Navigation Items (PRESERVE) */}
            {existingNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? isDarkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50'
                      : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* NEW: Professional Curriculum Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('curriculum')}
                className={`${
                  isActive('/curriculum')
                    ? isDarkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50'
                    : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors duration-200`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Professional Curriculum</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'curriculum' ? 'rotate-180' : ''}`} />
              </button>

              {/* Curriculum Dropdown Menu */}
              {activeDropdown === 'curriculum' && (
                <div className={`absolute left-0 mt-2 w-80 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border z-50`}>
                  <div className="p-4">
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold text-sm mb-3`}>
                      14 Professional Modules
                    </h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {curriculumModules.map((module) => (
                        <Link
                          key={module.id}
                          to={module.route}
                          className={`block p-3 rounded-md transition-colors duration-200 ${
                            isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                              : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="font-medium text-sm">{module.title}</div>
                          <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {module.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Search (PRESERVE) */}
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                />
                <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </form>

            {/* Dark Mode Toggle (PRESERVE) */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="space-y-2">
              {existingNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? isDarkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50'
                        : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    } flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <Link
                to="/curriculum"
                className={`${
                  isActive('/curriculum')
                    ? isDarkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50'
                    : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                } flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Professional Curriculum</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnhancedLMSNavigation;
