// NREMT Question Generator
// Transforms existing quiz content into all 5 NREMT question types

import { NREMTQuestion, QuestionType, getQuestionTypeCount } from './questionTypes';
import { getChaptersForDomain, getDomainQuestionCount } from './chapterMapping';

export class NREMTQuestionGenerator {
  private existingQuizzes: any[]; // Your 14 modules of existing questions
  private generatedQuestions: NREMTQuestion[] = [];

  constructor(existingQuizzes: any[]) {
    this.existingQuizzes = existingQuizzes;
  }

  // Generate complete question bank (130 questions: 120 scored + 10 pilot)
  generateQuestionBank(): NREMTQuestion[] {
    const questions: NREMTQuestion[] = [];

    // Get target counts per domain
    const domainCounts = getDomainQuestionCount(120); // 120 scored questions
    let pilotCount = 10; // 10 unscored pilot questions

    // Generate questions for each domain
    for (const [domain, targetCount] of Object.entries(domainCounts)) {
      const domainQuestions = this.generateQuestionsForDomain(domain, targetCount);
      questions.push(...domainQuestions);
    }

    // Add pilot questions (distributed across domains)
    for (const domain of Object.keys(domainCounts)) {
      if (pilotCount <= 0) break;

      const pilotQuestions = this.generatePilotQuestions(domain, Math.min(2, pilotCount));
      questions.push(...pilotQuestions);
      pilotCount -= pilotQuestions.length;
    }

    // Shuffle and assign IDs
    this.generatedQuestions = this.shuffleArray(questions).map((q, index) => ({
      ...q,
      id: `nremt-q${String(index + 1).padStart(3, '0')}`
    }));

    return this.generatedQuestions;
  }

  private generateQuestionsForDomain(domain: string, targetCount: number): NREMTQuestion[] {
    const questions: NREMTQuestion[] = [];
    const eligibleChapters = getChaptersForDomain(domain);
    const sourceQuestions = this.getQuestionsFromChapters(eligibleChapters);

    // Get question type distribution
    const typeCounts = getQuestionTypeCount(targetCount);

    // Generate questions by type
    for (const [type, count] of Object.entries(typeCounts)) {
      for (let i = 0; i < count; i++) {
        const question = this.generateQuestionByType(
          type as QuestionType,
          domain,
          sourceQuestions,
          eligibleChapters
        );
        if (question) {
          questions.push(question);
        }
      }
    }

    return questions;
  }

  private generatePilotQuestions(domain: string, count: number): NREMTQuestion[] {
    const questions: NREMTQuestion[] = [];
    const eligibleChapters = getChaptersForDomain(domain);
    const sourceQuestions = this.getQuestionsFromChapters(eligibleChapters);

    for (let i = 0; i < count; i++) {
      const type = this.selectQuestionType();
      const question = this.generateQuestionByType(
        type,
        domain,
        sourceQuestions,
        eligibleChapters,
        true // isPilot
      );
      if (question) {
        questions.push(question);
      }
    }

    return questions;
  }

  private generateQuestionByType(
    type: QuestionType,
    domain: string,
    sourceQuestions: any[],
    eligibleChapters: number[],
    isPilot: boolean = false
  ): NREMTQuestion | null {
    const sourceQuestion = this.selectRandomQuestion(sourceQuestions);
    if (!sourceQuestion) return null;

    const chapter = this.selectRandomChapter(eligibleChapters);
    const difficulty = this.calculateDifficulty(sourceQuestion, domain);

    const baseQuestion = {
      type,
      domain,
      difficulty,
      isPilot,
      sourceChapter: chapter,
      estimatedTime: this.getEstimatedTime(type),
      explanation: sourceQuestion.explanation
    };

    switch (type) {
      case 'multiple-choice':
        return this.generateMultipleChoice(sourceQuestion, baseQuestion);

      case 'multiple-response':
        return this.generateMultipleResponse(sourceQuestion, baseQuestion);

      case 'options-table':
        return this.generateOptionsTable(sourceQuestion, baseQuestion);

      case 'build-list':
        return this.generateBuildList(sourceQuestion, baseQuestion);

      case 'drag-and-drop':
        return this.generateDragAndDrop(sourceQuestion, baseQuestion);

      default:
        return null;
    }
  }

  private generateMultipleChoice(sourceQuestion: any, base: any): NREMTQuestion {
    // Use existing multiple choice question or adapt it
    const options = sourceQuestion.options || this.generateMultipleChoiceOptions(sourceQuestion, base.domain);

    return {
      ...base,
      type: 'multiple-choice',
      stem: sourceQuestion.question || this.generateStem(sourceQuestion, 'multiple-choice'),
      options: options.slice(0, 4), // Ensure exactly 4 options
      correctAnswer: sourceQuestion.correctAnswer || 0
    };
  }

  private generateMultipleResponse(sourceQuestion: any, base: any): NREMTQuestion {
    // Create question requiring selection of multiple correct answers
    const stem = this.adaptStemForMultipleResponse(sourceQuestion.question || sourceQuestion.stem);
    const options = this.generateMultipleResponseOptions(sourceQuestion, base.domain);
    const correctAnswers = this.selectCorrectAnswers(options, 2); // Select 2 or 3 correct

    return {
      ...base,
      type: 'multiple-response',
      stem,
      options: options.map(opt => opt.text),
      correctAnswers,
      instruction: correctAnswers.length === 2 ? 'Select TWO' : 'Select THREE',
      minimumSelections: correctAnswers.length
    };
  }

  private generateOptionsTable(sourceQuestion: any, base: any): NREMTQuestion {
    // Create categorization question
    const categories = this.getCategoriesForDomain(base.domain);
    const items = this.generateCategorizableItems(sourceQuestion, categories.length);

    const correctCategorization: Record<string, string> = {};
    items.forEach((item, index) => {
      correctCategorization[item] = categories[index % categories.length];
    });

    return {
      ...base,
      type: 'options-table',
      stem: `Classify the following items related to ${base.domain.toLowerCase()}:`,
      instruction: 'Drag each item to the correct category',
      categories,
      items,
      correctCategorization
    };
  }

  private generateBuildList(sourceQuestion: any, base: any): NREMTQuestion {
    // Create sequencing question
    const steps = this.generateSequencingSteps(sourceQuestion, base.domain);
    const correctOrder = steps.map((_, index) => index); // Assume original order is correct

    return {
      ...base,
      type: 'build-list',
      stem: `Arrange the following steps in the correct order for ${this.getTaskDescription(base.domain)}:`,
      instruction: 'Place in the correct order',
      items: steps,
      correctOrder
    };
  }

  private generateDragAndDrop(sourceQuestion: any, base: any): NREMTQuestion {
    // Create categorization question with columns
    const columns = this.getColumnsForDomain(base.domain);
    const items = this.generateDraggableItems(sourceQuestion, columns.length);

    const correctPlacement: Record<string, string> = {};
    items.forEach((item, index) => {
      correctPlacement[item] = columns[index % columns.length];
    });

    return {
      ...base,
      type: 'drag-and-drop',
      stem: `Categorize the following items for ${base.domain.toLowerCase()}:`,
      instruction: 'Drag each item to the correct category',
      columns,
      items,
      correctPlacement
    };
  }

  // Helper methods

  private selectRandomQuestion(questions: any[]): any {
    return questions[Math.floor(Math.random() * questions.length)];
  }

  private selectRandomChapter(chapters: number[]): number {
    return chapters[Math.floor(Math.random() * chapters.length)];
  }

  private selectQuestionType(): QuestionType {
    const types: QuestionType[] = ['multiple-choice', 'multiple-response', 'options-table', 'build-list', 'drag-and-drop'];
    const weights = [0.6, 0.2, 0.1, 0.05, 0.05]; // Match distribution

    const random = Math.random();
    let cumulative = 0;

    for (let i = 0; i < types.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return types[i];
      }
    }

