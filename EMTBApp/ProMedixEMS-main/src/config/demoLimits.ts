/**
 * Demo Version Limits
 * Controls access to content in the demo version
 */

export const DEMO_LIMITS = {
  // Chapter Access - First Module Only (4 chapters)
  MAX_CHAPTERS: 4,
  ALLOWED_CHAPTER_IDS: [1, 2, 3, 4], // Update based on actual chapter structure
  
  // Flashcards - 4 chapters × 15 flashcards = 60 cards
  MAX_FLASHCARDS: 60,
  
  // Quiz Questions - 10% of total
  MAX_QUIZ_QUESTIONS: 10,
  
  // Scenarios - Limited to 3
  MAX_SCENARIOS: 3,
  
  // Clinical Calculators - All available (they're viral/shareable)
  CALCULATORS_ENABLED: true,
  
  // Progress Tracking - Enabled to show value
  PROGRESS_TRACKING_ENABLED: true,
  
  // Study Notes - First module only
  MAX_STUDY_NOTES: 4,
};

export const DEMO_MESSAGES = {
  CHAPTER_LIMIT: '🔒 Unlock all 45 chapters with the full version',
  QUIZ_LIMIT: '🔒 You\'ve completed the demo quiz. Unlock 1,500+ questions with the full version!',
  SCENARIO_LIMIT: '🔒 Unlock 100+ clinical scenarios with the full version',
  FLASHCARD_LIMIT: '🔒 Unlock 675+ flashcards (15 per chapter × 45 chapters) with the full version',
  UPGRADE_CTA: 'Unlock Full Access - $49.99',
};

export const UPGRADE_URL = 'https://your-sales-website.com/purchase'; // Update with your actual sales URL

export const isDemoVersion = () => {
  // Check if we're in demo mode via environment variable
  return import.meta.env.VITE_DEMO_MODE === 'true';
};
