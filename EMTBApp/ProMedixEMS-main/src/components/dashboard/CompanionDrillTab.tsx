import React from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import GlassCard from '../ui/GlassCard';
import { ModernButton } from '../ui/ModernGlassComponents';
import { useNavigate } from 'react-router-dom';

interface DrillType {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: number; // minutes
  priority: 'high' | 'medium' | 'low';
  type: 'adaptive' | 'scenario' | 'timed' | 'weakness' | 'documentation' | 'voice';
  recommended: boolean;
  action: () => void;
}

interface RecentDrill {
  id: string;
  type: string;
  topic: string;
  timestamp: Date;
  score?: number;
  completed: boolean;
  timeSpent: number; // minutes
}

const DrillHeader = ({ weakAreas, recentDrills }: { weakAreas: string[]; recentDrills: RecentDrill[] }) => {
  const getHeaderMessage = () => {
    if (weakAreas.length > 0) {
      return `Focus on your weak areas: ${weakAreas.slice(0, 2).join(', ')}`;
    }
    if (recentDrills.length > 0) {
      const lastDrill = recentDrills[0];
      return `Continue your ${lastDrill.type} practice on ${lastDrill.topic}`;
    }
    return "Build your clinical skills with purpose-driven practice";
  };

  return (
    <div className="glass-card p-6 mb-8">
      <h1 className="text-2xl font-bold text-white mb-2">Practice Hub</h1>
      <p className="text-slate-300">{getHeaderMessage()}</p>
    </div>
  );
};

const ContinuePractice = ({ recentDrills }: { recentDrills: RecentDrill[] }) => {
  const navigate = useNavigate();

  if (recentDrills.length === 0) return null;

  const lastDrill = recentDrills[0];

  const resumeDrill = (drill: RecentDrill) => {
    // Navigate to appropriate drill type
    switch (drill.type) {
      case 'adaptive':
        navigate('/quiz/adaptive');
        break;
      case 'scenario':
        navigate('/scenarios');
        break;
      case 'timed':
        navigate('/quiz/timed');
        break;
      case 'weakness':
        navigate('/quiz/weakness');
        break;
      case 'documentation':
        navigate('/pcr-practice');
        break;
      case 'voice':
        navigate('/voice-practice');
        break;
      default:
        navigate('/enhanced-quiz');
    }
  };

  return (
    <GlassCard className="p-6 mb-8 border border-emerald-500/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <div className="text-2xl mr-3">{getDrillIcon(lastDrill.type)}</div>
            <div>
              <h3 className="font-bold text-white">Continue Where You Left Off</h3>
              <p className="text-slate-300">
                {lastDrill.type} drill on {lastDrill.topic}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>⏱️ {lastDrill.timeSpent} min spent</span>
            {lastDrill.score && <span>🎯 {lastDrill.score}% score</span>}
            <span>🕐 {formatTimeAgo(lastDrill.timestamp)}</span>
          </div>
        </div>
        <ModernButton
          variant="gradient"
          className="mt-4 md:mt-0"
          onClick={() => resumeDrill(lastDrill)}
        >
          Resume Practice
        </ModernButton>
      </div>
    </GlassCard>
  );
};

