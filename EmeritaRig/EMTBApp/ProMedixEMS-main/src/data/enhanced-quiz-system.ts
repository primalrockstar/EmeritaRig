// Enhanced Quiz System metadata generated from the balanced quiz dataset
// Provides dynamic coverage across all 45 chapters (41 core + 4 bonus)
// Scenario content remains sourced separately via scenario-questions.ts

import type { QuizQuestion } from './practice-quizzes-new-balanced';
import {
  balancedModuleDefinitions,
  chapterQuestionBank,
  chapterTitles
} from './practice-quizzes-new-balanced';

export interface EnhancedQuizQuestion {
  id: string;
  module: number;
  chapter: number;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'knowledge' | 'application' | 'scenario' | 'analysis';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  nremtDomain: string;
  nationalProtocolAlignment?: string;
  emtScopeCompliant: boolean;
  points: number;
  timeEstimate: number;
  images?: string[];
}

export interface EnhancedQuizModule {
  id: number;
  title: string;
  description: string;
  totalQuestions: number;
  scenarioQuestions: number;
  knowledgeQuestions: number;
  chapters: EnhancedQuizChapter[];
}

export interface EnhancedQuizChapter {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  questions: EnhancedQuizQuestion[];
  scenarioCount: number;
  knowledgeCount: number;
  nationalProtocolTags: string[];
}

const difficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
  knowledge: 'easy',
  application: 'medium',
  analysis: 'hard'
};

const categoryMap: Record<string, 'knowledge' | 'application' | 'analysis'> = {
  knowledge: 'knowledge',
  application: 'application',
  analysis: 'analysis'
};

const convertQuestion = (question: QuizQuestion): EnhancedQuizQuestion => {
  const difficulty = difficultyMap[question.difficulty] ?? 'medium';
  const category = categoryMap[question.category] ?? 'knowledge';

  return {
    id: question.id,
    module: question.module,
    chapter: question.chapter,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    category,
    difficulty,
    tags: question.tags ?? [],
    nremtDomain: question.nremtDomain ?? 'EMS Operations',
    nationalProtocolAlignment: undefined,
    emtScopeCompliant: true,
    points: question.points,
    timeEstimate: Math.max(45, question.options.length * 10)
  };
};

const buildChapter = (
  moduleId: number,
  chapterId: number,
  moduleTitle: string,
  focusAreas: string[]
): EnhancedQuizChapter => {
  const rawQuestions = chapterQuestionBank[chapterId] ?? [];
  const questions = rawQuestions.map(convertQuestion);
  const scenarioCount = questions.filter((question) => question.category === 'scenario').length;
  const knowledgeCount = questions.length - scenarioCount;

  const chapterTitle = chapterTitles[chapterId as keyof typeof chapterTitles] ?? `Chapter ${chapterId}`;

  return {
    id: chapterId,
    moduleId,
    title: chapterTitle,
    description: `${chapterTitle} mastery objectives aligned to ${moduleTitle}.`,
    questions,
    scenarioCount,
    knowledgeCount,
    nationalProtocolTags: focusAreas
  };
};

export const enhancedQuizModules: EnhancedQuizModule[] = balancedModuleDefinitions.map((definition) => {
  const chapters = definition.chapters.map((chapterId) =>
    buildChapter(definition.module, chapterId, definition.title, definition.focusAreas)
  );

  const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0);
  const scenarioQuestions = chapters.reduce((sum, chapter) => sum + chapter.scenarioCount, 0);
  const knowledgeQuestions = chapters.reduce((sum, chapter) => sum + chapter.knowledgeCount, 0);

  return {
    id: definition.module,
    title: definition.title,
    description: definition.description,
    totalQuestions,
    scenarioQuestions,
    knowledgeQuestions,
    chapters
  };
});

const totalModules = enhancedQuizModules.length;
const totalChapters = enhancedQuizModules.reduce((sum, module) => sum + module.chapters.length, 0);
const totalQuestions = enhancedQuizModules.reduce(
  (sum, module) => sum + module.chapters.reduce((chapterSum, chapter) => chapterSum + chapter.questions.length, 0),
  0
);
const scenarioQuestions = enhancedQuizModules.reduce(
  (sum, module) => sum + module.chapters.reduce((chapterSum, chapter) => chapterSum + chapter.scenarioCount, 0),
  0
);
const knowledgeQuestions = totalQuestions - scenarioQuestions;
const questionsPerChapter = totalChapters > 0 ? Math.round(totalQuestions / totalChapters) : 0;

export const ENHANCED_QUIZ_STATS = {
  totalModules,
  totalChapters,
  totalQuestions,
  scenarioQuestions,
  knowledgeQuestions,
  questionsPerChapter,
  scenarioPerChapter: totalChapters > 0 ? Math.round(scenarioQuestions / totalChapters) : 0,
  knowledgePerChapter: totalChapters > 0 ? Math.round(knowledgeQuestions / totalChapters) : 0,
  emtScopeCompliant: true,
  nationalProtocolAlignment: 'NHTSA 2022 Guidelines'
};

export interface EnhancedChapterOption {
  chapterId: number;
  chapterTitle: string;
  moduleId: number;
  moduleTitle: string;
}

export const ENHANCED_CHAPTER_OPTIONS: EnhancedChapterOption[] = enhancedQuizModules
  .flatMap((module) =>
    module.chapters.map((chapter) => ({
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      moduleId: module.id,
      moduleTitle: module.title
    }))
  )
  .sort((a, b) => a.chapterId - b.chapterId);

export default {
  enhancedQuizModules,
  ENHANCED_QUIZ_STATS,
  ENHANCED_CHAPTER_OPTIONS
};