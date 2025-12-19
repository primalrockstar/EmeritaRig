// Enhanced Practice Quiz System - 750 Questions with Scenario Focus
// Integrated with NHTSA 2022 National Protocols
// 300 scenario-based questions, 450 knowledge questions

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  Target,
  Trophy,
  Brain,
  AlertCircle,
  Shield,
  Stethoscope,
  TrendingUp,
  Users,
  Play,
  Settings,
  BarChart3
} from 'lucide-react';
import {
  enhancedQuizModules,
  EnhancedQuizQuestion,
  ENHANCED_CHAPTER_OPTIONS,
  ENHANCED_QUIZ_STATS
} from '../data/enhanced-quiz-system';
import { allScenarioQuestions, SCENARIO_QUESTION_STATS } from '../data/scenario-questions';
import { usePerformanceTracker } from '../hooks/usePerformanceTracker';

interface EnhancedQuizAttempt {
  id: string;
  moduleId?: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: { [questionId: string]: number };
  completed: boolean;
  timestamp: Date;
  scenarioQuestions: number;
  knowledgeQuestions: number;
  scenarioScore: number;
  knowledgeScore: number;
  nationalProtocolAlignment: boolean;
  quizMode: 'practice' | 'timed' | 'scenario-focus' | 'nremt-prep';
}

interface QuizSettings {
  questionCount: number;
  scenarioPercentage: number;
  timeLimit: number; // minutes
  showExplanations: boolean;
  moduleFilter?: number;
  difficultyLevel: 'mixed' | 'easy' | 'medium' | 'hard';
  chapterFilter?: number;
}

interface EnhancedQuizComponentProps {
  onClose?: () => void;
}

const shuffleArray = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);

// Enhanced quiz stats: 450 knowledge + 450 scenario = 900 total
const TOTAL_KNOWLEDGE_QUESTIONS = ENHANCED_QUIZ_STATS.totalQuestions; // 450 knowledge questions from balanced bank
const TOTAL_SCENARIO_QUESTIONS = allScenarioQuestions.length; // 450 scenario questions
const TOTAL_COMBINED_QUESTIONS = TOTAL_KNOWLEDGE_QUESTIONS + TOTAL_SCENARIO_QUESTIONS; // 900 total

