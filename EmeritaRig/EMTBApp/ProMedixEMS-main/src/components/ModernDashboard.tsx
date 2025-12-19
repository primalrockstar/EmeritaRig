// Ultra-Modern Dashboard with Glass Morphism Design
// Comprehensive student progress and feature overview

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calculator,
  Heart,
  Award,
  TrendingUp,
  Clock,
  Target,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Brain,
  Users,
  Zap
} from 'lucide-react';
import { usePerformanceTracker } from '../hooks/usePerformanceTracker';
import { FlashcardTracker } from '../services/flashcardTracker';
import { PcrTracker } from '../services/pcrTracker';
import { 
  GlassCard, 
  GradientBackground, 
  ModernButton, 
  GlassProgressBar 
} from './ui/ModernGlassComponents';
import ProMedixLogo from './ProMedixLogo';

interface ModernDashboardProps {
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onNavigate?: (path: string) => void;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({ user, onNavigate }) => {
  const { getFlashcardWeakAreas, getDueFlashcardsCount } = usePerformanceTracker();

  const [stats, setStats] = useState({
    progress: 0,
    completedChapters: 0,
    totalChapters: 45,
    quizScore: 0,
    studyTime: 0,
    dueFlashcards: 0,
    flashcardRetention: 0,
    pcrReports: 0,
    pcrAverageScore: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [flashcardWeakAreas, setFlashcardWeakAreas] = useState<string[]>([]);

  // Load dashboard data including flashcard analytics
  useEffect(() => {
    const loadDashboardData = () => {
      // Load flashcard data
      const dueCards = getDueFlashcardsCount();
      const weakAreas = getFlashcardWeakAreas();
      setFlashcardWeakAreas(weakAreas);

      // Get flashcard retention from analytics
      const flashcardAnalytics = FlashcardTracker.getInstance().getAnalytics();

      // Get PCR analytics
      const pcrAnalytics = PcrTracker.getInstance().getAnalytics();

      setStats({
        progress: 68,
        completedChapters: 31,
        totalChapters: 45,
        quizScore: 86,
        studyTime: 127,
        dueFlashcards: dueCards,
        flashcardRetention: Math.round(flashcardAnalytics.retentionRate),
        pcrReports: pcrAnalytics.totalReports,
        pcrAverageScore: Math.round(pcrAnalytics.averageScore)
      });
    };

    const timer = setTimeout(() => {
      loadDashboardData();

      setRecentActivity([
        { id: 1, title: 'Chapter 8: Airway Management', type: 'study', time: '2 hours ago', score: 92 },
        { id: 2, title: 'Practice Quiz: Trauma Assessment', type: 'quiz', time: '1 day ago', score: 85 },
        { id: 3, title: 'Scenario: Cardiac Emergency', type: 'scenario', time: '2 days ago', score: 78 },
        { id: 4, title: 'APGAR Calculator Practice', type: 'calculator', time: '3 days ago', score: 95 }
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [getFlashcardWeakAreas, getDueFlashcardsCount]);

  // Listen for flashcard updates
  useEffect(() => {
    const handleFlashcardUpdate = () => {
      setStats(prev => ({
        ...prev,
        dueFlashcards: getDueFlashcardsCount(),
        flashcardRetention: Math.round(FlashcardTracker.getInstance().getAnalytics().retentionRate)
      }));
      setFlashcardWeakAreas(getFlashcardWeakAreas());
    };

    window.addEventListener('flashcardUpdate', handleFlashcardUpdate);
    return () => window.removeEventListener('flashcardUpdate', handleFlashcardUpdate);
  }, [getFlashcardWeakAreas, getDueFlashcardsCount]);

  // Check for payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setShowSuccessNotification(true);
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url);
    }
  }, []);

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume Chapter 9: Patient Assessment',
      icon: BookOpen,
      color: 'blue',
      action: 'continue-study'
    },
    {
      title: 'Practice Quiz',
      description: 'Test your knowledge',
      icon: Brain,
      color: 'purple',
      action: 'start-quiz'
    },
    {
      title: 'Clinical Tools',
      description: 'Access calculators',
      icon: Calculator,
      color: 'emerald',
      action: 'open-calculators'
    },
    {
      title: 'Scenarios',
      description: 'Interactive training',
      icon: Heart,
      color: 'red',
      action: 'start-scenario'
    },
    ...(stats.dueFlashcards > 0 ? [{
      title: 'Flashcard Review',
      description: `${stats.dueFlashcards} cards due for review`,
      icon: Target,
      color: 'amber',
      action: 'review-flashcards'
    }] : []),
    ...(flashcardWeakAreas.length > 0 ? [{
      title: 'Focus Areas',
      description: `Improve ${flashcardWeakAreas[0]} retention`,
      icon: TrendingUp,
      color: 'orange',
      action: 'focus-weak-areas'
    }] : []),
    {
      title: 'PCR Training',
      description: 'Practice patient care report documentation',
      icon: BookOpen,
      color: 'indigo',
      action: 'start-pcr-training'
    }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed first chapter', icon: '🎯', unlocked: true },
    { title: 'Quiz Master', description: 'Scored 90% on 5 quizzes', icon: '🧠', unlocked: true },
    { title: 'Speed Learner', description: 'Completed 10 chapters in a week', icon: '⚡', unlocked: false },
    { title: 'Scenario Expert', description: 'Perfect scores on 3 scenarios', icon: '🏆', unlocked: false }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'continue-study':
        onNavigate?.('/chapters');
        break;
      case 'start-quiz':
        onNavigate?.('/practice');
        break;
      case 'open-calculators':
        onNavigate?.('/calculators');
        break;
      case 'start-scenario':
        onNavigate?.('/scenarios');
        break;
      case 'review-flashcards':
        onNavigate?.('/flashcards');
        break;
      case 'focus-weak-areas':
        onNavigate?.(`/flashcards/category/${encodeURIComponent(flashcardWeakAreas[0])}`);
        break;
      case 'start-pcr-training':
        onNavigate?.('/pcr-trainer');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">Thank you! Access Unlocked</p>
          </div>
          <button
            onClick={() => setShowSuccessNotification(false)}
            className="text-green-600 hover:text-green-800"
          >
            ×
          </button>
        </div>
      )}

      {/* Welcome Section */}
      <div className="mb-8">
        <GlassCard className="p-8" intensity="medium">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient-medical mb-2">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Ready to continue your EMT training journey?
              </p>
            </div>
            <div className="mt-6 md:mt-0">
                <ProMedixLogo variant="compact" size="xl" glassEffect className="px-4 py-2" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <GlassCard className="p-6 text-center" hoverable>
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.progress}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Overall Progress</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 text-center" hoverable>
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            {stats.completedChapters}/{stats.totalChapters}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chapters Completed</div>
        </GlassCard>

