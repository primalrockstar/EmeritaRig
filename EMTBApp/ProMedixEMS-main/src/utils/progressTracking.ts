/**
 * Progress Tracking Utility
 * Provides localStorage-based progress tracking for all learning activities
 * Works without authentication - progress is saved per browser/device
 */

// Types for different progress tracking needs
export interface QuizProgress {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeTaken?: number;
  answers: { questionId: string; correct: boolean; userAnswer: string }[];
}

export interface FlashcardProgress {
  chapterId: string;
  masteredCards: string[];
  reviewCards: string[];
  lastStudied: string;
  totalCards: number;
  masteryPercentage: number;
}

export interface PCRProgress {
  scenarioId: string;
  format: 'SOAP' | 'CHART' | 'Hybrid';
  completedAt: string;
  content: {
    [key: string]: string; // Flexible to store different format fields
  };
  feedback?: string[];
  score?: number;
}

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  lastAccessed: string;
  timeSpent: number; // in seconds
  sectionsViewed: string[];
  notesCount: number;
}

export interface StudySession {
  sessionId: string;
  startTime: string;
  endTime?: string;
  activityType: 'quiz' | 'flashcards' | 'pcr' | 'study-notes' | 'scenarios' | 'calculators';
  resourceId: string;
  duration?: number; // in seconds
}

export interface UserProgress {
  quizzes: QuizProgress[];
  flashcards: FlashcardProgress[];
  pcrPractice: PCRProgress[];
  chapters: ChapterProgress[];
  studySessions: StudySession[];
  statistics: {
    totalQuizzesTaken: number;
    averageQuizScore: number;
    totalStudyTime: number; // in seconds
    streak: number; // consecutive days studied
    lastActiveDate: string;
    chaptersCompleted: number;
    flashcardsMastered: number;
  };
  preferences: {
    favoriteChapters: string[];
    bookmarkedTopics: string[];
    preferredQuizDifficulty?: 'easy' | 'medium' | 'hard';
  };
}

const STORAGE_KEY = 'promedix_user_progress';

/**
 * Get all user progress from localStorage
 */
export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }

  // Return default structure
  return {
    quizzes: [],
    flashcards: [],
    pcrPractice: [],
    chapters: [],
    studySessions: [],
    statistics: {
      totalQuizzesTaken: 0,
      averageQuizScore: 0,
      totalStudyTime: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      chaptersCompleted: 0,
      flashcardsMastered: 0,
    },
    preferences: {
      favoriteChapters: [],
      bookmarkedTopics: [],
    },
  };
};

/**
 * Save progress to localStorage
 */
export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

/**
 * Record a quiz attempt
 */
export const saveQuizProgress = (quiz: QuizProgress): void => {
  const progress = getProgress();
  
  // Remove any existing attempts for this quiz
  progress.quizzes = progress.quizzes.filter(q => q.quizId !== quiz.quizId);
  
  // Add new attempt
  progress.quizzes.push(quiz);
  
  // Update statistics
  progress.statistics.totalQuizzesTaken = progress.quizzes.length;
  progress.statistics.averageQuizScore = 
    progress.quizzes.reduce((sum, q) => sum + (q.score / q.totalQuestions), 0) / progress.quizzes.length;
  
  updateLastActive(progress);
  saveProgress(progress);
};

/**
 * Save flashcard progress for a chapter
 */
export const saveFlashcardProgress = (flashcard: FlashcardProgress): void => {
  const progress = getProgress();
  
  // Update or add flashcard progress
  const existingIndex = progress.flashcards.findIndex(f => f.chapterId === flashcard.chapterId);
  if (existingIndex >= 0) {
    progress.flashcards[existingIndex] = flashcard;
  } else {
    progress.flashcards.push(flashcard);
  }
  
  // Update statistics
  progress.statistics.flashcardsMastered = progress.flashcards.reduce(
    (sum, f) => sum + f.masteredCards.length, 0
  );
  
  updateLastActive(progress);
  saveProgress(progress);
};

/**
 * Save PCR practice completion
 */
export const savePCRProgress = (pcr: PCRProgress): void => {
  const progress = getProgress();
  
  // Add PCR practice (keep history)
  progress.pcrPractice.push(pcr);
  
  // Limit to last 50 PCR practices to prevent excessive storage
  if (progress.pcrPractice.length > 50) {
    progress.pcrPractice = progress.pcrPractice.slice(-50);
  }
  
  updateLastActive(progress);
  saveProgress(progress);
};

/**
 * Update chapter progress
 */