const EnhancedPracticeQuizSystem: React.FC<EnhancedQuizComponentProps> = ({ onClose }) => {
  // Performance tracking
  const { trackEvent } = usePerformanceTracker();

  // State management
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'results' | 'analytics'>('home');
  const [selectedQuestions, setSelectedQuestions] = useState<EnhancedQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<EnhancedQuizAttempt[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);

  const chapterMetadata = useMemo(() => {
    const map = new Map<number, { moduleId: number; moduleTitle: string; knowledge: EnhancedQuizQuestion[] }>();
    enhancedQuizModules.forEach((module) => {
      module.chapters.forEach((chapter) => {
        map.set(chapter.id, {
          moduleId: module.id,
          moduleTitle: module.title,
          knowledge: chapter.questions.filter((question) => question.category !== 'scenario')
        });
      });
    });
    return map;
  }, []);
  
  // Quiz settings
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    questionCount: 20,
    scenarioPercentage: 50,
    timeLimit: 30,
    showExplanations: true,
    difficultyLevel: 'mixed'
  });

  // Handle individual question submission tracking
  const handleQuestionSubmit = useCallback((questionId: string, selectedAnswer: number, questionData: any) => {
    const isCorrect = selectedAnswer === questionData.correctAnswer;
    const timeSpent = questionStartTime ? Date.now() - questionStartTime : 0;

    trackEvent({
      activityType: 'quiz',
      activityId: questionId,
      topic: questionData.category || 'General',
      score: isCorrect ? 100 : 0,
      timeSpent,
      metadata: {
        questionId,
        selectedAnswer,
        correctAnswer: questionData.correctAnswer,
        difficulty: questionData.difficulty || 'medium',
        quizType: 'nremt-practice',
        userConfidence: 0 // Can be enhanced later
      }
    });

    // Reset timer for next question
    setQuestionStartTime(Date.now());
  }, [questionStartTime, trackEvent]);

  // Load quiz attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('enhanced-emt-quiz-attempts');
    if (savedAttempts) {
      setQuizAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  // Generate balanced quiz questions
  const generateBalancedQuiz = useCallback((settings: QuizSettings) => {
    const { questionCount, scenarioPercentage, moduleFilter, chapterFilter, difficultyLevel } = settings;

    console.log('🎯 Generate Quiz Called:', {
      questionCount,
      scenarioPercentage,
      moduleFilter,
      chapterFilter,
      difficultyLevel,
      allScenarioQuestionsLength: allScenarioQuestions.length,
      enhancedQuizModulesLength: enhancedQuizModules.length
    });

    if (questionCount <= 0) {
      console.warn('❌ Question count is 0 or negative');
      return [];
    }

    const desiredScenarioCount = Math.min(questionCount, Math.floor(questionCount * (scenarioPercentage / 100)));
    const desiredKnowledgeCount = Math.max(questionCount - desiredScenarioCount, 0);

    let availableScenarios = allScenarioQuestions;
    if (chapterFilter) {
      availableScenarios = availableScenarios.filter((question) => question.chapter === chapterFilter);
    } else if (moduleFilter) {
      availableScenarios = availableScenarios.filter((question) => question.module === moduleFilter);
    }

    let availableKnowledge: EnhancedQuizQuestion[] = [];
    if (chapterFilter) {
      const chapterEntry = chapterMetadata.get(chapterFilter);
      availableKnowledge = chapterEntry ? chapterEntry.knowledge : [];
    } else if (moduleFilter) {
      const module = enhancedQuizModules.find((item) => item.id === moduleFilter);
      if (module) {
        availableKnowledge = module.chapters.flatMap((chapter) =>
          chapter.questions.filter((question) => question.category !== 'scenario')
        );
      }
    } else {
      availableKnowledge = enhancedQuizModules.flatMap((module) =>
        module.chapters.flatMap((chapter) =>
          chapter.questions.filter((question) => question.category !== 'scenario')
        )
      );
    }

    if (difficultyLevel !== 'mixed') {
      availableScenarios = availableScenarios.filter((question) => question.difficulty === difficultyLevel);
      availableKnowledge = availableKnowledge.filter((question) => question.difficulty === difficultyLevel);
    }

    const scenarioCount = Math.min(desiredScenarioCount, availableScenarios.length);
    const knowledgeCount = Math.min(desiredKnowledgeCount, availableKnowledge.length);

    let selectedScenarios = shuffleArray(availableScenarios).slice(0, scenarioCount);
    let selectedKnowledge = shuffleArray(availableKnowledge).slice(0, knowledgeCount);

    let combined: EnhancedQuizQuestion[] = [...selectedScenarios, ...selectedKnowledge];

    const fillWithPool = (pool: EnhancedQuizQuestion[], alreadySelected: EnhancedQuizQuestion[]) => {
      const needed = questionCount - combined.length;
      if (needed <= 0) return;

      const remaining = shuffleArray(
        pool.filter((question) => !alreadySelected.includes(question))
      ).slice(0, needed);

      combined = [...combined, ...remaining];
      alreadySelected.push(...remaining);
    };

    fillWithPool(availableKnowledge, selectedKnowledge);
    fillWithPool(availableScenarios, selectedScenarios);

    const finalQuestions = combined.slice(0, questionCount);
    
    console.log('✅ Quiz Generated:', {
      totalQuestions: finalQuestions.length,
      scenarioCount,
      knowledgeCount,
      availableScenarios: availableScenarios.length,
      availableKnowledge: availableKnowledge.length
    });

    return finalQuestions;
  }, [chapterMetadata]);

  // Start quiz with current settings
  const startQuiz = useCallback(() => {
    console.log('🚀 Starting quiz with settings:', quizSettings);
    console.log('📊 Available data:', {
      allScenarioQuestionsCount: allScenarioQuestions.length,
      enhancedModulesCount: enhancedQuizModules.length,
      chapterMetadataSize: chapterMetadata.size
    });
    
    const questions = generateBalancedQuiz(quizSettings);

    console.log('📝 Generated questions:', questions.length);

    if (!questions.length) {
      console.error('❌ No questions generated!');
      setConfigError('No questions are available for this configuration. Adjust the filters and try again.');
      setSelectedQuestions([]);
      setIsActive(false);
      setShowResults(false);
      setShowExplanation(false);
      setCurrentQuestionIndex(0);
      setCurrentView('home');
      setQuizStartTime(null);
      return;
    }

    console.log('✅ Quiz starting with', questions.length, 'questions');
    setConfigError(null);
    setSelectedQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setShowExplanation(false);
    setTimeRemaining(quizSettings.timeLimit > 0 ? quizSettings.timeLimit * 60 : -1);
    setIsActive(true);
    setQuizStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentView('quiz');
  }, [generateBalancedQuiz, quizSettings, chapterMetadata]);

  // Handle quiz completion
  const handleSubmitQuiz = useCallback(() => {
    if (!selectedQuestions.length) return;

    setIsActive(false);

    // Track the last question if not already tracked
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestion.id];
    if (selectedAnswer !== undefined) {
      handleQuestionSubmit(currentQuestion.id, selectedAnswer, currentQuestion);
    }
    
    const scenarioQuestions = selectedQuestions.filter(q => q.category === 'scenario');
    const knowledgeQuestions = selectedQuestions.filter(q => q.category !== 'scenario');
    
    const scenarioCorrect = scenarioQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;
    
    const knowledgeCorrect = knowledgeQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;

    const totalCorrect = scenarioCorrect + knowledgeCorrect;
    const score = Math.round((totalCorrect / selectedQuestions.length) * 100);

    const elapsedSeconds = quizStartTime
      ? Math.floor((Date.now() - quizStartTime) / 1000)
      : quizSettings.timeLimit > 0
      ? Math.max((quizSettings.timeLimit * 60) - timeRemaining, 0)
      : 0;

    const newAttempt: EnhancedQuizAttempt = {
      id: `quiz-${Date.now()}`,
      moduleId: quizSettings.moduleFilter,
      score,
      totalQuestions: selectedQuestions.length,
      timeSpent: elapsedSeconds,
      answers: userAnswers,
      completed: true,
      timestamp: new Date(),
      scenarioQuestions: scenarioQuestions.length,
      knowledgeQuestions: knowledgeQuestions.length,
      scenarioScore: scenarioQuestions.length > 0 ? Math.round((scenarioCorrect / scenarioQuestions.length) * 100) : 0,
      knowledgeScore: knowledgeQuestions.length > 0 ? Math.round((knowledgeCorrect / knowledgeQuestions.length) * 100) : 0,
      nationalProtocolAlignment: selectedQuestions.every(q => q.nationalProtocolAlignment),
      quizMode: 'practice'
    };

    const updatedAttempts = [...quizAttempts, newAttempt];
    setQuizAttempts(updatedAttempts);
    localStorage.setItem('enhanced-emt-quiz-attempts', JSON.stringify(updatedAttempts));

    // Track quiz completion
    const topics = selectedQuestions.map(q => q.category || 'General').filter((v, i, a) => a.indexOf(v) === i); // unique topics

    trackEvent({
      activityType: 'quiz',
      activityId: newAttempt.id,
      topic: 'Mixed Topics',
      score: newAttempt.score,
      timeSpent: newAttempt.timeSpent,
      metadata: {
        quizId: newAttempt.id,
        totalQuestions: newAttempt.totalQuestions,
        correctAnswers: Math.round((newAttempt.score / 100) * newAttempt.totalQuestions),
        averageTimePerQuestion: newAttempt.timeSpent / newAttempt.totalQuestions,
        topicsCovered: topics,
        completionType: 'full-quiz'
      }
    });

    setShowResults(true);
    setCurrentView('results');
    setQuizStartTime(null);
    setQuestionStartTime(null);
  }, [selectedQuestions, userAnswers, timeRemaining, quizSettings, quizAttempts, quizStartTime]);

  // Timer logic
  useEffect(() => {
    let intervalId: number;
    if (isActive && timeRemaining > 0) {
      intervalId = window.setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      handleSubmitQuiz();
    }
    return () => clearInterval(intervalId);
  }, [isActive, timeRemaining, handleSubmitQuiz]);

  // Navigation functions
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      // Track the current question submission before advancing
      const currentQuestion = selectedQuestions[currentQuestionIndex];
      const selectedAnswer = userAnswers[currentQuestion.id];
      if (selectedAnswer !== undefined) {
        handleQuestionSubmit(currentQuestion.id, selectedAnswer, currentQuestion);
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 0) {
      return '∞';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const summaryStats = useMemo(() => ({
    totalQuestions: TOTAL_COMBINED_QUESTIONS,
    totalScenarioQuestions: TOTAL_SCENARIO_QUESTIONS,
    totalKnowledgeQuestions: TOTAL_KNOWLEDGE_QUESTIONS,
    chaptersCovered: ENHANCED_QUIZ_STATS.totalChapters,
    modulesCovered: ENHANCED_QUIZ_STATS.totalModules
  }), []);

  // Home view with quiz options
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            {/* Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Enhanced Practice Quiz System</h1>
                  <p className="text-gray-600 text-lg">
                    Professional EMT-B preparation with 750 questions and scenario-based learning
                  </p>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{summaryStats.totalQuestions}</div>
                  <div className="text-sm text-blue-800">Total Questions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{summaryStats.totalScenarioQuestions}</div>
                  <div className="text-sm text-green-800">Scenario Questions</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{summaryStats.chaptersCovered}</div>
                  <div className="text-sm text-purple-800">Chapters Covered</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">NHTSA</div>
                  <div className="text-sm text-orange-800">2022 Aligned</div>
                </div>
              </div>
            </div>

            {configError ? (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {configError}
              </div>
            ) : null}

            {/* Quiz settings */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quiz Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Question count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <select 
                    value={quizSettings.questionCount}
                    onChange={(e) => setQuizSettings(prev => ({...prev, questionCount: parseInt(e.target.value)}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10 Questions</option>
                    <option value={20}>20 Questions</option>
                    <option value={30}>30 Questions</option>
                    <option value={50}>50 Questions</option>
                    <option value={100}>100 Questions</option>
                  </select>
                </div>

                {/* Scenario percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scenario Questions (%)
                  </label>
                  <select 
                    value={quizSettings.scenarioPercentage}
                    onChange={(e) => setQuizSettings(prev => ({...prev, scenarioPercentage: parseInt(e.target.value)}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={25}>25% Scenarios</option>
                    <option value={50}>50% Scenarios</option>
                    <option value={75}>75% Scenarios</option>
                    <option value={100}>100% Scenarios</option>
                  </select>
                </div>

                {/* Time limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit
                  </label>
                  <select 
                    value={quizSettings.timeLimit}
                    onChange={(e) => setQuizSettings(prev => ({...prev, timeLimit: parseInt(e.target.value)}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={0}>Unlimited</option>
                  </select>
                </div>

                {/* Difficulty level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select 
                    value={quizSettings.difficultyLevel}
                    onChange={(e) => setQuizSettings(prev => ({...prev, difficultyLevel: e.target.value as any}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mixed">Mixed Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Module filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Module
                  </label>
                  <select 
                    value={quizSettings.moduleFilter || ''}
                    onChange={(e) => setQuizSettings(prev => ({...prev, moduleFilter: e.target.value ? parseInt(e.target.value) : undefined}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Modules</option>
                    {enhancedQuizModules.map(module => (
                      <option key={module.id} value={module.id}>
                        Module {module.id}: {module.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Chapter
                  </label>
                  <select
                    value={quizSettings.chapterFilter ?? ''}
                    onChange={(event) => {
                      const value = event.target.value;
                      const chapterId = value ? parseInt(value, 10) : undefined;

                      setQuizSettings((prev) => {
                        if (!chapterId) {
                          return { ...prev, chapterFilter: undefined };
                        }

                        const chapterInfo = chapterMetadata.get(chapterId);
                        if (chapterInfo) {
                          return {
                            ...prev,
                            chapterFilter: chapterId,
                            moduleFilter: chapterInfo.moduleId
                          };
                        }

                        return { ...prev, chapterFilter: chapterId };
                      });
                      setConfigError(null);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Chapters</option>
                    {ENHANCED_CHAPTER_OPTIONS.map((option) => (
                      <option key={option.chapterId} value={option.chapterId}>
                        Chapter {option.chapterId}: {option.chapterTitle}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Show explanations */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showExplanations"
                    checked={quizSettings.showExplanations}
                    onChange={(e) => setQuizSettings(prev => ({...prev, showExplanations: e.target.checked}))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showExplanations" className="ml-2 text-sm text-gray-700">
                    Show explanations during quiz
                  </label>
                </div>
              </div>

              {/* Start quiz button */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentView('analytics')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>View Analytics</span>
                  </button>
                </div>
                
                <button
                  onClick={startQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2 text-lg font-semibold"
                >
                  <Play className="w-6 h-6" />
                  <span>Start Quiz</span>
                </button>
              </div>

              {/* National Protocol indicator */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    All questions align with NHTSA 2022 National Protocol Standards
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz view - Display questions
  if (currentView === 'quiz' && selectedQuestions.length > 0) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isAnswered = userAnswers[currentQuestion.id] !== undefined;
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quiz header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                </div>
                {currentQuestion.category === 'scenario' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Scenario
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {timeRemaining > 0 && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-mono font-bold">
                      {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            {/* Scenario context if available */}
            {currentQuestion.scenario && (
              <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                <div className="flex items-start space-x-2">
                  <Stethoscope className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <div className="font-semibold text-purple-900 mb-1">Scenario</div>
                    <p className="text-purple-800">{currentQuestion.scenario}</p>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = userAnswers[currentQuestion.id] === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showFeedback = quizSettings.showExplanations && isAnswered;
                
                // Determine button styling based on feedback mode
                let buttonClass = '';
                let iconElement = null;
                
                if (showFeedback) {
                  // Show correct/incorrect colors when explanations are enabled
                  if (isCorrect) {
                    buttonClass = 'border-green-600 bg-green-50 shadow-md';
                    iconElement = <CheckCircle className="w-6 h-6 text-green-600" />;
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'border-red-600 bg-red-50 shadow-md';
                    iconElement = <XCircle className="w-6 h-6 text-red-600" />;
                  } else {
                    buttonClass = 'border-gray-200 bg-white';
                  }
                } else {
                  // Normal selection mode
                  buttonClass = isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswerSelect(currentQuestion.id, index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${buttonClass} ${
                      showFeedback ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {showFeedback ? (
                          iconElement || <div className="w-6 h-6" />
                        ) : (
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
                          }`}>
                            {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                          </div>
                        )}
                        <span className={`text-lg ${
                          showFeedback && isCorrect ? 'font-semibold text-green-900' :
                          showFeedback && isSelected && !isCorrect ? 'font-semibold text-red-900' :
                          'text-gray-900'
                        }`}>{option}</span>
                      </div>
                      {showFeedback && isCorrect && (
                        <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          Correct Answer
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Show explanation if enabled */}
            {quizSettings.showExplanations && isAnswered && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Explanation</div>
                    <p className="text-blue-800">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Exit Quiz
                </button>
                
                {currentQuestionIndex === selectedQuestions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.min(selectedQuestions.length - 1, currentQuestionIndex + 1))}
                    disabled={!isAnswered}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (currentView === 'results' && showResults) {
    const currentAttempt = quizAttempts[0];
    if (!currentAttempt) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Trophy className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
              <p className="text-xl text-gray-600">
                You scored {currentAttempt.score}% ({Math.round(currentAttempt.totalQuestions * currentAttempt.score / 100)}/{currentAttempt.totalQuestions})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{currentAttempt.scenarioScore}%</div>
                <div className="text-sm text-green-800">Scenario Questions</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{currentAttempt.knowledgeScore}%</div>
                <div className="text-sm text-blue-800">Knowledge Questions</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                New Quiz
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback view
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Enhanced Quiz System Ready</h1>
          <p className="text-gray-600">
            The enhanced quiz system with 750 questions and 40% scenario focus is now integrated.
            Features include NHTSA 2022 alignment, configurable difficulty, and comprehensive analytics.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Quiz Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPracticeQuizSystem;