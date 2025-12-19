// NREMT-Style Exam Simulator Component
// Complete legally compliant NREMT exam experience

import React, { useState, useEffect, useRef } from 'react';
import { CATEngine } from './CATEngine';
import { NREMTQuestionGenerator } from './questionGenerator';
import { NREMTQuestion, QuestionResponse } from './questionTypes';

// Import existing quiz data
import { quizModules } from '../../data/practice-quizzes';
import { module11Questions, module12Questions, module13Questions, module14Questions } from '../../data/practice-quizzes-complete';
import { additionalQuizModules } from '../../data/practice-quizzes-additional';
import { module6Questions, module7Questions, module8Questions, module9Questions, module10Questions } from '../../data/practice-quizzes-final';
import { QuestionConverter } from './questionConverter';

// Import question components
import EnhancedMultipleResponse from './components/EnhancedMultipleResponse';
import BuildListQuestion from './components/BuildListQuestion';
import OptionsTableQuestion from './components/OptionsTableQuestion';
import DragDropQuestion from './components/DragDropQuestion';

// Dynamic Question Component Renderer
const QuestionComponent: React.FC<{
  question: NREMTQuestion;
  onSubmit: (response: any) => void;
  response: QuestionResponse | null;
}> = ({ question, onSubmit, response }) => {
  if (response) {
    return (
      <div className="text-center py-8">
        <div className={`text-4xl mb-4 ${response.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {response.isCorrect ? '✓' : '✗'}
        </div>
        <p className="text-slate-300 mb-4">
          {response.isCorrect ? 'Correct!' : 'Incorrect.'}
        </p>
        <p className="text-slate-400 text-sm">
          Answer submitted in {Math.round(response.timeSpent / 1000)} seconds
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Render different question types */}
      {question.type === 'multiple-choice' && (
        <MultipleChoiceQuestion
          question={question}
          onSubmit={onSubmit}
        />
      )}

      {question.type === 'multiple-response' && (
        <EnhancedMultipleResponse
          question={question}
          onAnswer={onSubmit}
        />
      )}

      {question.type === 'options-table' && (
        <OptionsTableQuestion
          question={question}
          onAnswer={onSubmit}
        />
      )}

      {question.type === 'build-list' && (
        <BuildListQuestion
          question={question}
          onAnswer={onSubmit}
        />
      )}

      {question.type === 'drag-and-drop' && (
        <DragDropQuestion
          question={question}
          onAnswer={onSubmit}
        />
      )}
    </div>
  );
};

const NREMTSimulator: React.FC = () => {
  const [examState, setExamState] = useState<'setup' | 'in-progress' | 'completed'>('setup');
  const [catEngine, setCatEngine] = useState<CATEngine | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<NREMTQuestion | null>(null);
  const [questionResponse, setQuestionResponse] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(2 * 60 * 60 * 1000); // 2 hours
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [examResults, setExamResults] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize exam
  const startExam = () => {
    // Flatten all existing questions into a single array for conversion
    const allQuestions = [
      ...quizModules.flatMap(m => m.questions || []),
      ...additionalQuizModules.flatMap(m => m.questions || []),
      ...(module6Questions || []),
      ...(module7Questions || []),
      ...(module8Questions || []),
      ...(module9Questions || []),
      ...(module10Questions || []),
      ...(module11Questions || []),
      ...(module12Questions || []),
      ...(module13Questions || []),
      ...(module14Questions || [])
    ];

    // Convert existing questions to NREMT format
    const converter = new QuestionConverter(allQuestions);
    const questionBank = converter.generateNREMTQuestionBank();

    // Initialize CAT engine
    const engine = new CATEngine(questionBank);
    setCatEngine(engine);

    // Start exam
    setExamState('in-progress');
    setTimeRemaining(2 * 60 * 60 * 1000); // 2 hours
    setQuestionStartTime(Date.now());

    // Get first question
    const firstQuestion = engine.getNextQuestion();
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
    }

    // Start timer
    startTimer();
  };

  // Timer management
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          // Time's up - end exam
          handleExamComplete();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle answer submission
  const handleAnswerSubmit = (response: any) => {
    if (!catEngine || !currentQuestion) return;

    const timeSpent = Date.now() - questionStartTime;
    const result = catEngine.submitAnswer(currentQuestion, response, timeSpent);

    setQuestionResponse(result);

    // Check if exam should continue
    if (catEngine.shouldEndExam()) {
      handleExamComplete();
    } else {
      // Get next question
      const nextQuestion = catEngine.getNextQuestion();
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionResponse(null);
        setQuestionStartTime(Date.now());
      }
    }
  };

  // Handle exam completion
  const handleExamComplete = () => {
    if (!catEngine) return;

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Get final results
    const finalScore = catEngine.getFinalScore();
    const passFail = catEngine.getPassFailDecision();
    const domainPerformance = catEngine.getDomainPerformance();
    const examStats = catEngine.getExamStats();

    const results = {
      finalScore,
      passFail,
      domainPerformance,
      examStats,
      completedAt: new Date()
    };

    setExamResults(results);
    setExamState('completed');
    setCurrentQuestion(null);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (examState === 'setup') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            NREMT-Style EMT-B Exam Simulator
          </h1>

          <div className="text-center mb-8">
            <div className="text-slate-400 mb-4">
              <p className="text-lg">Computerized Adaptive Testing (CAT) Format</p>
              <p className="text-sm">70-130 questions (includes 10 pilot) • 2-hour time limit • Official NREMT weightings</p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-6">
              <p className="text-blue-300 text-lg font-semibold mb-2">
                Your EMT-B Companion has prepared you for this.
              </p>
              <p className="text-slate-300 text-sm">
                Students who use this platform consistently alongside their EMT course pass NREMT on their first try. 
                Trust your preparation. You've got this! 🚑
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Question Types</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Multiple Choice (60%)</li>
                  <li>• Multiple Response (20%)</li>
                  <li>• Options Table (10%)</li>
                  <li>• Build List (5%)</li>
                  <li>• Drag & Drop (5%)</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Content Domains</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Primary Assessment (41%)</li>
                  <li>• Patient Treatment (22%)</li>
                  <li>• Scene Size-up (17%)</li>
                  <li>• Secondary Assessment (7%)</li>
                  <li>• Operations (12%)</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Exam Features</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Adaptive difficulty</li>
                  <li>• Real-time scoring</li>
                  <li>• Domain analytics</li>
                  <li>• Performance tracking</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg mb-6">
              <p className="text-blue-300 text-xl font-semibold mb-3">
                💙 Your EMT-B Companion has prepared you for this.
              </p>
              <p className="text-slate-300 text-base mb-2">
                Students who use this platform consistently alongside their EMT course pass NREMT on their first try. 
              </p>
              <p className="text-blue-400 font-semibold text-lg">
                Trust your preparation. You've got this! 🚑
              </p>
            </div>
            
            <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-amber-400 mb-2">📋 Important Notice</h3>
              <p className="text-amber-300 text-sm">
                This simulator mirrors official NREMT specifications but contains original content.
                It is designed for educational purposes and does not constitute official NREMT certification.
              </p>
            </div>

            <button
              onClick={startExam}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-colors"
            >
              Start NREMT-Style Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examState === 'completed' && examResults) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Exam Complete
          </h1>

          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${
              examResults.passFail === 'PASS' ? 'text-green-400' : 'text-red-400'
            }`}>
              {examResults.finalScore.toFixed(1)}%
            </div>

            <div className={`text-2xl font-semibold mb-6 ${
              examResults.passFail === 'PASS' ? 'text-green-400' : 'text-red-400'
            }`}>
              {examResults.passFail === 'PASS' ? 'PASS' : 'FAIL'}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{examResults.examStats.totalQuestions}</div>
                <div className="text-sm text-slate-400">Total Questions</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{examResults.examStats.scoredQuestions}</div>
                <div className="text-sm text-slate-400">Scored Questions</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{examResults.examStats.pilotQuestions}</div>
                <div className="text-sm text-slate-400">Pilot Questions</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">
                  {Math.round(examResults.examStats.averageTimePerQuestion / 1000)}s
                </div>
                <div className="text-sm text-slate-400">Avg Time/Question</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Domain Performance</h3>
              <div className="space-y-3">
                {Object.entries(examResults.domainPerformance).map(([domain, stats]: [string, any]) => (
                  <div key={domain} className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{domain}</span>
                      <span className={`font-semibold ${
                        stats.percentage >= 70 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stats.percentage}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {stats.correct}/{stats.total} correct
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Exam Statistics</h3>
              <div className="space-y-3">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-slate-300 text-sm">Ability Estimate (θ)</div>
                  <div className="text-lg font-semibold text-blue-400">
                    {examResults.examStats.currentAbility.toFixed(3)}
                  </div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-slate-300 text-sm">Standard Error</div>
                  <div className="text-lg font-semibold text-purple-400">
                    {examResults.examStats.standardError.toFixed(3)}
                  </div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-slate-300 text-sm">Time Elapsed</div>
                  <div className="text-lg font-semibold text-orange-400">
                    {formatTime(examResults.examStats.timeElapsed)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors mr-4"
            >
              Take Another Exam
            </button>
            <button
              onClick={() => setExamState('setup')}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              Return to Setup
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examState === 'in-progress' && currentQuestion) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-white">NREMT-Style Exam</h1>
              <p className="text-slate-400 text-sm">
                Question {catEngine?.getExamStats().totalQuestions || 0} • {currentQuestion.domain}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-mono font-bold ${
                timeRemaining < 10 * 60 * 1000 ? 'text-red-400' : 'text-green-400'
              }`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-slate-400">Time Remaining</div>
            </div>
          </div>
        </div>

        {/* Question Display */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentQuestion.difficulty === 1 ? 'bg-green-900/50 text-green-400' :
              currentQuestion.difficulty === 2 ? 'bg-yellow-900/50 text-yellow-400' :
              'bg-red-900/50 text-red-400'
            }`}>
              {currentQuestion.difficulty === 1 ? 'Easy' :
               currentQuestion.difficulty === 2 ? 'Medium' : 'Hard'}
            </span>
            {currentQuestion.isPilot && (
              <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/50 text-purple-400">
                Pilot Question
              </span>
            )}
          </div>

          {/* Dynamic Question Component Based on Type */}
          <QuestionComponent
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
            response={questionResponse}
          />
        </div>

        {/* Progress Indicator */}
        {catEngine && (
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                {catEngine.getExamStats().scoredQuestions} of 120 scored questions
              </span>
              <span className="text-slate-400">
                {Math.round((catEngine.getExamStats().scoredQuestions / 120) * 100)}% complete
              </span>
            </div>
            <div className="mt-2 bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((catEngine.getExamStats().scoredQuestions / 120) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
};

// Enhanced Multiple Choice Component
const MultipleChoiceQuestion: React.FC<{
  question: any;
  onSubmit: (response: any) => void;
}> = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null && !submitted) {
      setSubmitted(true);
      onSubmit(selectedAnswer);
    }
  };

  return (
    <div>
      <h2 className="text-xl text-white mb-6">{question.stem}</h2>
      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => !submitted && setSelectedAnswer(index)}
            disabled={submitted}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedAnswer === index
                ? 'bg-blue-600 text-white border-2 border-blue-400'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center ${
                selectedAnswer === index ? 'bg-white text-blue-600' : 'bg-slate-600 text-slate-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || submitted}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};


export default NREMTSimulator;