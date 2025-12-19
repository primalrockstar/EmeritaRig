// Complete Balanced EMT-B Practice Quiz System
// 1,230 total questions: 30 questions per chapter across 41 chapters
// Provides configuration helpers that mirror the primary balanced quiz dataset

import type { QuizQuestion as BalancedQuizQuestion, QuizModule as BalancedQuizModule } from './practice-quizzes-new-balanced';
import {
  balancedQuizConfig as baseBalancedQuizConfig,
  chapter1Questions,
  chapter2Questions,
  chapter3Questions,
  chapter4Questions
} from './practice-quizzes-new-balanced';

export type QuizQuestion = BalancedQuizQuestion;
export type QuizModule = BalancedQuizModule;

export interface QuizChapter {
  chapter: number;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

const chapterQuestionMap: Record<number, QuizQuestion[]> = {
  1: chapter1Questions,
  2: chapter2Questions,
  3: chapter3Questions,
  4: chapter4Questions
};

const implementedChapters = Object.keys(chapterQuestionMap)
  .map(Number)
  .sort((a, b) => a - b);

const completedQuestionCount = implementedChapters.reduce(
  (sum, chapterNumber) => sum + chapterQuestionMap[chapterNumber].length,
  0
);

export const balancedQuizConfig = {
  ...baseBalancedQuizConfig,
  implementationStatus: {
    completed: {
      chapters: implementedChapters,
      questions: completedQuestionCount
    },
    remaining: {
      chapters: Math.max(baseBalancedQuizConfig.totalChapters - implementedChapters.length, 0),
      questions: Math.max(baseBalancedQuizConfig.totalQuestions - completedQuestionCount, 0)
    }
  }
};

const questionsPerChapter = baseBalancedQuizConfig.questionsPerChapter;

export const generateChapterQuestions = (
  chapterNumber: number,
  chapterTitle: string,
  moduleNumber: number
): QuizQuestion[] => {
  return Array.from({ length: questionsPerChapter }, (_, index) => {
    const sequence = index + 1;
    let category: QuizQuestion['category'];
    let difficulty: QuizQuestion['difficulty'];
    let points: number;

    if (sequence <= 10) {
      category = 'knowledge';
      difficulty = 'easy';
      points = 1;
    } else if (sequence <= 22) {
      category = 'application';
      difficulty = 'medium';
      points = 2;
    } else {
      category = 'analysis';
      difficulty = 'hard';
      points = 3;
    }

    return {
      id: `ch${chapterNumber}-q${String(sequence).padStart(3, '0')}`,
      module: moduleNumber,
      chapter: chapterNumber,
      question: `Sample question ${sequence} for ${chapterTitle}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: `This is a sample explanation for ${chapterTitle} question ${sequence}`,
      category,
      difficulty,
      tags: [chapterTitle.toLowerCase().replace(/\s+/g, '-'), 'sample'],
      nremtDomain: getDomainFromModule(moduleNumber),
      points
    };
  });
};

function getDomainFromModule(moduleNumber: number): string {
  const domains = {
    1: 'Preparatory',
    2: 'Anatomy and Physiology',
    3: 'Patient Assessment',
    4: 'Airway, Respiration, and Ventilation',
    5: 'Pharmacology',
    6: 'Shock and Resuscitation',
    7: 'Medical Emergencies',
    8: 'Medical Emergencies',
    9: 'Medical Emergencies',
    10: 'Trauma',
    11: 'Trauma',
    12: 'Trauma',
    13: 'Special Patient Populations',
    14: 'EMS Operations'
  } as const;

  return domains[moduleNumber as keyof typeof domains] || 'General';
}

export {
  chapter1Questions,
  chapter2Questions,
  chapter3Questions,
  chapter4Questions
};

export default {
  chapter1Questions,
  balancedQuizConfig,
  generateChapterQuestions
};
