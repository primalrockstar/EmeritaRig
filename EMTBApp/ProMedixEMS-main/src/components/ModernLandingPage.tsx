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
  GradientBackground, 
  ModernButton, 
  FloatingActionButton,
  GlassProgressBar
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
    <div className="min-h-screen overflow-hidden">
      {/* Clinical Background */}
      <GradientBackground 
        variant="blue" 
        intensity="subtle" 
        animated 
        className="min-h-screen"
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
          <div className={`relative w-full max-w-5xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xl rounded-3xl px-8 md:px-14 py-14">
              {/* Logo */}
              <div className="mb-8">
                <ProMedixLogo 
                  variant="landing" 
                  size="2xl" 
                  animated 
                  className="mx-auto"
                />
              </div>

              {/* Hero Text */}
              <div className="space-y-6 mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                  Premium EMS Education
                  <span className="block text-3xl md:text-4xl font-semibold text-blue-600 mt-2">
                    Built for Clinical Excellence
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  A clinically polished learning experience: evidence-based modules, clinical calculators,
                  and interactive scenarios crafted for EMT-B professionals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
                <ModernButton
                  variant="gradient"
                  size="lg"
                  onClick={handleGetStarted}
                  icon={<Play className="w-5 h-5" />}
                  className="shadow-lg"
                >
                  Start Learning Now
                </ModernButton>
                
                <Link to="/chapters" className="w-full sm:w-auto">
                  <ModernButton
                    variant="glass"
                    size="lg"
                    icon={<BookOpen className="w-5 h-5" />}
                    className="w-full"
                  >
                    Browse Curriculum
                  </ModernButton>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-white/80" intensity="light" hoverable={false}>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.students.toLocaleString()}+
                  </div>
                  <div className="text-gray-600">Clinicians Trained</div>
                </GlassCard>
                <GlassCard className="p-6 bg-white/80" intensity="light" hoverable={false}>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {stats.courses}
                  </div>
                  <div className="text-gray-600">Structured Chapters</div>
                </GlassCard>
                <GlassCard className="p-6 bg-white/80" intensity="light" hoverable={false}>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stats.success}%
                  </div>
                  <div className="text-gray-600">Learner Satisfaction</div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

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
                      <GlassProgressBar progress={92} color="blue" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Patient Assessment</span>
                        <span>78%</span>
                      </div>
                      <GlassProgressBar progress={78} color="emerald" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Emergency Procedures</span>
                        <span>85%</span>
                      </div>
                      <GlassProgressBar progress={85} color="purple" />
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
                size="xl"
                onClick={handleGetStarted}
                icon={<ArrowRight className="w-6 h-6" />}
                className="animate-pulse-glow"
              >
                Begin Your Journey Today
              </ModernButton>
            </GlassCard>
          </div>
        </section>
      </GradientBackground>

      {/* Modern Footer */}
      <ModernFooter />

      {/* Floating Action Button */}
      <FloatingActionButton
        position="bottom-right"
        size="lg"
        onClick={handleGetStarted}
        ariaLabel="Get Started"
      >
        <ArrowRight className="w-6 h-6" />
      </FloatingActionButton>
    </div>
  );
};

export default ModernLandingPage;