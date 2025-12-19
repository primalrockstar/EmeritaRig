export interface PerformanceEvent {
  id: string;
  userId: string;
  activityType: 'quiz' | 'scenario' | 'flashcard' | 'reference' | 'study' | 'pcr';
  activityId: string;
  topic: string;
  subtopic?: string;
  score: number; // 0-100
  timeSpent: number; // seconds
  timestamp: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
  metadata: Record<string, any>;
  correctAnswers?: number;
  totalQuestions?: number;
}

// Helper type for tracking events (userId optional)
export interface TrackEventData extends Omit<PerformanceEvent, 'id' | 'timestamp' | 'userId'> {
  userId?: string;
}

export interface WeakArea {
  topic: string;
  averageScore: number;
  attempts: number;
  lastAttempt: Date;
  trend: 'improving' | 'declining' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastActivity: Date;
  daysActive: string[]; // ISO date strings
}

export class PerformanceTracker {
  private static readonly STORAGE_KEY = 'emt_performance_events';
  private static readonly WEAK_AREAS_KEY = 'emt_weak_areas';
  private static readonly STREAK_KEY = 'emt_study_streak';
  private static readonly MAX_EVENTS = 2000; // Keep last 2000 events

  // Track a performance event
  static trackEvent(event: TrackEventData): void {
    try {
      const performanceEvent: PerformanceEvent = {
        ...event,
        userId: event.userId || 'demo-user', // Default userId for demo purposes
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date()
      };

      // Validate activity type
      const allowedTypes = ['quiz', 'scenario', 'flashcard', 'reference', 'study', 'pcr'];
      if (!allowedTypes.includes(performanceEvent.activityType)) {
        console.warn(`Unknown activity type: ${performanceEvent.activityType}`);
      }

      // Get existing events
      const events = this.getAllEvents();

      // Add new event
      events.push(performanceEvent);

      // Keep only recent events (limit storage)
      const recentEvents = events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, this.MAX_EVENTS);

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentEvents, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));

      // Update weak areas in real-time
      this.updateWeakAreas();

      // Update study streak
      this.updateStudyStreak();

      console.log('Performance event tracked:', performanceEvent);
    } catch (error) {
      console.error('Failed to track performance event:', error);
    }
  }

  // Get all performance events
  static getAllEvents(): PerformanceEvent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return parsed.map((event: any) => ({
        ...event,
        timestamp: new Date(event.timestamp)
      }));
    } catch (error) {
      console.error('Failed to load performance events:', error);
      return [];
    }
  }

  // Get events for a specific topic
  static getTopicEvents(topic: string, daysBack: number = 30): PerformanceEvent[] {
    const allEvents = this.getAllEvents();
    const cutoffDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000);

    return allEvents.filter(event =>
      event.topic.toLowerCase() === topic.toLowerCase() &&
      event.timestamp >= cutoffDate
    );
  }

  // Calculate weak areas based on recent performance
  static getWeakAreas(): WeakArea[] {
    const events = this.getAllEvents();
    const lastWeek = events.filter(e =>
      e.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    // Group by topic
    const topicStats: Record<string, {
      scores: number[];
      attempts: number;
      lastAttempt: Date;
      recentScores: number[];
    }> = {};

    lastWeek.forEach(event => {
      const topic = event.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = {
          scores: [],
          attempts: 0,
          lastAttempt: event.timestamp,
          recentScores: []
        };
      }

      topicStats[topic].scores.push(event.score);
      topicStats[topic].attempts += 1;
      topicStats[topic].lastAttempt = new Date(Math.max(
        topicStats[topic].lastAttempt.getTime(),
        event.timestamp.getTime()
      ));
    });

    // Calculate weak areas (average < 70% and at least 3 attempts)
    const weakAreas: WeakArea[] = [];

    Object.entries(topicStats).forEach(([topic, stats]) => {
      if (stats.attempts >= 3) {
        const averageScore = stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length;

        if (averageScore < 70) {
          // Calculate trend (simplified)
          const recentAvg = stats.scores.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, stats.scores.length);
          const olderAvg = stats.scores.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(1, stats.scores.length - 3);

          let trend: 'improving' | 'declining' | 'stable' = 'stable';
          if (recentAvg > olderAvg + 5) trend = 'improving';
          else if (recentAvg < olderAvg - 5) trend = 'declining';

          let priority: 'high' | 'medium' | 'low' = 'medium';
          if (averageScore < 50) priority = 'high';
          else if (averageScore > 60) priority = 'low';

          weakAreas.push({
            topic,
            averageScore: Math.round(averageScore),
            attempts: stats.attempts,
            lastAttempt: stats.lastAttempt,
            trend,
            priority
          });
        }
      }
    });

    // Sort by priority and average score
    return weakAreas.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.averageScore - b.averageScore; // Lower scores first
    });
  }

  // Update and cache weak areas
  private static updateWeakAreas(): void {
    try {
      const weakAreas = this.getWeakAreas();
      localStorage.setItem(this.WEAK_AREAS_KEY, JSON.stringify(weakAreas, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    } catch (error) {
      console.error('Failed to update weak areas:', error);
    }
  }

  // Get cached weak areas (faster than recalculating)
  static getCachedWeakAreas(): WeakArea[] {
    try {
      const stored = localStorage.getItem(this.WEAK_AREAS_KEY);
      if (!stored) return this.getWeakAreas(); // Fallback to calculation

      const parsed = JSON.parse(stored);
      return parsed.map((area: any) => ({
        ...area,
        lastAttempt: new Date(area.lastAttempt)
      }));
    } catch (error) {
      console.error('Failed to load cached weak areas:', error);
      return this.getWeakAreas();
    }
  }

  // Study streak management
  static updateStudyStreak(): void {
    try {
      const today = new Date().toDateString();
      const existingStreak: StudyStreak = this.getStudyStreak();

      // If already active today, no change needed
      if (existingStreak.daysActive.includes(today)) return;

      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let newStreak: StudyStreak;

      if (existingStreak.daysActive.includes(yesterday)) {
        // Continue streak
        newStreak = {
          ...existingStreak,
          current: existingStreak.current + 1,
          daysActive: [...existingStreak.daysActive, today],
          lastActivity: new Date()
        };
      } else {
        // Start new streak
        newStreak = {
          current: 1,
          longest: Math.max(existingStreak.longest, existingStreak.current),
          daysActive: [today],
          lastActivity: new Date()
        };
      }

      localStorage.setItem(this.STREAK_KEY, JSON.stringify(newStreak, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    } catch (error) {
      console.error('Failed to update study streak:', error);
    }
  }

  static getStudyStreak(): StudyStreak {
    try {
      const stored = localStorage.getItem(this.STREAK_KEY);
      if (!stored) {
        return {
          current: 0,
          longest: 0,
          lastActivity: new Date(0),
          daysActive: []
        };
      }

      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        lastActivity: new Date(parsed.lastActivity)
      };
    } catch (error) {
      console.error('Failed to load study streak:', error);
      return {
        current: 0,
        longest: 0,
        lastActivity: new Date(0),
        daysActive: []
      };
    }
  }

  // Get topic performance statistics
  static getTopicPerformance(topic: string): {
    averageScore: number;
    attempts: number;
    lastAttempt: Date;
    trend: 'improving' | 'declining' | 'stable';
    bestScore: number;
    recentScore: number;
  } {
    const events = this.getTopicEvents(topic, 30); // Last 30 days

    if (events.length === 0) {
      return {
        averageScore: 0,
        attempts: 0,
        lastAttempt: new Date(0),
        trend: 'stable',
        bestScore: 0,
        recentScore: 0
      };
    }

    const scores = events.map(e => e.score);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    // Calculate trend
    const recentEvents = events.slice(0, 5); // Last 5 attempts
    const olderEvents = events.slice(5, 10); // Previous 5 attempts

    let trend: 'improving' | 'declining' | 'stable' = 'stable';

    if (recentEvents.length > 0 && olderEvents.length > 0) {
      const recentAvg = recentEvents.reduce((sum, e) => sum + e.score, 0) / recentEvents.length;
      const olderAvg = olderEvents.reduce((sum, e) => sum + e.score, 0) / olderEvents.length;

      if (recentAvg > olderAvg + 5) trend = 'improving';
      else if (recentAvg < olderAvg - 5) trend = 'declining';
    }

    return {
      averageScore: Math.round(averageScore),
      attempts: events.length,
      lastAttempt: events[0].timestamp,
      trend,
      bestScore: Math.max(...scores),
      recentScore: events[0].score
    };
  }

  // Export all data for backup
  static exportData(): string {
    const data = {
      events: this.getAllEvents(),
      weakAreas: this.getWeakAreas(),
      streak: this.getStudyStreak(),
      exportDate: new Date().toISOString()
    };

    return JSON.stringify(data, null, 2);
  }

  // Import data from backup
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);

      if (data.events) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.events));
      }

      if (data.streak) {
        localStorage.setItem(this.STREAK_KEY, JSON.stringify(data.streak));
      }

      this.updateWeakAreas();
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Clear all data (for testing or reset)
  static clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.WEAK_AREAS_KEY);
    localStorage.removeItem(this.STREAK_KEY);
  }

  // Get learning insights
  static getLearningInsights(): {
    totalStudyTime: number;
    averageScore: number;
    mostStudiedTopic: string;
    improvementAreas: string[];
    strengths: string[];
  } {
    const events = this.getAllEvents();
    const last30Days = events.filter(e =>
      e.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (last30Days.length === 0) {
      return {
        totalStudyTime: 0,
        averageScore: 0,
        mostStudiedTopic: '',
        improvementAreas: [],
        strengths: []
      };
    }

    // Calculate total study time
    const totalStudyTime = last30Days.reduce((sum, e) => sum + e.timeSpent, 0);

    // Calculate average score
    const averageScore = last30Days.reduce((sum, e) => sum + e.score, 0) / last30Days.length;

    // Find most studied topic
    const topicCounts: Record<string, number> = {};
    last30Days.forEach(e => {
      topicCounts[e.topic] = (topicCounts[e.topic] || 0) + 1;
    });
    const mostStudiedTopic = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    // Get improvement areas (weak areas)
    const improvementAreas = this.getWeakAreas()
      .filter(area => area.priority === 'high')
      .map(area => area.topic);

    // Get strengths (topics with >80% average)
    const topicAverages: Record<string, { scores: number[], count: number }> = {};
    last30Days.forEach(e => {
      if (!topicAverages[e.topic]) {
        topicAverages[e.topic] = { scores: [], count: 0 };
      }
      topicAverages[e.topic].scores.push(e.score);
      topicAverages[e.topic].count += 1;
    });

    const strengths = Object.entries(topicAverages)
      .filter(([, data]) => data.scores.reduce((a, b) => a + b, 0) / data.scores.length > 80)
      .map(([topic]) => topic);

    return {
      totalStudyTime: Math.round(totalStudyTime / 60), // Convert to minutes
      averageScore: Math.round(averageScore),
      mostStudiedTopic,
      improvementAreas,
      strengths
    };
  }
}

// Default export for easier importing
export default PerformanceTracker;