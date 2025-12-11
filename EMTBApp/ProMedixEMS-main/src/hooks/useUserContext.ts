import { useState, useEffect } from 'react';
import { usePerformanceTracker } from './usePerformanceTracker';

interface UserEvent {
  topic: string;
  type: string;
  startTime: Date;
}

interface RecentActivity {
  topic: string;
  type: string;
  timestamp: Date;
  score?: number;
}

interface UserGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
}

interface UserContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late';
  userRole: 'student' | 'working';
  upcomingEvents: UserEvent[];
  weakAreas: string[];
  recentActivity: RecentActivity[];
  goals: UserGoal[];
  examDaysRemaining: number;
  clinicalHoursRemaining: number;
  loading: boolean;
}

export const useUserContext = (): UserContext => {
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState<UserContext | null>(null);
  const { weakAreas: performanceWeakAreas, studyStreak: performanceStreak, performanceEvents } = usePerformanceTracker();

  // Get time of day
  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'late' => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'late';
  };

  useEffect(() => {
    // Load real performance data
    const loadUserData = () => {
      try {
        // Get real weak areas from performance tracking
        const realWeakAreas = performanceWeakAreas.map(area => area.topic);
        // If no weak areas yet, use some initial mock data to get started
        const weakAreas = realWeakAreas.length > 0 ? realWeakAreas.slice(0, 3) :
          ["Airway Management", "CPR", "Pediatric Assessment"];

        // Get recent activity from performance events
        const recentEvents = performanceEvents
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 5);

        const recentActivity = recentEvents.map(event => ({
          topic: event.topic,
          type: event.activityType as any,
          timestamp: event.timestamp,
          score: event.score
        }));

        // Get study streak
        const streak = performanceStreak;

        // Calculate basic insights from performance events
        const totalStudyTime = performanceEvents.reduce((acc, event) => acc + (event.timeSpent || 0), 0);
        const averageScore = performanceEvents.length > 0
          ? performanceEvents.reduce((acc, event) => acc + (event.score || 0), 0) / performanceEvents.length
          : 0;

        // Calculate goals based on real data
        const goals = [
          {
            id: 'study-hours',
            title: 'Study Hours This Week',
            current: Math.round(totalStudyTime / 60 * 10) / 10, // Convert minutes to hours
            target: 20,
            unit: 'hours'
          },
          {
            id: 'quiz-average',
            title: 'Quiz Average Score',
            current: Math.round(averageScore),
            target: 90,
            unit: '%'
          },
          {
            id: 'scenarios-completed',
            title: 'Scenarios This Month',
            current: performanceEvents.filter(e =>
              e.activityType === 'scenario' &&
              e.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length,
            target: 30,
            unit: 'scenarios'
          }
        ];

        const userContext: UserContext = {
          timeOfDay: getTimeOfDay(),
          userRole: 'student', // Could be dynamic based on user profile
          upcomingEvents: [
            {
              topic: "Cardiology and ECG Interpretation",
              type: "class",
              startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
            },
            {
              topic: "Trauma Assessment Lab",
              type: "practical",
              startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            },
          ],
          weakAreas,
          recentActivity,
          goals,
          examDaysRemaining: 28, // Could be calculated from user settings
          clinicalHoursRemaining: 120, // Could be tracked separately
          loading: false
        };

        setContext(userContext);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load user context:', error);
        // Fallback to basic mock data
        setContext({
          timeOfDay: getTimeOfDay(),
          userRole: 'student',
          upcomingEvents: [],
          weakAreas: ["Airway Management", "CPR"],
          recentActivity: [],
          goals: [
            {
              id: 'study-hours',
              title: 'Study Hours This Week',
              current: 0,
              target: 20,
              unit: 'hours'
            }
          ],
          examDaysRemaining: 28,
          clinicalHoursRemaining: 120,
          loading: false
        });
        setLoading(false);
      }
    };

    loadUserData();
  }, [performanceWeakAreas, performanceEvents, performanceStreak]);

  return context || {
    timeOfDay: getTimeOfDay(),
    userRole: 'student',
    upcomingEvents: [],
    weakAreas: [],
    recentActivity: [],
    goals: [],
    examDaysRemaining: 28,
    clinicalHoursRemaining: 120,
    loading
  };
};