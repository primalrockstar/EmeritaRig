// Ultra-Modern ProMedix EMS Platform - Minimal Working Version
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
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

// Core working components
import { AuthProvider, RequireRole } from './auth/AuthContext';
import LoginPage from './auth/LoginPage';
import InstructorDashboard from './auth/InstructorDashboard';
import EnhancedPracticeQuizSystem from './components/EnhancedPracticeQuizSystem';
import NREMTSimulator from './features/nremt-simulator/NREMTSimulator';
import VoiceNoteTranscriber from './components/VoiceNoteTranscriber';
import NationalProtocolFoundationManager from './components/NationalProtocolFoundationManager';
import ClinicalCalculatorsHub from './components/tools/ClinicalCalculatorsHub';
import { StudyNotesOverview, StudyNotesChapterView } from './components/StudyNotesNavigator';
import EMTBNavigation from './features/study/EMTBNavigation';
import EMTBFlashcards from './features/quiz/EMTBFlashcards';
import SkillsPracticeModule from './features/study/SkillsPracticeModule';
import EMTScopeMedications from './features/tools/EMTScopeMedications';
import PatientAssessmentPracticeModule from './components/tools/PatientAssessmentPractice';
import ProgressDashboard from './components/ProgressDashboard';
import { ModernButton, GlassCard } from './components/ui/ModernGlassComponents';
import EnhancedSearchBar from './components/EnhancedSearchBar';
import { SearchResult } from './utils/search';
import UWorldLayout from './components/layout/UWorldLayout';
import { PrivacyPolicy, TermsOfService, MedicalDisclaimer, SupportCenter, ContactUs } from './components/LegalSupportPages';
import { Help } from './components/Help';
import LectureCompanion from './features/study/LectureCompanion';
import CompanionDashboard from './components/dashboard/CompanionDashboard';
import CompanionLearnTab from './components/dashboard/CompanionLearnTab';
import CompanionProgressTab from './components/dashboard/CompanionProgressTab';
import CompanionDrillTab from './components/dashboard/CompanionDrillTab';

import CompanionReferenceTab from './components/dashboard/CompanionReferenceTab';

