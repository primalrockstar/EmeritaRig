/**
 * EMT-B - Knowledge Gap Tracker
 * Analytics engine for identifying learning needs and tracking clinical reasoning patterns
 * Week 3-4 Deliverable: Performance analytics foundation
 */

import { storeEncryptedData, getEncryptedData } from './secureStorage';
import {
  BodySystem,
  LearningGap,
  PerformanceAnalytics,
  BodySystemPerformance,
  CaseAttempt,
  UserCaseResponse,
  DifficultyProgression,
  LearningTrend,
} from '../types/ClinicalReasoning';

const STORAGE_KEY = '@emtb_knowledge_gaps';
const ANALYTICS_KEY = '@emtb_performance_analytics';

/**
 * Knowledge Gap Tracker Class
 * Analyzes user performance to identify learning needs and track improvement
 */
export class KnowledgeGapTracker {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Analyze a completed case attempt to identify knowledge gaps
   */
  async analyzeCaseAttempt(attempt: CaseAttempt): Promise<LearningGap[]> {
    const gaps: LearningGap[] = [];

    // Analyze each stage response
    for (const response of attempt.stages) {
      if (!response.isCorrect) {
        // Identify the topic area where error occurred
        const gap = await this.identifyGapFromResponse(response, attempt.caseId);
        if (gap) {
          gaps.push(gap);
        }
      }
    }

    // Store identified gaps
    await this.storeKnowledgeGaps(gaps);

    return gaps;
  }

  /**
   * Identify specific learning gap from an incorrect response
   */
  private async identifyGapFromResponse(
    response: UserCaseResponse,
    caseId: string
  ): Promise<LearningGap | null> {
    // Map case ID to body system (in production, this would query case metadata)
    const bodySystem = this.extractBodySystemFromCaseId(caseId);
    
    // Analyze response time - too quick suggests guessing, too slow suggests uncertainty
    const isImpulsiveResponse = response.timeSpent < 10; // Less than 10 seconds
    const isOverthinking = response.timeSpent > 120; // More than 2 minutes

    // Check if this is a recurring mistake
    const existingGaps = await this.getStoredGaps();
    const existingGap = existingGaps.find(
      g => g.category === bodySystem && g.specificTopic === this.getTopicFromCaseId(caseId)
    );

    if (existingGap) {
      // Increment occurrence count
      existingGap.occurrenceCount++;
      existingGap.severity = this.calculateSeverity(existingGap.occurrenceCount);
      return existingGap;
    }

    // Create new gap
    return {
      category: bodySystem,
      specificTopic: this.getTopicFromCaseId(caseId),
      severity: 'minor',
      recommendedAction: this.getRecommendedAction(bodySystem, caseId),
      occurrenceCount: 1,
    };
  }

  /**
   * Calculate severity based on frequency of errors
   */
  private calculateSeverity(occurrenceCount: number): 'critical' | 'moderate' | 'minor' {
    if (occurrenceCount >= 5) return 'critical';
    if (occurrenceCount >= 3) return 'moderate';
    return 'minor';
  }

  /**
   * Extract body system from case ID
   */
  private extractBodySystemFromCaseId(caseId: string): BodySystem {
    if (caseId.includes('cardiac')) return 'cardiac';
    if (caseId.includes('respiratory')) return 'respiratory';
    if (caseId.includes('trauma')) return 'trauma';
    if (caseId.includes('neuro')) return 'neurological';
    if (caseId.includes('pediatric')) return 'pediatric';
    if (caseId.includes('behavioral')) return 'behavioral';
    if (caseId.includes('diabetic') || caseId.includes('medical')) return 'medical';
    return 'medical'; // default
  }

  /**
   * Get specific topic from case ID
   */
  private getTopicFromCaseId(caseId: string): string {
    // Map case IDs to specific topics
    const topicMap: Record<string, string> = {
      'case-001-cardiac-rosc': 'Post-ROSC management and STEMI recognition',
      'case-002-trauma-multi': 'Multi-system trauma assessment',
      'case-003-peds-respiratory': 'Pediatric respiratory emergencies',
      'case-004-diabetic-ams': 'Diabetic emergencies with altered mental status',
      'case-005-behavioral-medical': 'Behavioral emergencies with medical complications',
    };

    return topicMap[caseId] || 'General assessment';
  }

