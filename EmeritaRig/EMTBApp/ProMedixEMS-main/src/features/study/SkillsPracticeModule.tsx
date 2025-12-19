import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ListChecks, RotateCcw, Target } from 'lucide-react';
import {
  EMT_SKILL_FLOWS,
  EMT_SKILL_SCENARIOS,
  SkillFlowModule,
  SkillFlowQuestion,
  SkillScenario
} from '../../data/emtb/skills-practice';
import { GlassCard, ModernButton } from '../../components/ui/ModernGlassComponents';

const DEFAULT_TIME_LIMIT = 60;

const SkillsPracticeModule: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string>(EMT_SKILL_FLOWS[0]?.id ?? '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME_LIMIT);
  const [timeExpired, setTimeExpired] = useState(false);

  const activeSkill: SkillFlowModule | undefined = useMemo(
    () => EMT_SKILL_FLOWS.find((skill) => skill.id === activeSkillId),
    [activeSkillId]
  );

  const activeQuestion: SkillFlowQuestion | undefined = useMemo(() => {
    if (!activeSkill) return undefined;
    return activeSkill.questions[currentQuestionIndex];
  }, [activeSkill, currentQuestionIndex]);

  const relatedScenarios: SkillScenario[] = useMemo(() => {
    if (!activeSkill) return EMT_SKILL_SCENARIOS;
    const filtered = EMT_SKILL_SCENARIOS.filter((scenario) => scenario.focusSkill === activeSkill.skill);
    return filtered.length > 0 ? filtered : EMT_SKILL_SCENARIOS;
  }, [activeSkill]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [activeSkillId]);

  useEffect(() => {
    if (!activeQuestion) return;
    setSelectedChoiceId(null);
    setIsLocked(false);
    setTimeExpired(false);
    setTimeLeft(activeQuestion.timeLimitSeconds || DEFAULT_TIME_LIMIT);
  }, [activeQuestion?.id]);

  useEffect(() => {
    if (!activeQuestion || isLocked) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsLocked(true);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeQuestion?.id, isLocked]);

  const handleChoiceSelect = (choiceId: string) => {
    if (!activeQuestion || isLocked) return;
    setSelectedChoiceId(choiceId);
    setIsLocked(true);
  };

  const handleNextQuestion = () => {
    if (!activeSkill) return;
    const lastIndex = activeSkill.questions.length - 1;
    if (currentQuestionIndex < lastIndex) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleRetryQuestion = () => {
    if (!activeQuestion) return;
    setSelectedChoiceId(null);
    setIsLocked(false);
    setTimeExpired(false);
    setTimeLeft(activeQuestion.timeLimitSeconds || DEFAULT_TIME_LIMIT);
  };

  const totalQuestions = activeSkill?.questions.length ?? 0;
  const currentQuestionNumber = currentQuestionIndex + 1;
  const timeLimit = activeQuestion?.timeLimitSeconds || DEFAULT_TIME_LIMIT;
  const timerPercent = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));
  const isRevealed = isLocked || timeExpired;

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
          <Target className="h-4 w-4" /> Skills Flow Lab
        </span>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-blue-950">Scenario-Driven Skill Sequencing</h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            Refresh psychomotor sequencing with rewritten flow drills that avoid restricted checklists. Answer rapid-fire
            questions under time pressure, see instant feedback, and connect each workflow to immersive scenarios.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
        <GlassCard className="p-6 space-y-5" intensity="low">
          <div className="flex items-center gap-3">
            <ListChecks className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-blue-900">Select a Skill Flow</h3>
          </div>
          <p className="text-sm text-slate-600">
            Each module provides fresh wording, critical cautions, and quick-hit quiz rounds that reinforce the correct
            order of operations.
          </p>
          <div className="space-y-2">
            {EMT_SKILL_FLOWS.map((skill) => {
              const isActive = skill.id === activeSkillId;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-blue-400 bg-blue-50 text-blue-900 shadow-inner'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{skill.skill}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                      {skill.questions.length} {skill.questions.length === 1 ? 'Card' : 'Cards'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{skill.tagline}</p>
                </button>
              );
            })}
          </div>
        </GlassCard>

        {activeSkill && activeQuestion && (
          <div className="space-y-6">
            <GlassCard className="p-8 space-y-6" intensity="medium">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-900">{activeSkill.skill}</h3>
                  <p className="text-sm text-blue-500">{activeSkill.tagline}</p>
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <span>
                    Card {currentQuestionNumber} / {totalQuestions}
                  </span>
                  <span className={timeLeft <= 10 ? 'text-rose-500 font-semibold' : 'text-blue-600 font-semibold'}>
                    <Clock className="mr-1 inline-block h-3.5 w-3.5" /> {timeLeft}s
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-600">Flow Highlights</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {activeSkill.flowHighlights.map((highlight) => (
                      <li key={highlight} className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-2">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-rose-600">Caution Notes</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {activeSkill.cautionNotes.map((note) => (
                      <li key={note} className="rounded-2xl border border-rose-200/70 bg-rose-50/80 px-4 py-2">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span>{activeQuestion.focus}</span>
                  <span>{timeLimit}s limit</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      timeLeft <= 10 ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${timerPercent}%` }}
                  />
                </div>
                {timeExpired && (
                  <p className="text-sm font-semibold text-rose-600">Time expired — review the explanations and try again.</p>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-blue-900">{activeQuestion.prompt}</h4>
                <div className="space-y-3">
                  {activeQuestion.choices.map((choice) => {
                    const isCorrect = choice.isCorrect;
                    const isSelected = selectedChoiceId === choice.id;
                    const baseClasses = isRevealed
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
                        : isSelected
                        ? 'border-rose-300 bg-rose-100 text-rose-900'
                        : 'border-slate-200 bg-white text-slate-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/70';

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        onClick={() => handleChoiceSelect(choice.id)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left transition ${baseClasses}`}
                        disabled={isLocked}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-medium text-sm md:text-base">{choice.text}</span>
                          {isRevealed && (
                            <span className="text-xs font-semibold uppercase tracking-wide">
                              {isCorrect ? 'Correct' : isSelected ? 'Review' : ''}
                            </span>
                          )}
                        </div>
                        {isRevealed && (
                          <p className="mt-2 text-sm text-slate-600">{choice.explanation}</p>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ModernButton
                    variant="gradient"
                    size="sm"
                    onClick={handleNextQuestion}
                    disabled={!isRevealed}
                  >
                    {currentQuestionIndex + 1 === totalQuestions ? 'Restart Flow Quiz' : 'Next Card'}
                  </ModernButton>
                  <ModernButton variant="glass" size="sm" onClick={handleRetryQuestion} icon={<RotateCcw className="h-4 w-4" />}>
                    Reset Card
                  </ModernButton>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-900">Scenario Library</h3>
                <p className="text-sm text-slate-500">
                  Showing {relatedScenarios.length} scenario{relatedScenarios.length === 1 ? '' : 's'} linked to this flow.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedScenarios.map((scenario) => (
                  <GlassCard key={scenario.id} className="h-full space-y-4 p-6" intensity="low">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold text-blue-900">{scenario.title}</h4>
                      <p className="text-xs uppercase tracking-wide text-blue-500">{scenario.environment}</p>
                    </div>
                    <p className="text-sm text-slate-600">{scenario.summary}</p>
                    <div className="space-y-3 text-sm text-slate-700">
                      <div>
                        <p className="font-semibold text-blue-900">Patient Snapshot</p>
                        <p>{scenario.patientPresentation}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Key Findings</p>
                        <ul className="ml-4 list-disc space-y-1">
                          {scenario.keyFindings.map((finding) => (
                            <li key={finding}>{finding}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Training Takeaways</p>
                        <ul className="ml-4 list-disc space-y-1">
                          {scenario.trainingTakeaways.map((takeaway) => (
                            <li key={takeaway}>{takeaway}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsPracticeModule;