// Enhanced Ultra-Modern Header with Glass Morphism
const UltraModernHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-blue-200 shadow-sm dark:bg-[#061733]/85 dark:border-sky-500/20">
      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* Mobile Logo and Controls */}
        <div className="border-b border-blue-200 bg-gradient-to-r from-white via-blue-50 to-blue-100 dark:border-sky-500/20 dark:from-[#031021]/60 dark:via-[#062342]/60 dark:to-[#0A3E6A]/60">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 shadow-sm transition hover:bg-blue-100 dark:bg-white/10 dark:border-sky-500/40 dark:text-sky-100"
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
              className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 shadow-sm transition hover:bg-blue-100 dark:bg-white/10 dark:border-sky-500/40 dark:text-sky-100"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="px-4 pb-4 space-y-2 text-slate-800 dark:text-slate-100">
            {[
              { label: 'Study Notes (45 Chapters)', path: '/study-notes', icon: BookOpen },
              { label: 'Chapter Flashcards', path: '/flashcards', icon: Brain },
              { label: 'EMT-B Medications', path: '/medications', icon: Stethoscope },
              { label: 'Medical Calculators', path: '/tools', icon: Calculator },
              { label: 'Clinical Scenarios', path: '/scenarios', icon: Activity },
              { label: 'PCR Report Sim', path: '/pcr-practice', icon: ClipboardList },
              { label: 'NREMT Exam Sim', path: '/enhanced-quiz', icon: Target },
              { label: 'Progress Dashboard', path: '/progress', icon: TrendingUp }
            ].map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-200 bg-white text-blue-700 shadow-sm transition hover:bg-blue-50 dark:border-sky-500/30 dark:bg-white/10 dark:text-sky-100"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block text-slate-800 dark:text-slate-100">
        {/* Ultra-Modern Logo Section with Glass Effect */}
        <div className="border-b border-blue-200 bg-gradient-to-r from-white via-blue-50 to-blue-100 dark:border-sky-500/20 dark:from-[#031021]/60 dark:via-[#062342]/60 dark:to-[#0A3E6A]/60">
          <div className="flex justify-center py-6">
            <img 
              src="/assets/logo.png" 
              alt="Emerita Clinical: The Rig" 
              className="h-56 w-auto drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)]"
            />
          </div>
        </div>

        {/* Ultra-Modern Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <nav className="flex items-center space-x-2">
              {[
                { label: 'Dashboard', path: '/', icon: Home },
                { label: 'Enhanced Quiz', path: '/enhanced-quiz', icon: Target },
                { label: 'Voice Transcriber', path: '/voice-transcriber', icon: Mic },
                { label: 'National Protocols', path: '/national-protocols', icon: Shield },
                { label: 'Study Materials', path: '/study', icon: BookOpen },
                { label: 'Tools', path: '/tools', icon: Calculator },
                { label: 'Scenarios', path: '/scenarios', icon: Activity },
                { label: 'Skills Lab', path: '/skills-practice', icon: ClipboardList },
                { label: 'Progress', path: '/progress', icon: TrendingUp }
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-400 shadow-lg'
                        : 'bg-white hover:bg-blue-50 border border-blue-100 text-blue-700 hover:text-blue-900'
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
                className="p-2 rounded-xl bg-white border border-blue-200 text-blue-700 shadow-sm hover:bg-blue-50 transition-all duration-300 dark:bg-white/10 dark:border-sky-500/30 dark:text-sky-100 dark:hover:bg-white/20"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="p-2 rounded-xl bg-white border border-blue-200 text-blue-700 shadow-sm hover:bg-blue-50 transition-all duration-300 dark:bg-white/10 dark:border-sky-500/30 dark:text-sky-100 dark:hover:bg-white/20">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Ultra-Modern Search Bar */}
        <div className="max-w-7xl mx-auto px-6 pb-4 text-slate-800 dark:text-slate-100">
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
  );
};

interface HighlightItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  accent: string;
  iconColor: string;
  includes: string[];
}

const highlightSections: HighlightItem[] = [
  {
    title: 'Study Notes by Module',
    description: 'Access 14 modules mapped to the EMT-B National Standards',
    icon: BookOpen,
    to: '/study',
    accent: 'hover:border-blue-400',
    iconColor: 'text-blue-500',
    includes: ['Module-based navigation', '41 enhanced chapters', 'Clinical pearls & downloads']
  },
  {
    title: 'Comprehensive Curriculum',
    description: 'Review the complete EMT-B roadmap and chapter outlines',
    icon: ClipboardList,
    to: '/curriculum',
    accent: 'hover:border-blue-300',
    iconColor: 'text-blue-500',
    includes: ['Module summaries', 'Core competencies', 'Suggested study flow']
  },
  {
    title: 'Clinical Calculators',
    description: 'Evidence-based calculations and scoring tools',
    icon: Calculator,
    to: '/tools',
    accent: 'hover:border-blue-300',
    iconColor: 'text-blue-600',
    includes: ['Glasgow Coma Scale', 'APGAR & AVPU', 'Drug dosing assistant']
  },
  {
    title: 'Patient Assessment Lab',
    description: 'Voice-assisted NREMT practice with guided rubrics',
    icon: Stethoscope,
    to: '/scenarios',
    accent: 'hover:border-blue-400',
    iconColor: 'text-blue-500',
    includes: ['Medical & trauma checklists', 'Interactive scenarios', 'Auto-scored feedback']
  },
  {
    title: 'Interactive Flashcards',
    description: 'Rapid review decks aligned to each module',
    icon: Brain,
    to: '/flashcards',
    accent: 'hover:border-blue-400',
    iconColor: 'text-blue-600',
    includes: ['Clinical mnemonics', 'Scenario prompts', 'Step-by-step skills']
  },
  {
    title: 'Practice Quizzes',
    description: 'Balanced quiz system with performance analytics',
    icon: Target,
    to: '/enhanced-quiz',
    accent: 'hover:border-blue-400',
    iconColor: 'text-blue-500',
    includes: ['Module-based exams', 'Timed assessments', 'Detailed rationales']
  },
  {
    title: 'Skills Practice Lab',
    description: 'Psychomotor rehearsal with refreshed checklists and examiner cues',
    icon: ClipboardList,
    to: '/skills-practice',
    accent: 'hover:border-blue-400',
    iconColor: 'text-blue-600',
    includes: ['Reworded evaluation points', '25 immersive scenarios', 'Critical error watch-outs']
  },
  {
    title: 'Simulation Lab',
    description: 'Scenario-driven skill refreshers and decision pathways',
    icon: Activity,
    to: '/scenarios',
    accent: 'hover:border-blue-300',
    iconColor: 'text-blue-500',
    includes: ['Cardiac & trauma cases', 'Medication administration', 'Field decision practice']
  }
];

