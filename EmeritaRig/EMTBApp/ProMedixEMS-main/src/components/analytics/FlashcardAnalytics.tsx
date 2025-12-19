import React, { useEffect, useState } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import GlassCard from '../ui/GlassCard';

interface FlashcardStats {
  totalReviews: number;
  averageScore: number;
  dueCards: number;
  topics: Array<{
    topic: string;
    totalCards: number;
    reviewedCards: number;
    averageScore: number;
    totalReviews: number;
  }>;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
  </div>
);

const FlashcardAnalytics: React.FC = () => {
  const { getFlashcardPerformance } = usePerformanceTracker();
  const [stats, setStats] = useState<FlashcardStats | null>(null);

  useEffect(() => {
    const data = getFlashcardPerformance();
    setStats(data);
  }, []);

  if (!stats) return <LoadingSpinner />;

  return (
    <GlassCard className="p-6">
      <h3 className="font-bold text-white text-xl mb-6">Flashcard Performance</h3>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-slate-800/50 rounded-lg">
          <div className="text-3xl font-bold text-emerald-400">{stats.totalReviews}</div>
          <div className="text-sm text-slate-400">Total Reviews</div>
        </div>
        <div className="text-center p-4 bg-slate-800/50 rounded-lg">
          <div className="text-3xl font-bold text-amber-400">{Math.round(stats.averageScore)}%</div>
          <div className="text-sm text-slate-400">Average Score</div>
        </div>
        <div className="text-center p-4 bg-slate-800/50 rounded-lg">
          <div className="text-3xl font-bold text-rose-400">{stats.dueCards}</div>
          <div className="text-sm text-slate-400">Due Cards</div>
        </div>
      </div>

      {/* Topic Performance */}
      <div className="space-y-4">
        <h4 className="font-bold text-white mb-4">Topic Performance</h4>
        {stats.topics.map(topic => (
          <div key={topic.topic} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div className="flex-1">
              <div className="font-bold text-white">{topic.topic}</div>
              <div className="text-sm text-slate-400">
                {topic.totalReviews} reviews • {topic.reviewedCards} cards
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden mr-3">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${topic.averageScore}%`,
                    backgroundColor: topic.averageScore >= 80 ? '#10b981' :
                                   topic.averageScore >= 60 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
              <div className="text-lg font-bold" style={{
                color: topic.averageScore >= 80 ? '#10b981' :
                       topic.averageScore >= 60 ? '#f59e0b' : '#ef4444'
              }}>
                {Math.round(topic.averageScore)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Study Recommendations */}
      <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
        <h4 className="font-bold text-white mb-2">📈 Study Recommendations</h4>
        <ul className="text-slate-300 space-y-2">
          {stats.topics
            .filter(t => t.averageScore < 70)
            .slice(0, 3)
            .map(topic => (
              <li key={topic.topic} className="flex items-center">
                <span className="mr-2">🎯</span>
                Focus on <span className="font-bold mx-1">{topic.topic}</span> ({Math.round(topic.averageScore)}% mastery)
              </li>
            ))}
        </ul>
      </div>
    </GlassCard>
  );
};

export default FlashcardAnalytics;