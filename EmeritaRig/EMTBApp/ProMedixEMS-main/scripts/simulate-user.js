// User Activity Simulation Script for Testing
// Run this in browser console to simulate user activity for validation

const simulateUserActivity = () => {
  console.log('👤 Simulating user activity...');

  // Simulate quiz events
  const quizTopics = ['Cardiology', 'Airway Management', 'Trauma', 'Pediatrics', 'Medical'];
  quizTopics.forEach((topic, i) => {
    setTimeout(() => {
      const event = {
        activityType: 'quiz',
        activityId: `sim-quiz-${i}`,
        topic: topic,
        score: Math.random() > 0.3 ? 85 : 45, // 70% chance of good score
        timeSpent: Math.floor(Math.random() * 40) + 20,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(), // Staggered times
        metadata: { simulation: true, questionCount: 10 }
      };

      const events = JSON.parse(localStorage.getItem('emt_performance_events') || '[]');
      events.push(event);
      localStorage.setItem('emt_performance_events', JSON.stringify(events));

      console.log(`📝 Added quiz event: ${topic} - ${event.score}%`);

      // Update dashboard
      window.dispatchEvent(new CustomEvent('performanceUpdate'));
    }, i * 500);
  });

  // Simulate scenario events
  setTimeout(() => {
    const scenarioEvent = {
      activityType: 'scenario',
      activityId: 'sim-scenario-001',
      topic: 'Trauma Assessment',
      score: 75,
      timeSpent: 240,
      timestamp: new Date().toISOString(),
      metadata: {
        simulation: true,
        scenarioType: 'trauma',
        stepsCompleted: 8,
        totalSteps: 10
      }
    };

    const events = JSON.parse(localStorage.getItem('emt_performance_events') || '[]');
    events.push(scenarioEvent);
    localStorage.setItem('emt_performance_events', JSON.stringify(events));

    console.log('🏥 Added scenario event: Trauma Assessment - 75%');
    window.dispatchEvent(new CustomEvent('performanceUpdate'));
  }, 3000);

  // Check results after simulation
  setTimeout(() => {
    console.log('📊 Simulation complete!');
    const allEvents = JSON.parse(localStorage.getItem('emt_performance_events') || '[]');
    console.log('Total events:', allEvents.length);
    console.log('Quiz events:', allEvents.filter(e => e.activityType === 'quiz').length);
    console.log('Scenario events:', allEvents.filter(e => e.activityType === 'scenario').length);
    console.log('Check dashboard for updated recommendations!');
  }, 4000);
};

// Add to window for easy access
window.simulateUserActivity = simulateUserActivity;

// Also add a function to clear simulation data
window.clearSimulationData = () => {
  const events = JSON.parse(localStorage.getItem('emt_performance_events') || '[]');
  const realEvents = events.filter(e => !e.metadata?.simulation);
  localStorage.setItem('emt_performance_events', JSON.stringify(realEvents));
  localStorage.removeItem('emt_weak_areas');
  localStorage.removeItem('emt_study_streak');
  window.dispatchEvent(new CustomEvent('performanceUpdate'));
  console.log('🧹 Cleared simulation data. Real events remaining:', realEvents.length);
};

// Add a function to generate varied performance data
window.generateVariedPerformanceData = () => {
  const topics = [
    'Cardiology', 'Airway Management', 'Trauma', 'Pediatrics', 'Medical',
    'OB/GYN', 'Environmental', 'Operations', 'Medical Emergencies', 'EMS Operations'
  ];

  const events = [];
  const now = Date.now();

  // Generate 50 quiz events over the past 30 days
  for (let i = 0; i < 50; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(now - daysAgo * 24 * 60 * 60 * 1000);

    // Create some weak areas by making certain topics have lower scores
    let score;
    if (topic === 'Cardiology' || topic === 'Airway Management') {
      score = Math.floor(Math.random() * 40) + 40; // 40-80% for weak areas
    } else {
      score = Math.floor(Math.random() * 30) + 70; // 70-100% for strong areas
    }

    events.push({
      id: `gen-quiz-${i}`,
      userId: 'demo-user',
      activityType: 'quiz',
      activityId: `gen-quiz-${i}`,
      topic,
      score,
      timeSpent: Math.floor(Math.random() * 60) + 30,
      timestamp: timestamp.toISOString(),
      metadata: { generated: true, questionCount: 10 }
    });
  }

  // Generate 10 scenario events
  for (let i = 0; i < 10; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const daysAgo = Math.floor(Math.random() * 14); // Past 2 weeks
    const timestamp = new Date(now - daysAgo * 24 * 60 * 60 * 1000);

    events.push({
      id: `gen-scenario-${i}`,
      userId: 'demo-user',
      activityType: 'scenario',
      activityId: `gen-scenario-${i}`,
      topic,
      score: Math.floor(Math.random() * 40) + 60, // 60-100%
      timeSpent: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
      timestamp: timestamp.toISOString(),
      metadata: { generated: true, scenarioType: 'interactive' }
    });
  }

  localStorage.setItem('emt_performance_events', JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('performanceUpdate'));

  console.log('🎲 Generated varied performance data:', events.length, 'events');
  console.log('Expected weak areas: Cardiology, Airway Management');
};

