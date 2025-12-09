import React, { useEffect, useState } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    eventTypes: {} as Record<string, number>,
    averageScores: {} as Record<string, number>,
    storageSize: 0,
    lastUpdated: new Date()
  });

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const events = JSON.parse(localStorage.getItem('emt_performance_events') || '[]');
        const eventTypes: Record<string, number> = {};
        const topicScores: Record<string, { total: number; count: number }> = {};

        events.forEach((event: any) => {
          // Count by type
          eventTypes[event.activityType] = (eventTypes[event.activityType] || 0) + 1;

          // Average scores by topic
          if (!topicScores[event.topic]) {
            topicScores[event.topic] = { total: 0, count: 0 };
          }
          topicScores[event.topic].total += event.score;
          topicScores[event.topic].count += 1;
        });

        const averageScores: Record<string, number> = {};
        Object.entries(topicScores).forEach(([topic, data]) => {
          averageScores[topic] = data.total / data.count;
        });

        // Calculate storage size
        const dataStr = localStorage.getItem('emt_performance_events') || '';
        const storageSize = new Blob([dataStr]).size;

        setMetrics({
          totalEvents: events.length,
          eventTypes,
          averageScores,
          storageSize,
          lastUpdated: new Date()
        });
      } catch (error) {
        console.error('Error updating metrics:', error);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 10000); // Update every 10 seconds

    // Listen for new events
    window.addEventListener('performanceUpdate', updateMetrics);

    return () => {
      clearInterval(interval);
      window.removeEventListener('performanceUpdate', updateMetrics);
    };
  }, []);

  const getStorageColor = (size: number) => {
    if (size > 500000) return 'text-rose-400'; // > 500KB
    if (size > 100000) return 'text-amber-400'; // > 100KB
    return 'text-emerald-400'; // < 100KB
  };

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-700 rounded-lg">
      <h3 className="font-bold text-white mb-3">📈 Performance Monitor</h3>

      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-800/50 rounded">
            <div className="text-2xl font-bold text-white">{metrics.totalEvents}</div>
            <div className="text-sm text-slate-400">Total Events</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded">
            <div className={`text-2xl font-bold ${getStorageColor(metrics.storageSize)}`}>
              {(metrics.storageSize / 1024).toFixed(1)} KB
            </div>
            <div className="text-sm text-slate-400">Storage Used</div>
          </div>
        </div>

        {/* Event Types */}
        <div>
          <h4 className="text-sm font-bold text-slate-300 mb-2">Event Distribution</h4>
          <div className="space-y-2">
            {Object.entries(metrics.eventTypes).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{type}</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden mr-2">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${(count / metrics.totalEvents) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Weak Areas */}
        <div>
          <h4 className="text-sm font-bold text-slate-300 mb-2">Topic Performance</h4>
          <div className="space-y-2">
            {Object.entries(metrics.averageScores)
              .sort((a, b) => a[1] - b[1]) // Sort by lowest score
              .slice(0, 5) // Top 5 weakest
              .map(([topic, score]) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm truncate mr-2">{topic}</span>
                  <div className={`text-sm font-bold ${
                    score >= 80 ? 'text-emerald-400' :
                    score >= 60 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {score.toFixed(0)}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-700">
          Last updated: {metrics.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;