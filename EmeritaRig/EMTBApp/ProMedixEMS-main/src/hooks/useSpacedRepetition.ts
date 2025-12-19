import { useCallback } from 'react';

export interface SpacedRepetitionParams {
  interval: number;
  repetitions: number;
  easeFactor: number;
  quality: number; // 0-5 rating
}

export interface SpacedRepetitionResult {
  newInterval: number;
  newRepetitions: number;
  newEaseFactor: number;
  nextReviewDate: Date;
}

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;

export const useSpacedRepetition = () => {
  const calculateNextReview = useCallback((params: SpacedRepetitionParams): SpacedRepetitionResult => {
    let { interval, repetitions, easeFactor, quality } = params;

    // Adjust ease factor based on quality
    if (quality >= 3) {
      easeFactor = Math.min(3.0, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    } else {
      easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
    }

    // Calculate new interval
    if (quality < 3) {
      // Incorrect answer - reset to beginning
      repetitions = 0;
      interval = 1;
    } else {
      repetitions += 1;

      if (repetitions === 1) {
        interval = 1;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
    }

    // Calculate next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
      newInterval: interval,
      newRepetitions: repetitions,
      newEaseFactor: easeFactor,
      nextReviewDate,
    };
  }, []);

  return { calculateNextReview };
};