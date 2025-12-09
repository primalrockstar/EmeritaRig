import React from 'react';
import { useUserContext } from '../../../hooks/useUserContext';
import { useAuth } from '../../../auth/AuthContext';
import { CompanionCard, CompanionCardProps } from './CompanionCard';
import { GlassCard } from '../../../components/ui/ModernGlassComponents';
import { ModernButton } from '../../../components/ui/ModernGlassComponents';
import { useNavigate } from 'react-router-dom';
import FTOIntro from '../../../features/onboarding/FTOIntro';

type CardType = CompanionCardProps;

const getTimeBasedCards = (timeOfDay: string, navigate: any): CardType[] => {
  switch(timeOfDay) {
    case 'morning':
      return [
        {
          id: 'morning-drill',
          title: '3-Minute Scenario',
          description: 'Start your day with a quick clinical decision',
          estimatedTime: 3,
          priority: 'high' as const,
          icon: '⚡',
          type: 'scenario' as const,
          onAction: () => navigate('/drill/scenario/random')
        },
        {
          id: 'daily-med',
          title: 'Daily Medication Review',
          description: 'Epinephrine: Indications & Doses',
          estimatedTime: 2,
          priority: 'medium' as const,
          icon: '💊',
          type: 'reference' as const,
          onAction: () => navigate('/reference/pharmacology/epinephrine')
        }
      ];
    case 'afternoon':
      return [
        {
          id: 'afternoon-practice',
          title: 'Skill Practice Session',
          description: 'Practice clinical skills with interactive tools',
          estimatedTime: 15,
          priority: 'high' as const,
          icon: '🏥',
          type: 'scenario' as const,
          onAction: () => navigate('/practice/skills')
        },
        {
          id: 'chapter-review',
          title: 'Chapter Review Quiz',
          description: 'Test your knowledge on recent topics',
          estimatedTime: 10,
          priority: 'medium' as const,
          icon: '📚',
          type: 'quiz' as const,
          onAction: () => navigate('/drill/quiz/daily')
        }
      ];
    case 'evening':
      return [
        {
          id: 'evening-review',
          title: 'Evening Knowledge Review',
          description: 'Review today\'s learnings',
          estimatedTime: 5,
          priority: 'medium' as const,
          icon: '🌙',
          type: 'reference' as const,
          onAction: () => navigate('/review/daily')
        }
      ];
    case 'late':
      return [
        {
          id: 'quick-win',
          title: 'Quick Win Session',
          description: 'A short, focused practice session',
          estimatedTime: 5,
          priority: 'medium' as const,
          icon: '⭐',
          type: 'quiz' as const,
          onAction: () => navigate('/drill/quick-win')
        }
      ];
    default:
      return [];
  }
};

const getContextBasedCards = (
  weakAreas: string[],
  upcomingEvents: any[],
  examDaysRemaining: number | undefined,
  navigate: any
) => {
  const cards = [];

  // Weakness cards
  weakAreas.slice(0, 2).forEach(area => {
    cards.push({
      id: `weakness-${area.toLowerCase()}`,
      title: `Improve: ${area}`,
      description: `Focus on your weakest area`,
      estimatedTime: 10,
      priority: 'high' as const,
      icon: '🎯',
      type: 'quiz' as const,
      onAction: () => navigate(`/drill/quiz?topic=${area}`)
    });
  });

  // Upcoming event cards
  upcomingEvents.slice(0, 1).forEach(event => {
    cards.push({
      id: `event-${event.id}`,
      title: `Prepare: ${event.topic}`,
      description: `${event.type} in ${getHoursUntil(event.startTime)} hours`,
      estimatedTime: 5,
      priority: 'medium' as const,
      icon: '📖',
      type: 'reference' as const,
      onAction: () => navigate(`/learn/chapter/${getChapterForTopic(event.topic)}`)
    });
  });

  // Exam countdown card
  if (examDaysRemaining && examDaysRemaining < 30) {
    cards.push({
      id: 'exam-countdown',
      title: `Exam in ${examDaysRemaining} days`,
      description: examDaysRemaining < 7 ? 'Final review phase' : 'Focused preparation',
      estimatedTime: 20,
      priority: examDaysRemaining < 7 ? 'high' : 'medium' as const,
      icon: '📝',
      type: 'quiz' as const,
      onAction: () => navigate('/drill/exam-sim')
    });
  }

  return cards;
};

const getRoleBasedCards = (userRole: string, navigate: any) => {
  if (userRole === 'student') {
    return [
      {
        id: 'clinical-hours',
        title: 'Track Clinical Hours',
        description: 'Log today\'s clinical experience',
        estimatedTime: 2,
        priority: 'low' as const,
        icon: '🏥',
        type: 'reference' as const,
        onAction: () => navigate('/progress/log-hours')
      }
    ];
  }

  if (userRole === 'working') {
    return [
      {
        id: 'protocol-update',
        title: 'Protocol Updates',
        description: 'Review latest protocol changes',
        estimatedTime: 5,
        priority: 'medium' as const,
        icon: '📋',
        type: 'reference' as const,
        onAction: () => navigate('/reference/protocols/latest')
      }
    ];
  }

  return [];
};

