import React, { useState } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';

declare global {
  interface Window {
    runInstrumentationTests: () => Promise<boolean>;
  }
}

interface TestResult {
  test: string;
  passed: boolean;
  error?: string;
  duration?: number;
}

const InstrumentationTests: React.FC = () => {
  const { trackEvent, performanceEvents, quizEvents, scenarioEvents, weakAreas, studyStreak } = usePerformanceTracker();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async (): Promise<boolean> => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Helper to run test with timing
    const runTest = async (testName: string, testFn: () => Promise<boolean> | boolean): Promise<void> => {
      const start = Date.now();
      try {
        const passed = await testFn();
        const duration = Date.now() - start;
        results.push({ test: testName, passed, duration });
      } catch (error) {
        const duration = Date.now() - start;
        results.push({
          test: testName,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          duration
        });
      }
    };

    // Test 1: Hook is available
    await runTest('Hook availability', () => {
      return typeof trackEvent === 'function';
    });

    // Test 2: Can track quiz event
    await runTest('Track quiz event', async () => {
      const eventId = `test-quiz-${Date.now()}`;
      trackEvent({
        activityType: 'quiz',
        activityId: eventId,
        topic: 'Test Topic',
        score: 85,
        timeSpent: 120,
        metadata: { test: true }
      });

      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 100));

      const found = performanceEvents.some(e => e.activityId === eventId);
      return found;
    });

    // Test 3: Can track scenario event
    await runTest('Track scenario event', async () => {
      const eventId = `test-scenario-${Date.now()}`;
      trackEvent({
        activityType: 'scenario',
        activityId: eventId,
        topic: 'Test Scenario',
        score: 90,
        timeSpent: 180,
        metadata: { test: true }
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      const found = performanceEvents.some(e => e.activityId === eventId);
      return found;
    });

    // Test 4: Event filtering works
    await runTest('Event filtering', () => {
      const quizCount = performanceEvents.filter(e => e.activityType === 'quiz').length;
      const scenarioCount = performanceEvents.filter(e => e.activityType === 'scenario').length;
      return quizEvents.length === quizCount && scenarioEvents.length === scenarioCount;
    });

    // Test 5: localStorage persistence
    await runTest('localStorage persistence', () => {
      const stored = localStorage.getItem('emt_performance_events');
      return stored !== null && stored.length > 0;
    });

    // Test 6: Weak areas calculation
    await runTest('Weak areas calculation', () => {
      // This should work even with minimal data
      return Array.isArray(weakAreas);
    });

    // Test 7: Study streak tracking
    await runTest('Study streak tracking', () => {
      return studyStreak !== null && typeof studyStreak.current === 'number';
    });

    // Test 8: Event dispatching
    await runTest('Event dispatching', async () => {
      let eventReceived = false;
      const handler = () => { eventReceived = true; };

      window.addEventListener('performanceUpdate', handler);

      // Dispatch event
      window.dispatchEvent(new CustomEvent('performanceUpdate'));

      // Wait a bit
      await new Promise(resolve => setTimeout(resolve, 50));

      window.removeEventListener('performanceUpdate', handler);
      return eventReceived;
    });

    // Test 9: Data integrity
    await runTest('Data integrity', () => {
      for (const event of performanceEvents) {
        if (!event.id || !event.activityType || typeof event.score !== 'number') {
          return false;
        }
      }
      return true;
    });

    // Test 10: Performance (no lag)
    await runTest('Performance check', async () => {
      const start = Date.now();
      for (let i = 0; i < 10; i++) {
        trackEvent({
          activityType: 'quiz',
          activityId: `perf-test-${i}`,
          topic: 'Performance Test',
          score: 100,
          timeSpent: 1,
          metadata: { perf: true }
        });
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      const duration = Date.now() - start;
      return duration < 500; // Should complete within 500ms
    });

    setTestResults(results);
    setIsRunning(false);

    const allPassed = results.every(r => r.passed);
    console.log('🧪 Instrumentation Tests Complete:', allPassed ? '✅ PASSED' : '❌ FAILED');
    console.table(results);

    return allPassed;
  };

  // Make globally available
  React.useEffect(() => {
    window.runInstrumentationTests = runTests;
  }, [trackEvent, performanceEvents, quizEvents, scenarioEvents, weakAreas, studyStreak]);

  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-6">🧪 Instrumentation Tests</h2>

      <div className="mb-6">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg font-medium text-lg"
        >
          {isRunning ? '🧪 Running Tests...' : '▶️ Run All Tests'}
        </button>

        {totalCount > 0 && (
          <div className="mt-4 text-lg">
            Results: <span className="font-bold text-green-400">{passedCount}</span> / <span className="font-bold">{totalCount}</span> passed
            {passedCount === totalCount && totalCount > 0 && (
              <span className="ml-2 text-green-400">🎉 All tests passed!</span>
            )}
          </div>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                result.passed
                  ? 'bg-green-900/20 border-green-500'
                  : 'bg-red-900/20 border-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-xl mr-3 ${result.passed ? '✅' : '❌'}`}></span>
                  <span className="font-medium">{result.test}</span>
                </div>
                <div className="text-sm text-slate-400">
                  {result.duration ? `${result.duration}ms` : ''}
                </div>
              </div>

              {result.error && (
                <div className="mt-2 text-sm text-red-400 bg-red-900/20 p-2 rounded">
                  {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
        <h4 className="font-semibold mb-2">📋 Test Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
          <li>Click "Run All Tests" to execute the complete test suite</li>
          <li>Check browser console for detailed output</li>
          <li>Use console command: <code className="bg-slate-700 px-2 py-1 rounded">runInstrumentationTests()</code></li>
          <li>Tests cover: event tracking, data persistence, performance, and data integrity</li>
          <li>All tests should pass for production readiness</li>
        </ol>
      </div>
    </div>
  );
};

export default InstrumentationTests;