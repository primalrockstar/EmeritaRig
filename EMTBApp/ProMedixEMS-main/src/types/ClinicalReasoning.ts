/**
 * ProMedix EMS - Clinical Reasoning Type Definitions
 * UWorld-style case-based learning system
 * HIPAA-compliant educational data structures
 */

export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced';
export type BodySystem = 'cardiac' | 'respiratory' | 'trauma' | 'neurological' | 'medical' | 'behavioral' | 'pediatric' | 'obstetric';
export type CaseStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

/**
 * Main unfolding case structure
 * Represents a progressive clinical scenario with multiple decision points
 */
export interface UnfoldingCase {
  id: string;
  title: string; // "Cardiac Arrest with ROSC Management"
  initialPresentation: string; // "56yo male, chest pain radiating to left arm"
  stages: CaseStage[];
  learningObjectives: string[];
  difficulty: DifficultyLevel;
  bodySystem: BodySystem;
  estimatedTime: number; // minutes
  nremtRelevance: string[]; // NREMT blueprint categories
  protocolReferences: string[]; // e.g., "AHA 2020 Guidelines"
  created: string; // ISO date
  lastUpdated: string; // ISO date
}

/**
 * Individual stage within an unfolding case
 * Each stage presents new information and requires a decision
 */
export interface CaseStage {
  stageNumber: number;
  stageTitle: string; // "Initial Assessment" | "Vitals Obtained" | "Treatment Response"
  newInformation: string; // "Vitals: BP 90/60, HR 120 irregular, SpO2 88% on RA"
  visualCues?: VisualCue[]; // Optional images/diagrams
  question: string; // "What is your PRIMARY concern for this patient?"
  questionType: 'single_choice' | 'multiple_choice' | 'differential_diagnosis' | 'intervention_order';
  options: CaseOption[];
  correctAnswerId: string | string[]; // Single ID or array for multiple correct
  explanation: string; // Detailed clinical reasoning
  hints: Hint[]; // Progressive clues
  timeLimit?: number; // seconds (optional)
  criticalDecision: boolean; // Flags high-stakes decisions
  pointValue: number; // Scoring weight
}

/**
 * Visual elements for enhanced learning
 */
export interface VisualCue {
  type: 'ecg' | 'xray' | 'photo' | 'diagram' | 'chart';
  url: string;
  description: string;
  relevantFindings: string[];
}

/**
 * Answer option with clinical reasoning tracking
 */
export interface CaseOption {
  id: string;
  text: string;
  reasoningRequired: boolean; // Forces user to explain their choice
  consequences?: string; // "Patient's condition deteriorates..."
  isDistractor: boolean; // Marks red herring options
  commonError?: string; // Why students often choose this incorrectly
  differentialConsideration?: string; // "While possible, less likely because..."
}

/**
 * Progressive hint system
 */
export interface Hint {
  level: number; // 1 = subtle, 2 = moderate, 3 = direct
  text: string;
  deductionPoints: number; // Points lost for using hint
  unlockAfterSeconds?: number; // Time-gated hints
}

/**
 * User's response to a case stage
 */
export interface UserCaseResponse {
  caseId: string;
  stageNumber: number;
  selectedOptionId: string | string[];
  userReasoning?: string; // Free-text explanation
  timeSpent: number; // seconds
  hintsUsed: number[];
  isCorrect: boolean;
  pointsEarned: number;
  timestamp: string; // ISO date
}

/**
 * Complete case attempt tracking
 */
export interface CaseAttempt {
  attemptId: string;
  caseId: string;
  userId: string;
  startedAt: string; // ISO date
  completedAt?: string; // ISO date
  status: CaseStatus;
  stages: UserCaseResponse[];
  totalPoints: number;
  maxPoints: number;
  performanceScore: number; // percentage
  clinicalReasoningScore: number; // separate from memorization
  knowledgeGaps: string[]; // Identified learning needs
  timeSpent: number; // total seconds
  hintsUsed: number;
}

