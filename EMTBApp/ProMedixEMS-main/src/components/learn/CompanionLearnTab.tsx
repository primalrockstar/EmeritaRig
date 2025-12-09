import React, { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { GlassCard, ModernButton } from '../ui/ModernGlassComponents';
import { useNavigate } from 'react-router-dom';
import { StudyNotesOverview } from '../StudyNotesNavigator';

const CompanionLearnTab: React.FC = () => {
  const [showAllChapters, setShowAllChapters] = useState(false);
  const context = useUserContext();
  const navigate = useNavigate();

  const getHoursUntil = (startTime: Date) => {
    const now = new Date();
    const diff = startTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 0 ? `${hours}h` : 'now';
  };

  const getChapterIdFromTopic = (topic: string) => {
    // Mock mapping
    const mapping: Record<string, string> = {
      "Cardiology": "1",
      "Airway Management": "2",
      "CPR": "3",
      "Trauma Assessment": "4",
    };
    return mapping[topic] || "1";
  };

  const navigateBasedOnActivityType = (activity: {topic: string, type: string}) => {
    if (activity.type === 'chapter') {
      navigate(`/study-notes/chapter/${getChapterIdFromTopic(activity.topic)}`);
    } else if (activity.type === 'flashcards') {
      navigate(`/flashcards?topic=${activity.topic}`);
    }
  };

  const getLearningRecommendations = () => {
    const recommendations = [];

    if (context.upcomingEvents && context.upcomingEvents.length > 0) {
      const nextClass = context.upcomingEvents[0];
      recommendations.push({
        id: 'upcoming-class',
        title: `Prepare for ${nextClass.topic}`,
        description: `Your ${nextClass.type} is in ${getHoursUntil(nextClass.startTime)} hours. Review the chapter now.`,
        estimatedTime: 30,
        priority: 'high',
        type: 'chapter',
        chapterId: getChapterIdFromTopic(nextClass.topic),
        action: () => navigate(`/study-notes/chapter/${getChapterIdFromTopic(nextClass.topic)}`)
      });
    }

    if (context.weakAreas && context.weakAreas.length > 0) {
      context.weakAreas.forEach(area => {
        recommendations.push({
          id: `weakness-${area}`,
          title: `Improve ${area}`,
          description: `Based on your recent performance, focus on ${area}.`,
          estimatedTime: 20,
          priority: 'medium',
          type: 'flashcards',
          topic: area,
          action: () => navigate(`/flashcards?topic=${area}`)
        });
      });
    }

    if (context.recentActivity && context.recentActivity.length > 0) {
      const lastActivity = context.recentActivity[0];
      recommendations.push({
        id: 'continue-last',
        title: `Continue from last session`,
        description: `You were working on ${lastActivity.topic}. Pick up where you left off.`,
        estimatedTime: 15,
        priority: 'low',
        type: lastActivity.type,
        topic: lastActivity.topic,
        action: () => navigateBasedOnActivityType(lastActivity)
      });
    }

    return recommendations;
  };

  const recommendations = getLearningRecommendations();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900">Your Learning Companion</h2>
        <p className="text-slate-600">Here's your personalized study plan based on your progress and upcoming events</p>
      </div>

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(rec => (
            <GlassCard key={rec.id} intensity="medium" hoverable>
              <h3 className="text-lg font-semibold text-blue-900">{rec.title}</h3>
              <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
              <div className="flex justify-between text-sm text-slate-500 mb-4">
                <span>~{rec.estimatedTime} min</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority} priority
                </span>
              </div>
              <ModernButton onClick={rec.action} variant="gradient" size="sm">
                Start Learning
              </ModernButton>
            </GlassCard>
          ))}
        </div>
      )}

      <div className="text-center">
        <ModernButton onClick={() => setShowAllChapters(!showAllChapters)} variant="glass">
          {showAllChapters ? 'Hide All Chapters' : 'View All Chapters'}
        </ModernButton>
      </div>

      {showAllChapters && (
        <div className="mt-8">
          <StudyNotesOverview />
        </div>
      )}
    </div>
  );
};

export default CompanionLearnTab;