const WelcomeHeader = ({ timeOfDay, userRole }: { timeOfDay: string; userRole: string }) => {
  const greetings = {
    morning: `Good morning, ${userRole === 'student' ? 'EMT student' : 'EMT'}!`,
    afternoon: 'Good afternoon! Time for focused practice.',
    evening: 'Good evening. Let\'s review your day.',
    late: 'Working late? Let\'s do a quick win.'
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {greetings[timeOfDay as keyof typeof greetings]}
      </h1>
      <p className="text-slate-300">
        Your companion dashboard is ready with personalized recommendations.
      </p>
    </div>
  );
};

const StatsBar = ({
  streak,
  studyHours,
  studyGoal,
  examDaysRemaining
}: {
  streak: number;
  studyHours: number;
  studyGoal: number;
  examDaysRemaining?: number;
}) => {
  const studyProgress = Math.min(100, (studyHours / studyGoal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <GlassCard className="p-4 text-center">
        <div className="text-2xl font-bold text-emerald-400">{streak}</div>
        <div className="text-sm text-slate-400">Day Streak</div>
      </GlassCard>

      <GlassCard className="p-4 text-center">
        <div className="text-2xl font-bold text-white">{studyHours}h</div>
        <div className="text-sm text-slate-400">
          Study Hours ({studyProgress.toFixed(0)}% of goal)
        </div>
        <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${studyProgress}%` }}
          />
        </div>
      </GlassCard>

      {examDaysRemaining && (
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{examDaysRemaining}</div>
          <div className="text-sm text-slate-400">Days Until Exam</div>
        </GlassCard>
      )}
    </div>
  );
};

const ContextMessage = ({
  weakAreas,
  upcomingEvents,
  examDaysRemaining
}: {
  weakAreas: string[];
  upcomingEvents: any[];
  examDaysRemaining?: number;
}) => {
  const getMessage = () => {
    if (examDaysRemaining && examDaysRemaining < 7) {
      return `Exam in ${examDaysRemaining} days! Focus on high-yield topics.`;
    }

    if (weakAreas.length > 0) {
      return `You have ${weakAreas.length} weak areas to focus on: ${weakAreas.join(', ')}`;
    }

    if (upcomingEvents.length > 0) {
      const nextEvent = upcomingEvents[0];
      return `Your ${nextEvent.type} starts in ${getHoursUntil(nextEvent.startTime)} hours. Prepare now!`;
    }

    return 'Keep up the great work! Consider reviewing older material today.';
  };

  return (
    <GlassCard className="p-4 mb-8 border border-emerald-500/20 bg-emerald-500/5">
      <div className="flex items-start">
        <div className="text-xl mr-3">💡</div>
        <p className="text-slate-300">{getMessage()}</p>
      </div>
    </GlassCard>
  );
};

const CompanionDashboard = () => {
  const { user } = useAuth();

  if (!user?.hasSeenOnboarding) {
    return <FTOIntro />;
  }

  const {
    timeOfDay,
    userRole,
    upcomingEvents,
    weakAreas,
    recentActivity,
    goals,
    examDaysRemaining,
    clinicalHoursRemaining,
    streak,
    loading
  } = useUserContext();

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-slate-800 rounded animate-pulse w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-800 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Generate all cards
  const timeCards = getTimeBasedCards(timeOfDay, navigate);
  const contextCards = getContextBasedCards(weakAreas, upcomingEvents, examDaysRemaining, navigate);
  const roleCards = getRoleBasedCards(userRole, navigate);

  const allCards = [...timeCards, ...contextCards, ...roleCards] as CardType[];

  // Sort by priority (high > medium > low)
  const sortedCards = allCards.sort((a, b) => {
    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-6">
      <WelcomeHeader timeOfDay={timeOfDay} userRole={userRole} />

      <StatsBar
        streak={streak}
        studyHours={goals.studyHours || 0}
        studyGoal={goals.studyGoal}
        examDaysRemaining={examDaysRemaining}
      />

      <ContextMessage
        weakAreas={weakAreas}
        upcomingEvents={upcomingEvents}
        examDaysRemaining={examDaysRemaining}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCards.map(card => (
          <CompanionCard key={card.id} {...card} />
        ))}
      </div>

      {sortedCards.length === 0 && (
        <GlassCard className="p-8 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-white mb-2">No Recommendations Yet</h3>
          <p className="text-slate-300 mb-4">
            Complete some activities to get personalized recommendations.
          </p>
          <ModernButton
            variant="primary"
            onClick={() => navigate('/drill')}
          >
            Start a Practice Session
          </ModernButton>
        </GlassCard>
      )}

      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-slate-400">
          {sortedCards.length} recommendations based on your current context
        </div>
        <ModernButton
          variant="ghost"
          onClick={() => window.location.reload()}
          className="text-sm"
        >
          Refresh Recommendations
        </ModernButton>
      </div>
    </div>
  );
};

const getHoursUntil = (date: Date) => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60));
};

const getChapterForTopic = (topic: string) => {
  // Map topics to chapter IDs (simplified)
  const topicMap: Record<string, string> = {
    'Trauma': '20',
    'Cardiology': '12',
    'Pharmacology': '6',
    'Pediatrics': '16'
  };
  return topicMap[topic] || '1';
};

export default CompanionDashboard;