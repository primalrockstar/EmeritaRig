import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import UpgradeModal from '../components/paywall/UpgradeModal';

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const getRank = (rating: number) => {
    if (rating < 800) return "Probie";
    if (rating < 1000) return "Rookie";
    if (rating < 1200) return "Paramedic";
    if (rating < 1400) return "Lieutenant";
    return "Captain";
  };

  const eloRating = user?.elo_rating || 1000;
  const rank = getRank(eloRating);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">
            Command Center
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              💎 Upgrade to Premium
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-center">
          Welcome back, {user?.name || 'Medic'}
        </p>
      </header>

      {/* Stats Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center min-w-[200px]">
          <div className="mb-4">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold">{eloRating}</span>
            </div>
            <div className="text-sm text-gray-400">ELO Rating</div>
          </div>
          <div className="text-lg font-semibold text-indigo-400">{rank}</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* NREMT Simulator */}
        <div className="col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/nremt-simulator')}>
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">NREMT Simulator</h3>
            <p className="text-gray-400 text-sm">Adaptive CAT exam with 800+ questions</p>
          </div>
        </div>

        {/* Daily Flashcards */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/flashcards')}>
          <div className="text-center">
            <div className="text-4xl mb-4">🃏</div>
            <h3 className="text-lg font-bold mb-2">Daily Flashcards</h3>
            <p className="text-gray-400 text-sm">1,173 professional flashcards</p>
          </div>
        </div>

        {/* Clinical Scenarios */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/simulator')}>
          <div className="text-center">
            <div className="text-4xl mb-4">🏥</div>
            <h3 className="text-lg font-bold mb-2">Clinical Scenarios</h3>
            <p className="text-gray-400 text-sm">28 interactive case studies</p>
          </div>
        </div>

        {/* Reference Tools */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/meds')}>
          <div className="text-center">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-lg font-bold mb-2">Reference Tools</h3>
            <p className="text-gray-400 text-sm">Medications & calculators</p>
          </div>
        </div>

        {/* Tools/Calculators */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/calculators')}>
          <div className="text-center">
            <div className="text-4xl mb-4">🧮</div>
            <h3 className="text-lg font-bold mb-2">Medical Calculators</h3>
            <p className="text-gray-400 text-sm">Dosage & assessment tools</p>
          </div>
        </div>

        {/* Study Notes - Temporarily disabled */}
        {/* <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/study-notes')}>
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-bold mb-2">Study Notes</h3>
            <p className="text-gray-400 text-sm">Comprehensive chapter notes</p>
          </div>
        </div> */}

        {/* PCR Trainer */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/pcr-trainer')}>
          <div className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-bold mb-2">PCR Trainer</h3>
            <p className="text-gray-400 text-sm">Patient care documentation</p>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => navigate('/progress')}>
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-400 text-sm">View your performance analytics</p>
          </div>
        </div>
      </div>
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  );
};

export default DashboardScreen;