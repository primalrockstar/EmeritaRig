// Ultra-Modern Landing Page with Glass Morphism Design
// Features: Animated gradients, glass cards, modern interactions

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Heart, 
  Users, 
  Zap,
  Star,
  Play,
  ChevronRight,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react';
import ProMedixLogo from './ProMedixLogo';
import {
  GlassCard,
  ModernButton
} from './ui/ModernGlassComponents';
import ModernFooter from './ModernFooter';

interface ModernLandingPageProps {
  onGetStarted?: () => void;
}

const ModernLandingPage: React.FC<ModernLandingPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ students: 0, courses: 0, success: 0 });

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/dashboard');
    }
  };

  // Animated entrance
  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setStats(prev => ({
          students: Math.min(prev.students + 47, 2500),
          courses: Math.min(prev.courses + 1, 45),
          success: Math.min(prev.success + 2, 96)
        }));
      }, 50);
      
      setTimeout(() => clearInterval(interval), 2000);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: '45 chapters covering complete EMT-B certification requirements',
      color: 'text-blue-600'
    },
    {
      icon: Calculator,
      title: 'Advanced Tools',
      description: 'Clinical calculators, APGAR scoring, and assessment utilities',
      color: 'text-emerald-600'
    },
    {
      icon: Heart,
      title: 'Interactive Scenarios',
      description: 'Real-world patient encounters and emergency simulations',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Expert-Designed',
      description: 'Content created by experienced EMS professionals',
      color: 'text-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'EMT Student',
      text: 'ProMedix EMS transformed my study experience. The interactive features made complex topics easy to understand.',
      rating: 5
    },
    {
      name: 'Dr. James Wilson',
      role: 'EMS Instructor',
      text: 'The most comprehensive and modern EMT training platform I\'ve encountered. My students love it.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Paramedic',
      text: 'Even as an experienced medic, I use ProMedix for continuing education. The content quality is exceptional.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-slate-900">
      {/* Clinical Background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <header className="hero relative overflow-hidden min-h-[80vh] flex items-center justify-center text-center px-6">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-neon-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-500/30 bg-neon-500/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-neon-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-neon-400 tracking-wider uppercase">System Online • v1.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
              The Only Simulator <br />
              That <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-teal-300">Listens.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stop clicking "C". Start treating patients. <br className="hidden md:block" />
              With <strong>Voice-Activated PCR</strong> and an <strong>Adaptive Scenario Engine</strong>,
              you won't just pass the NREMT—you'll hit the street ready.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="https://app.rigemt.com/register" className="w-full sm:w-auto px-8 py-4 bg-neon-500 hover:bg-neon-400 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                Start Training Free
              </a>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 hover:border-neon-500/50 transition-all">
                See The Tech
              </a>
            </div>

            <div className="pt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-mono text-gray-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                254 Scenarios
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                Voice PCR
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neon-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                NREMT Aligned
              </span>
            </div>

          </div>
        </header>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient-blue mb-6">
                Why Choose ProMedix EMS?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Experience the future of emergency medical training with our innovative platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <GlassCard
                  key={index}
                  className={`p-8 text-center transform transition-all duration-500 ${
                    currentFeature === index ? 'scale-105 glow-blue' : ''
                  }`}
                  hoverable
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Showcase */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-12" intensity="medium">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gradient-medical mb-6">
                    Track Your Progress
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Advanced analytics and progress tracking help you identify strengths 
                    and areas for improvement throughout your learning journey.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>EMT-B Fundamentals</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Patient Assessment</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Emergency Procedures</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-12">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Interactive Progress Dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient-emergency mb-6">
                What Our Students Say
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <GlassCard key={index} className="p-8" hoverable>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-gray-200/20 pt-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard className="p-12" intensity="strong">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient-blue mb-6">
                Ready to Transform Your EMS Career?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of successful EMT students who chose ProMedix EMS
              </p>
              <ModernButton
                variant="gradient"
                size="lg"
                onClick={handleGetStarted}
                icon={<ArrowRight className="w-6 h-6" />}
                className="animate-pulse-glow"
              >
                Begin Your Journey Today
              </ModernButton>
            </GlassCard>
          </div>
        </section>
      </div>

      {/* Modern Footer */}
      <ModernFooter />

      {/* Floating Action Button */}
      <button
        onClick={handleGetStarted}
        className="fixed bottom-6 right-6 w-14 h-14 bg-neon-500 hover:bg-neon-400 text-slate-950 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
        aria-label="Get Started"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ModernLandingPage;