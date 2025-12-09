# Progress Tracking System - User Guide

## Overview
ProMedix EMS now features a comprehensive progress tracking system that saves your learning progress automatically to your browser's local storage. **No login required** - your progress is saved locally on your device.

## Features

### 1. **Automatic Progress Saving**
All your activity is automatically tracked across the platform:
- ✅ Quiz attempts and scores
- ✅ Flashcard mastery progress
- ✅ PCR practice completions
- ✅ Chapter reading progress
- ✅ Study time tracking
- ✅ Study streaks (consecutive days)

### 2. **What Gets Tracked**

#### Quiz Progress
- Quiz ID and score
- Number of correct/incorrect answers
- Time taken to complete
- Individual question responses
- Automatically calculates your average quiz score

#### Flashcard Progress
- Cards marked as "mastered"
- Cards needing review
- Last study date per chapter
- Mastery percentage per chapter

#### PCR Practice
- Completed scenarios
- Format used (SOAP, CHART, or Hybrid)
- Your written content
- AI feedback received
- Completion count per scenario
- Quality scores

#### Chapter Progress
- Chapters completed
- Sections viewed
- Time spent on each chapter
- Last access date
- Personal notes count

#### Study Sessions
- Start and end times
- Activity type (quiz, flashcards, PCR, etc.)
- Duration of each session
- Cumulative total study time

### 3. **Progress Dashboard** (`/progress`)
Access your comprehensive progress dashboard to view:

- **Total Study Time**: See how much time you've invested
- **Quiz Performance**: Average score across all quizzes
- **Study Streak**: Consecutive days of studying
- **Achievements**: Chapters completed, flashcards mastered, PCR practices
- **Recent Activity**: Timeline of your latest learning sessions
- **Data Management**: Export, import, or clear your progress

### 4. **Data Management**

#### Export Progress
- Click "Export Progress" in the dashboard
- Saves all your data as a JSON file
- Use as a backup before clearing browser data
- Transfer between devices

#### Import Progress
- Click "Import Progress"
- Select a previously exported JSON file
- All progress will be restored

#### Clear All Data
- Completely reset your progress
- **Warning**: This cannot be undone
- Requires double confirmation
- Use before starting fresh

## How It Works

### Local Storage
- Progress is saved to `localStorage` in your browser
- Storage key: `promedix_user_progress`
- Data persists even after closing the browser
- **Important**: Clearing browser data will delete progress

### Privacy
- ✅ All data stays on YOUR device
- ✅ Nothing is sent to external servers
- ✅ No tracking or analytics
- ✅ Complete privacy and control

## Usage Examples

### PCR Practice Module
When you complete a PCR practice:
1. Write your report in any format (SOAP, CHART, Hybrid)
2. Click "Analyze Report"
3. Review AI feedback
4. **Progress is automatically saved**, including:
   - Your scenario choice
   - Format used
   - All text you wrote
   - Feedback received
   - Quality score
5. See "✓ Completed 1x" badge next time you select that scenario
6. View all attempts in Progress Dashboard

### Quiz System
When you take a quiz:
1. Complete the quiz as normal
2. Submit your answers
3. **Progress is automatically saved**, including:
   - Your score
   - Time taken
   - Each answer (correct/incorrect)
4. Average score updates in Progress Dashboard
5. Quiz count increases

### Flashcards
As you study flashcards:
1. Mark cards as "mastered" or "needs review"
2. **Progress is automatically saved**, including:
   - Which cards you've mastered
   - Last study date
   - Mastery percentage
3. Resume where you left off next time
4. Track mastery progress per chapter

### Study Sessions
Automatically tracked for all activities:
1. Session starts when you enter a learning module
2. Timer runs in background
3. Session ends when you leave
4. **Duration is saved automatically**
5. Contributes to total study time
6. Updates study streak if daily

## Tips for Users

### Backup Your Progress
- **Recommended**: Export progress monthly
- Save export file to cloud storage (Google Drive, Dropbox, etc.)
- Protects against browser data loss

### Multiple Devices
If you want to use multiple devices:
1. Export progress from Device A
2. Save the JSON file to cloud storage
3. Download and import on Device B
4. Repeat when switching devices

### Browser Considerations
- Progress is browser-specific
- Chrome progress ≠ Firefox progress
- Use export/import to transfer between browsers
- Incognito/Private mode won't save progress

### Clearing Browser Data
**Warning**: "Clear browsing data" in browser settings will delete your progress!
- Always export before clearing browser data
- Consider using "Clear cache" instead of "Clear all data"

## Technical Details

### Data Structure
```typescript
{
  quizzes: [],           // All quiz attempts
  flashcards: [],        // Flashcard progress per chapter
  pcrPractice: [],       // All PCR completions (last 50)
  chapters: [],          // Chapter reading progress
  studySessions: [],     // All study sessions
  statistics: {
    totalQuizzesTaken: number,
    averageQuizScore: number,
    totalStudyTime: number,    // in seconds
    streak: number,            // consecutive days
    lastActiveDate: string,
    chaptersCompleted: number,
    flashcardsMastered: number
  },
  preferences: {
    favoriteChapters: [],
    bookmarkedTopics: [],
    preferredQuizDifficulty: string
  }
}
```

### Storage Limits
- localStorage typically allows 5-10MB per domain
- PCR practice history limited to last 50 attempts
- Consider periodic exports for very active users

## Troubleshooting

### Progress Not Saving
1. Check if browser allows localStorage
2. Ensure you're not in private/incognito mode
3. Check browser storage settings
4. Try a different browser

### Progress Disappeared
1. Check if browser data was cleared
2. Import from backup if available
3. Check if using same browser/device
4. Verify not in private browsing mode

### Export Not Working
1. Check browser popup blocker
2. Ensure sufficient storage space
3. Try copying text manually
4. Save to cloud storage immediately

### Import Failed
1. Verify JSON file format is correct
2. Check file wasn't corrupted
3. Ensure file is from ProMedix export
4. Try exporting and re-importing

## Future Enhancements (Planned)
- Cloud sync option (optional authentication)
- Progress badges and achievements
- Detailed analytics and insights
- Study goal setting and tracking
- Social features (optional sharing)
- Progress comparison with peers (anonymous)

## Contact & Support
If you encounter issues with progress tracking:
- Check this documentation first
- Verify browser compatibility
- Export data before reporting issues
- Clear cache and try again

---

**Remember**: Your progress is YOUR data. Export regularly, keep backups, and maintain control of your learning journey!