  /**
   * Get recommended action for gap remediation
   */
  private getRecommendedAction(system: BodySystem, caseId: string): string {
    const actionMap: Record<BodySystem, string> = {
      cardiac: 'Review cardiac emergencies module, practice 12-lead ECG interpretation',
      respiratory: 'Review respiratory assessment and intervention protocols',
      trauma: 'Review trauma assessment and management prioritization',
      neurological: 'Review neurological assessment and stroke protocols',
      medical: 'Review medical emergencies and differential diagnosis',
      behavioral: 'Review behavioral emergency management and de-escalation',
      pediatric: 'Review pediatric assessment and age-specific interventions',
      obstetric: 'Review obstetric emergencies and delivery procedures',
    };

    return actionMap[system];
  }

  /**
   * Store knowledge gaps to persistent storage
   */
  private async storeKnowledgeGaps(newGaps: LearningGap[]): Promise<void> {
    try {
      const existingGaps = await this.getStoredGaps();
      
      // Merge new gaps with existing ones
      const mergedGaps = this.mergeGaps(existingGaps, newGaps);
      
      await storeEncryptedData(
        `${STORAGE_KEY}_${this.userId}`,
        mergedGaps
      );
    } catch (error) {
      console.error('Error storing knowledge gaps:', error);
    }
  }

  /**
   * Retrieve stored knowledge gaps
   */
  private async getStoredGaps(): Promise<LearningGap[]> {
    try {
      const stored = await getEncryptedData<LearningGap[]>(`${STORAGE_KEY}_${this.userId}`);
      return stored || [];
    } catch (error) {
      console.error('Error retrieving knowledge gaps:', error);
      return [];
    }
  }

  /**
   * Merge new gaps with existing gaps, updating occurrence counts
   */
  private mergeGaps(existing: LearningGap[], newGaps: LearningGap[]): LearningGap[] {
    const merged = [...existing];

    for (const newGap of newGaps) {
      const existingIndex = merged.findIndex(
        g => g.category === newGap.category && g.specificTopic === newGap.specificTopic
      );

      if (existingIndex >= 0) {
        // Update existing gap
        merged[existingIndex].occurrenceCount += newGap.occurrenceCount;
        merged[existingIndex].severity = this.calculateSeverity(merged[existingIndex].occurrenceCount);
      } else {
        // Add new gap
        merged.push(newGap);
      }
    }

    return merged;
  }

  /**
   * Get all knowledge gaps for user
   */
  async getKnowledgeGaps(): Promise<LearningGap[]> {
    return this.getStoredGaps();
  }

  /**
   * Mark a knowledge gap as resolved
   */
  async resolveGap(category: BodySystem, specificTopic: string): Promise<void> {
    try {
      const gaps = await this.getStoredGaps();
      const filtered = gaps.filter(
        g => !(g.category === category && g.specificTopic === specificTopic)
      );
      
      await storeEncryptedData(
        `${STORAGE_KEY}_${this.userId}`,
        filtered
      );
    } catch (error) {
      console.error('Error resolving gap:', error);
    }
  }

