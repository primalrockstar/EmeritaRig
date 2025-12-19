/**
 * ProMedix EMS - Clinical Reasoning Feedback Engine
 * Socratic feedback system for deep learning and knowledge retention
 * Week 1-2 Deliverable: Intelligent feedback generation
 */

import {
  ClinicalFeedback,
  CaseOption,
  CaseStage,
  UserCaseResponse,
  LearningGap,
  BodySystem,
} from '../types/ClinicalReasoning';

/**
 * Clinical Reasoning Feedback Generator
 * Provides Socratic method feedback to enhance critical thinking
 */
export class ClinicalReasoningFeedback {
  /**
   * Generate comprehensive feedback for a user's response
   */
  static generateFeedback(
    stage: CaseStage,
    userResponse: UserCaseResponse,
    selectedOption: CaseOption,
    correctOption: CaseOption
  ): ClinicalFeedback {
    const isCorrect = userResponse.isCorrect;
    
    // Determine feedback type based on correctness and reasoning quality
    const feedbackType = this.determineFeedbackType(
      isCorrect,
      userResponse.userReasoning,
      selectedOption,
      stage.criticalDecision
    );

    // Generate Socratic feedback components
    const whyCorrect = this.generateWhyCorrect(correctOption, stage);
    const whyIncorrect = isCorrect ? undefined : this.generateWhyIncorrect(selectedOption, correctOption);
    const clinicalPearl = this.extractClinicalPearl(stage);
    const differentialThinking = this.generateDifferentialPrompt(stage, selectedOption);
    
    // Identify learning gaps
    const identifiedGaps = this.identifyLearningGaps(
      isCorrect,
      selectedOption,
      stage,
      userResponse.timeSpent
    );

    // Generate recommendations
    const recommendedReview = this.generateRecommendations(identifiedGaps, stage);

    // Assess reasoning quality
    const reasoningQuality = this.assessReasoningQuality(
      userResponse.userReasoning,
      isCorrect,
      userResponse.timeSpent
    );

    // Check if this is a common mistake
    const commonMistake = selectedOption.commonError !== undefined;

    return {
      isCorrect,
      selectedOptionId: userResponse.selectedOptionId,
      correctOptionId: stage.correctAnswerId,
      userReasoning: userResponse.userReasoning,
      feedbackType,
      whyCorrect,
      whyIncorrect,
      clinicalPearl,
      differentialThinking,
      protocolReference: stage.explanation,
      identifiedGaps,
      recommendedReview,
      reasoningQuality,
      commonMistake,
    };
  }

  /**
   * Determine the type of feedback based on performance
   */
  private static determineFeedbackType(
    isCorrect: boolean,
    userReasoning: string | undefined,
    selectedOption: CaseOption,
    isCriticalDecision: boolean
  ): 'correct_reasoning' | 'correct_poor_reasoning' | 'incorrect_close' | 'incorrect_far' | 'critical_error' {
    if (!isCorrect) {
      // Critical errors on critical decisions
      if (isCriticalDecision) {
        return 'critical_error';
      }
      
      // Check if it was a distractor (close but incorrect)
      if (selectedOption.differentialConsideration) {
        return 'incorrect_close';
      }
      
      return 'incorrect_far';
    }

    // Correct answer - assess reasoning quality
    if (!userReasoning || userReasoning.length < 20) {
      return 'correct_poor_reasoning';
    }

    return 'correct_reasoning';
  }

  /**
   * Generate explanation of why the correct answer is correct
   */
  private static generateWhyCorrect(correctOption: CaseOption, stage: CaseStage): string {
    return `
**Why This Is Correct:**

${stage.explanation}

**Clinical Reasoning Framework:**
When faced with this scenario, expert clinicians consider:

1. **Primary Assessment** - What is the immediate life threat?
2. **Differential Diagnosis** - What else could this presentation indicate?
3. **Intervention Priority** - Which action will have the greatest impact on patient outcome?
4. **Protocol Alignment** - How do guidelines direct care in this situation?

The correct choice (${correctOption.text}) addresses the most critical aspect of this clinical scenario.

${correctOption.consequences ? `**Expected Outcome:** ${correctOption.consequences}` : ''}
    `.trim();
  }

