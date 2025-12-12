import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  BarChart2,
  Settings,
  FileText,
  Mic,
  Activity,
  ClipboardList,
  Stethoscope,
  Siren,
  Pill,
  Calculator,
  Target,
  X
} from 'lucide-react';

interface UWorldSidebarProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

const UWorldSidebar: React.FC<UWorldSidebarProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const navItems = [
    { icon: BookOpen, label: 'STUDY NOTES', path: '/study-notes', description: '47 Chapters (41+6)', divider: false },
    { icon: Brain, label: 'CHAPTER FLASHCARDS', path: '/flashcards', description: '1,173 Cards', divider: false },
    { icon: Pill, label: 'EMT-B MEDICATIONS', path: '/medications', description: 'Memorize + Reference', divider: false },
    { icon: Calculator, label: 'CALCULATORS', path: '/tools', description: 'GCS, APGAR, Dosing', divider: true },
    { icon: Activity, label: 'SCENARIOS', path: '/scenarios', description: '28 Cases (FTO Help)', divider: false },
    { icon: ClipboardList, label: 'PCR REPORT SIM', path: '/pcr-practice', description: 'Practice + Voice', divider: false },
    { icon: FileText, label: 'CHAPTER QUIZZES', path: '/enhanced-quiz', description: '15Q per chapter', divider: true },
    { icon: Target, label: 'NREMT EXAM SIM', path: '/nremt-simulator', description: 'CAT Exam (No Help!)', divider: false },
    { icon: BarChart2, label: 'PROGRESS', path: '/progress', description: 'Analytics', divider: false },
  ];

  return (
    <>
      <div className="w-72 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl border-r border-slate-800 hidden md:flex">
        {/* Header / Logo Area */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                Emerita <span className="text-blue-400">Clinical</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">EMT-B Edition</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Learning Modules
          </div>
          <ul className="space-y-1 px-3">
            {navItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <li>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-blue-600/10 text-blue-400 shadow-sm border border-blue-600/20'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                      }`
                    }
                  >
                    <item.icon className={`w-5 h-5 mr-3 transition-colors flex-shrink-0 ${
                      window.location.pathname === item.path ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'
                    }`} />
                    <div className="flex-1">
                      <div className="font-semibold">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-slate-500 group-hover:text-slate-400">{item.description}</div>
                      )}
                    </div>
                  </NavLink>
                </li>
                {item.divider && (
                  <li className="my-3 mx-4 border-t border-slate-800" />
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Footer / Settings */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <button className="flex items-center px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl w-full transition-all duration-200">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-600">
              v2.5.0 • <NavLink to="/terms" className="hover:text-slate-400 cursor-pointer">Legal</NavLink> • <NavLink to="/privacy" className="hover:text-slate-400 cursor-pointer">Privacy</NavLink>
            </p>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-50 md:hidden" onClick={onCloseMobileMenu}>
          <div className="w-72 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl border-r border-slate-800" onClick={(e) => e.stopPropagation()}>
            {/* Header / Logo Area */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                    Emerita <span className="text-blue-400">Clinical</span>
                  </h1>
                  <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">EMT-B Edition</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
              <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Learning Modules
              </div>
              <ul className="space-y-1 px-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-blue-600/10 text-blue-400 shadow-sm border border-blue-600/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                        }`
                      }
                      onClick={onCloseMobileMenu}
                    >
                      <item.icon className={`w-5 h-5 mr-3 transition-colors flex-shrink-0 ${
                        window.location.pathname === item.path ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'
                      }`} />
                      <div className="flex-1">
                        <div className="font-semibold">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-slate-500 group-hover:text-slate-400">{item.description}</div>
                        )}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer / Settings */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
              <button className="flex items-center px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl w-full transition-all duration-200">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
              <div className="mt-4 text-center">
                <p className="text-[10px] text-slate-600">
                  v2.5.0 • <NavLink to="/terms" className="hover:text-slate-400 cursor-pointer" onClick={onCloseMobileMenu}>Legal</NavLink> • <NavLink to="/privacy" className="hover:text-slate-400 cursor-pointer" onClick={onCloseMobileMenu}>Privacy</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UWorldSidebar;