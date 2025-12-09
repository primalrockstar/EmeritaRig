// Computerized Adaptive Testing (CAT) Engine
// Mirrors official NREMT algorithm specifications

export class CATEngine {
  private questions: NREMTQuestion[];
  private answeredQuestions: NREMTQuestion[] = [];
  private responses: QuestionResponse[] = [];
  private currentAbility: number = 0; // θ (theta) - ability estimate
  private standardError: number = 1.0; // SE - measurement error
  private confidenceLevel: number = 0.95; // 95% confidence for NREMT
  private examStartTime: number;
  private currentQuestionIndex: number = 0;

  constructor(questions: NREMTQuestion[]) {
    this.questions = questions;
    this.examStartTime = Date.now();

    // Randomize question order but keep pilot items marked
    this.questions = this.shuffleArray([...questions]);
  }

  // Get next question based on current ability estimate
  getNextQuestion(): NREMTQuestion | null {
    if (this.shouldEndExam()) {
      return null;
    }

    // First 10 questions: Balanced sampling across difficulty and domains
    if (this.answeredQuestions.length < 10) {
      return this.selectBalancedQuestion();
    }

    // Adaptive phase: Select question that maximizes information at current ability
    return this.selectAdaptiveQuestion();
  }

  // Submit answer and update ability estimate
  submitAnswer(question: NREMTQuestion, response: any, timeSpent: number): QuestionResponse {
    const isCorrect = validateResponse(question, response);

    const questionResponse: QuestionResponse = {
      questionId: question.id,
      response,
      timeSpent,
      isCorrect
    };

    this.responses.push(questionResponse);
    this.answeredQuestions.push(question);

    // Update ability estimate using Item Response Theory
    if (!question.isPilot) {
      this.updateAbilityEstimate();
      this.updateStandardError();
    }

    return questionResponse;
  }

  // Check if exam should end (NREMT specifications: 70-120 questions, 2-hour limit)
  shouldEndExam(): boolean {
    const totalAnswered = this.answeredQuestions.length;
    const timeElapsed = Date.now() - this.examStartTime;
    const timeLimit = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    // Hard time limit
    if (timeElapsed >= timeLimit) {
      return true;
    }

    // Minimum questions
    if (totalAnswered < 70) {
      return false;
    }

    // Maximum questions
    if (totalAnswered >= 120) {
      return true;
    }

    // 95% confidence check (NREMT standard)
    const passingScore = 0.7; // Approximately 70%
    const lowerBound = this.currentAbility - (1.96 * this.standardError);
    const upperBound = this.currentAbility + (1.96 * this.standardError);

    // If entire confidence interval is above passing, PASS
    if (lowerBound > passingScore) {
      return true;
    }

    // If entire confidence interval is below passing, FAIL
    if (upperBound < passingScore) {
      return true;
    }

    // Continue testing if confidence interval spans passing threshold
    return false;
  }

  // Calculate final score (0-100 scale)
  getFinalScore(): number {
    // Scale ability estimate to NREMT 0-100 scale
    // This is a simplified mapping - real NREMT uses proprietary scaling
    const scaledScore = 500 + (100 * this.currentAbility);
    return Math.min(Math.max(scaledScore, 0), 100);
  }

  // Get pass/fail decision
  getPassFailDecision(): 'PASS' | 'FAIL' | 'CONTINUE' {
    if (!this.shouldEndExam()) return 'CONTINUE';

    const score = this.getFinalScore();
    return score >= 70 ? 'PASS' : 'FAIL';
  }

  // Get domain-specific performance
  getDomainPerformance(): Record<string, { correct: number; total: number; percentage: number }> {
    const domainStats: Record<string, { correct: number; total: number }> = {};

    // Only count scored (non-pilot) questions
    const scoredResponses = this.responses.filter((_, index) =>
      !this.answeredQuestions[index].isPilot
    );

    scoredResponses.forEach((response, index) => {
      const question = this.answeredQuestions[index];
      if (!domainStats[question.domain]) {
        domainStats[question.domain] = { correct: 0, total: 0 };
      }

      domainStats[question.domain].total++;
      if (response.isCorrect) {
        domainStats[question.domain].correct++;
      }
    });

    // Calculate percentages
    const performance: Record<string, { correct: number; total: number; percentage: number }> = {};
    for (const [domain, stats] of Object.entries(domainStats)) {
      performance[domain] = {
        ...stats,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
      };
    }

    return performance;
  }

  // Get exam statistics
  getExamStats(): {
    totalQuestions: number;
    pilotQuestions: number;
    scoredQuestions: number;
    timeElapsed: number;
    averageTimePerQuestion: number;
    currentAbility: number;
    standardError: number;
  } {
    const totalQuestions = this.answeredQuestions.length;
    const pilotQuestions = this.answeredQuestions.filter(q => q.isPilot).length;
    const scoredQuestions = totalQuestions - pilotQuestions;
    const timeElapsed = Date.now() - this.examStartTime;
    const totalResponseTime = this.responses.reduce((sum, r) => sum + r.timeSpent, 0);
    const averageTimePerQuestion = totalQuestions > 0 ? totalResponseTime / totalQuestions : 0;

    return {
      totalQuestions,
      pilotQuestions,
      scoredQuestions,
      timeElapsed,
      averageTimePerQuestion,
      currentAbility: this.currentAbility,
      standardError: this.standardError
    };
  }

