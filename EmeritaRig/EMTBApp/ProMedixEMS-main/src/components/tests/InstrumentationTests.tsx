import React, { useState } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import { ModernButton } from '../ui/ModernGlassComponents';

const InstrumentationTests: React.FC = () => {
  const { trackEvent, weakAreas, performanceEvents } = usePerformanceTracker();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const runAllTests = async () => {
    setLoading(true);
    const results: Record<string, boolean> = {};
    
    // Test 1: Basic event tracking
    try {
      trackEvent({
        activityType: 'quiz',
        activityId: 'test-001',
        topic: 'Test Topic',
        score: 85,
        timeSpent: 30,
        metadata: { test: true }
      });
      results['eventTracking'] = true;
    } catch (e) {
      results['eventTracking'] = false;
    }
    
    // Test 2: Weak area calculation
    try {
      results['weakAreaCalculation'] = Array.isArray(weakAreas);
    } catch (e) {
      results['weakAreaCalculation'] = false;
    }
    
    // Test 3: LocalStorage persistence
    try {
      const hasTestEvent = performanceEvents.some((e) => e.metadata?.test === true);
      results['localStoragePersistence'] = hasTestEvent;
    } catch (e) {
      results['localStoragePersistence'] = false;
    }
    
    // Test 4: Data structure validation
    try {
      const validEvents = events.filter((e) => 
        e.activityType && 
        e.topic && 
        e.score !== undefined &&
        e.timestamp
      );
      results['dataStructure'] = validEvents.length === events.length;
    } catch (e) {
      results['dataStructure'] = false;
    }
    
    setTestResults(results);
    setLoading(false);
  };

  const clearTestData = () => {
    const filtered = performanceEvents.filter((e) => !e.metadata?.test);
    localStorage.setItem('emt_performance_events', JSON.stringify(filtered));
    setTestResults({});
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-700 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">🧪 Instrumentation Tests</h2>
      
      <div className="mb-6">
        <ModernButton
          onClick={runAllTests}
          disabled={loading}
          className="mr-4"
        >
          {loading ? 'Running Tests...' : 'Run All Tests'}
        </ModernButton>
        
        <ModernButton
          variant="glass"
          onClick={clearTestData}
        >
          Clear Test Data
        </ModernButton>
      </div>
      
      <div className="space-y-3">
        {Object.entries(testResults).map(([test, passed]) => (
          <div 
            key={test}
            className={`p-3 rounded-lg flex items-center justify-between ${
              passed ? 'bg-emerald-900/30' : 'bg-rose-900/30'
            }`}
          >
            <div>
              <span className="font-bold text-white capitalize">
                {test.replace(/([A-Z])/g, ' $1')}:
              </span>
              <span className={`ml-2 ${passed ? 'text-emerald-300' : 'text-rose-300'}`}>
                {passed ? 'PASS' : 'FAIL'}
              </span>
            </div>
            <div className="text-2xl">
              {passed ? '✅' : '❌'}
            </div>
          </div>
        ))}
      </div>
      
      {Object.keys(testResults).length === 0 && !loading && (
        <div className="text-center py-8 text-slate-400">
          Click "Run All Tests" to validate instrumentation
        </div>
      )}
    </div>
  );
};

export default InstrumentationTests;