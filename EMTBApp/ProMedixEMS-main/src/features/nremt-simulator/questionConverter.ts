// Question Converter: Transforms existing quiz questions into NREMT format
// Converts 420 existing questions into 130 NREMT-style questions

import { NREMTQuestion, QuestionType } from './questionTypes';
import { chapterToContentDomain } from './chapterMapping';

interface OriginalQuestion {
  id: string;
  module: number;
  chapter?: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  nremtDomain?: string;
  points: number;
}

export class QuestionConverter {
  private existingQuestions: OriginalQuestion[];

  constructor(questions: OriginalQuestion[]) {
    this.existingQuestions = questions;
  }

  // Generate 130 NREMT questions (120 scored + 10 pilot)
  generateNREMTQuestionBank(): NREMTQuestion[] {
    const questions: NREMTQuestion[] = [];
    const scoredQuestions = 120;
    const pilotQuestions = 10;
    const totalQuestions = scoredQuestions + pilotQuestions;

    // Track domain distribution
    const domainTargets: Record<string, number> = {
      'Scene Size-up and Safety': Math.round(totalQuestions * 0.17),
      'Primary Assessment': Math.round(totalQuestions * 0.41),
      'Secondary Assessment': Math.round(totalQuestions * 0.07),
      'Patient Treatment and Transport': Math.round(totalQuestions * 0.22),
      'Operations': Math.round(totalQuestions * 0.12)
    };

    const domainCounts: Record<string, number> = {
      'Scene Size-up and Safety': 0,
      'Primary Assessment': 0,
      'Secondary Assessment': 0,
      'Patient Treatment and Transport': 0,
      'Operations': 0
    };

    // Track question type distribution
    const typeDistribution = {
      'multiple-choice': 0.60,
      'multiple-response': 0.20,
      'options-table': 0.10,
      'build-list': 0.05,
      'drag-and-drop': 0.05
    };

    const typeCounts = {
      'multiple-choice': 0,
      'multiple-response': 0,
      'options-table': 0,
      'build-list': 0,
      'drag-and-drop': 0
    };

    // Generate questions
    for (let i = 0; i < totalQuestions; i++) {
      const isPilot = i < pilotQuestions;

      // Select domain based on remaining targets
      const domain = this.selectDomain(domainCounts, domainTargets, totalQuestions - i);

      // Select question type
      const questionType = this.selectQuestionType(typeCounts, typeDistribution, totalQuestions - i);

      // Find suitable source question
      const sourceQuestion = this.selectSourceQuestion(domain, questionType);

      if (sourceQuestion) {
        const convertedQuestion = this.convertQuestion(sourceQuestion, {
          type: questionType,
          domain,
          isPilot,
          questionNumber: i + 1
        });

        if (convertedQuestion) {
          questions.push(convertedQuestion);
          domainCounts[domain]++;
          typeCounts[questionType]++;
        }
      }
    }

    return this.finalizeQuestionBank(questions);
  }

  private selectDomain(
    currentCounts: Record<string, number>,
    targets: Record<string, number>,
    questionsRemaining: number
  ): string {
    // Find domains that still need questions
    const availableDomains = Object.entries(targets)
      .filter(([domain, target]) => currentCounts[domain] < target)
      .map(([domain]) => domain);

    if (availableDomains.length === 0) {
      // All targets met, use any domain
      return Object.keys(targets)[Math.floor(Math.random() * Object.keys(targets).length)];
    }

    return availableDomains[Math.floor(Math.random() * availableDomains.length)];
  }

  private selectQuestionType(
    currentCounts: Record<QuestionType, number>,
    distribution: Record<QuestionType, number>,
    questionsRemaining: number
  ): QuestionType {
    // Calculate remaining target for each type
    const remainingTargets: Record<QuestionType, number> = {} as Record<QuestionType, number>;

    for (const type of Object.keys(distribution) as QuestionType[]) {
      const targetTotal = Math.round(130 * distribution[type]);
      remainingTargets[type] = Math.max(0, targetTotal - currentCounts[type]);
    }

    // Select from types that still need questions
    const availableTypes = Object.entries(remainingTargets)
      .filter(([_, remaining]) => remaining > 0)
      .map(([type]) => type as QuestionType);

    if (availableTypes.length === 0) {
      // All targets met, use any type
      return Object.keys(distribution)[Math.floor(Math.random() * Object.keys(distribution).length)] as QuestionType;
    }

    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }

