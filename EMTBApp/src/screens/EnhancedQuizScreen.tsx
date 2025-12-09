/**
 * EMT-B - Enhanced Clinical Reasoning Quiz Screen
 * UWorld-style unfolding case interface with progressive scenarios
 * Week 1-2 Deliverable: Case progression UI and reasoning input
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { storeEncryptedData, getEncryptedData } from '../utils/secureStorage';
import { offlineManager } from '../utils/offlineManager';
import { useAuth } from '../auth/AuthContext';
import {
  UnfoldingCase,
  CaseStage,
  CaseOption,
  UserCaseResponse,
  CaseAttempt,
  CaseStatus,
  ClinicalFeedback,
} from '../types/ClinicalReasoning';
import { ClinicalReasoningFeedback } from '../components/ClinicalReasoningFeedback';
import FTOFeedback from '../components/FTOFeedback';
import KnowledgeGapTracker from '../utils/KnowledgeGapTracker';
import UNFOLDING_CASES from '../data/unfoldingCases';

const { width } = Dimensions.get('window');

interface Props {
  caseId?: string;
  onComplete?: (attempt: CaseAttempt) => void;
}

/**
 * Enhanced Quiz Screen for Clinical Reasoning Cases
 * Implements progressive case stages with Socratic feedback
 */