  /**
   * Generate comprehensive performance analytics
   */
  async generatePerformanceAnalytics(
    allAttempts: CaseAttempt[]
  ): Promise<PerformanceAnalytics> {
    const userAttempts = allAttempts.filter(a => a.userId === this.userId);
    
    // Overall statistics
    const completedAttempts = userAttempts.filter(a => a.status === 'completed');
    const totalScore = completedAttempts.reduce((sum, a) => sum + a.performanceScore, 0);
    const totalCRScore = completedAttempts.reduce((sum, a) => sum + a.clinicalReasoningScore, 0);
    const totalTime = userAttempts.reduce((sum, a) => sum + a.timeSpent, 0);

    // Body system performance
    const bodySystemPerf = await this.calculateBodySystemPerformance(userAttempts);

    // Difficulty progression
    const difficultyProg = this.calculateDifficultyProgression(userAttempts);

    // Learning trends (last 30 days)
    const learningTrends = this.calculateLearningTrends(userAttempts);

    // Knowledge gaps
    const knowledgeGaps = await this.getKnowledgeGaps();

    // Identify strengths
    const strengths = this.identifyStrengths(bodySystemPerf);

    // Clinical reasoning patterns
    const reasoningPatterns = this.analyzeReasoningPatterns(userAttempts);

    // Response time analysis
    const responseTimeAnalysis = this.analyzeResponseTimes(userAttempts);

    // NREMT readiness
    const nremtReadiness = this.calculateNREMTReadiness(
      bodySystemPerf,
      completedAttempts.length,
      totalScore / Math.max(completedAttempts.length, 1)
    );

    return {
      userId: this.userId,
      overallStats: {
        casesCompleted: completedAttempts.length,
        casesInProgress: userAttempts.filter(a => a.status === 'in_progress').length,
        averageScore: totalScore / Math.max(completedAttempts.length, 1),
        averageClinicalReasoningScore: totalCRScore / Math.max(completedAttempts.length, 1),
        totalTimeSpent: Math.round(totalTime / 60), // convert to minutes
        lastUpdated: new Date().toISOString(),
      },
      bodySystemPerformance: bodySystemPerf,
      difficultyProgression: difficultyProg,
      learningTrends,
      knowledgeGaps,
      strengths,
      reasoningPatterns,
      responseTimeAnalysis,
      nremtReadiness,
    };
  }

  /**
   * Calculate performance by body system
   */
  private async calculateBodySystemPerformance(
    attempts: CaseAttempt[]
  ): Promise<BodySystemPerformance[]> {
    const systems: BodySystem[] = ['cardiac', 'respiratory', 'trauma', 'neurological', 'medical', 'behavioral', 'pediatric', 'obstetric'];
    
    return systems.map(system => {
      const systemAttempts = attempts.filter(a => 
        this.extractBodySystemFromCaseId(a.caseId) === system
      );

      if (systemAttempts.length === 0) {
        return {
          system,
          casesAttempted: 0,
          accuracy: 0,
          clinicalReasoningScore: 0,
          averageTimePerCase: 0,
          masteryLevel: 'novice' as const,
          commonErrors: [],
          lastPracticed: new Date().toISOString(),
        };
      }

      const completedAttempts = systemAttempts.filter(a => a.status === 'completed');
      const accuracy = completedAttempts.reduce((sum, a) => sum + a.performanceScore, 0) / Math.max(completedAttempts.length, 1);
      const crScore = completedAttempts.reduce((sum, a) => sum + a.clinicalReasoningScore, 0) / Math.max(completedAttempts.length, 1);
      const avgTime = systemAttempts.reduce((sum, a) => sum + a.timeSpent, 0) / Math.max(systemAttempts.length, 1) / 60;

      return {
        system,
        casesAttempted: systemAttempts.length,
        accuracy,
        clinicalReasoningScore: crScore,
        averageTimePerCase: Math.round(avgTime),
        masteryLevel: this.determineMasteryLevel(accuracy, crScore),
        commonErrors: this.extractCommonErrors(systemAttempts),
        lastPracticed: systemAttempts[systemAttempts.length - 1]?.completedAt || new Date().toISOString(),
      };
    });
  }

  /**
   * Determine mastery level based on performance
   */
  private determineMasteryLevel(accuracy: number, crScore: number): 'novice' | 'competent' | 'proficient' | 'expert' {
    const avgScore = (accuracy + crScore) / 2;
    if (avgScore >= 90) return 'expert';
    if (avgScore >= 80) return 'proficient';
    if (avgScore >= 70) return 'competent';
    return 'novice';
  }

  /**
   * Extract common errors from attempts
   */
  private extractCommonErrors(attempts: CaseAttempt[]): string[] {
    // In production, this would analyze specific incorrect responses
    return [];
  }

