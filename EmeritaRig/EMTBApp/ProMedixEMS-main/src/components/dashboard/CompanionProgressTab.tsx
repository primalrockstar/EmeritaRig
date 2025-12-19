import { useUserContext } from '../../hooks/useUserContext';
import GlassCard from '../ui/GlassCard';
import { ModernButton } from '../ui/ModernGlassComponents';
import { useNavigate } from 'react-router-dom';

interface ProgressMetrics {
  studyHours: number;
  studyGoal: number;
  clinicalHours: number;
  clinicalGoal: number;
  streak: number;
  examDaysRemaining?: number;
  knowledgeProgress: number; // 0-100
  applicationProgress: number;
  documentationProgress: number;
  communicationProgress: number;
  achievements: Achievement[];
  recentImprovements: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

const ProgressHeader = ({ streak, examDaysRemaining }: { streak: number; examDaysRemaining?: number }) => {
  const getMotivationalMessage = () => {
    if (streak >= 30) return "🔥 30-day streak! You're unstoppable!";
    if (streak >= 14) return "🎯 Two-week streak! Consistency is key!";
    if (streak >= 7) return "🚀 One-week streak! Keep the momentum!";
    return "💪 Every day counts. Keep going!";
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Your Progress Coach</h1>
          <p className="text-slate-300">{getMotivationalMessage()}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {examDaysRemaining && (
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{examDaysRemaining}</div>
              <div className="text-sm text-slate-400">Days to Exam</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{streak}</div>
            <div className="text-sm text-slate-400">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressOverview = ({ metrics }: { metrics: ProgressMetrics }) => {
  const navigate = useNavigate();

  const goalCards = [
    {
      title: 'Study Hours',
      current: metrics.studyHours,
      goal: metrics.studyGoal,
      unit: 'hours',
      icon: '📚',
      color: 'emerald',
      action: () => navigate('/learn')
    },
    {
      title: 'Clinical Hours',
      current: metrics.clinicalHours,
      goal: metrics.clinicalGoal,
      unit: 'hours',
      icon: '🏥',
      color: 'blue',
      action: () => navigate('/progress/log-hours')
    },
    {
      title: 'Scenario Mastery',
      current: 14, // Hardcoded for now
      goal: 26,
      unit: 'scenarios',
      icon: '🎬',
      color: 'purple',
      action: () => navigate('/drill')
    },
    {
      title: 'Flashcard Mastery',
      current: 850, // Hardcoded for now
      goal: 1500,
      unit: 'cards',
      icon: '🔄',
      color: 'amber',
      action: () => navigate('/learn/flashcards')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {goalCards.map(card => {
        const progress = Math.min(100, (card.current / card.goal) * 100);

        return (
          <GlassCard key={card.title} className="p-4 hover:bg-slate-800/60 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl mb-1">{card.icon}</div>
                <h3 className="font-bold text-white">{card.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">{card.current}</div>
                <div className="text-sm text-slate-400">/ {card.goal} {card.unit}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full bg-${card.color}-500 transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-400">{progress.toFixed(0)}% complete</div>
              <ModernButton
                variant="glass"
                size="sm"
                onClick={card.action}
                className="text-xs"
              >
                {card.current >= card.goal ? 'Review' : 'Continue'}
              </ModernButton>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

const SkillProgress = ({ metrics }: { metrics: ProgressMetrics }) => {
  const skills = [
    {
      name: 'Knowledge',
      progress: metrics.knowledgeProgress,
      description: 'Theory and protocol mastery',
      icon: '🧠',
      color: 'blue'
    },
    {
      name: 'Application',
      progress: metrics.applicationProgress,
      description: 'Clinical decision making',
      icon: '⚡',
      color: 'emerald'
    },
    {
      name: 'Documentation',
      progress: metrics.documentationProgress,
      description: 'PCR and reporting skills',
      icon: '📝',
      color: 'purple'
    },
    {
      name: 'Communication',
      progress: metrics.communicationProgress,
      description: 'Radio and hand-off reports',
      icon: '🎤',
      color: 'amber'
    }
  ];

  return (
    <GlassCard className="p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">Skill Development</h2>
      <div className="space-y-6">
        {skills.map(skill => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="text-xl">{skill.icon}</div>
                <div>
                  <div className="font-bold text-white">{skill.name}</div>
                  <div className="text-sm text-slate-400">{skill.description}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-white">{skill.progress}%</div>
            </div>

            {/* Progress bar with steps */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${skill.color}-500 transition-all duration-700`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>

            {/* Improvement suggestions */}
            {skill.progress < 80 && (
              <div className="text-sm text-slate-400 flex items-center">
                <span className="mr-2">💡</span>
                {getSkillImprovementTip(skill.name, skill.progress)}
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const getSkillImprovementTip = (skill: string, progress: number): string => {
  const tips = {
    Knowledge: progress < 50
      ? 'Focus on flashcard reviews daily'
      : 'Try advanced scenario applications',
    Application: progress < 50
      ? 'Practice with timed scenarios'
      : 'Challenge yourself with complex multi-patient cases',
    Documentation: progress < 50
      ? 'Use the PCR simulator for daily practice'
      : 'Try documenting under time pressure',
    Communication: progress < 50
      ? 'Practice voice reports after each scenario'
      : 'Record and critique your hand-off reports'
  };
  return tips[skill as keyof typeof tips];
};

const CoachingInsights = ({ metrics, recentActivity }: { metrics: ProgressMetrics; recentActivity: any[] }) => {
  const navigate = useNavigate();

  const getInsight = () => {
    if (metrics.streak === 0) return "Start a streak today! Even 15 minutes counts.";
    if (metrics.studyHours < 10) return "Build your foundation. Focus on core concepts first.";
    if (metrics.knowledgeProgress < metrics.applicationProgress) {
      return "Your application is strong! Now deepen your theoretical knowledge.";
    }
    if (metrics.recentImprovements.length > 0) {
      return `Great improvement in ${metrics.recentImprovements[0]}! Build on this momentum.`;
    }
    return "Consistent daily practice beats cramming. Keep showing up!";
  };

  const getRecommendation = () => {
    const weakestSkill = [
      { name: 'Knowledge', value: metrics.knowledgeProgress },
      { name: 'Application', value: metrics.applicationProgress },
      { name: 'Documentation', value: metrics.documentationProgress },
      { name: 'Communication', value: metrics.communicationProgress }
    ].sort((a, b) => a.value - b.value)[0];

    return `Focus on improving your ${weakestSkill.name.toLowerCase()} (${weakestSkill.value}%).`;
  };

  return (
    <GlassCard className="p-6 mb-8 border border-emerald-500/20 bg-emerald-500/5">
      <div className="flex items-start">
        <div className="text-2xl mr-4">👨‍🏫</div>
        <div className="flex-1">
          <h3 className="font-bold text-white mb-2">Companion Insight</h3>
          <p className="text-slate-300 mb-4">{getInsight()}</p>
          <p className="text-slate-300 mb-6">{getRecommendation()}</p>
          <div className="flex flex-wrap gap-3">
            <ModernButton variant="gradient" size="sm" onClick={() => navigate('/drill')}>
              Practice Weakest Skill
            </ModernButton>
            <ModernButton variant="glass" size="sm" onClick={() => navigate('/learn')}>
              Study Recommendations
            </ModernButton>
            <ModernButton variant="glass" size="sm" onClick={() => navigate('/progress/analytics')}>
              View Detailed Analytics
            </ModernButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

const AchievementsComponent = ({ achievements }: { achievements: Achievement[] }) => {
  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Milestones & Achievements</h2>
        <div className="text-sm text-slate-400">
          {unlocked.length} of {achievements.length} unlocked
        </div>
      </div>

      {unlocked.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-white mb-4">Unlocked</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {unlocked.map(achievement => (
              <div
                key={achievement.id}
                className="glass-card p-4 text-center hover:bg-slate-800/60 transition-colors"
                title={achievement.description}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-bold text-white text-sm truncate">{achievement.title}</div>
                <div className="text-xs text-emerald-400 mt-1">✓ Unlocked</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div>
          <h3 className="font-bold text-white mb-4">Next Up</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {locked.slice(0, 6).map(achievement => (
              <div
                key={achievement.id}
                className="glass-card p-4 text-center opacity-50"
                title={achievement.description}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-bold text-white text-sm truncate">{achievement.title}</div>
                <div className="text-xs text-slate-500 mt-1">Locked</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
};

const getMockProgressMetrics = (context: any): ProgressMetrics => {
  // Calculate from context or use mock data
  return {
    studyHours: 142,
    studyGoal: 200,
    clinicalHours: 48,
    clinicalGoal: 150,
    streak: 7,
    examDaysRemaining: context.examDaysRemaining,
    knowledgeProgress: 72,
    applicationProgress: 65,
    documentationProgress: 61,
    communicationProgress: 58,
    achievements: getMockAchievements(),
    recentImprovements: ['Trauma scenarios', 'Medication doses']
  };
};

const getMockAchievements = (): Achievement[] => [
  { id: 'streak-7', title: '7-Day Streak', description: 'Studied for 7 consecutive days', icon: '🔥', unlocked: true, unlockedAt: new Date() },
  { id: 'scenario-10', title: 'Scenario Master', description: 'Completed 10 scenarios', icon: '🎬', unlocked: true },
  { id: 'flashcard-500', title: 'Flashcard Pro', description: 'Mastered 500 flashcards', icon: '🔄', unlocked: true },
  { id: 'quiz-90', title: 'Top Performer', description: 'Scored 90% on a quiz', icon: '🏆', unlocked: true },
  { id: 'clinical-50', title: 'Clinical Hours', description: 'Completed 50 clinical hours', icon: '🏥', unlocked: false },
  { id: 'streak-30', title: 'Month Strong', description: '30-day study streak', icon: '📅', unlocked: false },
  { id: 'scenario-all', title: 'Complete Set', description: 'Complete all 26 scenarios', icon: '⭐', unlocked: false },
  { id: 'perfect-pcr', title: 'Perfect PCR', description: '100% on a PCR documentation', icon: '📝', unlocked: false }
];

const CompanionProgressTab = () => {
  const context = useUserContext();
  const navigate = useNavigate();

  const progressMetrics = getMockProgressMetrics(context);

  return (
    <div className="space-y-8">
      <ProgressHeader
        streak={progressMetrics.streak}
        examDaysRemaining={progressMetrics.examDaysRemaining}
      />

      <ProgressOverview metrics={progressMetrics} />

      <CoachingInsights
        metrics={progressMetrics}
        recentActivity={context.recentActivity}
      />

      <SkillProgress metrics={progressMetrics} />

      <AchievementsComponent achievements={progressMetrics.achievements} />

      {/* Data Export */}
      <div className="flex justify-end">
        <ModernButton
          variant="glass"
          onClick={() => console.log('Export progress data')}
          className="text-sm"
        >
          Export Progress Report
        </ModernButton>
      </div>
    </div>
  );
};

export default CompanionProgressTab;