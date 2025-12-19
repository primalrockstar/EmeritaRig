// NREMT Question Type System
// All 5 official question types supported

export type QuestionType =
  | 'multiple-choice'    // Traditional 4-option multiple choice
  | 'multiple-response'  // Select 2 or 3 correct options from 5 or 6
  | 'options-table'     // Categorize/classify options in a table
  | 'build-list'        // Put steps in correct order
  | 'drag-and-drop';    // Categorize items into groups

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  domain: string; // NREMT content domain
  difficulty: number; // 1-3 scale (1=easy, 2=medium, 3=hard)
  isPilot: boolean; // 10 unscored pilot items per exam
  sourceChapter: number; // Source chapter from curriculum
  estimatedTime: number; // Estimated seconds to answer
  stem: string; // Question text
  explanation: string; // Answer explanation
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[]; // Exactly 4 options
  correctAnswer: number; // Index of correct option (0-3)
}

export interface MultipleResponseQuestion extends BaseQuestion {
  type: 'multiple-response';
  options: string[]; // 5 or 6 options total
  correctAnswers: number[]; // 2 or 3 correct indices
  instruction: 'Select TWO' | 'Select THREE'; // Clear instruction
  minimumSelections: number; // 2 or 3
}

export interface OptionsTableQuestion extends BaseQuestion {
  type: 'options-table';
  instruction: string; // "Classify each option into the correct category"
  categories: string[]; // Usually 2 categories
  items: string[]; // Items to categorize
  correctCategorization: Record<string, string>; // item -> category mapping
}

export interface BuildListQuestion extends BaseQuestion {
  type: 'build-list';
  instruction: string; // "Place in order of priority" or similar
  items: string[]; // 4-6 items to sequence
  correctOrder: number[]; // Correct sequence as indices
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-and-drop';
  instruction: string; // "Drag each item to the correct category"
  columns: string[]; // Column headers/categories
  items: string[]; // Items to drag
  correctPlacement: Record<string, string>; // item -> column mapping
}

// Union type for all question types
export type NREMTQuestion =
  | MultipleChoiceQuestion
  | MultipleResponseQuestion
  | OptionsTableQuestion
  | BuildListQuestion
  | DragDropQuestion;

// Question generation metadata
export interface QuestionGenerationParams {
  type: QuestionType;
  domain: string;
  difficulty: number;
  sourceChapter: number;
  chapterContent?: any; // Reference to chapter content for generation
}

// Response validation
export interface QuestionResponse {
  questionId: string;
  response: any; // Depends on question type
  timeSpent: number; // Milliseconds
  isCorrect: boolean;
  confidence?: number; // For future enhancement
}

// Scoring weights by question type (per NREMT guidelines)
export const QUESTION_TYPE_WEIGHTS = {
  'multiple-choice': 1.0,
  'multiple-response': 1.2, // Slightly harder due to multiple correct answers
  'options-table': 1.4, // More complex categorization
  'build-list': 1.3, // Sequencing requires more thought
  'drag-and-drop': 1.4 // Interactive complexity
} as const;

// Question type distribution (approximating real NREMT exams)
export const QUESTION_TYPE_DISTRIBUTION = {
  'multiple-choice': 0.60,    // 60% of questions
  'multiple-response': 0.20,  // 20%
  'options-table': 0.10,      // 10%
  'build-list': 0.05,         // 5%
  'drag-and-drop': 0.05       // 5%
} as const;

// Helper functions
export const getQuestionTypeCount = (totalQuestions: number): Record<QuestionType, number> => {
  const distribution: Record<QuestionType, number> = {} as Record<QuestionType, number>;

  for (const [type, percentage] of Object.entries(QUESTION_TYPE_DISTRIBUTION)) {
    distribution[type as QuestionType] = Math.round(percentage * totalQuestions);
  }

  return distribution;
};

export const validateResponse = (question: NREMTQuestion, response: any): boolean => {
  switch (question.type) {
    case 'multiple-choice':
      return response === (question as MultipleChoiceQuestion).correctAnswer;

    case 'multiple-response':
      const mrQuestion = question as MultipleResponseQuestion;
      const correctSet = new Set(mrQuestion.correctAnswers);
      const responseSet = new Set(Array.isArray(response) ? response : [response]);
      return correctSet.size === responseSet.size &&
             Array.from(correctSet).every(id => responseSet.has(id));

    case 'options-table':
      const otQuestion = question as OptionsTableQuestion;
      return JSON.stringify(response) === JSON.stringify(otQuestion.correctCategorization);

    case 'build-list':
      const blQuestion = question as BuildListQuestion;
      return JSON.stringify(response) === JSON.stringify(blQuestion.correctOrder);

    case 'drag-and-drop':
      const ddQuestion = question as DragDropQuestion;
      return JSON.stringify(response) === JSON.stringify(ddQuestion.correctPlacement);

    default:
      return false;
  }
};

export const getQuestionDifficulty = (question: NREMTQuestion): 'easy' | 'medium' | 'hard' => {
  if (question.difficulty <= 1.3) return 'easy';
  if (question.difficulty <= 2.3) return 'medium';
  return 'hard';
};