  /**
   * Calculate difficulty progression
   */
  private calculateDifficultyProgression(attempts: CaseAttempt[]): DifficultyProgression {
    // This would analyze case difficulty in production
    const basicCases = attempts.filter(a => a.caseId.includes('basic'));
    const intermediateCases = attempts.filter(a => a.caseId.includes('intermediate'));
    const advancedCases = attempts.filter(a => a.caseId.includes('advanced'));

    return {
      basic: {
        completed: basicCases.filter(a => a.status === 'completed').length,
        accuracy: this.calculateAverageAccuracy(basicCases),
        unlocked: true,
      },
      intermediate: {
        completed: intermediateCases.filter(a => a.status === 'completed').length,
        accuracy: this.calculateAverageAccuracy(intermediateCases),
        unlocked: basicCases.filter(a => a.status === 'completed').length >= 3,
      },
      advanced: {
        completed: advancedCases.filter(a => a.status === 'completed').length,
        accuracy: this.calculateAverageAccuracy(advancedCases),
        unlocked: intermediateCases.filter(a => a.status === 'completed').length >= 5,
      },
    };
  }

  private calculateAverageAccuracy(attempts: CaseAttempt[]): number {
    if (attempts.length === 0) return 0;
    return attempts.reduce((sum, a) => sum + a.performanceScore, 0) / attempts.length;
  }

  /**
   * Calculate learning trends over time
   */
  private calculateLearningTrends(attempts: CaseAttempt[]): LearningTrend[] {
    // Group by date (last 30 days)
    const trends: LearningTrend[] = [];
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    // In production, this would group by day and calculate metrics
    return trends;
  }

  /**
   * Identify user strengths
   */
  private identifyStrengths(bodySystemPerf: BodySystemPerformance[]): string[] {
    return bodySystemPerf
      .filter(bp => bp.accuracy >= 85 && bp.casesAttempted >= 2)
      .map(bp => `${bp.system} emergencies`);
  }

  /**
   * Analyze clinical reasoning patterns
   */
  private analyzeReasoningPatterns(attempts: CaseAttempt[]) {
    // In production, analyze reasoning quality from responses
    return {
      systematicAssessment: 75,
      differentialThinking: 70,
      protocolAdherence: 80,
      criticalThinking: 72,
    };
  }

  /**
   * Analyze response time patterns
   */
  private analyzeResponseTimes(attempts: CaseAttempt[]) {
    const allResponses = attempts.flatMap(a => a.stages);
    const avgTime = allResponses.reduce((sum, r) => sum + r.timeSpent, 0) / Math.max(allResponses.length, 1);
    
    return {
      averageTimePerQuestion: Math.round(avgTime),
      timeManagementScore: 75,
      impulsiveResponses: allResponses.filter(r => r.timeSpent < 10).length,
      overthinkingInstances: allResponses.filter(r => r.timeSpent > 120).length,
    };
  }

  /**
   * Calculate NREMT readiness
   */
  private calculateNREMTReadiness(
    bodySystemPerf: BodySystemPerformance[],
    casesCompleted: number,
    averageScore: number
  ) {
    const strongSystems = bodySystemPerf.filter(bp => bp.accuracy >= 80);
    const weakSystems = bodySystemPerf.filter(bp => bp.accuracy < 70 && bp.casesAttempted > 0);

    const passProb = Math.min(95, Math.max(30, averageScore * 0.8 + casesCompleted * 2));

    return {
      estimatedPassProbability: Math.round(passProb),
      strongAreas: strongSystems.map(s => `${s.system} emergencies`),
      weakAreas: weakSystems.map(s => `${s.system} emergencies`),
      recommendedFocus: weakSystems.slice(0, 3).map(s => `Review ${s.system} assessment and management`),
    };
  }

  /**
   * Store analytics to persistent storage
   */
  async storeAnalytics(analytics: PerformanceAnalytics): Promise<void> {
    try {
      await storeEncryptedData(
        `${ANALYTICS_KEY}_${this.userId}`,
        analytics
      );
    } catch (error) {
      console.error('Error storing analytics:', error);
    }
  }

  /**
   * Retrieve stored analytics
   */
  async getStoredAnalytics(): Promise<PerformanceAnalytics | null> {
    try {
      const stored = await getEncryptedData<PerformanceAnalytics>(`${ANALYTICS_KEY}_${this.userId}`);
      return stored;
    } catch (error) {
      console.error('Error retrieving analytics:', error);
      return null;
    }
  }
}

export default KnowledgeGapTracker;
