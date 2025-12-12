import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import CompanionCard from './CompanionCard';
import { GlassCard } from '../ui/ModernGlassComponents';
import { ModernButton } from '../ui/ModernGlassComponents';

const CompanionDashboard = () => {
  const {
    timeOfDay,
    userRole,
    upcomingEvents,
    weakAreas,
    recentActivity,
    goals,
    examDaysRemaining,
    clinicalHoursRemaining,
    loading
  } = useUserContext();

  const { getFlashcardWeakAreas, getDueFlashcardsCount } = usePerformanceTracker();
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

  // Generate cards based on context
  const generateCards = () => {
    const cards = [];

    // Morning-specific cards
    if (timeOfDay === 'morning') {
      cards.push({
        id: 'morning-drill',
        title: '3-Minute Scenario',
        description: 'Start your day with a quick clinical decision',
        estimatedTime: 3,
        priority: 'high' as const,
        icon: '⚡',
        type: 'scenario' as const,
        onAction: () => navigate('/drill/scenario/random')
      });

      if (upcomingEvents.length > 0) {
        const nextEvent = upcomingEvents[0];
        cards.push({
          id: 'class-prep',
          title: `Preview: ${nextEvent.topic}`,
          description: `Your ${nextEvent.type} starts in ${getHoursUntil(nextEvent.startTime)} hours`,
          estimatedTime: 5,
          priority: 'medium' as const,
          icon: '📖',
          type: 'reference' as const,
          onAction: () => navigateToChapter(nextEvent.topic)
        });
      }
    }

    // Weakness-based cards
    if (weakAreas.length > 0) {
      weakAreas.slice(0, 2).forEach(area => {
        cards.push({
          id: `weakness-${area.toLowerCase().replace(' ', '-')}`,
          title: `Improve: ${area}`,
          description: 'Focus on your weakest area',
          estimatedTime: 10,
          priority: 'high' as const,
          icon: '🎯',
          type: 'quiz' as const,
          onAction: () => navigate(`/drill/quiz?topic=${area}`)
        });
      });
    }

    // Exam countdown card
    if (examDaysRemaining && examDaysRemaining < 30) {
      cards.push({
        id: 'exam-prep',
        title: `Exam in ${examDaysRemaining} days`,
        description: examDaysRemaining < 7 ? 'Final review phase' : 'Focused preparation',
        estimatedTime: 20,
        priority: examDaysRemaining < 7 ? 'high' : 'medium' as const,
        icon: '📝',
        type: 'quiz' as const,
        onAction: () => navigate('/drill/exam-sim')
      });
    }

    // Role-based cards
    if (userRole === 'student') {
      cards.push({
        id: 'clinical-hours',
        title: 'Track Clinical Hours',
        description: 'Log today\'s clinical experience',
        estimatedTime: 2,
        priority: 'low' as const,
        icon: '🏥',
        type: 'progress' as const,
        onAction: () => navigate('/progress/log-hours')
      });
    } else if (userRole === 'working') {
      cards.push({
        id: 'protocol-update',
        title: 'Protocol Updates',
        description: 'Review latest protocol changes',
        estimatedTime: 5,
        priority: 'medium' as const,
        icon: '📋',
        type: 'reference' as const,
        onAction: () => navigate('/reference/protocols/latest')
      });
    }

    return cards;
  };

  const generateFlashcardCards = () => {
    const cards = [];
    const flashcardStats = { dueCards: getDueFlashcardsCount(), topics: getFlashcardWeakAreas() };

    if (flashcardStats && flashcardStats.dueCards !== undefined) {
      // Card for due flashcards
      if (flashcardStats.dueCards > 0) {
        cards.push({
          id: 'flashcards-due',
          title: `📚 Review Due Flashcards`,
          description: `${flashcardStats.dueCards} cards waiting for review`,
          estimatedTime: Math.ceil(flashcardStats.dueCards * 0.3),
          priority: 'high' as const,
          icon: '🔄',
          type: 'flashcards' as const,
          onAction: () => navigate('/flashcards/review')
        });
      }

      // Card for weakest flashcard topics
      const weakestTopic = flashcardStats.topics
        .filter(t => t.totalReviews >= 5) // Only consider well-reviewed topics
        .sort((a, b) => a.averageScore - b.averageScore)[0];

      if (weakestTopic && weakestTopic.averageScore < 70) {
        cards.push({
          id: `flashcards-weak-${weakestTopic.topic}`,
          title: `🎯 Improve: ${weakestTopic.topic}`,
          description: `Flashcard performance: ${Math.round(weakestTopic.averageScore)}%`,
          estimatedTime: 10,
          priority: 'medium' as const,
          icon: '📊',
          type: 'flashcards' as const,
          onAction: () => navigate(`/flashcards/topic/${encodeURIComponent(weakestTopic.topic)}`)
        });
      }

      // Card for spaced repetition streak
      const today = new Date().toDateString();
      const lastStudy = localStorage.getItem('lastFlashcardStudy');
      if (lastStudy !== today) {
        cards.push({
          id: 'flashcards-daily',
          title: `🔥 Maintain Your Streak`,
          description: `Daily flashcard review to keep knowledge fresh`,
          estimatedTime: 5,
          priority: 'low' as const,
          icon: '🔥',
          type: 'flashcards' as const,
          onAction: () => navigate('/flashcards/daily')
        });
      }
    }

    return cards;
  };

  const cards = [...generateCards(), ...generateFlashcardCards()];

  // Sort by priority (high > medium > low)
  const sortedCards = cards.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {timeOfDay === 'morning' && `Good morning, ${userRole === 'student' ? 'EMT student' : 'EMT'}!`}
          {timeOfDay === 'afternoon' && 'Good afternoon! Time for focused practice.'}
          {timeOfDay === 'evening' && 'Good evening. Let\'s review your day.'}
          {timeOfDay === 'late' && 'Working late? Let\'s do a quick win.'}
        </h1>
        <p className="text-slate-300">
          Your companion dashboard is ready with personalized recommendations.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">7</div>
          <div className="text-sm text-slate-400">Day Streak</div>
        </GlassCard>

        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-white">142h</div>
          <div className="text-sm text-slate-400">Study Hours (71% of goal)</div>
          <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '71%' }} />
          </div>
        </GlassCard>

        {examDaysRemaining && (
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{examDaysRemaining}</div>
            <div className="text-sm text-slate-400">Days Until Exam</div>
          </GlassCard>
        )}
      </div>

      {/* Context Message */}
      <GlassCard className="p-4 mb-8 border border-emerald-500/20 bg-emerald-500/5">
        <div className="flex items-start">
          <div className="text-xl mr-3">💡</div>
          <p className="text-slate-300">
            {examDaysRemaining && examDaysRemaining < 7
              ? `Exam in ${examDaysRemaining} days! Focus on high-yield topics.`
              : weakAreas.length > 0
              ? `You have ${weakAreas.length} weak areas to focus on: ${weakAreas.join(', ')}`
              : upcomingEvents.length > 0
              ? `Your ${upcomingEvents[0].type} on ${upcomingEvents[0].topic} is coming up. Prepare now!`
              : 'Keep up the great work! Consider reviewing older material today.'
            }
          </p>
        </div>
      </GlassCard>

      {/* Companion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCards.map(card => (
          <CompanionCard key={card.id} {...card} />
        ))}
      </div>

      {/* Empty State */}
      {sortedCards.length === 0 && (
        <GlassCard className="p-8 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-white mb-2">No Recommendations Yet</h3>
          <p className="text-slate-300 mb-4">
            Complete some activities to get personalized recommendations.
          </p>
          <ModernButton
            variant="gradient"
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
          variant="glass"
          onClick={() => window.location.reload()}
          className="text-sm"
        >
          Refresh Recommendations
        </ModernButton>
      </div>
    </div>
  );
};

// Helper functions
const getHoursUntil = (date: Date) => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60));
};

const navigateToChapter = (topic: string) => {
  // Implement based on your chapter mapping
  console.log('Navigate to chapter for topic:', topic);
};

export default CompanionDashboard;