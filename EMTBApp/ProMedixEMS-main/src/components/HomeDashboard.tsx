import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, Clock, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { emergencyScenarios } from '../data/emergency-scenarios';
import { formatDuration } from '../utils/timeUtils';

const HomeDashboard: React.FC = () => {
  const [randomScenario, setRandomScenario] = useState(emergencyScenarios[0]);
  const [currentTopic, setCurrentTopic] = useState('Trauma');
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [shiftSeconds, setShiftSeconds] = useState(0);

  useEffect(() => {
    // Pick a random scenario
    const randomIndex = Math.floor(Math.random() * emergencyScenarios.length);
    setRandomScenario(emergencyScenarios[randomIndex]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setShiftSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const readinessScore = 68; // Hardcoded as per spec

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {/* Widget A: ACTIVE DISPATCH (Hero - spans 2 cols) */}
        <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 animate-pulse border-amber-500/50">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-slate-400 font-mono text-xs uppercase">ACTIVE DISPATCH</h2>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">🚑 INCOMING PRIORITY CALL</h3>
          <p className="text-white font-bold text-2xl mb-2">{randomScenario.title}</p>
          <p className="text-slate-300 mb-4">Domain: {randomScenario.type}</p>
          <Link
            to={`/scenarios/${randomScenario.id}`}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            RESPOND TO SCENARIO
          </Link>
        </div>

        {/* Widget B: UNIT READINESS (Top Right) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 font-mono text-xs uppercase mb-4">UNIT READINESS</h2>
          <div className="flex items-center justify-center">
            <div className={`text-4xl font-bold ${readinessScore < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {readinessScore}%
            </div>
          </div>
          <p className="text-slate-300 text-center mt-2">Readiness Score</p>
        </div>

        {/* Widget C: SHIFT LOG (Bottom Left) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-slate-400" />
            <h2 className="text-slate-400 font-mono text-xs uppercase">SHIFT LOG</h2>
          </div>
          <p className="text-white font-bold text-xl">Current Shift: {formatDuration(shiftSeconds)}</p>
          <p className="text-slate-300 mt-2">Weekly Streak: 4 Days</p>
        </div>

        {/* Widget D: QUICK PROTOCOL (Bottom Middle) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 font-mono text-xs uppercase mb-4">QUICK PROTOCOL</h2>
          <p className="text-white font-bold text-lg mb-2">Drill: Respiratory Emergencies</p>
          <Link
            to="/flashcards?filter=respiratory"
            className="text-amber-400 hover:text-amber-300 transition"
          >
            Practice Now →
          </Link>
        </div>

        {/* Widget E: CLASS COMPANION (Bottom Right) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-slate-400 font-mono text-xs uppercase mb-4">CLASS COMPANION</h2>
          <div className="relative">
            <button
              onClick={() => setIsTopicOpen(!isTopicOpen)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded flex items-center justify-between"
            >
              <span>Current Class Topic: {currentTopic}</span>
              {isTopicOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isTopicOpen && (
              <div className="absolute top-full left-0 right-0 bg-slate-700 rounded-b mt-1">
                {['Trauma', 'Medical', 'Cardiac', 'Pediatric'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setCurrentTopic(topic);
                      setIsTopicOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-600 text-white"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;