const progressMetrics = [
  { label: 'TOTAL STUDY TIME', value: '2h 41m', detail: null },
  { label: 'QUIZ AVERAGE', value: 'N/A', detail: '0 quizzes taken' },
  { label: 'STUDY STREAK', value: '0 days', detail: null },
  { label: 'ACHIEVEMENTS', value: '0 chapters completed', detail: '0 flashcards mastered • 0 PCR practices' }
];

const recentActivity = [
  { label: 'Pcr', timestamp: '11/5/2025 at 5:33:07 PM', duration: '1h 38m' },
  { label: 'Pcr', timestamp: '11/5/2025 at 5:32:56 PM', duration: '0m' },
  { label: 'Pcr', timestamp: '11/5/2025 at 4:30:33 PM', duration: '1h 2m' },
  { label: 'Pcr', timestamp: '11/5/2025 at 2:44:42 PM', duration: '0m' },
  { label: 'Pcr', timestamp: '11/5/2025 at 2:44:24 PM', duration: '0m' },
  { label: 'Pcr', timestamp: '11/5/2025 at 2:34:42 PM', duration: '0m' }
];

const platformLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Curriculum', to: '/curriculum' },
  { label: 'Study Notes', to: '/study' },
  { label: 'Clinical Calculators', to: '/tools' },
  { label: 'Practice Center', to: '/enhanced-quiz' },
  { label: 'Skills Lab', to: '/skills-practice' },
  { label: 'Scenarios', to: '/scenarios' }
];

const resourceLinks = [
  { label: 'Flashcards Library', to: '/flashcards' },
  { label: 'EMT-B Navigation', to: '/curriculum' },
  { label: 'Balanced Quiz System', to: '/enhanced-quiz' },
  { label: 'Medical Disclaimer', to: '/disclaimer' },
  { label: 'Modern Landing', to: '/' },
  { label: 'Clinical Calculators Hub', to: '/tools' },
  { label: 'Skills Practice Lab', to: '/skills-practice' }
];