  /**
   * Generate explanation of why the selected answer is incorrect
   */
  private static generateWhyIncorrect(selectedOption: CaseOption, correctOption: CaseOption): string {
    let explanation = `**Why Your Selection Was Incorrect:**\n\n`;

    if (selectedOption.commonError) {
      explanation += `⚠️ **Common Error:** ${selectedOption.commonError}\n\n`;
    }

    if (selectedOption.differentialConsideration) {
      explanation += `🤔 **Differential Consideration:** ${selectedOption.differentialConsideration}\n\n`;
      explanation += `While this option shows good differential thinking, it's not the best choice in this specific scenario.\n\n`;
    }

    if (selectedOption.consequences) {
      explanation += `📊 **Consequences:** ${selectedOption.consequences}\n\n`;
    }

    explanation += `**The Better Choice:**\n${correctOption.text}\n\n`;
    
    if (correctOption.consequences) {
      explanation += `**Why This Is Preferable:** ${correctOption.consequences}`;
    }

    return explanation.trim();
  }

  /**
   * Extract key clinical pearl from stage
   */
  private static extractClinicalPearl(stage: CaseStage): string {
    // Extract pearl from explanation (in production, would be stored separately)
    const pearlMatch = stage.explanation.match(/\*\*Key Clinical Pearl:\*\*\s*(.+?)(?:\n|$)/s);
    
    if (pearlMatch) {
      return pearlMatch[1].trim();
    }

    return 'Clinical decisions should be based on systematic assessment, protocol adherence, and patient-centered care.';
  }

  /**
   * Generate differential diagnosis prompting question
   */
  private static generateDifferentialPrompt(stage: CaseStage, selectedOption: CaseOption): string {
    const prompts = [
      '🤔 **Think Broader:** What other conditions could present similarly? How would you rule them in or out?',
      '🔍 **Differential Diagnosis:** What alternative diagnoses should you consider? What findings would support or refute each?',
      '📋 **Clinical Reasoning:** If this intervention doesn\'t work, what would be your next consideration?',
      '💡 **Red Flags:** What critical findings would change your management plan immediately?',
      '⚕️ **Expert Thinking:** How would you explain your decision-making process to a medical director?',
    ];

    // Return contextual prompt based on stage
    return prompts[stage.stageNumber % prompts.length];
  }

  /**
   * Identify learning gaps from response
   */
  private static identifyLearningGaps(
    isCorrect: boolean,
    selectedOption: CaseOption,
    stage: CaseStage,
    timeSpent: number
  ): LearningGap[] {
    const gaps: LearningGap[] = [];

    if (!isCorrect) {
      // Identify topic area
      let category: BodySystem = 'medical';
      let specificTopic = 'General assessment';
      let severity: 'critical' | 'moderate' | 'minor' = 'moderate';

      // Check if it's a critical decision
      if (stage.criticalDecision) {
        severity = 'critical';
      }

      // Check if it's a common error
      if (selectedOption.commonError) {
        severity = severity === 'critical' ? 'critical' : 'moderate';
        specificTopic = selectedOption.commonError;
      }

      // Fast response suggests guessing
      if (timeSpent < 15) {
        gaps.push({
          category: 'medical',
          specificTopic: 'Impulsive decision-making - consider all options carefully',
          severity: 'moderate',
          recommendedAction: 'Practice systematic assessment and take time to analyze each scenario',
          occurrenceCount: 1,
        });
      }

      gaps.push({
        category,
        specificTopic,
        severity,
        recommendedAction: this.getRecommendedAction(stage),
        occurrenceCount: 1,
      });
    } else if (timeSpent > 120) {
      // Correct but overthinking
      gaps.push({
        category: 'medical',
        specificTopic: 'Decision confidence - overthinking scenarios',
        severity: 'minor',
        recommendedAction: 'Review protocols to build confidence in decision-making',
        occurrenceCount: 1,
      });
    }

    return gaps;
  }

  /**
   * Generate recommended action based on stage
   */
  private static getRecommendedAction(stage: CaseStage): string {
    return `Review ${stage.stageTitle} protocols and practice similar scenarios`;
  }