// Test flashcard instrumentation
const testFlashcardInstrumentation = () => {
  console.log('🧪 Testing Flashcard Instrumentation...');

  // Test 1: Check if FlashcardTracker exists
  try {
    const tracker = window.FlashcardTracker?.getInstance();
    if (tracker) {
      console.log('✅ FlashcardTracker loaded');
    } else {
      console.log('❌ FlashcardTracker not available');
    }
  } catch (e) {
    console.log('❌ FlashcardTracker not available:', e.message);
  }

  // Test 2: Simulate a flashcard review
  const mockEvent = {
    cardId: 'test-card-001',
    deckId: 'test-deck',
    topic: 'Cardiology',
    confidence: 'good',
    confidenceScore: 85,
    timeSpent: 4500,
    previousInterval: 3,
    newInterval: 7,
    easeFactor: 2.5,
    timestamp: new Date()
  };

  try {
    window.FlashcardTracker?.getInstance().trackReview(mockEvent);
    console.log('✅ Flashcard review tracking works');
  } catch (e) {
    console.log('❌ Flashcard tracking failed:', e.message);
  }

  // Test 3: Check analytics
  try {
    const analytics = window.FlashcardTracker?.getInstance().getAnalytics();
    if (analytics) {
      console.log('✅ Analytics generation works:', {
        totalReviews: analytics.totalReviews,
        averageScore: analytics.averageScore,
        dueCards: analytics.dueCards
      });
    } else {
      console.log('❌ Analytics failed: no tracker instance');
    }
  } catch (e) {
    console.log('❌ Analytics failed:', e.message);
  }

  // Test 4: Check dashboard integration
  try {
    window.dispatchEvent(new CustomEvent('flashcardUpdate'));
    console.log('✅ Dashboard update event dispatched');
  } catch (e) {
    console.log('❌ Event dispatch failed:', e.message);
  }
};

// Test PCR instrumentation
const testPcrInstrumentation = () => {
  console.log('🧪 Testing PCR Instrumentation...');

  // Test 1: Check if PcrTracker exists
  try {
    const tracker = window.PcrTracker?.getInstance();
    if (tracker) {
      console.log('✅ PcrTracker loaded');
    } else {
      console.log('❌ PcrTracker not available');
    }
  } catch (e) {
    console.log('❌ PcrTracker not available:', e.message);
  }

  // Test 2: Simulate a PCR submission
  const mockPcrEvent = {
    reportId: `pcr_test_${Date.now()}`,
    scenarioId: 'chest-pain',
    module: 1,
    score: 88,
    timeSpent: 300,
    deficiencies: ['Missing transport time'],
    strengths: ['Complete assessment documented'],
    timestamp: new Date(),
    passed: true
  };

  try {
    window.PcrTracker?.getInstance().trackPcrSubmission(mockPcrEvent);
    console.log('✅ PCR submission tracking works');
  } catch (e) {
    console.log('❌ PCR tracking failed:', e.message);
  }

  // Test 3: Check PCR analytics
  try {
    const analytics = window.PcrTracker?.getInstance().getAnalytics();
    if (analytics) {
      console.log('✅ PCR Analytics generation works:', {
        totalReports: analytics.totalReports,
        averageScore: analytics.averageScore,
        passRate: analytics.passRate
      });
    } else {
      console.log('❌ PCR Analytics failed: no tracker instance');
    }
  } catch (e) {
    console.log('❌ PCR Analytics failed:', e.message);
  }

  // Test 4: Check PCR recommendations
  try {
    const recommendations = window.PcrTracker?.getInstance().getRecommendedActions();
    if (recommendations) {
      console.log('✅ PCR Recommendations work:', recommendations.length, 'actions');
    } else {
      console.log('❌ PCR Recommendations failed');
    }
  } catch (e) {
    console.log('❌ PCR Recommendations failed:', e.message);
  }

  // Test 5: Check dashboard integration
  try {
    window.dispatchEvent(new CustomEvent('pcrUpdate'));
    console.log('✅ PCR Dashboard update event dispatched');
  } catch (e) {
    console.log('❌ PCR Event dispatch failed:', e.message);
  }
};

// Make functions globally available
window.testFlashcardInstrumentation = testFlashcardInstrumentation;
window.testPcrInstrumentation = testPcrInstrumentation;

console.log('🔄 Simulation script loaded.');
console.log('Available commands:');
console.log('- simulateUserActivity() - Basic simulation');
console.log('- generateVariedPerformanceData() - Comprehensive test data');
console.log('- clearSimulationData() - Remove simulation data');
console.log('- testFlashcardInstrumentation() - Test flashcard tracking');
console.log('- testPcrInstrumentation() - Test PCR tracking');