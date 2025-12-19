import React, { useState, useEffect } from 'react';
import { startExam, submitAnswer, getNextQuestion, Question, Feedback, QuestionOrComplete, ExamComplete } from '../api/exam';

const ExamScreen: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [examComplete, setExamComplete] = useState<ExamComplete | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [eloRating, setEloRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    initializeExam();
  }, []);

  const initializeExam = async () => {
    setLoading(true);
    try {
      const question = await startExam();
      setCurrentQuestion(question);
      setEloRating(1000);
    } catch (error) {
      console.error('Failed to start exam:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption || !currentQuestion) return;
    setLoading(true);
    try {
      const result = await submitAnswer(currentQuestion.id, selectedOption);
      setFeedback(result);
      setEloRating(prev => prev + result.eloChange);
      // Immediately clear state and fetch next question
      setTimeout(() => {
        handleNext();
      }, 2000); // Show feedback for 2 seconds before advancing
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setFeedback(null);
    setSelectedOption('');
    setLoading(true);
    try {
      const result = await getNextQuestion();
      if ('exam_complete' in result) {
        setExamComplete(result);
        setCurrentQuestion(null);
      } else {
        setCurrentQuestion(result);
        setExamComplete(null);
      }
    } catch (error) {
      console.error('Failed to get next question:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Adaptive NREMT Simulator</h2>
          <p className="text-gray-300 mb-6">
            This exam adapts to you. Correct answers increase your difficulty and rating. Incorrect answers drop it. Your goal is to prove competency.
          </p>
          <button
            onClick={() => { setShowIntro(false); initializeExam(); }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/5 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">NREMT Simulator</h1>
          <div className="text-sm">Live Rating: {eloRating}</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {currentQuestion && !feedback && (
          <>
            {/* Question Card */}
            <div key={currentQuestion.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">{currentQuestion.text}</h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSelectedOption(key)}
                  className={`p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors ${
                    selectedOption === key ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <div className="font-bold text-left">{key.toUpperCase()}.</div>
                  <div className="text-left">{value}</div>
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white py-3 rounded-2xl font-semibold"
            >
              Submit Answer
            </button>
          </>
        )}

        {feedback && (
          /* Feedback Overlay */
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className={`text-center mb-4 ${feedback.correct ? 'text-emerald-500' : 'text-rose-500'}`}>
              <div className="text-2xl font-bold">{feedback.correct ? 'Correct!' : 'Incorrect'}</div>
              <div className="text-lg">{feedback.eloChange > 0 ? `+${feedback.eloChange.toFixed(1)} points` : `${feedback.eloChange.toFixed(1)} points`}</div>
            </div>
            <p className="text-gray-300 mb-4">{feedback.explanation}</p>
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold"
            >
              Next Question
            </button>
          </div>
        )}

        {examComplete && (
          /* Exam Complete Overlay */
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-emerald-500 mb-4">🎉 Exam Complete!</div>
            <p className="text-gray-300 mb-4">{examComplete.message}</p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamScreen;