import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Calculator,
  CheckSquare,
  Search,
  Stethoscope,
  ClipboardList,
  Target,
  Mic,
  Shield,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Activity,
  FileText,
  Brain,
  TrendingUp,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import EnhancedSearchBar from '../EnhancedSearchBar';
import { SearchResult } from '../../utils/search';

interface StationLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const StationLayout: React.FC<StationLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark for Station layout

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Handle search
  const handleSearch = (query: string, results: SearchResult[]) => {
    navigate('/search', { state: { query, results } });
  };

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    navigate(result.url);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-mono text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-700 shadow-sm">
        {/* Mobile Header */}
        <div className="lg:hidden">
          {/* Mobile Logo and Controls */}
          <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 shadow-sm transition hover:bg-slate-700"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link to="/" className="flex-1 flex justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Emerita Clinical: The Rig"
                  className="h-40 sm:h-48 w-auto drop-shadow-[0_8px_16px_rgba(59,130,246,0.3)]"
                />
              </Link>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 shadow-sm transition hover:bg-slate-700"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <nav className="px-4 pb-4 space-y-2 text-slate-100">
              {[
                { label: 'Dashboard', path: '/', icon: Home },
                { label: 'Study Notes', path: '/study-notes', icon: BookOpen },
                { label: 'Flashcards', path: '/flashcards', icon: Brain },
                { label: 'Medications', path: '/medications', icon: Stethoscope },
                { label: 'Calculators', path: '/tools', icon: Calculator },
                { label: 'Scenarios', path: '/scenarios', icon: Activity },
                { label: 'PCR Practice', path: '/pcr-practice', icon: ClipboardList },
                { label: 'NREMT Exam', path: '/enhanced-quiz', icon: Target },
                { label: 'Progress', path: '/progress', icon: TrendingUp }
              ].map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-slate-300 shadow-sm transition hover:bg-slate-700 hover:border-slate-500"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block text-slate-100">
          {/* Logo Section */}
          <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
            <div className="flex justify-center py-6">
              <img
                src="/assets/logo.png"
                alt="Emerita Clinical: The Rig"
                className="h-56 w-auto drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)]"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <nav className="flex items-center space-x-2">
                {[
                  { label: 'Dashboard', path: '/', icon: Home },
                  { label: 'Study Notes', path: '/study-notes', icon: BookOpen },
                  { label: 'Flashcards', path: '/flashcards', icon: Brain },
                  { label: 'Medications', path: '/medications', icon: Stethoscope },
                  { label: 'Calculators', path: '/tools', icon: Calculator },
                  { label: 'Scenarios', path: '/scenarios', icon: Activity },
                  { label: 'PCR Practice', path: '/pcr-practice', icon: ClipboardList },
                  { label: 'NREMT Exam', path: '/enhanced-quiz', icon: Target },
                  { label: 'Progress', path: '/progress', icon: TrendingUp }
                ].map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-amber-600 text-slate-900 border border-amber-500 shadow-lg'
                          : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 shadow-sm hover:bg-slate-700 transition-all duration-300"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button className="p-2 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 shadow-sm hover:bg-slate-700 transition-all duration-300">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto px-6 pb-4 text-slate-100">
            <div className="max-w-2xl mx-auto">
              <EnhancedSearchBar
                placeholder="Search protocols, medications, conditions..."
                onSearch={handleSearch}
                onResultSelect={handleResultSelect}
                showFilters={true}
                showInstantResults={true}
                size="md"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 lg:pt-24">
        {title && (
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-amber-400">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default StationLayout;