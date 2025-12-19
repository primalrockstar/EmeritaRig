import { useState, useEffect, useCallback } from 'react';
import PerformanceTracker, { PerformanceEvent, WeakArea, StudyStreak, TrackEventData } from '../services/performanceTracker';
import { FlashcardTracker } from '../services/flashcardTracker';
import { PcrTracker } from '../services/pcrTracker';

interface UserContext {
  hasWeakAreas: boolean;
  hasRecentActivity: boolean;
  examDaysRemaining: number;
}

export const usePerformanceTracker = () => {
  const [performanceEvents, setPerformanceEvents] = useState<PerformanceEvent[]>([]);
  const [quizEvents, setQuizEvents] = useState<PerformanceEvent[]>([]);
  const [scenarioEvents, setScenarioEvents] = useState<PerformanceEvent[]>([]);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [studyStreak, setStudyStreak] = useState<StudyStreak | null>(null);
  const [userContext, setUserContext] = useState<UserContext>({
    hasWeakAreas: false,
    hasRecentActivity: true, // Assume recent activity for demo
    examDaysRemaining: 45
  });

  // Load initial data
  const loadData = useCallback(() => {
    const events = PerformanceTracker.getAllEvents();
    const quiz = events.filter(e => e.activityType === 'quiz');
    const scenarios = events.filter(e => e.activityType === 'scenario');
    const areas = PerformanceTracker.getCachedWeakAreas();
    const streak = PerformanceTracker.getStudyStreak();

    setPerformanceEvents(events);
    setQuizEvents(quiz);
    setScenarioEvents(scenarios);
    setWeakAreas(areas);
    setStudyStreak(streak);

    setUserContext({
      hasWeakAreas: areas.length > 0,
      hasRecentActivity: events.length > 0,
      examDaysRemaining: 45 // This could be calculated based on user data
    });
  }, []);

  // Track event and update state
  const trackEvent = useCallback((event: TrackEventData) => {
    PerformanceTracker.trackEvent(event);
    loadData(); // Refresh data
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('performanceUpdate'));
  }, [loadData]);

  // Listen for updates from other components
  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('performanceUpdate', handleUpdate);
    return () => window.removeEventListener('performanceUpdate', handleUpdate);
  }, [loadData]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const getFlashcardWeakAreas = useCallback((): string[] => {
    try {
      const analytics = FlashcardTracker.getInstance().getAnalytics();
      return Object.entries(analytics.topics || {})
        .filter(([_, data]: [string, any]) => data.reviews >= 5 && data.averageScore < 70)
        .map(([topic]) => topic);
    } catch {
      return [];
    }
  }, []);

  const getDueFlashcardsCount = useCallback((): number => {
    try {
      const analytics = FlashcardTracker.getInstance().getAnalytics();
      return analytics.dueCards;
    } catch {
      return 0;
    }
  }, []);

  const getPcrRecommendedActions = useCallback(() => {
    try {
      return PcrTracker.getInstance().getRecommendedActions();
    } catch {
      return [];
    }
  }, []);

  const getPcrAnalytics = useCallback(() => {
    try {
      return PcrTracker.getInstance().getAnalytics();
    } catch {
      return {
        totalReports: 0,
        averageScore: 0,
        passRate: 0,
        moduleProgress: {},
        recentActivity: []
      };
    }
  }, []);

  return {
    performanceEvents,
    quizEvents,
    scenarioEvents,
    weakAreas,
    studyStreak,
    userContext,
    trackEvent,
    refreshData: loadData,
    getFlashcardWeakAreas,
    getDueFlashcardsCount,
    getPcrRecommendedActions,
    getPcrAnalytics
  };
};

export default usePerformanceTracker;