const EnhancedQuizScreen: React.FC<Props> = ({ caseId, onComplete }) => {
  const { user } = useAuth();
  const [currentCase, setCurrentCase] = useState<UnfoldingCase | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userReasoning, setUserReasoning] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<ClinicalFeedback | null>(null);
  const [caseAttempt, setCaseAttempt] = useState<CaseAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [stageStartTime, setStageStartTime] = useState<number>(Date.now());
  const [hintsUsed, setHintsUsed] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);

  // Initialize case
  useEffect(() => {
    initializeCase();
  }, [caseId]);

  const initializeCase = async () => {
    try {
      setLoading(true);
      
      // Load case (in production, would fetch from API or local storage)
      const selectedCase = caseId 
        ? UNFOLDING_CASES.find(c => c.id === caseId)
        : UNFOLDING_CASES[0];

      if (!selectedCase) {
        Alert.alert('Error', 'Case not found');
        return;
      }

      setCurrentCase(selectedCase);

      // Initialize case attempt
      const attempt: CaseAttempt = {
        attemptId: `attempt-${Date.now()}`,
        caseId: selectedCase.id,
  userId: user?.email || user?.id || 'guest',
        startedAt: new Date().toISOString(),
        status: 'in_progress',
        stages: [],
        totalPoints: 0,
        maxPoints: selectedCase.stages.reduce((sum, stage) => sum + stage.pointValue, 0),
        performanceScore: 0,
        clinicalReasoningScore: 0,
        knowledgeGaps: [],
        timeSpent: 0,
        hintsUsed: 0,
      };

      setCaseAttempt(attempt);
      setStageStartTime(Date.now());
      
    } catch (error) {
      console.error('Error initializing case:', error);
      Alert.alert('Error', 'Failed to load case');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStage = (): CaseStage | null => {
    if (!currentCase || currentStageIndex >= currentCase.stages.length) {
      return null;
    }
    return currentCase.stages[currentStageIndex];
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleUseHint = (hintLevel: number) => {
    if (!hintsUsed.includes(hintLevel)) {
      setHintsUsed([...hintsUsed, hintLevel]);
      setShowHints(true);
    }
  };

  const handleSubmitResponse = async () => {
    const stage = getCurrentStage();
    if (!stage || !selectedOption || !caseAttempt) {
      Alert.alert('Error', 'Please select an answer');
      return;
    }

    // Check if reasoning is required
    const selectedOpt = stage.options.find(o => o.id === selectedOption);
    if (selectedOpt?.reasoningRequired && userReasoning.trim().length < 20) {
      Alert.alert(
        'Reasoning Required',
        'Please explain your clinical reasoning for this critical decision (minimum 20 characters).'
      );
      return;
    }

    // Calculate time spent on this stage
    const timeSpent = Math.floor((Date.now() - stageStartTime) / 1000);

    // Create response
    const isCorrect = selectedOption === stage.correctAnswerId;
    
    // Calculate points (deduct for hints used)
    const hintDeductions = hintsUsed.reduce((sum, level) => {
      const hint = stage.hints.find(h => h.level === level);
      return sum + (hint?.deductionPoints || 0);
    }, 0);
    const pointsEarned = isCorrect ? Math.max(0, stage.pointValue - hintDeductions) : 0;

    const response: UserCaseResponse = {
      caseId: currentCase!.id,
      stageNumber: stage.stageNumber,
      selectedOptionId: selectedOption,
      userReasoning: userReasoning.trim() || undefined,
      timeSpent,
      hintsUsed,
      isCorrect,
      pointsEarned,
      timestamp: new Date().toISOString(),
    };

    // Generate feedback
    const correctOption = stage.options.find(o => o.id === stage.correctAnswerId)!;
    const generatedFeedback = ClinicalReasoningFeedback.generateFeedback(
      stage,
      response,
      selectedOpt!,
      correctOption
    );

    setFeedback(generatedFeedback);
    setShowFeedback(true);

    // Update case attempt
    const updatedAttempt: CaseAttempt = {
      ...caseAttempt,
      stages: [...caseAttempt.stages, response],
      totalPoints: caseAttempt.totalPoints + pointsEarned,
      timeSpent: caseAttempt.timeSpent + timeSpent,
      hintsUsed: caseAttempt.hintsUsed + hintsUsed.length,
    };

    setCaseAttempt(updatedAttempt);

    // Save progress
    await saveProgress(updatedAttempt);
  };

  const handleNextStage = () => {
    if (!currentCase) return;

    // Reset for next stage
    setSelectedOption(null);
    setUserReasoning('');
    setShowFeedback(false);
    setFeedback(null);
    setHintsUsed([]);
    setShowHints(false);
    setStageStartTime(Date.now());

    // Check if case is complete
    if (currentStageIndex + 1 >= currentCase.stages.length) {
      completeCase();
    } else {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const completeCase = async () => {
    if (!caseAttempt || !currentCase) return;

    // Calculate final scores
    const performanceScore = Math.round((caseAttempt.totalPoints / caseAttempt.maxPoints) * 100);
    
    // Calculate clinical reasoning score based on reasoning quality
    const reasoningScores = caseAttempt.stages.map(s => {
      if (!s.userReasoning) return 50; // No reasoning provided
      if (s.userReasoning.length < 30) return 60; // Minimal reasoning
      if (s.userReasoning.length < 60) return 75; // Moderate reasoning
      return 90; // Detailed reasoning
    });
    const clinicalReasoningScore = Math.round(
      reasoningScores.reduce((sum, s) => sum + s, 0) / reasoningScores.length
    );

    const completedAttempt: CaseAttempt = {
      ...caseAttempt,
      status: 'completed',
      completedAt: new Date().toISOString(),
      performanceScore,
      clinicalReasoningScore,
    };

    // Analyze knowledge gaps
  const gapTracker = new KnowledgeGapTracker(user?.email || user?.id || 'guest');
    const gaps = await gapTracker.analyzeCaseAttempt(completedAttempt);
    
    completedAttempt.knowledgeGaps = gaps.map(g => g.specificTopic);

    // Save final attempt
    await saveProgress(completedAttempt);

    // Show completion alert
    Alert.alert(
      'Case Complete! 🎉',
      `Performance Score: ${performanceScore}%\nClinical Reasoning: ${clinicalReasoningScore}%\n\nPoints: ${completedAttempt.totalPoints}/${completedAttempt.maxPoints}`,
      [
        {
          text: 'Review Results',
          onPress: () => {
            if (onComplete) {
              onComplete(completedAttempt);
            }
          },
        },
      ]
    );
  };

  const saveProgress = async (attempt: CaseAttempt) => {
    try {
      const key = `@case_attempt_${attempt.attemptId}`;
      await storeEncryptedData(key, attempt);

      // Update attempts list
  const userKey = user?.email || user?.id || 'guest';
  const attemptsKey = `@case_attempts_${userKey}`;
      const existingAttempts = await getEncryptedData<CaseAttempt[]>(attemptsKey) || [];
      
      const updatedAttempts = existingAttempts.filter(a => a.attemptId !== attempt.attemptId);
      updatedAttempts.push(attempt);
      
      await storeEncryptedData(attemptsKey, updatedAttempts);

      // Queue for cloud sync
      offlineManager.queueAction('SAVE_PROGRESS', attempt);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading clinical case...</Text>
      </View>
    );
  }

  if (!currentCase || !caseAttempt) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Case not available</Text>
      </View>
    );
  }

  const stage = getCurrentStage();
  if (!stage) {
    return null;
  }

  const progress = ((currentStageIndex + 1) / currentCase.stages.length) * 100;
  const selectedOpt = stage.options.find(o => o.id === selectedOption);

  return (
    <ScrollView style={styles.container}>
      {/* Header with progress */}
      <View style={styles.header}>
        <Text style={styles.caseTitle}>{currentCase.title}</Text>
        <Text style={styles.difficulty}>
          {currentCase.difficulty.toUpperCase()} • {currentCase.estimatedTime} min
        </Text>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Stage {currentStageIndex + 1} of {currentCase.stages.length}
          </Text>
        </View>

        {/* Points display */}
        <Text style={styles.pointsText}>
          Points: {caseAttempt.totalPoints} / {caseAttempt.maxPoints}
        </Text>
      </View>

      {/* Initial presentation (only show on first stage) */}
      {currentStageIndex === 0 && (
        <View style={styles.presentationCard}>
          <Text style={styles.sectionTitle}>📋 Initial Presentation</Text>
          <Text style={styles.presentationText}>{currentCase.initialPresentation}</Text>
        </View>
      )}

      {/* Current stage information */}
      <View style={styles.stageCard}>
        <View style={styles.stageTitleContainer}>
          <Text style={styles.stageTitle}>{stage.stageTitle}</Text>
          {stage.criticalDecision && (
            <View style={styles.criticalBadge}>
              <Text style={styles.criticalBadgeText}>⚠️ Critical Decision</Text>
            </View>
          )}
        </View>

        <Text style={styles.newInfoLabel}>🔍 New Information:</Text>
        <Text style={styles.newInfoText}>{stage.newInformation}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.question}>{stage.question}</Text>
        <Text style={styles.pointValue}>Worth {stage.pointValue} points</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {stage.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.id && styles.optionSelected,
              showFeedback && option.id === stage.correctAnswerId && styles.optionCorrect,
              showFeedback && selectedOption === option.id && option.id !== stage.correctAnswerId && styles.optionIncorrect,
            ]}
            onPress={() => !showFeedback && handleOptionSelect(option.id)}
            disabled={showFeedback}
          >
            <Text style={styles.optionId}>{option.id.toUpperCase()})</Text>
            <Text style={[
              styles.optionText,
              selectedOption === option.id && styles.optionTextSelected,
            ]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reasoning input (if required) */}
      {selectedOpt?.reasoningRequired && !showFeedback && (
        <View style={styles.reasoningContainer}>
          <Text style={styles.reasoningLabel}>
            💭 Explain your clinical reasoning: *
          </Text>
          <TextInput
            style={styles.reasoningInput}
            multiline
            numberOfLines={4}
            placeholder="Why did you choose this option? Consider assessment findings, differential diagnosis, and protocol guidance..."
            value={userReasoning}
            onChangeText={setUserReasoning}
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {userReasoning.length} / 500 characters (minimum 20)
          </Text>
        </View>
      )}

      {/* Hints */}
      {!showFeedback && stage.hints.length > 0 && (
        <View style={styles.hintsContainer}>
          <TouchableOpacity
            style={styles.hintsButton}
            onPress={() => setShowHints(!showHints)}
          >
            <Text style={styles.hintsButtonText}>
              💡 {showHints ? 'Hide' : 'Show'} Hints ({stage.hints.length} available)
            </Text>
          </TouchableOpacity>

          {showHints && (
            <View style={styles.hintsList}>
              {stage.hints.map((hint) => (
                <TouchableOpacity
                  key={hint.level}
                  style={[
                    styles.hintButton,
                    hintsUsed.includes(hint.level) && styles.hintUsed,
                  ]}
                  onPress={() => handleUseHint(hint.level)}
                  disabled={hintsUsed.includes(hint.level)}
                >
                  <Text style={styles.hintLevel}>Hint {hint.level}</Text>
                  {hintsUsed.includes(hint.level) ? (
                    <Text style={styles.hintText}>{hint.text}</Text>
                  ) : (
                    <Text style={styles.hintCost}>
                      -{hint.deductionPoints} points
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Submit button */}
      {!showFeedback && (
        <TouchableOpacity
          style={[styles.submitButton, !selectedOption && styles.submitButtonDisabled]}
          onPress={handleSubmitResponse}
          disabled={!selectedOption}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
      )}

      {/* Feedback */}
      {showFeedback && feedback && (
        <View style={styles.feedbackContainer}>
          <View style={[
            styles.feedbackHeader,
            feedback.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}>
            <Text style={styles.feedbackHeaderText}>
              {feedback.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </Text>
            <Text style={styles.feedbackScore}>
              +{caseAttempt.stages[caseAttempt.stages.length - 1]?.pointsEarned || 0} points
            </Text>
          </View>

          <View style={styles.feedbackContent}>
            <FTOFeedback type={feedback.isCorrect ? 'correct' : 'incorrect'} />

            <Text style={styles.encouragement}>
              {ClinicalReasoningFeedback.generateEncouragement(
                feedback.feedbackType,
                feedback.reasoningQuality
              )}
            </Text>

            <Text style={styles.feedbackSection}>🎯 {feedback.whyCorrect}</Text>

            {feedback.whyIncorrect && (
              <Text style={styles.feedbackSection}>⚠️ {feedback.whyIncorrect}</Text>
            )}

            <View style={styles.clinicalPearlBox}>
              <Text style={styles.clinicalPearlTitle}>💎 Clinical Pearl</Text>
              <Text style={styles.clinicalPearlText}>{feedback.clinicalPearl}</Text>
            </View>

            <Text style={styles.differentialPrompt}>{feedback.differentialThinking}</Text>

            {feedback.identifiedGaps.length > 0 && (
              <View style={styles.gapsContainer}>
                <Text style={styles.gapsTitle}>📚 Areas for Review:</Text>
                {feedback.recommendedReview.map((rec, idx) => (
                  <Text key={idx} style={styles.gapItem}>• {rec}</Text>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNextStage}>
            <Text style={styles.nextButtonText}>
              {currentStageIndex + 1 < currentCase.stages.length
                ? 'Continue to Next Stage →'
                : 'Complete Case ✓'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
  },
  header: {
    backgroundColor: '#1e40af',
    padding: 20,
    paddingTop: 40,
  },
  caseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  difficulty: {
    fontSize: 14,
    color: '#93c5fd',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fbbf24',
    textAlign: 'center',
  },
  presentationCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  presentationText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  stageCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  stageTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  criticalBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  criticalBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  newInfoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
  },
  newInfoText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  questionCard: {
    backgroundColor: '#eff6ff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  pointValue: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  optionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  optionIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  optionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 12,
    width: 24,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    lineHeight: 22,
  },
  optionTextSelected: {
    color: '#1e293b',
    fontWeight: '500',
  },
  reasoningContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  reasoningLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 12,
  },
  reasoningInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d97706',
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    marginTop: 8,
    fontSize: 12,
    color: '#78350f',
    textAlign: 'right',
  },
  hintsContainer: {
    margin: 16,
  },
  hintsButton: {
    backgroundColor: '#e0e7ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  hintsButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3730a3',
  },
  hintsList: {
    marginTop: 12,
  },
  hintButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  hintUsed: {
    backgroundColor: '#f5f3ff',
  },
  hintLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  hintCost: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feedbackContainer: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  feedbackHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackCorrect: {
    backgroundColor: '#d1fae5',
  },
  feedbackIncorrect: {
    backgroundColor: '#fee2e2',
  },
  feedbackHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  feedbackScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  feedbackContent: {
    padding: 16,
  },
  encouragement: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    lineHeight: 24,
  },
  feedbackSection: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 22,
  },
  clinicalPearlBox: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 16,
  },
  clinicalPearlTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  clinicalPearlText: {
    fontSize: 15,
    color: '#78350f',
    lineHeight: 22,
  },
  differentialPrompt: {
    fontSize: 15,
    color: '#6366f1',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 22,
  },
  gapsContainer: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
  },
  gapsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  gapItem: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#10b981',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default EnhancedQuizScreen;