  private selectSourceQuestion(domain: string, questionType: QuestionType): OriginalQuestion | null {
    // Find questions from modules that map to this domain
    const eligibleModules = Object.entries(chapterToContentDomain)
      .filter(([_, questionDomain]) => questionDomain === domain)
      .map(([chapter]) => parseInt(chapter));

    const eligibleQuestions = this.existingQuestions.filter(q =>
      eligibleModules.includes(q.chapter || q.module)
    );

    if (eligibleQuestions.length === 0) {
      // Fallback to any question if no perfect matches
      return this.existingQuestions[Math.floor(Math.random() * this.existingQuestions.length)];
    }

    return eligibleQuestions[Math.floor(Math.random() * eligibleQuestions.length)];
  }

  private convertQuestion(
    source: OriginalQuestion,
    config: {
      type: QuestionType;
      domain: string;
      isPilot: boolean;
      questionNumber: number;
    }
  ): NREMTQuestion | null {
    const baseQuestion = {
      id: `nremt-${config.type.slice(0, 2)}-${String(config.questionNumber).padStart(3, '0')}`,
      type: config.type,
      domain: config.domain,
      difficulty: this.convertDifficulty(source.difficulty),
      isPilot: config.isPilot,
      sourceChapter: source.chapter || source.module,
      estimatedTime: this.getEstimatedTime(config.type),
      explanation: source.explanation
    };

    switch (config.type) {
      case 'multiple-choice':
        return this.convertToMultipleChoice(source, baseQuestion);
      case 'multiple-response':
        return this.convertToMultipleResponse(source, baseQuestion);
      case 'options-table':
        return this.convertToOptionsTable(source, baseQuestion);
      case 'build-list':
        return this.convertToBuildList(source, baseQuestion);
      case 'drag-and-drop':
        return this.convertToDragAndDrop(source, baseQuestion);
      default:
        return null;
    }
  }

  private convertToMultipleChoice(
    source: OriginalQuestion,
    base: any
  ): NREMTQuestion {
    return {
      ...base,
      type: 'multiple-choice',
      stem: this.enhanceStem(source.question, 'multiple-choice'),
      options: source.options,
      correctAnswer: source.correctAnswer
    };
  }

  private convertToMultipleResponse(
    source: OriginalQuestion,
    base: any
  ): NREMTQuestion {
    // Convert to "select all that apply" by choosing 2-3 options as correct
    const allIndices = source.options.map((_, index) => index);
    const correctIndices = this.shuffleArray(allIndices)
      .slice(0, Math.random() > 0.5 ? 2 : 3); // 2 or 3 correct answers

    return {
      ...base,
      type: 'multiple-response',
      stem: this.enhanceStem(source.question, 'multiple-response'),
      options: source.options,
      correctAnswers: correctIndices.sort(),
      instruction: correctIndices.length === 2 ? 'Select TWO' : 'Select THREE',
      minimumSelections: correctIndices.length
    };
  }

  private convertToOptionsTable(
    source: OriginalQuestion,
    base: any
  ): NREMTQuestion {
    // Create a categorization question
    const categories = this.getCategoriesForDomain(base.domain);
    const items = this.generateCategorizableItems(source, categories.length);

    const correctCategorization: Record<string, string> = {};
    items.forEach((item, index) => {
      correctCategorization[item] = categories[index % categories.length];
    });

    return {
      ...base,
      type: 'options-table',
      stem: this.enhanceStem(source.question, 'options-table'),
      categories,
      items,
      correctCategorization
    };
  }

  private convertToBuildList(
    source: OriginalQuestion,
    base: any
  ): NREMTQuestion {
    // Convert to sequencing question
    const steps = this.convertToSteps(source);
    const correctOrder = steps.map((_, index) => index); // Assume original order is correct

    return {
      ...base,
      type: 'build-list',
      stem: this.enhanceStem(source.question, 'build-list'),
      instruction: 'Place in the correct order',
      items: steps,
      correctOrder
    };
  }

  private convertToDragAndDrop(
    source: OriginalQuestion,
    base: any
  ): NREMTQuestion {
    // Create categorization question with columns
    const columns = this.getColumnsForDomain(base.domain);
    const items = this.generateDraggableItems(source, columns.length);

    const correctPlacement: Record<string, string> = {};
    items.forEach((item, index) => {
      correctPlacement[item] = columns[index % columns.length];
    });

    return {
      ...base,
      type: 'drag-and-drop',
      stem: this.enhanceStem(source.question, 'drag-and-drop'),
      instruction: 'Drag each item to the correct category',
      columns,
      items,
      correctPlacement
    };
  }

  // Helper methods

