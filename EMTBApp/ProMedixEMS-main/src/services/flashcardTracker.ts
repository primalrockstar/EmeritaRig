export interface FlashcardEvent {
  cardId: string;
  deckId: string;
  topic: string;
  confidence: 'again' | 'hard' | 'good' | 'easy';
  confidenceScore: number;
  timeSpent: number;
  previousInterval: number;
  newInterval: number;
  easeFactor: number;
  timestamp: Date;
}

export interface FlashcardAnalytics {
  deckId: string;
  totalReviews: number;
  averageScore: number;
  retentionRate: number;
  dueCards: number;
  topics: {
    [topic: string]: {
      reviews: number;
      averageScore: number;
      weakestCards: string[];
    }
  };
}

export class FlashcardTracker {
  private static instance: FlashcardTracker;

  static getInstance(): FlashcardTracker {
    if (!FlashcardTracker.instance) {
      FlashcardTracker.instance = new FlashcardTracker();
    }
    return FlashcardTracker.instance;
  }

  trackReview(event: FlashcardEvent): void {
    // Store flashcard-specific data
    const flashcardData = this.getFlashcardData();

    if (!flashcardData.cards) flashcardData.cards = {};
    if (!flashcardData.cards[event.cardId]) {
      flashcardData.cards[event.cardId] = {
        reviews: 0,
        totalScore: 0,
        history: [],
        lastReviewed: event.timestamp.toISOString()
      };
    }

    const card = flashcardData.cards[event.cardId];
    card.reviews += 1;
    card.totalScore += event.confidenceScore;
    card.history.push({
      confidence: event.confidence,
      score: event.confidenceScore,
      timestamp: event.timestamp.toISOString(),
      interval: event.newInterval
    });

    // Keep only last 20 reviews
    if (card.history.length > 20) {
      card.history.shift();
    }

    // Update topic statistics
    if (!flashcardData.topics) flashcardData.topics = {};
    if (!flashcardData.topics[event.topic]) {
      flashcardData.topics[event.topic] = {
        reviews: 0,
        totalScore: 0,
        cardIds: new Set<string>()
      };
    }

    const topic = flashcardData.topics[event.topic];
    topic.reviews += 1;
    topic.totalScore += event.confidenceScore;
    topic.cardIds.add(event.cardId);

    // Update spaced repetition schedule
    this.updateSpacedRepetitionSchedule(event.cardId, event.newInterval);

    // Save to localStorage
    localStorage.setItem('flashcardAnalytics', JSON.stringify(flashcardData));

    // Dispatch update event
    window.dispatchEvent(new CustomEvent('flashcardUpdate'));
  }

  getAnalytics(): FlashcardAnalytics {
    const data = this.getFlashcardData();
    const topics = data.topics || {};
    const cards = data.cards || {};

    const totalReviews = Object.values(topics).reduce((sum: number, t: any) => sum + t.reviews, 0);
    const totalScore = Object.values(topics).reduce((sum: number, t: any) => sum + t.totalScore, 0);

    // Calculate due cards (simplified - in production use actual spaced repetition algorithm)
    const dueCards = Object.entries(cards).filter(([_, card]: [string, any]) => {
      const lastReviewed = new Date(card.lastReviewed);
      const interval = this.getCardInterval(_) || 1;
      const nextReview = new Date(lastReviewed.getTime() + interval * 24 * 60 * 60 * 1000);
      return nextReview <= new Date();
    }).length;

    // Calculate retention (cards with average score > 80)
    const retainedCards = Object.values(cards).filter((card: any) =>
      card.reviews >= 3 && (card.totalScore / card.reviews) >= 80
    ).length;

    const retentionRate = Object.keys(cards).length > 0
      ? (retainedCards / Object.keys(cards).length) * 100
      : 0;

    return {
      deckId: 'overall',
      totalReviews,
      averageScore: totalReviews > 0 ? totalScore / totalReviews : 0,
      retentionRate,
      dueCards,
      topics: Object.entries(topics).reduce((acc, [topic, data]: [string, any]) => {
        acc[topic] = {
          reviews: data.reviews,
          averageScore: data.reviews > 0 ? data.totalScore / data.reviews : 0,
          weakestCards: this.getWeakestCardsForTopic(topic, cards)
        };
        return acc;
      }, {} as any)
    };
  }

  private getFlashcardData(): any {
    try {
      return JSON.parse(localStorage.getItem('flashcardAnalytics') || '{}');
    } catch {
      return {};
    }
  }

  private updateSpacedRepetitionSchedule(cardId: string, interval: number): void {
    const schedule = JSON.parse(localStorage.getItem('spacedRepetitionSchedule') || '{}');
    schedule[cardId] = {
      interval,
      nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString(),
      updated: new Date().toISOString()
    };
    localStorage.setItem('spacedRepetitionSchedule', JSON.stringify(schedule));
  }

  private getCardInterval(cardId: string): number {
    const schedule = JSON.parse(localStorage.getItem('spacedRepetitionSchedule') || '{}');
    return schedule[cardId]?.interval || 1;
  }

  private getWeakestCardsForTopic(topic: string, allCards: any): string[] {
    const topicCards = Object.entries(allCards)
      .filter(([_, card]: [string, any]) =>
        card.history?.some((h: any) => h.confidence === 'again' || h.confidence === 'hard')
      )
      .sort((a: any, b: any) => {
        const scoreA = a[1].reviews > 0 ? a[1].totalScore / a[1].reviews : 0;
        const scoreB = b[1].reviews > 0 ? b[1].totalScore / b[1].reviews : 0;
        return scoreA - scoreB;
      })
      .slice(0, 5) // Top 5 weakest cards
      .map(([id]) => id);

    return topicCards;
  }
}

// Helper function for SM-2 algorithm
export const calculateNewInterval = (
  confidence: 'again' | 'hard' | 'good' | 'easy',
  previousInterval: number,
  easeFactor: number
): number => {
  // Standard SM-2 algorithm
  switch (confidence) {
    case 'again':
      return 1; // Review tomorrow
    case 'hard':
      return Math.max(1, Math.floor(previousInterval * 1.2));
    case 'good':
      return Math.max(1, Math.floor(previousInterval * easeFactor));
    case 'easy':
      return Math.max(1, Math.floor(previousInterval * easeFactor * 1.3));
    default:
      return previousInterval;
  }
};