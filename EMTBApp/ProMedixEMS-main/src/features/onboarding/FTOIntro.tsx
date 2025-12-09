import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, BookOpen, Wrench, CheckCircle } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { GlassCard, ModernButton } from '../../components/ui/ModernGlassComponents';

const slides = [
  {
    id: 1,
    title: "The Handshake",
    icon: Shield,
    content: "Welcome to The Rig. I'm your Field Training Officer. My job is to make you street-ready."
  },
  {
    id: 2,
    title: "I Can't Move Your Hands",
    icon: Shield,
    content: "This platform is for your mind. These study notes are built from real-world training, but they are a supplement to your classroom education, not a replacement. I can teach you when to bag a patient, but only your hands-on instructor can teach you how. Do not skip class."
  },
  {
    id: 3,
    title: "The Kit",
    icon: BookOpen,
    content: "Here's what we've got: Dashboard (Briefing) - your mission control. Drill Deck (Muscle Memory) - practice makes perfect. Tools (Reference) - calculators and guides when you need 'em."
  },
  {
    id: 4,
    title: "Start Shift",
    icon: CheckCircle,
    content: "If you're ready to work, I'm ready to coach. Let's go.",
    isLast: true
  }
];

const FTOIntro: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useAuth();

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    onComplete?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" intensity="medium">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-500/20 rounded-full">
              <Icon className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          {/* Slide Indicator */}
          <div className="flex justify-center mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {slide.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {slide.content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <ModernButton
              variant="glass"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </ModernButton>

            {slide.isLast ? (
              <ModernButton
                variant="gradient"
                onClick={handleComplete}
                className="flex items-center gap-2"
              >
                Let's Go
                <CheckCircle className="w-4 h-4" />
              </ModernButton>
            ) : (
              <ModernButton
                variant="gradient"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </ModernButton>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default FTOIntro;