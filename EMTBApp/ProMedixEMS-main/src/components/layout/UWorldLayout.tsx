import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UWorldSidebar from './UWorldSidebar';
import { Menu, Activity } from 'lucide-react';
import InstallPrompt from '../pwa/InstallPrompt';
import EnhancedSearchBar from '../EnhancedSearchBar';
import { SearchResult } from '../../utils/search';

interface UWorldLayoutProps {
  children: React.ReactNode;
}

const UWorldLayout: React.FC<UWorldLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string, results: SearchResult[]) => {
    navigate('/search', { state: { query, results } });
  };

  const handleResultSelect = (result: SearchResult) => {
    navigate(result.url);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <UWorldSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 z-40 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">
              Emerita <span className="text-blue-400">Clinical</span>
            </h1>
            <span className="text-[8px] font-semibold tracking-widest text-slate-400 uppercase">EMT-B Edition</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content with Search Bar */}
      <main className="flex-1 md:ml-72 ml-0 p-4 sm:p-8 w-full pt-16 md:pt-0 pb-safe">
        {/* Universal Search Bar */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-4">
            <EnhancedSearchBar
              placeholder="Search study notes, medications, protocols, calculators, scenarios..."
              onSearch={handleSearch}
              onResultSelect={handleResultSelect}
              showFilters={true}
              showInstantResults={true}
              size="md"
            />
          </div>
        </div>
        
        {/* Page Content */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <InstallPrompt />
    </div>
  );
};

export default UWorldLayout;