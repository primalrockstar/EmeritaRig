import React from 'react';
import { BookOpen, Heart, Zap, Target } from 'lucide-react';

interface LandingStatsProps {
  // Optional props for customization
}

const LandingStats: React.FC<LandingStatsProps> = () => {
  const stats = [
    {
      number: "47",
      label: "Modules",
      description: "Complete EMT-B curriculum",
      icon: BookOpen,
      color: "text-blue-400"
    },
    {
      number: "207",
      label: "Scenarios",
      description: "Realistic clinical cases",
      icon: Heart,
      color: "text-red-400"
    },
    {
      number: "1,173",
      label: "Flashcards",
      description: "Spaced repetition system",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      number: "900+",
      label: "Questions",
      description: "NREMT-style practice exams",
      icon: Target,
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative"
            >
              {/* Glass Card Background */}
              <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl transform group-hover:scale-105 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative p-6 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-full group-hover:bg-slate-600/50 transition-colors duration-300">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>

                {/* Number */}
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-mono font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {stat.number}
                  </span>
                </div>

                {/* Label */}
                <div className="mb-1">
                  <span className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {stat.description}
                  </span>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Trust indicators or additional proof points */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">
            Trusted by EMS professionals nationwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingStats;