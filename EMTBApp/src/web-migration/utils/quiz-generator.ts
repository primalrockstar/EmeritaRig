// Automated Quiz Question Generator for EMT-B Complete System
// This script generates 15 questions per chapter for all 41 chapters (615 total)
// Based on study notes content and National EMS Education Standards

import { QuizQuestion } from '../data/practice-quizzes-complete-structure';

// Question templates based on study note sections
const questionTemplates = {
  knowledge: {
    definition: "What is {term}?",
    purpose: "What is the primary purpose of {concept}?",
    classification: "Which of the following is a type of {category}?",
    identification: "Which {item} is used for {purpose}?",
    comparison: "What is the difference between {item1} and {item2}?"
  },
  application: {
    scenario: "A patient presents with {symptoms}. What should you do?",
    procedure: "When {situation}, what is the appropriate action?",
    assessment: "You notice {finding}. What does this indicate?",
    treatment: "For a patient with {condition}, what treatment is indicated?",
    priority: "In {scenario}, what is your immediate priority?"
  },
  analysis: {
    critical: "A patient has {multiple_symptoms}. What is the most likely cause?",
    prioritization: "You have {multiple_patients}. Who should receive treatment first?",
    complication: "What is the most serious complication of {condition}?",
    decision: "Given {complex_scenario}, what is your best course of action?",
    evaluation: "After treating {condition}, how do you evaluate effectiveness?"
  }
};

// Generate questions for each chapter based on study notes structure
export class QuizGenerator {
  private chapterData: any;
  private chapterNumber: number;
  private moduleNumber: number;

  constructor(chapterData: any, chapterNumber: number, moduleNumber: number) {
    this.chapterData = chapterData;
    this.chapterNumber = chapterNumber;
    this.moduleNumber = moduleNumber;
  }

  generateChapterQuestions(): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    
    // Generate 5 knowledge questions (easy/medium)
    questions.push(...this.generateKnowledgeQuestions(5));
    
    // Generate 7 application questions (medium)
    questions.push(...this.generateApplicationQuestions(7));
    
    // Generate 3 analysis questions (hard)
    questions.push(...this.generateAnalysisQuestions(3));
    
    return questions;
  }

  private generateKnowledgeQuestions(count: number): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const keyTerms = this.chapterData.keyTerms || {};
    const objectives = this.chapterData.objectives || [];
    
    let questionId = 1;
    
    // Generate from key terms
    const termEntries = Object.entries(keyTerms);
    for (let i = 0; i < Math.min(count - 2, termEntries.length) && questions.length < count; i++) {
      const [term, definition] = termEntries[i];
      questions.push(this.createDefinitionQuestion(term as string, definition as string, questionId++));
    }
    
    // Generate from objectives
    while (questions.length < count && questionId <= count) {
      questions.push(this.createObjectiveQuestion(objectives, questionId++));
    }
    
    return questions;
  }

  private generateApplicationQuestions(count: number): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const sections = this.chapterData.sections || [];
    const clinicalPearls = this.chapterData.clinicalPearls || [];
    
    let questionId = 6; // Continue from knowledge questions
    
    // Generate scenario-based questions from sections
    for (const section of sections) {
      if (questions.length >= count) break;
      
      for (const content of section.content || []) {
        if (questions.length >= count) break;
        
        const points = content.points || [];
        for (const point of points) {
          if (questions.length >= count) break;
          
          questions.push(this.createScenarioQuestion(point, section.title, questionId++));
        }
      }
    }
    
    return questions.slice(0, count);
  }

  private generateAnalysisQuestions(count: number): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const sections = this.chapterData.sections || [];
    const rememberThis = this.chapterData.rememberThis || [];
    
    let questionId = 13; // Continue from application questions
    
    // Generate complex decision-making questions
    for (let i = 0; i < count && i < sections.length; i++) {
      const section = sections[i];
      questions.push(this.createComplexQuestion(section, questionId++));
    }
    
    return questions;
  }

  private createDefinitionQuestion(term: string, definition: string, questionId: number): QuizQuestion {
    const distractors = this.generateDistractors(term, definition);
    
    return {
      id: `ch${this.chapterNumber}-q${String(questionId).padStart(3, '0')}`,
      module: this.moduleNumber,
      chapter: this.chapterNumber,
      question: `What is ${term}?`,
      options: [distractors[0], definition, distractors[1], distractors[2]],
      correctAnswer: 1,
      explanation: `${term} is defined as: ${definition}`,
      category: 'knowledge',
      difficulty: 'easy',
      tags: [term.toLowerCase(), 'definition', 'terminology'],
      nremtDomain: this.getDomainFromModule(this.moduleNumber),
      points: 1
    };
  }

  private createObjectiveQuestion(objectives: string[], questionId: number): QuizQuestion {
    const objective = objectives[Math.floor(Math.random() * objectives.length)] || "Understand basic concepts";
    const concept = this.extractConceptFromObjective(objective);
    
    return {
      id: `ch${this.chapterNumber}-q${String(questionId).padStart(3, '0')}`,
      module: this.moduleNumber,
      chapter: this.chapterNumber,
      question: `What is the primary focus of ${concept}?`,
      options: [
        "Administrative procedures only",
        objective.replace("Understand", "Understanding").replace("Apply", "Applying"),
        "Equipment maintenance only", 
        "Documentation requirements only"
      ],
      correctAnswer: 1,
      explanation: `The primary focus is ${objective.toLowerCase()}.`,
      category: 'knowledge',
      difficulty: 'medium',
      tags: [concept, 'objectives', 'learning'],
      nremtDomain: this.getDomainFromModule(this.moduleNumber),
      points: 2
    };
  }

  private createScenarioQuestion(point: string, sectionTitle: string, questionId: number): QuizQuestion {
    const scenario = this.createScenarioFromPoint(point);
    const correctAction = this.extractActionFromPoint(point);
    const distractors = this.generateActionDistractors(correctAction);
    
    return {
      id: `ch${this.chapterNumber}-q${String(questionId).padStart(3, '0')}`,
      module: this.moduleNumber,
      chapter: this.chapterNumber,
      question: scenario,
      options: [distractors[0], correctAction, distractors[1], distractors[2]],
      correctAnswer: 1,
      explanation: `${correctAction} is correct because ${point}`,
      category: 'application',
      difficulty: 'medium',
      tags: [sectionTitle.toLowerCase(), 'scenario', 'application'],
      nremtDomain: this.getDomainFromModule(this.moduleNumber),
      points: 2
    };
  }

  private createComplexQuestion(section: any, questionId: number): QuizQuestion {
    const complexity = this.createComplexScenario(section);
    
    return {
      id: `ch${this.chapterNumber}-q${String(questionId).padStart(3, '0')}`,
      module: this.moduleNumber,
      chapter: this.chapterNumber,
      question: complexity.question,
      options: complexity.options,
      correctAnswer: complexity.correctAnswer,
      explanation: complexity.explanation,
      category: 'analysis',
      difficulty: 'hard',
      tags: [section.title?.toLowerCase() || 'complex', 'analysis', 'critical thinking'],
      nremtDomain: this.getDomainFromModule(this.moduleNumber),
      points: 3
    };
  }

  private generateDistractors(term: string, definition: string): string[] {
    // Generate plausible but incorrect definitions
    return [
      "A procedure used only in hospital settings",
      "Equipment used for patient transport",
      "A documentation requirement for EMS"
    ];
  }

  private extractConceptFromObjective(objective: string): string {
    // Extract key concept from learning objective
    const matches = objective.match(/(?:Understand|Apply|Recognize|Develop)\s+(.+?)(?:\s+and|\s+in|\s+for|$)/);
    return matches ? matches[1] : "the concept";
  }

  private createScenarioFromPoint(point: string): string {
    // Convert study point into a scenario question
    if (point.includes("patient") || point.includes("treatment")) {
      return `You encounter a situation involving ${point.toLowerCase()}. What is your appropriate response?`;
    }
    return `In a situation where ${point.toLowerCase()}, what should you do?`;
  }

  private extractActionFromPoint(point: string): string {
    // Extract appropriate action from study point
    if (point.includes("should") || point.includes("must")) {
      return point;
    }
    return `Follow the principle that ${point.toLowerCase()}`;
  }

  private generateActionDistractors(correctAction: string): string[] {
    return [
      "Ignore the situation and continue with routine care",
      "Contact medical direction before taking any action",
      "Transport immediately without further assessment"
    ];
  }

  private createComplexScenario(section: any): any {
    const title = section.title || "Clinical Situation";
    
    return {
      question: `In a complex emergency involving ${title.toLowerCase()}, multiple factors must be considered. What is the most critical priority?`,
      options: [
        "Complete all paperwork before proceeding",
        `Apply evidence-based practices related to ${title.toLowerCase()}`,
        "Wait for additional resources before acting",
        "Focus only on the most obvious symptom"
      ],
      correctAnswer: 1,
      explanation: `In complex emergencies involving ${title.toLowerCase()}, evidence-based practices and systematic approaches are most critical for optimal patient outcomes.`
    };
  }

  private getDomainFromModule(moduleNumber: number): string {
    const domains = {
      1: "Preparatory",
      2: "Anatomy and Physiology", 
      3: "Patient Assessment",
      4: "Airway, Respiration, and Ventilation",
      5: "Pharmacology",
      6: "Shock and Resuscitation",
      7: "Medical Emergencies",
      8: "Medical Emergencies",
      9: "Medical Emergencies", 
      10: "Trauma",
      11: "Trauma",
      12: "Trauma",
      13: "Special Patient Populations",
      14: "EMS Operations"
    };
    return domains[moduleNumber as keyof typeof domains] || "General";
  }
}

// Export generation system
export const generateAllQuestions = (studyNotesData: any): QuizQuestion[] => {
  const allQuestions: QuizQuestion[] = [];
  
  // Generate for all 41 chapters
  for (let chapter = 1; chapter <= 41; chapter++) {
    const moduleNumber = getModuleFromChapter(chapter);
    const chapterData = studyNotesData[`chapter${chapter}`] || {};
    
    const generator = new QuizGenerator(chapterData, chapter, moduleNumber);
    const chapterQuestions = generator.generateChapterQuestions();
    
    allQuestions.push(...chapterQuestions);
  }
  
  return allQuestions;
};

function getModuleFromChapter(chapter: number): number {
  if (chapter <= 4) return 1;
  if (chapter <= 9) return 2;
  if (chapter === 10) return 3;
  if (chapter === 11) return 4;
  if (chapter === 12) return 5;
  if (chapter <= 14) return 6;
  if (chapter <= 17) return 7;
  if (chapter <= 20) return 8;
  if (chapter <= 24) return 9;
  if (chapter <= 27) return 10;
  if (chapter <= 30) return 11;
  if (chapter <= 33) return 12;
  if (chapter <= 37) return 13;
  return 14;
}

export default QuizGenerator;
