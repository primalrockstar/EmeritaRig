import React, { useState, useEffect, useCallback } from 'react';
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
  Stethoscope
} from 'lucide-react';
import { QuizQuestion, QuizModule, quizModules } from '../data/practice-quizzes';
import { additionalQuizModules } from '../data/practice-quizzes-additional';
import { finalQuizModules } from '../data/practice-quizzes-final';
import { completeQuizModules } from '../data/practice-quizzes-complete';
import { enhancedQuizModules, EnhancedQuizQuestion, ENHANCED_QUIZ_STATS } from '../data/enhanced-quiz-system';
import { SCENARIO_QUESTION_STATS } from '../data/scenario-questions';
import { useScenarioSync } from '../hooks/useScenarioSync';
import { FTOAgent } from './FTO/FTOAgent';

interface QuizAttempt {
  moduleId: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  answers: { [questionId: string]: number };
  completed: boolean;
  timestamp: Date;
  scenarioQuestions: number;
  knowledgeQuestions: number;
  nationalProtocolAlignment: boolean;
}

interface QuizComponentProps {
  onClose: () => void;
}

// Enhanced quiz system with 900 questions and scenario focus
const PracticeQuizSystem: React.FC<QuizComponentProps> = ({ onClose }) => {
  const { scenarios: allScenarioQuestions, loading: scenariosLoading, error: scenariosError } = useScenarioSync();
  const [selectedModule, setSelectedModule] = useState<QuizModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizMode, setQuizMode] = useState<'practice' | 'timed' | 'scenario-focus'>('practice');
  const [selectedQuestions, setSelectedQuestions] = useState<EnhancedQuizQuestion[]>([]);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [isFTOEnabled, setIsFTOEnabled] = useState(true);

  // Enhanced quiz options
  const [showNationalProtocols, setShowNationalProtocols] = useState(true);
  const [scenarioPercentage, setScenarioPercentage] = useState(50); // 50% scenarios by default

  // Load quiz attempts from localStorage
  useEffect(() => {
    const savedAttempts = localStorage.getItem('emt-quiz-attempts');
    if (savedAttempts) {
      setQuizAttempts(JSON.parse(savedAttempts));
    }
  }, []);

  // Generate balanced quiz questions based on selected criteria
  const generateBalancedQuiz = useCallback((moduleId?: number, questionCount: number = 20) => {
    const scenarioCount = Math.floor(questionCount * (scenarioPercentage / 100));
    const knowledgeCount = questionCount - scenarioCount;
    
    let availableScenarios = allScenarioQuestions;
    let availableKnowledge: EnhancedQuizQuestion[] = [];

    // Filter by module if specified
    if (moduleId && enhancedQuizModules[moduleId - 1]) {
      const moduleChapters = enhancedQuizModules[moduleId - 1].chapters;
      availableKnowledge = moduleChapters.flatMap(chapter => 
        chapter.questions.filter(q => q.category !== 'scenario')
      );
      availableScenarios = allScenarioQuestions.filter(question => question.module === moduleId);
    } else {
      // Use all questions if no specific module
      availableKnowledge = enhancedQuizModules.flatMap(module =>
        module.chapters.flatMap(chapter =>
          chapter.questions.filter(q => q.category !== 'scenario')
        )
      );
      availableScenarios = allScenarioQuestions;
    }

    // Randomly select questions
    const selectedScenarios = availableScenarios
      .sort(() => 0.5 - Math.random())
      .slice(0, scenarioCount);
    
    const selectedKnowledge = availableKnowledge
      .sort(() => 0.5 - Math.random())
      .slice(0, knowledgeCount);

    // Shuffle the combined questions
    const combinedQuestions = [...selectedScenarios, ...selectedKnowledge]
      .sort(() => 0.5 - Math.random());

    return combinedQuestions;
  }, [scenarioPercentage]);

  const handleSubmitQuiz = useCallback(() => {
    if (!selectedQuestions.length) return;

    setIsActive(false);
    
    if (!selectedModule) return;

    let correctAnswers = 0;
    selectedModule.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / selectedModule.questions.length) * 100);
    const timeSpent = (selectedModule.timeLimit * 60) - timeRemaining;

    const newAttempt: QuizAttempt = {
      moduleId: selectedModule!.module,
      score,
      totalQuestions: selectedModule!.questions.length,
      timeSpent,
      answers: userAnswers,
      completed: true,
      timestamp: new Date(),
      scenarioQuestions: 0, // TODO: calculate based on questions
      knowledgeQuestions: selectedModule!.questions.length,
      nationalProtocolAlignment: true
    };

    const updatedAttempts = [...quizAttempts, newAttempt];
    setQuizAttempts(updatedAttempts);
    localStorage.setItem('emt-quiz-attempts', JSON.stringify(updatedAttempts));
    
    setShowResults(true);
  }, [selectedModule, userAnswers, timeRemaining, quizAttempts]);

  // Timer logic
  useEffect(() => {
    let intervalId: number;
    if (isActive && timeRemaining > 0) {
      intervalId = window.setInterval(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      handleSubmitQuiz();
    }
    return () => clearInterval(intervalId);
  }, [isActive, timeRemaining, handleSubmitQuiz]);

  const startQuiz = (module: QuizModule) => {
    setSelectedModule(module);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setShowExplanation(false);
    setTimeRemaining(module.timeLimit * 60); // Convert minutes to seconds
    setIsActive(true);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion?.correctAnswer;
    setLastAnswerCorrect(isCorrect);

    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (selectedModule && currentQuestionIndex < selectedModule.questions.length - 1) {
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getModuleAttempts = (moduleId: number) => {
    return quizAttempts.filter(attempt => attempt.moduleId === moduleId);
  };

  const getBestScore = (moduleId: number) => {
    const attempts = getModuleAttempts(moduleId);
    return attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  };

  const getScoreColor = (score: number, passingScore: number) => {
    if (score >= passingScore) return 'text-green-600';
    if (score >= passingScore - 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Get all available modules (combining all 14 modules)
  const allModules = [
    ...quizModules,
    ...additionalQuizModules,
    ...finalQuizModules,
    ...completeQuizModules
  ];

  if (showResults && selectedModule) {
    const correctAnswers = selectedModule.questions.filter(
      question => userAnswers[question.id] === question.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / selectedModule.questions.length) * 100);
    const passed = score >= selectedModule.passingScore;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {passed ? 
                  <Trophy className={`w-10 h-10 ${passed ? 'text-green-600' : 'text-red-600'}`} /> :
                  <AlertCircle className="w-10 h-10 text-red-600" />
                }
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {passed ? 'Congratulations!' : 'Keep Studying!'}
              </h2>
              <p className="text-gray-600">
                Module {selectedModule.module}: {selectedModule.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{score}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime((selectedModule.timeLimit * 60) - timeRemaining)}
                </div>
                <div className="text-sm text-gray-600">Time Used</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Question Review</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedModule.questions.map((question, index) => {
                  const userAnswer = userAnswers[question.id];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium">Question {index + 1}</span>
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {question.points} pt{question.points !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{question.question}</p>
                      {userAnswer !== undefined && (
                        <div className="text-sm">
                          <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-600">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedModule(null);
                  setShowResults(false);
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Modules
              </button>
              <button
                onClick={() => startQuiz(selectedModule)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    const currentQuestion = selectedModule.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedModule.questions.length) * 100;
    const answeredQuestions = Object.keys(userAnswers).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Module {selectedModule.module}: {selectedModule.title}
                </h2>
                <p className="text-gray-600">{selectedModule.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-600">Time Remaining</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {currentQuestionIndex + 1} of {selectedModule.questions.length}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              Answered: {answeredQuestions}/{selectedModule.questions.length} • 
              Passing Score: {selectedModule.passingScore}%
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg px-3 py-2">
                <span className="text-blue-800 font-medium">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                  {currentQuestion.category}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    userAnswers[currentQuestion.id] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      checked={userAnswers[currentQuestion.id] === index}
                      onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{option}</span>
                  </div>
                </label>
              ))}
            </div>

            {showExplanation && userAnswers[currentQuestion.id] !== undefined && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
                {currentQuestion.nremtDomain && (
                  <p className="text-sm text-blue-600 mt-2">
                    NREMT Domain: {currentQuestion.nremtDomain}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  disabled={userAnswers[currentQuestion.id] === undefined}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  {showExplanation ? 'Hide' : 'Show'} Explanation
                </button>

                {currentQuestionIndex === selectedModule.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

  // Module Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                EMT-B Practice Quiz System
              </h1>
              <p className="text-gray-600">
                Test your knowledge with comprehensive practice quizzes for all 14 EMT-B modules
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">FTO MODE</span>
                <button
                  onClick={() => setIsFTOEnabled(!isFTOEnabled)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${isFTOEnabled ? 'bg-green-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${isFTOEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((module) => {
              const attempts = getModuleAttempts(module.module);
              const bestScore = getBestScore(module.module);
              const lastAttempt = attempts[attempts.length - 1];

              return (
                <div key={module.module} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Module {module.module}</div>
                      {attempts.length > 0 && (
                        <div className={`text-lg font-bold ${getScoreColor(bestScore, module.passingScore)}`}>
                          {bestScore}%
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{module.questions.length} Questions</span>
                    <span>{module.timeLimit} Minutes</span>
                    <span>{module.passingScore}% to Pass</span>
                  </div>

                  {attempts.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-sm text-gray-600">
                        Attempts: {attempts.length} • Last Score: {lastAttempt?.score}%
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => startQuiz(module)}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {attempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FTO Agent */}
      {isFTOEnabled && (
        <FTOAgent
          currentScenario={selectedQuestions[currentQuestionIndex] || null}
          lastAnswerCorrect={lastAnswerCorrect}
        />
      )}
    </div>
  );
};

export default PracticeQuizSystem;