const DrillTypeGrid = ({ drillTypes }: { drillTypes: DrillType[] }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Choose Your Drill Type</h2>
        <div className="text-sm text-slate-400">
          {drillTypes.filter(d => d.recommended).length} recommended for you
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drillTypes.map(drill => (
          <GlassCard
            key={drill.id}
            className={`p-6 hover:bg-slate-800/60 transition-colors ${drill.recommended ? 'border border-amber-500/20' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{drill.icon}</div>
              {drill.recommended && (
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">
                  Recommended
                </span>
              )}
            </div>

            <h3 className="font-bold text-white mb-2">{drill.title}</h3>
            <p className="text-slate-300 text-sm mb-4">{drill.description}</p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-400 flex items-center">
                <span className="mr-1">⏱️</span>
                {drill.estimatedTime} min
              </div>
              <ModernButton
                variant={drill.recommended ? 'gradient' : 'glass'}
                size="sm"
                onClick={drill.action}
              >
                Start Drill
              </ModernButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const WeaknessFocus = ({ weakAreas }: { weakAreas: string[] }) => {
  const navigate = useNavigate();

  const startWeaknessDrill = (area: string, type: string) => {
    if (type === 'quiz') {
      navigate(`/quiz/weakness/${area.toLowerCase().replace(' ', '-')}`);
    } else {
      navigate(`/scenarios/weakness/${area.toLowerCase().replace(' ', '-')}`);
    }
  };

  if (weakAreas.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Target Your Weak Areas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weakAreas.map((area, index) => (
          <GlassCard key={area} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🎯</div>
              <div className="text-sm text-slate-400">Priority {index + 1}</div>
            </div>

            <h3 className="font-bold text-white mb-2">{area}</h3>
            <p className="text-slate-300 text-sm mb-4">
              Focused practice to improve your performance in this area
            </p>

            <div className="space-y-3">
              <ModernButton
                variant="gradient"
                size="sm"
                className="w-full"
                onClick={() => startWeaknessDrill(area, 'quiz')}
              >
                Take Quiz
              </ModernButton>
              <ModernButton
                variant="glass"
                size="sm"
                className="w-full"
                onClick={() => startWeaknessDrill(area, 'scenario')}
              >
                Practice Scenario
              </ModernButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const QuickDrillActions = () => {
  const navigate = useNavigate();

  const startTimedQuiz = (questions: number, time: number) => {
    navigate(`/quiz/timed?questions=${questions}&time=${time}`);
  };

  const startQuickScenario = () => {
    navigate('/scenarios/quick');
  };

  const startPCRDrill = () => {
    navigate('/pcr-practice');
  };

  const quickDrills = [
    {
      title: '5-Minute Speed Quiz',
      description: '10 questions under time pressure',
      time: 5,
      action: () => startTimedQuiz(10, 5)
    },
    {
      title: 'Quick Scenario',
      description: 'Single patient encounter',
      time: 7,
      action: () => startQuickScenario()
    },
    {
      title: 'PCR Practice',
      description: 'Documentation drill',
      time: 10,
      action: () => startPCRDrill()
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Quick Drills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickDrills.map(drill => (
          <GlassCard key={drill.title} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white mb-1">{drill.title}</h3>
                <p className="text-slate-300 text-sm">{drill.description}</p>
              </div>
              <div className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full">
                {drill.time} min
              </div>
            </div>
            <ModernButton
              variant="glass"
              className="w-full"
              onClick={drill.action}
            >
              Start Now
            </ModernButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const DrillHistory = ({ recentDrills }: { recentDrills: RecentDrill[] }) => {
  const navigate = useNavigate();

  const retryDrill = (drill: RecentDrill) => {
    // Similar to resumeDrill logic
    switch (drill.type) {
      case 'adaptive':
        navigate('/quiz/adaptive');
        break;
      case 'scenario':
        navigate('/scenarios');
        break;
      case 'timed':
        navigate('/quiz/timed');
        break;
      case 'weakness':
        navigate('/quiz/weakness');
        break;
      case 'documentation':
        navigate('/pcr-practice');
        break;
      case 'voice':
        navigate('/voice-practice');
        break;
      default:
        navigate('/enhanced-quiz');
    }
  };

  if (recentDrills.length === 0) return null;

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Recent Practice</h2>
        <ModernButton
          variant="glass"
          size="sm"
          onClick={() => navigate('/progress')}
        >
          View All History
        </ModernButton>
      </div>

      <div className="space-y-4">
        {recentDrills.slice(0, 5).map(drill => (
          <div key={drill.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
            <div className="flex items-center">
              <div className="text-2xl mr-4">{getDrillIcon(drill.type)}</div>
              <div>
                <div className="font-bold text-white">{drill.type} - {drill.topic}</div>
                <div className="text-sm text-slate-400">
                  {formatTimeAgo(drill.timestamp)} • {drill.timeSpent} min
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {drill.score && (
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  drill.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                  drill.score >= 70 ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {drill.score}%
                </div>
              )}
              <ModernButton
                variant="glass"
                size="sm"
                onClick={() => retryDrill(drill)}
              >
                Retry
              </ModernButton>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

const getDrillIcon = (type: string) => {
  const icons: Record<string, string> = {
    adaptive: '🎯',
    scenario: '🏥',
    timed: '⏱️',
    weakness: '🔍',
    documentation: '📝',
    voice: '🎤',
    quiz: '🧠'
  };
  return icons[type] || '⚡';
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const getDrillTypes = (weakAreas: string[], navigate: any): DrillType[] => [
  {
    id: 'flashcards',
    title: 'Flashcard Review',
    description: '1,173 professional flashcards with spaced repetition',
    icon: '🃏',
    estimatedTime: 15,
    priority: 'high',
    type: 'adaptive',
    recommended: true,
    action: () => navigate('/flashcards')
  },
  {
    id: 'nremt-quiz',
    title: 'NREMT Practice Quiz',
    description: '900+ exam questions with adaptive difficulty',
    icon: '🎯',
    estimatedTime: 20,
    priority: 'high',
    type: 'adaptive',
    recommended: true,
    action: () => navigate('/enhanced-quiz')
  },
  {
    id: 'scenario',
    title: 'Clinical Scenarios',
    description: '28 interactive patient encounters',
    icon: '🏥',
    estimatedTime: 20,
    priority: 'high',
    type: 'scenario',
    recommended: true,
    action: () => navigate('/scenarios')
  },
  {
    id: 'weakness',
    title: 'Weakness Focus',
    description: `Target your weak areas: ${weakAreas[0] || 'identified topics'}`,
    icon: '🔍',
    estimatedTime: 15,
    priority: weakAreas.length > 0 ? 'high' : 'medium',
    type: 'weakness',
    recommended: weakAreas.length > 0,
    action: () => navigate('/quiz/weakness')
  },
  {
    id: 'timed',
    title: 'Timed Drills',
    description: 'Build speed and accuracy under pressure',
    icon: '⏱️',
    estimatedTime: 10,
    priority: 'medium',
    type: 'timed',
    recommended: false,
    action: () => navigate('/quiz/timed')
  },
  {
    id: 'documentation',
    title: 'PCR Practice',
    description: 'Master documentation skills with realistic cases',
    icon: '📝',
    estimatedTime: 15,
    priority: 'medium',
    type: 'documentation',
    recommended: false,
    action: () => navigate('/pcr-practice')
  },
  {
    id: 'voice',
    title: 'Voice Reports',
    description: 'Practice radio and hand-off communication',
    icon: '🎤',
    estimatedTime: 10,
    priority: 'low',
    type: 'voice',
    recommended: false,
    action: () => navigate('/voice-practice')
  }
];

const getMockRecentDrills = (): RecentDrill[] => [
  {
    id: '1',
    type: 'quiz',
    topic: 'Cardiology',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    score: 85,
    completed: true,
    timeSpent: 12
  },
  {
    id: '2',
    type: 'scenario',
    topic: 'Pediatric Respiratory',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    completed: true,
    timeSpent: 18
  },
  {
    id: '3',
    type: 'adaptive',
    topic: 'Mixed Topics',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    score: 78,
    completed: true,
    timeSpent: 15
  }
];

const getWeeklyPracticeTime = () => {
  // This would come from actual user data
  return 142; // Mock data
};

const CompanionDrillTab = () => {
  const context = useUserContext();
  const navigate = useNavigate();

  // Mock goals since they're not in the actual useUserContext hook
  const mockGoals = { studyGoal: 180 }; // 180 minutes per week

  const drillTypes = getDrillTypes(context.weakAreas, navigate);
  const recentDrills = getMockRecentDrills();

  return (
    <div className="space-y-8">
      <DrillHeader weakAreas={context.weakAreas} recentDrills={recentDrills} />

      <ContinuePractice recentDrills={recentDrills} />

      <DrillTypeGrid drillTypes={drillTypes} />

      <WeaknessFocus weakAreas={context.weakAreas} />

      <QuickDrillActions />

      <DrillHistory recentDrills={recentDrills} />

      {/* Study Goal Reminder */}
      {mockGoals?.studyGoal && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white mb-1">Weekly Practice Goal</h3>
              <p className="text-slate-300">
                Aim for {mockGoals.studyGoal} minutes of focused practice per week
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {getWeeklyPracticeTime()} min
              </div>
              <div className="text-sm text-slate-400">This week</div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default CompanionDrillTab;