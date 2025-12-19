export interface Flashcard {
  id: number;
  chapter: number;
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  // Spaced repetition fields
  nextReview: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
}