/**
 * Feedback provided after each decision
 */
export interface ClinicalFeedback {
  isCorrect: boolean;
  selectedOptionId: string | string[];
  correctOptionId: string | string[];
  userReasoning?: string;
  feedbackType: 'correct_reasoning' | 'correct_poor_reasoning' | 'incorrect_close' | 'incorrect_far' | 'critical_error';
  
  // Socratic feedback components
  whyCorrect: string; // Detailed explanation of correct answer
  whyIncorrect?: string; // Why user's choice was wrong
  clinicalPearl: string; // Key teaching point
  differentialThinking: string; // "What else could this be?"
  protocolReference?: string; // Link to guidelines
  
  // Learning gap identification
  identifiedGaps: LearningGap[];
  recommendedReview: string[]; // Chapter/topic references
  
  // Performance tracking
  reasoningQuality: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  commonMistake: boolean; // Is this a frequent error?
}

/**
 * Learning gap identification
 */
export interface LearningGap {
  category: BodySystem;
  specificTopic: string; // "12-lead ECG interpretation"
  severity: 'critical' | 'moderate' | 'minor';
  recommendedAction: string; // "Review ACS recognition module"
  occurrenceCount: number; // How many times this gap appeared
}

/**
 * Performance analytics data structure
 */
export interface PerformanceAnalytics {
  userId: string;
  overallStats: {
    casesCompleted: number;
    casesInProgress: number;
    averageScore: number;
    averageClinicalReasoningScore: number;
    totalTimeSpent: number; // minutes
    lastUpdated: string; // ISO date
  };
  
  bodySystemPerformance: BodySystemPerformance[];
  difficultyProgression: DifficultyProgression;
  learningTrends: LearningTrend[];
  knowledgeGaps: LearningGap[];
  strengths: string[]; // Areas of mastery
  
  // Clinical reasoning patterns
  reasoningPatterns: {
    systematicAssessment: number; // percentage
    differentialThinking: number; // percentage
    protocolAdherence: number; // percentage
    criticalThinking: number; // percentage
  };
  
  // Time management
  responseTimeAnalysis: {
    averageTimePerQuestion: number; // seconds
    timeManagementScore: number; // percentage
    impulsiveResponses: number; // answered too quickly
    overthinkingInstances: number; // took too long
  };
  
  nremtReadiness: {
    estimatedPassProbability: number; // percentage
    strongAreas: string[];
    weakAreas: string[];
    recommendedFocus: string[];
  };
}

/**
 * Body system specific performance
 */
export interface BodySystemPerformance {
  system: BodySystem;
  casesAttempted: number;
  accuracy: number; // percentage
  clinicalReasoningScore: number; // percentage
  averageTimePerCase: number; // minutes
  masteryLevel: 'novice' | 'competent' | 'proficient' | 'expert';
  commonErrors: string[];
  lastPracticed: string; // ISO date
}

/**
 * Difficulty progression tracking
 */
export interface DifficultyProgression {
  basic: {
    completed: number;
    accuracy: number;
    unlocked: boolean;
  };
  intermediate: {
    completed: number;
    accuracy: number;
    unlocked: boolean;
  };
  advanced: {
    completed: number;
    accuracy: number;
    unlocked: boolean;
  };
}

/**
 * Learning trend over time
 */
export interface LearningTrend {
  date: string; // ISO date
  casesCompleted: number;
  averageScore: number;
  clinicalReasoningScore: number;
  timeSpent: number; // minutes
  knowledgeGapsResolved: number;
}

/**
 * Case recommendation algorithm input
 */
export interface CaseRecommendation {
  recommendedCaseId: string;
  reason: string; // "Addresses identified gap in cardiac assessment"
  priority: 'high' | 'medium' | 'low';
  estimatedBenefit: string; // "Will improve NREMT readiness by 5%"
}