        <GlassCard className="p-6 text-center" hoverable>
          <div className="text-3xl font-bold text-purple-600 mb-2">{stats.quizScore}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Average Quiz Score</div>
        </GlassCard>

        <GlassCard className="p-6 text-center" hoverable>
          <div className="text-3xl font-bold text-orange-600 mb-2">{stats.studyTime}h</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</div>
        </GlassCard>

        <GlassCard className="p-6 text-center" hoverable>
          <div className="text-3xl font-bold text-amber-600 mb-2">{stats.flashcardRetention}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Flashcard Retention</div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <GlassCard key={index} className="p-6 text-center group" hoverable>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br mb-4 ${
                action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                action.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                'from-red-500 to-red-600'
              }`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {action.description}
              </p>
              <ModernButton 
                variant="glass" 
                size="sm" 
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => handleQuickAction(action.action)}
              >
                Start
              </ModernButton>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Recent Activity */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'study' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'scenario' ? 'bg-red-100 text-red-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {activity.type === 'study' ? <BookOpen className="w-5 h-5" /> :
                   activity.type === 'quiz' ? <Brain className="w-5 h-5" /> :
                   activity.type === 'scenario' ? <Heart className="w-5 h-5" /> :
                   <Calculator className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.score}%
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            <Award className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-4 p-3 rounded-xl transition-colors ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' 
                  : 'opacity-50'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </div>
                  <div className="text-sm text-gray-500">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Study Streak */}
      <GlassCard className="p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gradient-emergency mb-2">
            7-Day Study Streak! 🔥
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You're on fire! Keep up the consistent study habit to unlock more achievements.
          </p>
          <ModernButton variant="gradient" size="lg">
            Continue Streak
          </ModernButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default ModernDashboard;