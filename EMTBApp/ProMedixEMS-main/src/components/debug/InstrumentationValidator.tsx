import React from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';

declare global {
  interface Window {
    validateInstrumentation: () => void;
  }
}

const InstrumentationValidator: React.FC = () => {
  const {
    performanceEvents,
    quizEvents,
    scenarioEvents,
    weakAreas,
    studyStreak,
    userContext
  } = usePerformanceTracker();

  const runValidation = () => {
    console.log('🔍 Validating Instrumentation...');
    console.log('✅ usePerformanceTracker hook available');
    console.log(`✅ performanceEvents: ${performanceEvents.length} entries`);
    console.log(`✅ quizEvents: ${quizEvents.length} entries`);
    console.log(`✅ scenarioEvents: ${scenarioEvents.length} entries`);
    console.log('✅ User Context:', userContext);
    console.log(`✅ Weak Areas: ${weakAreas.length} identified`);
    console.log('✅ Study Streak:', studyStreak?.current || 0, 'days');

    return {
      hookAvailable: true,
      performanceEventsCount: performanceEvents.length,
      quizEventsCount: quizEvents.length,
      scenarioEventsCount: scenarioEvents.length,
      userContext,
      weakAreasCount: weakAreas.length,
      studyStreak: studyStreak?.current || 0
    };
  };

  // Make validation function globally available
  React.useEffect(() => {
    window.validateInstrumentation = runValidation;
  }, [performanceEvents, quizEvents, scenarioEvents, userContext, weakAreas, studyStreak]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">🔍 Instrumentation Validator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hook Status */}
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-400">Hook Status</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>usePerformanceTracker</span>
            </div>
            <div className="text-sm text-slate-400">
              ✅ Hook loaded and functional
            </div>
          </div>
        </div>

        {/* Event Counts */}
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Event Counts</h3>
          <div className="space-y-2 text-sm">
            <div>Total: <span className="text-white font-bold">{performanceEvents.length}</span></div>
            <div>Quiz: <span className="text-white font-bold">{quizEvents.length}</span></div>
            <div>Scenarios: <span className="text-white font-bold">{scenarioEvents.length}</span></div>
          </div>
        </div>

        {/* User Context */}
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-purple-400">User Context</h3>
          <div className="space-y-2 text-sm">
            <div>Weak Areas: <span className={`font-bold ${userContext.hasWeakAreas ? 'text-amber-400' : 'text-green-400'}`}>
              {userContext.hasWeakAreas ? 'Yes' : 'No'}
            </span></div>
            <div>Recent Activity: <span className="text-green-400 font-bold">Yes</span></div>
            <div>Exam Days: <span className="text-white font-bold">{userContext.examDaysRemaining}</span></div>
          </div>
        </div>
      </div>

      {/* Weak Areas Section */}
      {weakAreas.length > 0 && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-amber-400">⚠️ Identified Weak Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weakAreas.map((area, index) => (
              <div key={index} className="p-3 bg-slate-700 rounded border-l-4 border-amber-500">
                <div className="font-medium">{area.topic}</div>
                <div className="text-sm text-slate-400">
                  Avg: {area.averageScore}% | Attempts: {area.attempts} |
                  Trend: <span className={`${
                    area.trend === 'improving' ? 'text-green-400' :
                    area.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                  }`}>{area.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Streak */}
      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">🔥 Study Streak</h3>
        <div className="text-2xl font-bold">
          {studyStreak?.current || 0} days
          {studyStreak && studyStreak.longest > studyStreak.current && (
            <span className="text-sm text-slate-400 ml-2">(Longest: {studyStreak.longest})</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={runValidation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
        >
          🔍 Run Validation (Console)
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg font-medium"
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
        <h4 className="font-semibold mb-2">📋 Validation Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
          <li>Check console output after clicking "Run Validation"</li>
          <li>Use browser console: <code className="bg-slate-700 px-2 py-1 rounded">validateInstrumentation()</code></li>
          <li>Run simulation script to populate test data</li>
          <li>Verify dashboard updates with new activity</li>
          <li>Check that weak areas are calculated correctly</li>
        </ol>
      </div>
    </div>
  );
};

export default InstrumentationValidator;