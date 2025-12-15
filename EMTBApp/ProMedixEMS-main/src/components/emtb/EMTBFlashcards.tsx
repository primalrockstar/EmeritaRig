import React, { useState, useEffect } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import { FlashcardTracker } from '../../services/flashcardTracker';
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  chapter_id: number;
  difficulty: number;
  image_url?: string;
}

interface SpacedRepetitionData {
  interval: number;
  easeFactor: number;
  nextReview: Date;
  repetitions: number;
}

const EMTBFlashcards: React.FC = () => {
  const { trackEvent } = usePerformanceTracker();
  const flashcardTracker = FlashcardTracker.getInstance();
  const { calculateNextReview } = useSpacedRepetition();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [studySession, setStudySession] = useState({
    startTime: Date.now(),
    cardStartTime: Date.now(),
    reviewedCards: 0
  });
  const [spacedRepetitionData, setSpacedRepetitionData] = useState<Record<number, SpacedRepetitionData>>({});

  // Load categories and flashcards
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadFlashcards(selectedCategory);
    }
  }, [selectedCategory]);

  // Update card start time when card changes
  useEffect(() => {
    setStudySession(prev => ({ ...prev, cardStartTime: Date.now() }));
  }, [currentCardIndex]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/flashcards/categories');
      if (response.ok) {
        const cats = await response.json();
        setCategories(cats);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadFlashcards = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/flashcards?category=${encodeURIComponent(category)}`);
      if (response.ok) {
        const cards: Flashcard[] = await response.json();
        setFlashcards(cards);
        setCurrentCardIndex(0);
        setShowAnswer(false);
        setIsFlipped(false);

        // Load spaced repetition data for these cards
        const srData: Record<number, SpacedRepetitionData> = {};
        cards.forEach(card => {
          const stored = localStorage.getItem(`sr_${card.id}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            srData[card.id] = {
              ...parsed,
              nextReview: new Date(parsed.nextReview)
            };
          } else {
            // Initialize new cards
            srData[card.id] = {
              interval: 1,
              easeFactor: 2.5,
              nextReview: new Date(),
              repetitions: 0
            };
          }
        });
        setSpacedRepetitionData(srData);
      }
    } catch (error) {
      console.error('Failed to load flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      setIsFlipped(true);

      // Track card view
      trackEvent({
        activityType: 'flashcard',
        activityId: currentCard.id.toString(),
        topic: currentCard.category,
        score: 0,
        timeSpent: Math.floor((Date.now() - studySession.cardStartTime) / 1000),
        metadata: {
          action: 'view',
          cardId: currentCard.id,
          deckId: selectedCategory,
          frontPreview: currentCard.front.substring(0, 50),
          difficulty: currentCard.difficulty || 'medium'
        }
      });
    }
  };

  const handleConfidenceRating = (confidence: 'again' | 'hard' | 'good' | 'easy') => {
    const currentCard = flashcards[currentCardIndex];
    const srData = spacedRepetitionData[currentCard.id];
    const timeSpent = Math.floor((Date.now() - studySession.cardStartTime) / 1000);

    const confidenceScore = {
      'again': 0,
      'hard': 50,
      'good': 85,
      'easy': 100
    }[confidence];

    // Map confidence to SM-2 quality
    const qualityMap = {
      'again': 0,
      'hard': 2,
      'good': 3,
      'easy': 4
    };
    const quality = qualityMap[confidence];

    // Calculate new interval using SM-2 algorithm
    const result = calculateNextReview({
      interval: srData.interval,
      repetitions: srData.repetitions,
      easeFactor: srData.easeFactor,
      quality
    });

    // Update spaced repetition data
    const updatedSRData = {
      ...srData,
      interval: result.newInterval,
      easeFactor: result.newEaseFactor,
      nextReview: result.nextReviewDate,
      repetitions: result.newRepetitions
    };

    setSpacedRepetitionData(prev => ({
      ...prev,
      [currentCard.id]: updatedSRData
    }));

    // Save to localStorage
    localStorage.setItem(`sr_${currentCard.id}`, JSON.stringify({
      ...updatedSRData,
      nextReview: updatedSRData.nextReview.toISOString()
    }));

    // Track in performance system
    trackEvent({
      activityType: 'flashcard',
      activityId: currentCard.id.toString(),
      topic: currentCard.category,
      score: confidenceScore,
      timeSpent,
      metadata: {
        action: 'review',
        confidence,
        confidenceScore,
        timeSpentMs: timeSpent * 1000,
        deckId: selectedCategory,
        cardId: currentCard.id,
        spacedRepetition: true,
        previousInterval: srData.interval,
        newInterval: result.newInterval,
        easeFactor: updatedSRData.easeFactor
      }
    });

    // Track in flashcard-specific system
    const flashcardEvent = {
      cardId: currentCard.id.toString(),
      deckId: selectedCategory,
      topic: currentCard.category,
      confidence,
      confidenceScore,
      timeSpent: timeSpent * 1000, // convert to milliseconds
      previousInterval: srData.interval,
      newInterval: result.newInterval,
      easeFactor: updatedSRData.easeFactor,
      timestamp: new Date()
    };

    flashcardTracker.trackReview(flashcardEvent);

    // Move to next card
    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
      setIsFlipped(false);
    } else {
      // Session complete
      alert('Study session complete!');
      setStudySession(prev => ({ ...prev, reviewedCards: prev.reviewedCards + flashcards.length }));
      // Could show summary here
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
      setIsFlipped(false);
    }
  };

  const getDueCardsCount = () => {
    return Object.values(spacedRepetitionData).filter(sr => sr.nextReview <= new Date()).length;
  };

  const getCurrentCard = () => {
    return flashcards[currentCardIndex];
  };

  const getProgressPercentage = () => {
    return flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading flashcards...</div>;
  }

  if (!selectedCategory) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-slate-900">
        <h1 className="text-3xl font-bold text-white mb-6">EMT-B Flashcards</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="p-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-medium transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
              📚 {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentCard = getCurrentCard();
  if (!currentCard) {
    return <div>No flashcards available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">{selectedCategory} Flashcards</h1>
        <button
          onClick={() => setSelectedCategory('')}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded text-white"
        >
          Change Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{currentCardIndex + 1}</div>
          <div className="text-sm text-slate-400">Current Card</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{flashcards.length}</div>
          <div className="text-sm text-slate-400">Total Cards</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-amber-400">{getDueCardsCount()}</div>
          <div className="text-sm text-slate-400">Due Cards</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-emerald-400">{Math.round(getProgressPercentage())}%</div>
          <div className="text-sm text-slate-400">Progress</div>
        </div>
      </div>

      {/* System Charge Bar */}
      <div className="w-full bg-slate-900 rounded-full h-3 mb-6 border border-slate-700">
        <div
          className="bg-gradient-to-r from-amber-600 to-yellow-400 h-3 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <div
          className={`relative w-full h-96 cursor-pointer transition-transform duration-500 ${
            isFlipped ? 'transform rotate-y-180' : ''
          }`}
          onClick={handleCardClick}
        >
          {/* Front */}
          <div className={`absolute inset-0 w-full h-full bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 flex flex-col justify-center items-center border ${
            isFlipped ? 'border-slate-600' : 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          } transition-all duration-300`}>
            <div className="text-3xl font-mono font-bold text-amber-400 text-center mb-4">
              {currentCard.front}
            </div>
            {!showAnswer && (
              <div className="text-slate-400 text-center">Click to reveal answer</div>
            )}
          </div>

          {/* Back */}
          <div className={`absolute inset-0 w-full h-full bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 flex flex-col justify-center items-center transform rotate-y-180 border ${
            isFlipped ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-slate-600'
          } transition-all duration-300`}>
            <div className="text-lg text-slate-100 text-center">
              {currentCard.back}
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Buttons */}
      {showAnswer && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleConfidenceRating('again')}
            className="p-4 bg-red-400 text-red-900 font-medium rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-all duration-200"
          >
            🔴 Study Again (0%)
          </button>
          <button
            onClick={() => handleConfidenceRating('hard')}
            className="p-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
          >
            Hard (50%)
          </button>
          <button
            onClick={() => handleConfidenceRating('good')}
            className="p-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
          >
            Good (85%)
          </button>
          <button
            onClick={() => handleConfidenceRating('easy')}
            className="p-4 bg-emerald-400 text-emerald-900 font-medium rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_15px_rgba(16,185,129,0.7)] transition-all duration-200"
          >
            🟢 Mark as Known (100%)
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={previousCard}
          disabled={currentCardIndex === 0}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 rounded-lg text-white font-medium transition-colors"
        >
          ◀ Previous
        </button>
        <button
          onClick={nextCard}
          disabled={!showAnswer}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 rounded-lg text-white font-medium transition-colors"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

// Make FlashcardTracker globally available for testing
(window as any).FlashcardTracker = FlashcardTracker;

export default EMTBFlashcards;