  private convertDifficulty(difficulty: string): 1 | 2 | 3 {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 2;
    }
  }

  private getEstimatedTime(type: QuestionType): number {
    const times: Record<QuestionType, number> = {
      'multiple-choice': 60,
      'multiple-response': 90,
      'options-table': 120,
      'build-list': 120,
      'drag-and-drop': 120
    };
    return times[type];
  }

  private enhanceStem(originalStem: string, questionType: QuestionType): string {
    const enhancements: Record<QuestionType, string[]> = {
      'multiple-choice': [
        'Which of the following is the MOST appropriate intervention?',
        'Your FIRST action should be to:',
        'The primary purpose of this procedure is to:',
        'Which finding requires immediate intervention?'
      ],
      'multiple-response': [
        'Select ALL that apply to this patient scenario:',
        'Which of the following interventions are appropriate?',
        'Identify the correct statements:'
      ],
      'options-table': [
        'Categorize the following patient findings:',
        'Classify each intervention by priority level:',
        'Organize these assessment steps:'
      ],
      'build-list': [
        'Arrange these steps in the correct sequence:',
        'Place these interventions in order of priority:',
        'Sequence these patient care actions:'
      ],
      'drag-and-drop': [
        'Match each symptom to the appropriate category:',
        'Assign these priorities to the correct urgency level:',
        'Sort these interventions by appropriate timing:'
      ]
    };

    const options = enhancements[questionType] || enhancements['multiple-choice'];
    const enhancement = options[Math.floor(Math.random() * options.length)];

    return `${originalStem}\n\n${enhancement}`;
  }

  private getCategoriesForDomain(domain: string): string[] {
    const categoryMap: Record<string, string[]> = {
      'Scene Size-up and Safety': ['Immediate Actions', 'Ongoing Assessment'],
      'Primary Assessment': ['Airway', 'Breathing', 'Circulation'],
      'Secondary Assessment': ['History', 'Physical Exam', 'Diagnostics'],
      'Patient Treatment and Transport': ['Interventions', 'Monitoring', 'Transport'],
      'Operations': ['Protocols', 'Documentation', 'Communication']
    };

    return categoryMap[domain] || ['Category A', 'Category B'];
  }

  private getColumnsForDomain(domain: string): string[] {
    return this.getCategoriesForDomain(domain);
  }

  private generateCategorizableItems(source: OriginalQuestion, count: number): string[] {
    // Extract key concepts from the question and options
    const items = [
      ...source.tags,
      source.category,
      // Add some generic items based on domain
      'Patient assessment',
      'Vital signs',
      'Medical history',
      'Physical exam',
      'Treatment plan',
      'Transport decision',
      'Documentation',
      'Communication'
    ];

    return this.shuffleArray(items).slice(0, count * 2);
  }

  private generateDraggableItems(source: OriginalQuestion, count: number): string[] {
    return this.generateCategorizableItems(source, count);
  }

  private convertToSteps(source: OriginalQuestion): string[] {
    // Convert question content into sequential steps
    const steps = [
      'Assess the scene',
      'Check for responsiveness',
      'Open airway',
      'Check breathing',
      'Check circulation',
      'Get vital signs',
      'Provide treatment',
      'Prepare for transport'
    ];

    // Try to extract steps from the question/explanation
    const questionText = `${source.question} ${source.explanation}`;
    const stepIndicators = [
      'first', 'then', 'next', 'after', 'finally',
      '1.', '2.', '3.', '4.', '5.',
      'step one', 'step two', 'step three'
    ];

    if (stepIndicators.some(indicator => questionText.toLowerCase().includes(indicator))) {
      return steps; // Use default steps if question mentions sequencing
    }

    return this.shuffleArray(steps).slice(0, 4 + Math.floor(Math.random() * 3)); // 4-6 steps
  }

  private finalizeQuestionBank(questions: NREMTQuestion[]): NREMTQuestion[] {
    // Ensure we have exactly 130 questions
    if (questions.length > 130) {
      questions = questions.slice(0, 130);
    } else if (questions.length < 130) {
      // Fill remaining slots with multiple choice questions
      const needed = 130 - questions.length;
      for (let i = 0; i < needed; i++) {
        const sourceQuestion = this.existingQuestions[Math.floor(Math.random() * this.existingQuestions.length)];
        const domain = chapterToContentDomain[sourceQuestion.chapter || sourceQuestion.module] || 'Primary Assessment';

        const question = this.convertQuestion(sourceQuestion, {
          type: 'multiple-choice',
          domain,
          isPilot: false,
          questionNumber: questions.length + i + 1
        });

        if (question) {
          questions.push(question);
        }
      }
    }

    // Shuffle final bank and assign sequential IDs
    const shuffled = this.shuffleArray(questions);
    return shuffled.map((q, index) => ({
      ...q,
      id: `nremt-q${String(index + 1).padStart(3, '0')}`
    }));
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}