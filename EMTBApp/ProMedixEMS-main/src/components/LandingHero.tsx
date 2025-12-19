import React from 'react';
import { Heart, Activity, Thermometer, Zap } from 'lucide-react';

interface LandingHeroProps {
  onStartTraining?: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onStartTraining }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern - ECG/Tactical Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* ECG Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="ecg-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-600"/>
              </pattern>
              <pattern id="ecg-wave" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 50 L 20 50 L 25 35 L 30 65 L 35 50 L 200 50"
                      fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500/20"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecg-grid)"/>
            <rect width="100%" height="100%" fill="url(#ecg-wave)"/>
          </svg>
        </div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/50 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
              Train Like Their Life
              <span className="block text-blue-400">Depends On It.</span>
            </h1>

            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-slate-300 font-medium">
                Because it does.
              </p>
              <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
                The comprehensive EMT-B platform combining 207+ realistic clinical scenarios and military-grade performance tracking.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={onStartTraining}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              Start Training Now
            </button>
            <button className="px-8 py-4 border-2 border-slate-400 hover:border-slate-300 text-slate-300 hover:text-white font-semibold text-lg rounded-lg transition-all duration-200">
              Watch Demo
            </button>
          </div>

          {/* Mock Vitals Card */}
          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Patient Vitals</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Activity className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-xs text-slate-400 uppercase">HR</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-green-400">72</div>
                  <div className="text-xs text-slate-500">bpm</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Activity className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-xs text-slate-400 uppercase">RR</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-400">16</div>
                  <div className="text-xs text-slate-500">rpm</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Thermometer className="w-4 h-4 text-orange-400 mr-1" />
                    <span className="text-xs text-slate-400 uppercase">Temp</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-orange-400">98.6</div>
                  <div className="text-xs text-slate-500">°F</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 text-purple-400 mr-1" />
                    <span className="text-xs text-slate-400 uppercase">SpO2</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-purple-400">99</div>
                  <div className="text-xs text-slate-500">%</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-1">Blood Pressure</div>
                  <div className="text-xl font-mono font-bold text-white">120/80</div>
                  <div className="text-xs text-slate-500">mmHg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2 text-slate-400">
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;