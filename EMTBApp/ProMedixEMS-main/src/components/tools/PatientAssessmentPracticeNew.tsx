import React, { useMemo, useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ClipboardList, Clock, Focus, Layers } from 'lucide-react';
import { useFTOCoach } from '../../hooks/useFTOCoach';
import {
  enhancedAssessmentScenarios,
  assessmentStepTemplates,
  AssessmentScenario,
  AssessmentStepTemplate
} from '../../data/enhanced-patient-assessment';
import { GlassCard, ModernButton } from '../ui/ModernGlassComponents';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import SceneSizeUpDraggable from './SceneSizeUpDraggable';
import {
  PrimaryAssessmentSorter,
  HistoryTakingSorter,
  CriticalActionMixMatch,
  PrimaryAssessmentMixMatch,
  HistoryTakingFillBlanks,
  ReassessmentChecklist
} from './AssessmentInteractiveTools';

const typeLabels: Record<AssessmentScenario['type'], string> = {
  medical: 'Medical',
  trauma: 'Trauma',
  pediatric: 'Pediatric',
  geriatric: 'Geriatric',
  behavioral: 'Behavioral'
};

const difficultyPalette: Record<AssessmentScenario['difficulty'], string> = {
  novice: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'advanced-beginner': 'bg-blue-100 text-blue-700 border border-blue-200',
  competent: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
  proficient: 'bg-amber-100 text-amber-700 border border-amber-200',
  expert: 'bg-rose-100 text-rose-700 border border-rose-200'
};

const PatientAssessmentPracticeModule: React.FC = () => {
  // Performance tracking
  const { trackEvent } = usePerformanceTracker();

  // FTO Coach
  const { triggerFeedback, renderToast } = useFTOCoach();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    enhancedAssessmentScenarios[0]?.id ?? ''
  );
  const [activeStepId, setActiveStepId] = useState<string | null>(assessmentStepTemplates[0]?.id ?? null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [scenarioStartTime, setScenarioStartTime] = useState<number | null>(null);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [sceneSafe, setSceneSafe] = useState(false);

  const scenario = useMemo(() =>
    enhancedAssessmentScenarios.find((entry) => entry.id === selectedScenarioId),
  [selectedScenarioId]);

  const activeStep = useMemo(() =>
    assessmentStepTemplates.find((step) => step.id === activeStepId) ?? null,
  [activeStepId]);

  // Track scenario start
  useEffect(() => {
    if (scenario) {
      trackEvent({
        activityType: 'scenario',
        activityId: scenario.id,
        topic: scenario.type,
        score: 0, // Will update on completion
        timeSpent: 0,
        metadata: {
          scenarioId: scenario.id,
          title: scenario.title,
          category: scenario.type,
          difficulty: scenario.difficulty,
          action: 'started'
        }
      });

      setScenarioStartTime(Date.now());
    }
  }, [scenario?.id, trackEvent]);

  // Track scenario completion when all steps are done
  useEffect(() => {
    if (scenario && completedSteps.size === assessmentStepTemplates.length && scenarioStartTime) {
      const totalTime = Date.now() - scenarioStartTime;
      const score = 100; // All steps completed

      trackEvent({
        activityType: 'scenario',
        activityId: scenario.id,
        topic: scenario.type,
        score,
        timeSpent: totalTime,
        metadata: {
          scenarioId: scenario.id,
          title: scenario.title,
          finalScore: score,
          totalTime,
          decisionsMade: completedSteps.size,
          correctDecisions: completedSteps.size,
          completionStatus: 'completed'
        }
      });
    }
  }, [completedSteps.size, assessmentStepTemplates.length, scenario, scenarioStartTime, trackEvent]);

  // Chaos Mode Logic
  useEffect(() => {
    if (!isChaosMode) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 30000; // 15-45 seconds
      timeoutId = setTimeout(() => {
        triggerFeedback('CHAOS', 5000);
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, [isChaosMode, triggerFeedback]);

  const handleToggleStep = (step: AssessmentStepTemplate) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step.id)) {
        next.delete(step.id);
      } else {
        next.add(step.id);
        // Track step completion
        trackEvent({
          activityType: 'scenario',
          activityId: `${scenario?.id}_${step.id}`,
          topic: scenario?.type || 'scenario',
          score: 100, // Completed successfully
          timeSpent: 0, // Could track individual step time
          metadata: {
            scenarioId: scenario?.id,
            decisionId: step.id,
            decision: `Completed ${step.name}`,
            isCorrect: true, // Completion is correct
            feedback: `${step.name} assessment completed`,
            step: step.name,
            totalSteps: assessmentStepTemplates.length
          }
        });
      }
      return next;
    });
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
    setActiveStepId(assessmentStepTemplates[0]?.id ?? null);
  };

  if (!scenario) {
    return (
      <GlassCard className="p-8 text-center" intensity="medium">
        <p className="text-gray-600">No patient assessment scenarios available.</p>
      </GlassCard>
    );
  }

  const completedCount = completedSteps.size;
  const totalSteps = assessmentStepTemplates.length;

  if (!sceneSafe) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-6" intensity="medium">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Scene Size-Up Required
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              You are arriving at the scene. Before assessing the patient, you must don PPE and check scene safety. What do you do?
            </p>
            <div className="flex gap-3 justify-center">
              <ModernButton
                variant="gradient"
                onClick={() => setSceneSafe(true)}
                className="flex-1"
              >
                Don PPE / Check Scene Safety
              </ModernButton>
              <ModernButton
                variant="glass"
                onClick={() => triggerFeedback('WARNING', 5000)}
                className="flex-1"
              >
                Rush In
              </ModernButton>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono">
      {/* Comms Stream Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-neon-500 font-bold text-lg">COMMS STREAM</h1>
            <p className="text-slate-400 text-sm">UNIT RIG-1 • {scenario?.title}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">STATUS</div>
            <div className="text-neon-400 font-bold">ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-300px)]">
        {/* System Messages */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
            D
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-1">DISPATCH • {new Date().toLocaleTimeString()}</div>
            <div className="bg-slate-800 rounded-lg p-3 text-slate-200">
              {scenario?.initialPresentation.dispatch}
            </div>
          </div>
        </div>

        {/* User Actions */}
        {Array.from(completedSteps).map((stepId, index) => {
          const step = assessmentStepTemplates.find(s => s.id === stepId);
          return (
            <div key={stepId} className="flex gap-3 justify-end">
              <div className="flex-1 max-w-md">
                <div className="text-xs text-slate-500 mb-1 text-right">YOU • {new Date().toLocaleTimeString()}</div>
                <div className="bg-neon-500 rounded-lg p-3 text-slate-900 font-semibold">
                  ✓ {step?.name} completed
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-neon-500 flex items-center justify-center text-xs font-bold text-slate-900">
                Y
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Input Area */}
      <div className="border-t border-slate-800 p-4">
        <div className="space-y-3">
          <div className="text-sm text-slate-400">SELECT NEXT ACTION:</div>
          <div className="grid grid-cols-1 gap-2">
            {assessmentStepTemplates
              .filter(step => !completedSteps.has(step.id))
              .slice(0, 3)
              .map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleToggleStep(step)}
                  className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-neon-500 rounded-lg text-left transition-all duration-200 hover:shadow-lg hover:shadow-neon-500/20"
                >
                  <div className="text-neon-400 font-bold text-sm mb-1">{step.name.toUpperCase()}</div>
                  <div className="text-slate-300 text-sm">{step.description}</div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAssessmentPracticeModule;