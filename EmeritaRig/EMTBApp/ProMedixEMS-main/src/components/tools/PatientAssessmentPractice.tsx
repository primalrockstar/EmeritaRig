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
    <div
      className="grid grid-cols-1 lg:grid-cols-5 gap-6"
      style={isChaosMode ? { boxShadow: 'inset 0 0 50px rgba(220, 38, 38, 0.2)' } : {}}
    >
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Scenario Bank</h2>
          <span className="text-xs text-gray-500">{enhancedAssessmentScenarios.length} total</span>
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden">
          <select
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            {enhancedAssessmentScenarios.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.title} — {entry.difficulty.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop List */}
        <div className="hidden lg:block space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
          {enhancedAssessmentScenarios.map((entry) => {
            const isActive = entry.id === scenario.id;
            const difficultyBadge = difficultyPalette[entry.difficulty];

            return (
              <GlassCard
                key={entry.id}
                className={`p-4 transition border ${isActive ? 'border-blue-400 shadow-lg' : 'border-transparent'}`}
                hoverable
                onClick={() => setSelectedScenarioId(entry.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        {typeLabels[entry.type] || 'Scenario'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${difficultyBadge}`}>
                        {entry.difficulty.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {entry.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-gray-500">
                    <div className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {entry.estimatedTime} min
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" />
                      {entry.learningObjectives.length} objectives
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <GlassCard className="p-6" intensity="medium">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                {typeLabels[scenario.type] || 'Scenario'} • {scenario.difficulty.replace('-', ' ')} • {scenario.estimatedTime} min
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{scenario.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
                {scenario.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="inline-flex items-center gap-2">
                <Focus className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Learning Objectives</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
                {scenario.learningObjectives.slice(0, 4).map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 lg:flex-col lg:items-end">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">⚠️ Chaos Mode</span>
              <button
                type="button"
                onClick={() => setIsChaosMode(!isChaosMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isChaosMode ? 'bg-red-600 animate-pulse' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isChaosMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-4" intensity="low">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Initial Presentation</h3>
              <span className="text-xs text-gray-500">Dispatch: {scenario.initialPresentation.dispatch}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block">Scene</strong>
                <p>{scenario.initialPresentation.sceneDescription}</p>
              </div>
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block">Position</strong>
                <p>{scenario.initialPresentation.patientPosition}</p>
              </div>
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block">Obvious Injuries</strong>
                <p>{scenario.initialPresentation.obviousInjuries.join(', ') || 'None noted'}</p>
              </div>
              <div>
                <strong className="text-gray-700 dark:text-gray-200 block">Hazards</strong>
                <p>{scenario.initialPresentation.environmentalHazards.join(', ') || 'None'}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4" intensity="low">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Critical Actions</h3>
              <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {scenario.criticalActions.length} required
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {scenario.criticalActions.map((action) => (
                <li key={action} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <GlassCard className="p-6" intensity="medium">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assessment Workflow</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your mastery of core assessment phases. Toggle each step as you complete simulated practice.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{completedCount}/{totalSteps} steps</div>
              <div className="text-xs text-gray-500">{Math.round((completedCount / Math.max(totalSteps, 1)) * 100)}% complete</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentStepTemplates.map((step) => {
              const selected = completedSteps.has(step.id);
              return (
                <GlassCard
                  key={step.id}
                  className={`p-4 border transition ${activeStepId === step.id ? 'border-blue-400 shadow-md' : 'border-transparent'}`}
                  hoverable
                  onClick={() => setActiveStepId(step.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {step.name}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {step.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleToggleStep(step);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition border ${
                        selected
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                          : 'text-gray-500 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {selected ? 'Completed' : 'Mark complete'}
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {activeStep && (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-blue-200 bg-white/50 p-5 dark:border-blue-800/60 dark:bg-gray-800/30">
                {activeStep.id === 'scene-size-up' && <SceneSizeUpDraggable />}
                {activeStep.id === 'primary-assessment' && <PrimaryAssessmentMixMatch />}
                {activeStep.id === 'history-taking' && <HistoryTakingFillBlanks />}
                {activeStep.id === 'secondary-assessment' && (
                  <CriticalActionMixMatch scenarioActions={scenario.criticalActions} />
                )}
                {activeStep.id === 'reassessment' && <ReassessmentChecklist />}
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-800/60 dark:bg-blue-900/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 uppercase tracking-wide mb-2">
                    Step Guidance • {activeStep.name}
                  </h4>
                  <ul className="space-y-1.5 text-sm text-blue-900/90 dark:text-blue-100">
                    {activeStep.requiredActions.map((action) => (
                      <li key={action.id} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span>
                          <strong>{action.text}</strong>
                          <span className="block text-xs text-blue-800/80 dark:text-blue-200/80">Expected: {action.expectedResponse}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right text-xs text-blue-900/70 dark:text-blue-100/70">
                  {activeStep.timeLimit && <div>Time Target: {activeStep.timeLimit}s</div>}
                  {activeStep.criticalForSuccess && (
                    <div className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" /> Critical
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <ModernButton variant="glass" size="sm" onClick={resetProgress}>
              Reset Progress
            </ModernButton>
            <ModernButton
              variant="gradient"
              size="sm"
              onClick={() => window.print()}
            >
              Export Practice Record
            </ModernButton>
          </div>
        </GlassCard>
      </div>
      {renderToast()}
    </div>
  );
};

export default PatientAssessmentPracticeModule;
