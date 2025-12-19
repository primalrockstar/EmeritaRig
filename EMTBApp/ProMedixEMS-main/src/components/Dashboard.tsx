import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
  BookOpen,
  Activity,
  Mic,
  Brain,
  Radio,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());

  // Live Clock Effect for that "Real-time MDT" feel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // "Daily Briefing" - Random tips to make the app feel alive
  const briefingTips = [
    "Safety First: BSI, Scene Safe. Always.",
    "Triage Tip: If they aren't breathing, open the airway.",
    "Pharm Check: Aspirin is contraindicated in asthma/ulcers.",
    "Radio Etiquette: Think before you speak. Paint the picture."
  ];
  const todayTip = briefingTips[Math.floor(Math.random() * briefingTips.length)];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pb-24">

      {/* 1. TOP BAR: STATUS INDICATORS */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tighter text-white">
            THE RIG <span className="text-neon-500 text-sm align-top">v1.0</span>
          </h1>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            Unit ID: {user?.email?.split('@')[0] || 'GUEST'} // ACCESS LEVEL: {user?.role?.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-sm">
          <div className="flex items-center gap-2 text-neon-400">
            <Radio size={16} className="animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} />
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION: "THE SHIFT BRIEFING" */}
      <section className="mb-10 relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-[0_0_40px_rgba(34,197,94,0.05)]">

        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-neon-500/20 text-neon-500 p-2 rounded-lg">
                    <ShieldCheck size={24} />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">Shift Readiness</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Daily Briefing</p>
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                        "{todayTip}"
                    </p>
                    <div className="mt-6 flex gap-4">
                         <button onClick={() => navigate('/quiz')} className="bg-neon-500 hover:bg-neon-400 text-slate-900 font-bold px-6 py-2 rounded flex items-center gap-2 transition-all">
                            <Activity size={18} /> Start Simulation
                         </button>
                    </div>
                </div>

                {/* Quick Stats / Streak */}
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 flex flex-col justify-center items-center text-center">
                    <div className="text-4xl font-black text-white mb-1">0</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Scenarios Cleared</div>
                    <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-neon-500 w-[0%]"></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. MISSION MODULES (The Only Links Allowed) */}
      <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Mission Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* MODULE 1: FIELD MANUAL (Study Notes) */}
        <button
          onClick={() => navigate('/study/field-manual')} // Route to container, NOT specific chapters
          className="group bg-slate-900 border border-slate-800 hover:border-blue-500 p-6 rounded-xl text-left transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-gray-400">
            <BookOpen size={24} />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Field Manual</h4>
          <p className="text-sm text-gray-500 mt-2">14 Modules. 41 Chapters. The core intel.</p>
        </button>

        {/* MODULE 2: SIM LAB (Scenarios) */}
        <button
          onClick={() => navigate('/quiz')}
          className="group bg-slate-900 border border-slate-800 hover:border-neon-500 p-6 rounded-xl text-left transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
        >
           <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-neon-500/20 group-hover:text-neon-400 transition-colors text-gray-400">
            <Activity size={24} />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-neon-400 transition-colors">Sim Lab</h4>
          <p className="text-sm text-gray-500 mt-2">254 Scenarios. Adaptive difficulty engine.</p>
        </button>

        {/* MODULE 3: VOICE PCR (Dictation) */}
        <button
          onClick={() => navigate('/pcr')}
          className="group bg-slate-900 border border-slate-800 hover:border-purple-500 p-6 rounded-xl text-left transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
           <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors text-gray-400">
            <Mic size={24} />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Voice PCR</h4>
          <p className="text-sm text-gray-500 mt-2">Dictate reports. Auto-extract vitals.</p>
        </button>

        {/* MODULE 4: INTEL (Flashcards/Calcs) */}
        <button
          onClick={() => navigate('/study/intel')} // New Container for Quizzes/Flashcards
          className="group bg-slate-900 border border-slate-800 hover:border-orange-500 p-6 rounded-xl text-left transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
        >
           <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-colors text-gray-400">
            <Zap size={24} />
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Intel & Drill</h4>
          <p className="text-sm text-gray-500 mt-2">Flashcards, calculators, and speed drills.</p>
        </button>

      </div>
    </div>
  );
}
