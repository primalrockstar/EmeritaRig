import { chapter1Flashcards } from './emtb/chapter1-flashcards';
import { chapter2Flashcards } from './emtb/chapter2-flashcards';
import { chapter3Flashcards } from './emtb/chapter3-flashcards';
import { chapter4Flashcards } from './emtb/chapter4-flashcards';
import { chapter5Flashcards } from './emtb/chapter5-flashcards';
import { chapter6Flashcards } from './emtb/chapter6-flashcards';
import { chapter7Flashcards } from './emtb/chapter7-flashcards';
import { chapter8Flashcards } from './emtb/chapter8-flashcards';
import { chapter9Flashcards } from './emtb/chapter9-flashcards';
import { chapter10Flashcards } from './emtb/chapter10-flashcards';
import { chapter11Flashcards } from './emtb/chapter11-flashcards';
import { chapter12Flashcards } from './emtb/chapter12-flashcards';
import { chapter13Flashcards } from './emtb/chapter13-flashcards';
import { chapter14Flashcards } from './emtb/chapter14-flashcards';
import { chapter15Flashcards } from './emtb/chapter15-flashcards';
import { chapter16Flashcards } from './emtb/chapter16-flashcards';
import { chapter17Flashcards } from './emtb/chapter17-flashcards';
import { chapter18Flashcards } from './emtb/chapter18-flashcards';
import { chapter19Flashcards } from './emtb/chapter19-flashcards';
import { chapter20Flashcards } from './emtb/chapter20-flashcards';
import { chapter21Flashcards } from './emtb/chapter21-flashcards';
import { chapter22Flashcards } from './emtb/chapter22-flashcards';
import { chapter23Flashcards } from './emtb/chapter23-flashcards';
import { chapter24Flashcards } from './emtb/chapter24-flashcards';
import { chapter25Flashcards } from './emtb/chapter25-flashcards';
import { chapter26Flashcards } from './emtb/chapter26-flashcards';
import { chapter27Flashcards } from './emtb/chapter27-flashcards';
import { chapter28Flashcards } from './emtb/chapter28-flashcards';
import { chapter29Flashcards } from './emtb/chapter29-flashcards';
import { chapter30Flashcards } from './emtb/chapter30-flashcards';
import { chapter31Flashcards } from './emtb/chapter31-flashcards';
import { chapter32Flashcards } from './emtb/chapter32-flashcards';
import { chapter33Flashcards } from './emtb/chapter33-flashcards';
import { chapter34Flashcards } from './emtb/chapter34-flashcards';
import { chapter35Flashcards } from './emtb/chapter35-flashcards';
import { chapter36Flashcards } from './emtb/chapter36-flashcards';
import { chapter37Flashcards } from './emtb/chapter37-flashcards';
import { chapter38Flashcards } from './emtb/chapter38-flashcards';
import { chapter39Flashcards } from './emtb/chapter39-flashcards';
import { chapter40Flashcards } from './emtb/chapter40-flashcards';
import { chapter41Flashcards } from './emtb/chapter41-flashcards';
import { chapter42Flashcards } from './emtb/chapter42-flashcards';
import { chapter43Flashcards } from './emtb/chapter43-flashcards';
import { chapter44Flashcards } from './emtb/chapter44-flashcards';
import { chapter45Flashcards } from './emtb/chapter45-flashcards';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  moduleId: number;
  chapterId: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
}

export interface FlashcardDeck {
  id: string;
  name: string;
  moduleId: number;
  chapterIds: number[];
  cardCount: number;
  difficulty: 'mixed' | 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

// Export individual chapter flashcards for direct use
export {
  chapter1Flashcards,
  chapter2Flashcards,
  chapter3Flashcards,
  chapter4Flashcards,
  chapter5Flashcards,
  chapter6Flashcards,
  chapter7Flashcards,
  chapter8Flashcards,
  chapter9Flashcards,
  chapter10Flashcards,
  chapter11Flashcards,
  chapter12Flashcards,
  chapter13Flashcards,
  chapter14Flashcards,
  chapter15Flashcards,
  chapter16Flashcards,
  chapter17Flashcards,
  chapter18Flashcards,
  chapter19Flashcards,
  chapter20Flashcards,
  chapter21Flashcards,
  chapter22Flashcards,
  chapter23Flashcards,
  chapter24Flashcards,
  chapter25Flashcards,
  chapter26Flashcards,
  chapter27Flashcards,
  chapter28Flashcards,
  chapter29Flashcards,
  chapter30Flashcards,
  chapter31Flashcards,
  chapter32Flashcards,
  chapter33Flashcards,
  chapter34Flashcards,
  chapter35Flashcards,
  chapter36Flashcards,
  chapter37Flashcards,
  chapter38Flashcards,
  chapter39Flashcards,
  chapter40Flashcards,
  chapter41Flashcards,
  chapter42Flashcards,
  chapter43Flashcards,
  chapter44Flashcards,
  chapter45Flashcards
};

// Create a simple array of all flashcards for basic operations
export const allFlashcards = [
  ...chapter1Flashcards,
  ...chapter2Flashcards,
  ...chapter3Flashcards,
  ...chapter4Flashcards,
  ...chapter5Flashcards,
  ...chapter6Flashcards,
  ...chapter7Flashcards,
  ...chapter8Flashcards,
  ...chapter9Flashcards,
  ...chapter10Flashcards,
  ...chapter11Flashcards,
  ...chapter12Flashcards,
  ...chapter13Flashcards,
  ...chapter14Flashcards,
  ...chapter15Flashcards,
  ...chapter16Flashcards,
  ...chapter17Flashcards,
  ...chapter18Flashcards,
  ...chapter19Flashcards,
  ...chapter20Flashcards,
  ...chapter21Flashcards,
  ...chapter22Flashcards,
  ...chapter23Flashcards,
  ...chapter24Flashcards,
  ...chapter25Flashcards,
  ...chapter26Flashcards,
  ...chapter27Flashcards,
  ...chapter28Flashcards,
  ...chapter29Flashcards,
  ...chapter30Flashcards,
  ...chapter31Flashcards,
  ...chapter32Flashcards,
  ...chapter33Flashcards,
  ...chapter34Flashcards,
  ...chapter35Flashcards,
  ...chapter36Flashcards,
  ...chapter37Flashcards,
  ...chapter38Flashcards,
  ...chapter39Flashcards,
  ...chapter40Flashcards,
  ...chapter41Flashcards,
  ...chapter42Flashcards,
  ...chapter43Flashcards,
  ...chapter44Flashcards,
  ...chapter45Flashcards
];

// Helper function to get total flashcards
export const getTotalFlashcards = (): number => allFlashcards.length;