    return 'multiple-choice'; // Default
  }

  private calculateDifficulty(question: any, domain: string): number {
    // Base difficulty on existing question data
    let difficulty = 2; // Default medium

    if (question.difficulty === 'easy') difficulty = 1;
    if (question.difficulty === 'hard') difficulty = 3;

    // Adjust based on domain complexity
    const domainMultipliers: Record<string, number> = {
      'Scene Size-up and Safety': 1.0,
      'Primary Assessment': 1.1,
      'Secondary Assessment': 1.2,
      'Patient Treatment and Transport': 1.0,
      'Operations': 0.9
    };

    return Math.min(3, Math.max(1, difficulty * (domainMultipliers[domain] || 1.0)));
  }

  private getEstimatedTime(type: QuestionType): number {
    const timeMap: Record<QuestionType, number> = {
      'multiple-choice': 60,    // 1 minute
      'multiple-response': 90,  // 1.5 minutes
      'options-table': 120,     // 2 minutes
      'build-list': 120,        // 2 minutes
      'drag-and-drop': 120      // 2 minutes
    };

    return timeMap[type];
  }

  private getQuestionsFromChapters(chapters: number[]): any[] {
    // Filter existing questions by eligible chapters
    return this.existingQuizzes.flatMap(module =>
      module.questions?.filter((q: any) =>
        chapters.includes(q.chapter || q.module)
      ) || []
    );
  }

  // Content generation helpers

  private generateMultipleChoiceOptions(question: any, domain: string): string[] {
    const correctOption = question.correctAnswer === 0 ? question.options[0] :
                         question.correctAnswer === 1 ? question.options[1] :
                         question.correctAnswer === 2 ? question.options[2] :
                         question.options[3];

    const distractors = this.generateDistractors(correctOption, domain);
    return this.shuffleArray([correctOption, ...distractors]);
  }

  private generateMultipleResponseOptions(question: any, domain: string): Array<{text: string, correct: boolean}> {
    // Generate 5-6 options with 2-3 correct
    const options = [
      { text: this.generateCorrectOption(question, domain), correct: true },
      { text: this.generateCorrectOption(question, domain), correct: true },
      { text: this.generateCorrectOption(question, domain), correct: true }, // Sometimes 3 correct
      { text: this.generateDistractor(domain), correct: false },
      { text: this.generateDistractor(domain), correct: false },
      { text: this.generateDistractor(domain), correct: false }
    ];

    return this.shuffleArray(options).slice(0, 5 + Math.floor(Math.random() * 2)); // 5 or 6 options
  }

  private generateDistractors(correctAnswer: string, domain: string): string[] {
    const distractors: Record<string, string[]> = {
      'Scene Size-up and Safety': [
        'Begin treatment immediately',
        'Call for additional resources',
        'Document the scene first',
        'Ask bystanders for information'
      ],
      'Primary Assessment': [
        'Check blood glucose first',
        'Assess mental status only',
        'Take vital signs immediately',
        'Begin CPR without assessment'
      ],
      'Secondary Assessment': [
        'Transport immediately',
        'Give pain medication',
        'Check ABCs again',
        'Call medical control'
      ],
      'Patient Treatment and Transport': [
        'Wait for ALS arrival',
        'Choose the longest route',
        'Transport without lights/siren',
        'Give verbal report only'
      ],
      'Operations': [
        'Ignore protocols',
        'Work independently always',
        'Document later',
        'Use personal vehicle'
      ]
    };

    return distractors[domain] || [
      'Do nothing',
      'Call for help',
      'Wait and see',
      'Ask someone else'
    ];
  }

  private generateCorrectOption(question: any, domain: string): string {
    // Generate plausible correct options based on domain
    const correctOptions: Record<string, string[]> = {
      'Scene Size-up and Safety': [
        'Ensure scene safety before approaching',
        'Use appropriate PPE',
        'Assess mechanism of injury',
        'Call for additional resources if needed'
      ],
      'Primary Assessment': [
        'Check ABCs systematically',
        'Assess level of consciousness',
        'Ensure adequate oxygenation',
        'Identify life-threatening conditions'
      ],
      'Secondary Assessment': [
        'Obtain complete patient history',
        'Perform thorough physical exam',
        'Assess pain characteristics',
        'Check neurovascular status'
      ],
      'Patient Treatment and Transport': [
        'Provide appropriate interventions',
        'Monitor patient en route',
        'Choose appropriate destination',
        'Transfer care properly'
      ],
      'Operations': [
        'Follow established protocols',
        'Document all actions',
        'Communicate effectively',
        'Maintain professional standards'
      ]
    };

    const options = correctOptions[domain] || ['Follow standard procedures'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateDistractor(domain: string): string {
    const distractors = this.generateDistractors('', domain);
    return distractors[Math.floor(Math.random() * distractors.length)];
  }

  private generateCategorizableItems(question: any, categoryCount: number): string[] {
    // Generate items that can be categorized
    const items = [
      'Patient assessment',
      'Vital signs',
      'Medical history',
      'Physical exam',
      'Treatment plan',
      'Transport decision',
      'Documentation',
      'Communication'
    ];

    return this.shuffleArray(items).slice(0, categoryCount * 2);
  }

  private generateSequencingSteps(question: any, domain: string): string[] {
    const sequences: Record<string, string[]> = {
      'Scene Size-up and Safety': [
        'Ensure personal safety',
        'Assess scene hazards',
        'Don appropriate PPE',
        'Determine number of patients',
        'Request additional resources'
      ],
      'Primary Assessment': [
        'Check responsiveness',
        'Open airway',
        'Check breathing',
        'Check circulation',
        'Identify priority patients'
      ],
      'Secondary Assessment': [
        'Obtain patient history',
        'Perform physical exam',
        'Assess vital signs',
        'Determine treatment needs',
        'Prepare for transport'
      ],
      'Patient Treatment and Transport': [
        'Apply interventions',
        'Monitor patient condition',
        'Prepare for transport',
        'Transfer patient safely',
        'Provide handoff report'
      ],
      'Operations': [
        'Follow protocols',
        'Document actions',
        'Communicate with team',
        'Maintain equipment',
        'Ensure quality care'
      ]
    };

    return sequences[domain] || [
      'Assess situation',
      'Plan response',
      'Implement actions',
      'Evaluate results',
      'Document care'
    ];
  }

  private generateDraggableItems(question: any, columnCount: number): string[] {
    return this.generateCategorizableItems(question, columnCount);
  }

  private getCategoriesForDomain(domain: string): string[] {
    const categoryMap: Record<string, string[]> = {
      'Scene Size-up and Safety': ['Immediate Actions', 'Assessment Steps'],
      'Primary Assessment': ['Airway', 'Breathing', 'Circulation'],
      'Secondary Assessment': ['History', 'Exam', 'Diagnostics'],
      'Patient Treatment and Transport': ['Interventions', 'Monitoring'],
      'Operations': ['Protocols', 'Documentation']
    };

    return categoryMap[domain] || ['Category A', 'Category B'];
  }

  private getColumnsForDomain(domain: string): string[] {
    return this.getCategoriesForDomain(domain);
  }

  private getTaskDescription(domain: string): string {
    const descriptions: Record<string, string> = {
      'Scene Size-up and Safety': 'scene safety assessment',
      'Primary Assessment': 'primary patient assessment',
      'Secondary Assessment': 'secondary patient assessment',
      'Patient Treatment and Transport': 'patient treatment and transport',
      'Operations': 'EMS operations'
    };

    return descriptions[domain] || 'patient care';
  }

  private adaptStemForMultipleResponse(stem: string): string {
    // Adapt single-answer stems for multiple-response format
    return stem.replace('What is', 'Which of the following are')
               .replace('Which is', 'Which of the following are')
               .replace('What should', 'Which of the following should');
  }

  private selectCorrectAnswers(options: Array<{text: string, correct: boolean}>, targetCount: number): number[] {
    const correctIndices = options
      .map((opt, index) => opt.correct ? index : -1)
      .filter(index => index !== -1);

    // Return random subset of correct answers
    const shuffledCorrect = this.shuffleArray(correctIndices);
    return shuffledCorrect.slice(0, Math.min(targetCount, shuffledCorrect.length));
  }

  private generateStem(question: any, type: QuestionType): string {
    const templates: Record<QuestionType, string[]> = {
      'multiple-choice': [
        'What is the most appropriate action for this patient?',
        'Which of the following should be done first?',
        'What assessment finding indicates immediate intervention?'
      ],
      'multiple-response': [
        'Which of the following actions should be taken?',
        'Which assessment findings require immediate attention?',
        'Which treatment options are appropriate?'
      ],
      'options-table': [
        'Categorize the following assessment steps:',
        'Classify these treatment priorities:',
        'Organize these response elements:'
      ],
      'build-list': [
        'Place these steps in the correct order:',
        'Arrange these actions by priority:',
        'Sequence these assessment elements:'
      ],
      'drag-and-drop': [
        'Match these items to the correct categories:',
        'Assign these priorities to the appropriate levels:',
        'Sort these interventions by urgency:'
      ]
    };

    const templateList = templates[type] || templates['multiple-choice'];
    return templateList[Math.floor(Math.random() * templateList.length)];
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