  /**
   * Generate learning recommendations
   */
  private static generateRecommendations(gaps: LearningGap[], stage: CaseStage): string[] {
    const recommendations: string[] = [];

    // Add gap-specific recommendations
    for (const gap of gaps) {
      recommendations.push(gap.recommendedAction);
    }

    // Add protocol references
    if (stage.explanation.includes('AHA')) {
      recommendations.push('Review AHA guidelines for this scenario');
    }
    if (stage.explanation.includes('NREMT')) {
      recommendations.push('Study NREMT skill sheets for this competency');
    }

    // Add stage-specific recommendations
    if (stage.stageTitle.includes('Assessment')) {
      recommendations.push('Practice systematic patient assessment techniques');
    }
    if (stage.stageTitle.includes('Treatment')) {
      recommendations.push('Review intervention priorities and contraindications');
    }
    if (stage.stageTitle.includes('Transport')) {
      recommendations.push('Study destination selection criteria and time-critical conditions');
    }

    return [...new Set(recommendations)]; // Remove duplicates
  }

  /**
   * Assess quality of user's reasoning
   */
  private static assessReasoningQuality(
    userReasoning: string | undefined,
    isCorrect: boolean,
    timeSpent: number
  ): 'excellent' | 'good' | 'needs_improvement' | 'poor' {
    if (!userReasoning || userReasoning.length < 10) {
      return 'poor';
    }

    // Check for key reasoning elements
    const hasAssessment = /assess|check|evaluate|find|determine/i.test(userReasoning);
    const hasPriority = /priority|first|immediate|critical|urgent/i.test(userReasoning);
    const hasProtocol = /protocol|guideline|standard|procedure/i.test(userReasoning);
    const hasDifferential = /because|since|due to|indicates|suggests|rule out/i.test(userReasoning);

    const elementCount = [hasAssessment, hasPriority, hasProtocol, hasDifferential].filter(Boolean).length;

    if (isCorrect && elementCount >= 3 && timeSpent >= 20 && timeSpent <= 90) {
      return 'excellent';
    }
    if (isCorrect && elementCount >= 2) {
      return 'good';
    }
    if (elementCount >= 1) {
      return 'needs_improvement';
    }

    return 'poor';
  }

  /**
   * Generate encouragement message based on performance
   */
  static generateEncouragement(
    feedbackType: ClinicalFeedback['feedbackType'],
    reasoningQuality: ClinicalFeedback['reasoningQuality']
  ): string {
    if (feedbackType === 'correct_reasoning' && reasoningQuality === 'excellent') {
      return '🌟 **Excellent clinical reasoning!** Your systematic approach demonstrates expert-level thinking.';
    }

    if (feedbackType === 'correct_reasoning') {
      return '✅ **Good work!** Your decision-making process is sound and follows established protocols.';
    }

    if (feedbackType === 'correct_poor_reasoning') {
      return '✅ **Correct answer, but consider explaining your reasoning.** Understanding the "why" is as important as the "what" in clinical decision-making.';
    }

    if (feedbackType === 'incorrect_close') {
      return '📚 **You\'re thinking critically!** Your choice shows good differential diagnosis skills, but review the key distinguishing factors.';
    }

    if (feedbackType === 'critical_error') {
      return '⚠️ **Important learning opportunity:** This is a critical decision point. Take time to review the protocol and practice similar scenarios.';
    }

    return '💪 **Keep learning!** Every mistake is an opportunity to strengthen your clinical knowledge and skills.';
  }

  /**
   * Generate follow-up question to promote deeper thinking
   */
  static generateFollowUpQuestion(stage: CaseStage, isCorrect: boolean): string {
    if (isCorrect) {
      const questions = [
        'What would you do if your initial intervention doesn\'t improve the patient\'s condition?',
        'What are the potential complications you should monitor for with this decision?',
        'How would you explain this decision to a family member or patient?',
        'What additional information would strengthen your confidence in this decision?',
        'If resources were limited, what would be your backup plan?',
      ];
      return questions[stage.stageNumber % questions.length];
    } else {
      return 'Take a moment to reflect: What key information in the scenario should have guided your decision differently?';
    }
  }
}

export default ClinicalReasoningFeedback;
