// Smart Study Companion - Adaptive Learning System with AI Integration
import { useState, useEffect, useCallback } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Zap,
  Star,
  Award,
  Calendar
} from 'lucide-react';

import { enhancedAIEngine, type EnhancedRecommendation } from '../data/enhanced-ai-recommendations';
import { getFlashcardsByChapter } from '../data/emtb-flashcards';

interface StudySession {
  id: string;
  chapterNumber: number;
  startTime: Date;
  endTime?: Date;
  questionsAnswered: number;
  correctAnswers: number;
  difficultyLevel: 'Basic' | 'Intermediate' | 'Advanced';
  focusAreas: string[];
  performanceScore: number; // 0-100
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetChapters: number[];
  deadline: Date;
  progress: number; // 0-100
  priority: 'high' | 'medium' | 'low';
}

interface Props {
  currentChapter?: number;
  onChapterSelect: (chapter: number) => void;
  onStartStudySession: (chapter: number) => void;
}

export default function SmartStudyCompanion({ onChapterSelect, onStartStudySession }: Props) {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>([]);
  const [learningAnalytics, setLearningAnalytics] = useState<{
    overallProgress: number;
    strongAreas: string[];
    improvementAreas: string[];
    studyStreak: number;
    totalStudyTime: number;
    averageScore: number;
  }>({
    overallProgress: 0,
    strongAreas: [],
    improvementAreas: [],
    studyStreak: 0,
    totalStudyTime: 0,
    averageScore: 0
  });
  
  const [personalizedPlan, setPersonalizedPlan] = useState<Array<{
    chapterNumber: number;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    estimatedTime: string;
  }>>([]);

  const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);

  // Initialize study data and AI recommendations
  useEffect(() => {
    initializeStudyData();
    generatePersonalizedPlan();
  }, []);

  // Update analytics when study sessions change
  useEffect(() => {
    updateLearningAnalytics();
  }, [studySessions]);

  const initializeStudyData = () => {
    // Initialize with sample data (in real app, this would come from localStorage/database)
    const sampleSessions: StudySession[] = [
      {
        id: '1',
        chapterNumber: 1,
        startTime: new Date(Date.now() - 86400000), // Yesterday
        endTime: new Date(Date.now() - 84600000),
        questionsAnswered: 15,
        correctAnswers: 12,
        difficultyLevel: 'Basic',
        focusAreas: ['EMT-B Overview', 'Medical Terminology'],
        performanceScore: 80
      },
      {
        id: '2',
        chapterNumber: 3,
        startTime: new Date(Date.now() - 43200000), // 12 hours ago
        endTime: new Date(Date.now() - 41400000),
        questionsAnswered: 15,
        correctAnswers: 10,
        difficultyLevel: 'Intermediate',
        focusAreas: ['Legal Issues', 'Scope of Practice'],
        performanceScore: 67
      }
    ];

    const sampleGoals: StudyGoal[] = [
      {
        id: '1',
        title: 'Complete Module 1: Preparatory',
        description: 'Master all foundational concepts in Chapters 1-4',
        targetChapters: [1, 2, 3, 4],
        deadline: new Date(Date.now() + 7 * 86400000), // 1 week
        progress: 50,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Cardiovascular Mastery',
        description: 'Achieve 90%+ on all cardiovascular emergency scenarios',
        targetChapters: [17],
        deadline: new Date(Date.now() + 14 * 86400000), // 2 weeks
        progress: 25,
        priority: 'medium'
      }
    ];

    setStudySessions(sampleSessions);
    setStudyGoals(sampleGoals);
  };

  const generatePersonalizedPlan = useCallback(async () => {
    // Generate AI-powered personalized study plan
    const plan = enhancedAIEngine.getPersonalizedStudyPlan();
    setPersonalizedPlan(plan);
  }, []);

  const updateLearningAnalytics = () => {
    if (studySessions.length === 0) return;

    const totalQuestions = studySessions.reduce((sum, session) => sum + session.questionsAnswered, 0);
    const totalCorrect = studySessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Calculate total study time
    const totalStudyTime = studySessions.reduce((total, session) => {
      if (session.endTime) {
        return total + (session.endTime.getTime() - session.startTime.getTime());
      }
      return total;
    }, 0);

    // Analyze performance by focus areas
    const areaPerformance: { [key: string]: { correct: number; total: number } } = {};
    studySessions.forEach(session => {
      session.focusAreas.forEach(area => {
        if (!areaPerformance[area]) {
          areaPerformance[area] = { correct: 0, total: 0 };
        }
        areaPerformance[area].total += session.questionsAnswered;
        areaPerformance[area].correct += session.correctAnswers;
      });
    });

    const strongAreas = Object.entries(areaPerformance)
      .filter(([, performance]) => performance.correct / performance.total >= 0.8)
      .map(([area]) => area);

    const improvementAreas = Object.entries(areaPerformance)
      .filter(([, performance]) => performance.correct / performance.total < 0.7)
      .map(([area]) => area);

    // Calculate study streak (consecutive days)
    const studyDates = studySessions
      .map(session => session.startTime.toDateString())
      .sort();
    const uniqueDates = [...new Set(studyDates)];
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < uniqueDates.length; i++) {
      const studyDate = new Date(uniqueDates[uniqueDates.length - 1 - i]);
      const dayDiff = Math.floor((today.getTime() - studyDate.getTime()) / 86400000);
      if (dayDiff === i) {
        streak++;
      } else {
        break;
      }
    }

    setLearningAnalytics({
      overallProgress: Math.min(100, Math.round((studySessions.length / 41) * 100)), // Based on 41 chapters
      strongAreas,
      improvementAreas,
      studyStreak: streak,
      totalStudyTime: Math.round(totalStudyTime / 60000), // Convert to minutes
      averageScore
    });
  };

  const startStudySession = (chapterNumber: number) => {
    const newSession: StudySession = {
      id: Date.now().toString(),
      chapterNumber,
      startTime: new Date(),
      questionsAnswered: 0,
      correctAnswers: 0,
      difficultyLevel: 'Basic',
      focusAreas: [],
      performanceScore: 0
    };
    
    setStudySessions(prev => [...prev, newSession]);
    onStartStudySession(chapterNumber);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header with AI-powered insights */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Brain className="w-8 h-8" />
              <span>Smart Study Companion</span>
            </h1>
            <p className="text-blue-100 mt-2">AI-powered personalized EMT-B learning experience</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{learningAnalytics.averageScore}%</div>
            <div className="text-sm text-blue-100">Average Score</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningAnalytics.overallProgress}%</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${learningAnalytics.overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningAnalytics.studyStreak} days</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningAnalytics.totalStudyTime}min</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Strong Areas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{learningAnalytics.strongAreas.length}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Personalized Study Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-600" />
            <span>AI-Recommended Study Plan</span>
          </h2>
          <button
            onClick={generatePersonalizedPlan}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <Brain className="w-4 h-4" />
            <span>Refresh Plan</span>
          </button>
        </div>

        <div className="space-y-4">
          {personalizedPlan.slice(0, 5).map((item) => {
            const chapterCards = getFlashcardsByChapter(item.chapterNumber);
            const chapterTitle = chapterCards[0]?.chapterTitle || `Chapter ${item.chapterNumber}`;
            
            return (
              <div
                key={item.chapterNumber}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Chapter {item.chapterNumber}: {chapterTitle}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.reason}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.estimatedTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{chapterCards.length} cards</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => startStudySession(item.chapterNumber)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Start Study
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Study Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <span>Study Goals</span>
          </h2>
          <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors">
            Add Goal
          </button>
        </div>

        <div className="space-y-4">
          {studyGoals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority.toUpperCase()}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{goal.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress: {goal.progress}%
                </span>
                <span className="text-sm text-gray-500">
                  Due: {goal.deadline.toLocaleDateString()}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-gray-500">
                  Chapters: {goal.targetChapters.join(', ')}
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Study Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <span>Recent Study Sessions</span>
          </h2>
          <button
            onClick={() => setShowDetailedAnalytics(!showDetailedAnalytics)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {showDetailedAnalytics ? 'Hide Details' : 'View Analytics'}
          </button>
        </div>

        <div className="space-y-4">
          {studySessions.slice(-5).reverse().map((session) => {
            const chapterCards = getFlashcardsByChapter(session.chapterNumber);
            const chapterTitle = chapterCards[0]?.chapterTitle || `Chapter ${session.chapterNumber}`;
            
            return (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(session.performanceScore)}`}>
                      {session.performanceScore}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Chapter {session.chapterNumber}: {chapterTitle}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.correctAnswers}/{session.questionsAnswered} correct • {session.difficultyLevel}
                    </p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{session.startTime.toLocaleDateString()}</span>
                      {session.endTime && (
                        <>
                          <Clock className="w-3 h-3 ml-2" />
                          <span>
                            {Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)}min
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onChapterSelect(session.chapterNumber)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Review
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Analytics Panel */}
      {showDetailedAnalytics && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Detailed Learning Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Star className="w-5 h-5 text-green-600" />
                <span>Strong Areas ({learningAnalytics.strongAreas.length})</span>
              </h4>
              <div className="space-y-2">
                {learningAnalytics.strongAreas.map((area, index) => (
                  <div key={index} className="px-3 py-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">{area}</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                ))}
                {learningAnalytics.strongAreas.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Complete more study sessions to identify strong areas</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span>Areas for Improvement ({learningAnalytics.improvementAreas.length})</span>
              </h4>
              <div className="space-y-2">
                {learningAnalytics.improvementAreas.map((area, index) => (
                  <div key={index} className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">{area}</span>
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                ))}
                {learningAnalytics.improvementAreas.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Keep studying to identify improvement areas</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