export const saveChapterProgress = (chapter: ChapterProgress): void => {
  const progress = getProgress();
  
  const existingIndex = progress.chapters.findIndex(c => c.chapterId === chapter.chapterId);
  if (existingIndex >= 0) {
    progress.chapters[existingIndex] = chapter;
  } else {
    progress.chapters.push(chapter);
  }
  
  // Update statistics
  progress.statistics.chaptersCompleted = progress.chapters.filter(c => c.completed).length;
  
  updateLastActive(progress);
  saveProgress(progress);
};

/**
 * Start a study session
 */
export const startStudySession = (
  activityType: StudySession['activityType'],
  resourceId: string
): string => {
  const progress = getProgress();
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const session: StudySession = {
    sessionId,
    startTime: new Date().toISOString(),
    activityType,
    resourceId,
  };
  
  progress.studySessions.push(session);
  updateLastActive(progress);
  saveProgress(progress);
  
  return sessionId;
};

/**
 * End a study session
 */
export const endStudySession = (sessionId: string): void => {
  const progress = getProgress();
  const session = progress.studySessions.find(s => s.sessionId === sessionId);
  
  if (session && !session.endTime) {
    const endTime = new Date();
    const startTime = new Date(session.startTime);
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    session.endTime = endTime.toISOString();
    session.duration = duration;
    
    // Update total study time
    progress.statistics.totalStudyTime += duration;
    
    saveProgress(progress);
  }
};

/**
 * Get progress for a specific quiz
 */
export const getQuizProgress = (quizId: string): QuizProgress | undefined => {
  const progress = getProgress();
  return progress.quizzes.find(q => q.quizId === quizId);
};

/**
 * Get progress for a specific chapter
 */
export const getChapterProgress = (chapterId: string): ChapterProgress | undefined => {
  const progress = getProgress();
  return progress.chapters.find(c => c.chapterId === chapterId);
};

/**
 * Get flashcard progress for a chapter
 */
export const getFlashcardProgress = (chapterId: string): FlashcardProgress | undefined => {
  const progress = getProgress();
  return progress.flashcards.find(f => f.chapterId === chapterId);
};

/**
 * Get all PCR practices for a scenario
 */
export const getPCRProgressByScenario = (scenarioId: string): PCRProgress[] => {
  const progress = getProgress();
  return progress.pcrPractice.filter(p => p.scenarioId === scenarioId);
};

/**
 * Calculate study streak
 */
const calculateStreak = (sessions: StudySession[]): number => {
  if (sessions.length === 0) return 0;
  
  const uniqueDates = new Set(
    sessions.map(s => new Date(s.startTime).toDateString())
  );
  
  const sortedDates = Array.from(uniqueDates).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  let streak = 0;
  const today = new Date().toDateString();
  
  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    
    if (sortedDates[i] === expectedDate.toDateString()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Update last active date and streak
 */
const updateLastActive = (progress: UserProgress): void => {
  const today = new Date().toDateString();
  const lastActive = new Date(progress.statistics.lastActiveDate).toDateString();
  
  if (today !== lastActive) {
    progress.statistics.lastActiveDate = new Date().toISOString();
    progress.statistics.streak = calculateStreak(progress.studySessions);
  }
};

/**
 * Add a favorite chapter
 */
export const toggleFavoriteChapter = (chapterId: string): void => {
  const progress = getProgress();
  const index = progress.preferences.favoriteChapters.indexOf(chapterId);
  
  if (index >= 0) {
    progress.preferences.favoriteChapters.splice(index, 1);
  } else {
    progress.preferences.favoriteChapters.push(chapterId);
  }
  
  saveProgress(progress);
};

/**
 * Add/remove bookmarked topic
 */
export const toggleBookmark = (topicId: string): void => {
  const progress = getProgress();
  const index = progress.preferences.bookmarkedTopics.indexOf(topicId);
  
  if (index >= 0) {
    progress.preferences.bookmarkedTopics.splice(index, 1);
  } else {
    progress.preferences.bookmarkedTopics.push(topicId);
  }
  
  saveProgress(progress);
};

/**
 * Export progress as JSON (for backup)
 */
export const exportProgress = (): string => {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
};

/**
 * Import progress from JSON (for restore)
 */
export const importProgress = (jsonData: string): boolean => {
  try {
    const progress = JSON.parse(jsonData) as UserProgress;
    saveProgress(progress);
    return true;
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
};

/**
 * Clear all progress (with confirmation)
 */
export const clearAllProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get summary statistics
 */
export const getStatistics = () => {
  const progress = getProgress();
  
  return {
    ...progress.statistics,
    totalPCRPractices: progress.pcrPractice.length,
    totalChaptersStudied: progress.chapters.length,
    recentActivity: progress.studySessions
      .slice(-10)
      .reverse()
      .map(s => ({
        type: s.activityType,
        date: s.startTime,
        duration: s.duration || 0,
      })),
  };
};
