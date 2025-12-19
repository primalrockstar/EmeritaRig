// Quick validation script to run in browser console
const validateInstrumentation = () => {
  console.log('🔍 Validating Instrumentation...');
  
  // Check if PerformanceTracker is available
  if (window.PerformanceTracker) {
    console.log('✅ PerformanceTracker class available');
  } else {
    console.log('❌ PerformanceTracker class not available');
  }
  
  // Check localStorage data
  const keys = ['emt_performance_events', 'emt_weak_areas', 'emt_study_streak', 'userContext'];
  keys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        console.log(`✅ ${key}: ${Array.isArray(parsed) ? parsed.length : 'Object'} entries`);
      } catch (e) {
        console.log(`❌ ${key}: Invalid JSON`);
      }
    } else {
      console.log(`❌ ${key}: No data found`);
    }
  });
  
  // Test event tracking
  const testEvent = {
    userId: 'default_user',
    activityType: 'test',
    activityId: 'validation-test',
    topic: 'Validation',
    score: 100,
    timeSpent: 1,
    metadata: { test: true }
  };
  
  // Try to track an event
  if (window.PerformanceTracker) {
    window.PerformanceTracker.trackEvent(testEvent);
    console.log('✅ Test event tracked via PerformanceTracker');
  } else {
    console.log('❌ Cannot track event - PerformanceTracker not available');
  }
  
  // Check dashboard data flow
  const context = localStorage.getItem('userContext');
  if (context) {
    const parsed = JSON.parse(context);
    console.log('✅ User Context:', {
      hasWeakAreas: !!parsed.weakAreas?.length,
      hasRecentActivity: !!parsed.recentActivity?.length,
      examDaysRemaining: parsed.examDaysRemaining
    });
  }
};

// Add to window for easy access
window.validateInstrumentation = validateInstrumentation;
console.log('🛠️ Validation script loaded. Run "validateInstrumentation()" in console.');