const UltraModernDashboard: React.FC = () => {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-24 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-12rem] right-[-6rem] h-[36rem] w-[36rem] rounded-full bg-blue-100/50 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-20 space-y-12">
        <section className="text-center space-y-6">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-blue-300 bg-white text-xs font-semibold tracking-[0.2em] text-blue-700 shadow-sm">
            EMERITA CLINICAL EMT-B
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
            A Modern Learning Companion for the<br/>Next Generation of EMTs
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Emerita Clinical EMT-B is a focused, high-performance learning platform built to help Emergency Medical Technician students master the fundamentals with clarity, confidence, and real-world readiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">45 Chapters of Study Notes</div>
             <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">NREMT-Style Quizzes</div>
             <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">Scenario Labs</div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {highlightSections.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                className="group block h-full"
              >
                <GlassCard className="h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30" intensity="medium" hoverable>
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-cyan-500/20 p-3">
                      <Icon className={`w-6 h-6 text-cyan-300`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {item.description}
                      </p>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {item.includes.map((include) => (
                          <li key={include} className="flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                            <span>{include}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300">
                    Explore module
                    <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </section>

        {/* Mission & Why Choose Section */}
        <GlassCard className="grid md:grid-cols-2 gap-8 rounded-3xl p-8" intensity="medium">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Why Students Choose Emerita Clinical</h2>
            <ul className="space-y-3">
              {[
                "Built by an EMT, not a generic developer",
                "Focused only on EMT-Basic content",
                "Fast, clean, distraction-free user experience",
                "Memorable scenarios & skill-focused drills",
                "Reliable tool for semester exams, labs, and NREMT prep",
                "Affordable, lightweight, and designed for real study habits"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Designed for How You Learn</h2>
            <div className="grid gap-4">
              <GlassCard className="p-4 rounded-xl" intensity="low">
                <h3 className="font-semibold text-cyan-300 mb-1">Clarity</h3>
                <p className="text-sm text-gray-300">Straightforward explanations, easy navigation</p>
              </GlassCard>
              <GlassCard className="p-4 rounded-xl" intensity="low">
                <h3 className="font-semibold text-cyan-300 mb-1">Retention</h3>
                <p className="text-sm text-gray-300">Drills, quizzes, flashcards, and repetition</p>
              </GlassCard>
              <GlassCard className="p-4 rounded-xl" intensity="low">
                <h3 className="font-semibold text-cyan-300 mb-1">Practical Thinking</h3>
                <p className="text-sm text-gray-300">Scenario-based decision making</p>
              </GlassCard>
            </div>
          </div>
        </GlassCard>

        {/* Important Notice */}
        <GlassCard className="border-amber-500/30 rounded-2xl p-6 flex items-start gap-4" intensity="medium">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-amber-300">Important Educational Notice</h3>
            <p className="text-sm text-amber-200 leading-relaxed">
              Emerita Clinical is an independent EMS education tool and is not affiliated with NREMT, AAOS, or any certifying body. This application is designed for educational purposes only to supplement formal EMT training programs. Always follow your medical director's protocols, local scope of practice, and official training materials.
            </p>
          </div>
        </GlassCard>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="rounded-3xl p-8 space-y-6" intensity="medium">
              <div>
                <h2 className="text-2xl font-semibold text-white">Your Progress Dashboard</h2>
                <p className="text-sm text-gray-300">
                  Track your learning journey and achievements
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {progressMetrics.map((metric) => (
                  <GlassCard key={metric.label} className="rounded-2xl p-5 space-y-2" intensity="low">
                    <span className="text-xs font-semibold text-cyan-300 tracking-widest">{metric.label}</span>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    {metric.detail ? (
                      <div className="text-sm text-gray-300">{metric.detail}</div>
                    ) : null}
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="rounded-3xl p-8 space-y-6" intensity="medium">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <p className="text-sm text-gray-300">Automatic logging of your latest sessions</p>
            </div>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {recentActivity.map((entry, index) => (
                <GlassCard key={`${entry.label}-${index}`} className="flex items-start justify-between gap-3 rounded-2xl px-4 py-3" intensity="low">
                  <div>
                    <div className="text-sm font-semibold text-white">{entry.label}</div>
                    <div className="text-xs text-gray-300">{entry.timestamp}</div>
                  </div>
                  <span className="text-sm font-medium text-cyan-300">{entry.duration}</span>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </section>

        <GlassCard className="rounded-3xl p-8 space-y-6" intensity="medium">
            <div>
              <h3 className="text-xl font-semibold text-white">Data Management</h3>
              <p className="text-sm text-gray-300 max-w-2xl">
                Your progress is automatically saved to your browser. Export it for backup, import a prior session, or clear it to start fresh.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ModernButton variant="gradient">Export Progress</ModernButton>
              <ModernButton variant="glass">Import Progress</ModernButton>
              <ModernButton variant="glass" className="text-rose-400 hover:text-rose-300">Clear All Data</ModernButton>
            </div>
        </GlassCard>

        {/* Footer */}
        <footer className="border-t border-gray-600 pt-12 pb-8 mt-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none">ProMedix<span className="text-cyan-400">EMS</span>™</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Professional EMT Education</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 max-w-sm">
                Professional EMT education software designed for modern EMS students and healthcare professionals.
                Part of the comprehensive Emerita Clinical suite.
              </p>
              <div className="flex gap-4 text-sm font-medium text-cyan-400">
                <a href="https://emeritaclinical.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300">EmeritaClinical.com</a>
                <span>•</span>
                <a href="#" className="hover:text-cyan-300">GitHub</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/study-notes" className="hover:text-cyan-400">Study Center</Link></li>
                <li><Link to="/curriculum" className="hover:text-cyan-400">Browse Content</Link></li>
                <li><Link to="/progress" className="hover:text-cyan-400">Progress Analytics</Link></li>
                <li><Link to="/settings" className="hover:text-cyan-400">Settings</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal & Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/privacy" className="hover:text-cyan-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-400">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-cyan-400">Medical Disclaimer</Link></li>
                <li><a href="mailto:support@webconnect360.com" className="hover:text-cyan-400">Contact Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2025 Emerita Clinical. All rights reserved. Emerita Clinical™ is a trademark of Emerita Clinical.</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> HIPAA Compliant Design</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Educational Use Only</span>
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Privacy Focused</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

interface PageContainerProps {
  title: string;
  subtitle: string;
  gradient?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  gradient = 'from-slate-900 via-slate-800 to-slate-900',
  fullBleed = false,
  children
}) => {
  return (
    <main className={`pt-20 lg:pt-24 min-h-screen bg-gradient-to-br ${gradient}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 lg:pb-20 space-y-6 lg:space-y-8">
        <header className="text-center space-y-2 lg:space-y-3 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{title}</h1>
          <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </header>
        {fullBleed ? (
          <GlassCard className="rounded-2xl lg:rounded-3xl overflow-hidden" intensity="strong">
            {children}
          </GlassCard>
        ) : (
          <GlassCard className="rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8" intensity="medium">
            {children}
          </GlassCard>
        )}
      </div>
    </main>
  );
};

const EnhancedQuizPage: React.FC = () => {
  return <EnhancedPracticeQuizSystem />;
};

const VoiceTranscriberPage: React.FC = () => (
  <PageContainer
    title="Voice Note Transcriber"
    subtitle="Professional-grade audio-to-text workflow with medical terminology recognition, export support, and QA tooling."
  >
    <VoiceNoteTranscriber />
  </PageContainer>
);

const ProtocolsPage: React.FC = () => (
  <PageContainer
    title="National Protocol Foundation"
    subtitle="NHTSA 2022 compliant treatment guidelines with chapter references, state scope insights, and decision support."
    fullBleed
  >
    <NationalProtocolFoundationManager />
  </PageContainer>
);

const FlashcardsPage: React.FC = () => (
  <PageContainer
    title="Interactive Flashcards"
    subtitle="Targeted decks with clinical mnemonics, step-by-step skills, and scenario prompts across every EMT-B module."
    gradient="from-blue-50 via-blue-100 to-white"
    fullBleed
  >
    <EMTBFlashcards />
  </PageContainer>
);

const CalculatorsPage: React.FC = () => (
  <PageContainer
    title="Clinical Calculators Hub"
    subtitle="Evidence-based calculators for neurologic assessment, pediatrics, trauma, airway, and medication dosing."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <ClinicalCalculatorsHub />
  </PageContainer>
);

const SkillsPracticePage: React.FC = () => (
  <PageContainer
    title="Skills Practice Lab"
    subtitle="Hands-on competency drills with examiner cues, reworded checklists, and 25 immersive scenarios for EMT skill stations."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <SkillsPracticeModule />
  </PageContainer>
);

const MedicationsPage: React.FC = () => (
  <PageContainer
    title="EMT Scope of Practice Medications"
    subtitle="Quick reference for medications EMTs may administer or assist with under most state protocols."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <EMTScopeMedications />
  </PageContainer>
);

const StudyMaterialsPage: React.FC = () => {
  const [showLectureCompanion, setShowLectureCompanion] = useState(false);

  if (showLectureCompanion) {
    return <LectureCompanion />;
  }

  return (
    <PageContainer
      title="Study Materials"
      subtitle="Structured pathways with 10 modules, 41 enhanced chapters, and supplemental downloads to complement classroom instruction."
      gradient="from-white via-blue-50 to-blue-100"
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <button
            onClick={() => setShowLectureCompanion(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg flex items-center"
          >
            <Mic className="w-5 h-5 mr-2" />
            Open Lecture Tools
          </button>
        </div>
        <StudyNotesOverview />
        <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-inner">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Curriculum Navigation</h2>
          <EMTBNavigation />
        </div>
        <div className="rounded-3xl bg-white border border-blue-100 p-6 shadow-inner">
          <EMTScopeMedications />
        </div>
      </div>
    </PageContainer>
  );
};

const CurriculumPage: React.FC = () => (
  <PageContainer
    title="Comprehensive Curriculum"
    subtitle="Explore module summaries, competencies, and recommended sequencing for confident mastery."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <EMTBNavigation />
  </PageContainer>
);

const ScenariosPage: React.FC = () => (
  <PageContainer
    title="Interactive Scenario Lab"
    subtitle="Ten high-fidelity patient encounters with guided rubrics, critical actions, and exportable practice records."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <PatientAssessmentPracticeModule />
  </PageContainer>
);

const StudyNotesChapterPage: React.FC = () => (
  <PageContainer
    title="Study Notes Chapter"
    subtitle="Deep dive into enhanced chapter content aligned to EMT-B competencies."
    gradient="from-white via-blue-50 to-blue-100"
  >
    <StudyNotesChapterView />
  </PageContainer>
);

const ProgressPage: React.FC = () => (
  <PageContainer
    title="Progress Dashboard"
    subtitle="Analytics, streaks, achievements, and export tools that follow your EMT-B learning journey."
    fullBleed
  >
    <CompanionProgressTab />
  </PageContainer>
);

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query = '', results = [] } = (location.state as { query: string; results: SearchResult[] }) || {};

  if (!query) {
    return (
      <PageContainer
        title="Search"
        subtitle="Find protocols, medications, study materials, and more"
      >
        <div className="text-center space-y-4 text-white">
          <Search className="w-16 h-16 mx-auto text-cyan-400 opacity-50" />
          <p className="text-lg">Use the search bar above to find EMT-B materials</p>
          <p className="text-sm text-gray-300">Search for protocols, medications, conditions, chapters, and more</p>
        </div>
      </PageContainer>
    );
  }

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
  };

  return (
    <PageContainer
      title={`Search Results for "${query}"`}
      subtitle={`Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
    >
      {results.length === 0 ? (
        <div className="text-center space-y-4 text-blue-900 py-8">
          <Search className="w-16 h-16 mx-auto text-blue-400 opacity-50" />
          <h3 className="text-xl font-semibold">No results found</h3>
          <p className="text-slate-600">
            Try different keywords or check your spelling
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 border border-blue-500 text-white font-semibold hover:bg-blue-500 transition mt-4"
          >
            ← Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left p-6 rounded-2xl border border-gray-600 bg-slate-800/50 hover:bg-slate-700/80 hover:border-cyan-400/30 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">📄</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {result.snippet || result.content}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="px-3 py-1 bg-slate-700 border border-gray-500 rounded-full text-xs font-medium text-cyan-300 capitalize">
                      {result.type}
                    </span>
                    {result.category && (
                      <span className="px-3 py-1 bg-slate-700 border border-gray-500 rounded-full text-xs font-medium text-cyan-300">
                        {result.category}
                      </span>
                    )}
                    {result.url && (
                      <span className="px-3 py-1 bg-gray-700 border border-gray-500 rounded-full text-xs text-gray-300 font-mono">
                        URL: {result.url}
                      </span>
                    )}
                    {result.chapter && (
                      <span className="px-3 py-1 bg-slate-700 border border-gray-500 rounded-full text-xs text-gray-300">
                        Chapter {result.chapter}
                      </span>
                    )}
                    {result.relevanceScore && result.relevanceScore > 0 && (
                      <span className="px-3 py-1 bg-green-900/50 border border-green-500 rounded-full text-xs font-medium text-green-300">
                        {Math.round(result.relevanceScore)}% match
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

const NotFoundPage: React.FC = () => (
  <PageContainer
    title="Page Not Found"
    subtitle="The requested resource is unavailable. Return to the dashboard to continue your training experience."
  >
    <div className="text-center space-y-4 text-blue-900">
      <p>This route is not yet configured in the ultra-modern platform.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 border border-blue-500 text-white font-semibold hover:bg-blue-500 transition"
      >
        ← Back to Dashboard
      </Link>
    </div>
  </PageContainer>
);

// Main App Component
function ProtectedRoutes() {
  return (
    <UWorldLayout>
      <Routes>
  <Route path="/" element={<CompanionDashboard />} />
  <Route path="/today" element={<CompanionDashboard />} />
  <Route path="/dashboard" element={<UltraModernDashboard />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/enhanced-quiz" element={<EnhancedQuizPage />} />
        <Route path="/voice-transcriber" element={<VoiceTranscriberPage />} />
        <Route path="/national-protocols" element={<ProtocolsPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/tools" element={<CalculatorsPage />} />
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/skills-practice" element={<SkillsPracticePage />} />
        <Route path="/study" element={<StudyMaterialsPage />} />
        <Route path="/learn" element={<PageContainer title="Learn" subtitle="Your personalized learning companion with context-aware recommendations"><CompanionLearnTab /></PageContainer>} />
        <Route path="/drill" element={<CompanionDrillTab />} />
        <Route path="/reference" element={<CompanionReferenceTab />} />
        <Route path="/study-notes" element={<StudyMaterialsPage />} />
        <Route path="/study-notes/chapter/:chapterId" element={<StudyNotesChapterPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/chapters" element={<CurriculumPage />} />
        <Route path="/scenarios" element={<ScenariosPage />} />
        <Route path="/nremt-simulator" element={<PageContainer title="NREMT Exam Simulator" subtitle="High-stakes CAT exam - No assistance provided. Training wheels OFF."><NREMTSimulator /></PageContainer>} />

        <Route path="/progress" element={<ProgressPage />} />
        
        {/* Legal & Support Routes */}
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UWorldLayout>
  );
}

// Authentication-wrapped App Component
const AuthenticatedApp: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/instructor" element={<RequireRole role="instructor"><InstructorDashboard /></RequireRole>} />
          <Route path="/admin" element={<RequireRole role="admin"><InstructorDashboard /></RequireRole>} />
          {/* Temporarily bypass auth for testing */}
          <Route path="/*" element={<UWorldLayout><Routes>
            <Route path="/" element={<CompanionDashboard />} />
            <Route path="/today" element={<CompanionDashboard />} />
            <Route path="/dashboard" element={<UltraModernDashboard />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/enhanced-quiz" element={<EnhancedQuizPage />} />
            <Route path="/voice-transcriber" element={<VoiceTranscriberPage />} />
            <Route path="/national-protocols" element={<ProtocolsPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/tools" element={<CalculatorsPage />} />
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="/skills-practice" element={<SkillsPracticePage />} />
            <Route path="/study" element={<StudyMaterialsPage />} />
            <Route path="/learn" element={<PageContainer title="Learn" subtitle="Your personalized learning companion with context-aware recommendations"><CompanionLearnTab /></PageContainer>} />
            <Route path="/drill" element={<CompanionDrillTab />} />
            <Route path="/reference" element={<CompanionReferenceTab />} />
            <Route path="/study-notes" element={<StudyMaterialsPage />} />
            <Route path="/study-notes/chapter/:chapterId" element={<StudyNotesChapterPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/chapters" element={<CurriculumPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/nremt-simulator" element={<PageContainer title="NREMT Exam Simulator" subtitle="High-stakes CAT exam - No assistance provided. Training wheels OFF."><NREMTSimulator /></PageContainer>} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<MedicalDisclaimer />} />
            <Route path="/support" element={<SupportCenter />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes></UWorldLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AuthenticatedApp;
export { AuthenticatedApp, ProtectedRoutes };