  // Private methods

  private selectBalancedQuestion(): NREMTQuestion {
    // For first 10 questions, balance across domains and difficulties
    const remainingQuestions = this.questions.filter(q =>
      !this.answeredQuestions.some(aq => aq.id === q.id)
    );

    // Prefer questions from underrepresented domains
    const answeredDomains = this.answeredQuestions.map(q => q.domain);
    const domainCounts: Record<string, number> = {};
    answeredDomains.forEach(domain => {
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });

    // Find domain with least questions answered
    let targetDomain = 'Primary Assessment'; // Default to most common domain
    let minCount = Infinity;

    for (const domain of Object.keys(NREMT_CONTENT_DISTRIBUTION)) {
      const count = domainCounts[domain] || 0;
      if (count < minCount) {
        minCount = count;
        targetDomain = domain;
      }
    }

    // Filter by target domain
    const domainQuestions = remainingQuestions.filter(q => q.domain === targetDomain);

    if (domainQuestions.length > 0) {
      return domainQuestions[Math.floor(Math.random() * domainQuestions.length)];
    }

    // Fallback to any remaining question
    return remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
  }

  private selectAdaptiveQuestion(): NREMTQuestion {
    const remainingQuestions = this.questions.filter(q =>
      !this.answeredQuestions.some(aq => aq.id === q.id)
    );

    // Find question that provides most information at current ability level
    let bestQuestion = remainingQuestions[0];
    let maxInformation = -Infinity;

    for (const question of remainingQuestions) {
      const information = this.calculateInformation(question, this.currentAbility);
      if (information > maxInformation) {
        maxInformation = information;
        bestQuestion = question;
      }
    }

    return bestQuestion;
  }

  private calculateInformation(question: NREMTQuestion, ability: number): number {
    // Item Information Function (IIF) for 3-parameter IRT model
    // Simplified version - real NREMT uses proprietary parameters

    const difficulty = question.difficulty;
    const discrimination = this.getDiscrimination(question.type);
    const guessing = this.getGuessingParameter(question.type);

    // 3PL IRT model: P(θ) = c + (1-c)/(1 + exp(-a(θ - b)))
    const z = discrimination * (ability - difficulty);
    const probability = guessing + (1 - guessing) / (1 + Math.exp(-z));

    // Information = a² * P * (1-P) / [(1-c)² * (1 + exp(-a(θ - b)))²]
    const numerator = Math.pow(discrimination, 2) * probability * (1 - probability);
    const denominator = Math.pow(1 - guessing, 2) * Math.pow(1 + Math.exp(-z), 2);
    const information = numerator / denominator;

    return information;
  }

  private getDiscrimination(questionType: QuestionType): number {
    // Discrimination parameters by question type (approximated)
    const discriminationMap: Record<QuestionType, number> = {
      'multiple-choice': 1.0,
      'multiple-response': 1.2,
      'options-table': 1.4,
      'build-list': 1.3,
      'drag-and-drop': 1.4
    };

    return discriminationMap[questionType];
  }

  private getGuessingParameter(questionType: QuestionType): number {
    // Guessing parameters (pseudo-guessing for 4-option multiple choice)
    const guessingMap: Record<QuestionType, number> = {
      'multiple-choice': 0.25, // 1/4 chance
      'multiple-response': 0.1, // Lower for multiple selections
      'options-table': 0.0, // No guessing for categorization
      'build-list': 0.0, // No guessing for sequencing
      'drag-and-drop': 0.0 // No guessing for categorization
    };

    return guessingMap[questionType];
  }

  private updateAbilityEstimate(): void {
    // Maximum Likelihood Estimation (MLE) for ability
    // Simplified implementation - real NREMT uses more sophisticated methods

    const scoredResponses = this.responses.filter((_, index) =>
      !this.answeredQuestions[index].isPilot
    );

    if (scoredResponses.length === 0) return;

    // Simple proportion correct method with difficulty weighting
    let weightedScore = 0;
    let totalWeight = 0;

    scoredResponses.forEach((response, index) => {
      const question = this.answeredQuestions[index];
      const weight = Math.pow(2, question.difficulty); // Higher weight for harder questions
      const score = response.isCorrect ? 1 : 0;

      weightedScore += score * weight;
      totalWeight += weight;
    });

    // Convert to ability scale (-3 to +3, approximately)
    const proportionCorrect = weightedScore / totalWeight;
    this.currentAbility = (proportionCorrect - 0.5) * 3; // Scale to -1.5 to +1.5 range
  }

  private updateStandardError(): void {
    // Standard error decreases as we get more information
    const scoredQuestions = this.answeredQuestions.filter(q => !q.isPilot).length;

    // Simplified formula: SE = 1/sqrt(N)
    this.standardError = 1.0 / Math.sqrt(Math.max(scoredQuestions, 1));
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

// Import required types
import { NREMTQuestion, QuestionResponse, validateResponse, QuestionType } from './questionTypes';
import { NREMT_CONTENT_DISTRIBUTION } from './chapterMapping';