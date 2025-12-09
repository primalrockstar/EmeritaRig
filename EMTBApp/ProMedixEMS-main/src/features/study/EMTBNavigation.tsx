import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Heart, Stethoscope, ChevronRight, Brain, BookOpen, Target, Layers, ClipboardList, ClipboardSignature, Mic, Pill } from 'lucide-react';
import ProMedixLogo from '../../components/ProMedixLogo';

const EMTBNavigation: React.FC = () => {
  const navigationCards = [
    {
      title: 'Study Notes by Module',
      description: 'Access 10 modules mapped to the EMT-B National Standards',
      icon: Layers,
      path: '/study-notes',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      items: ['Module-based navigation', '41 enhanced chapters', 'Clinical pearls & downloads']
    },
    {
      title: 'Comprehensive Curriculum',
      description: 'Review the complete EMT-B roadmap and chapter outlines',
      icon: FileText,
      path: '/curriculum',
      color: 'bg-slate-50 border-slate-200 hover:bg-slate-100',
      iconColor: 'text-slate-600',
      items: ['Module summaries', 'Core competencies', 'Suggested study flow']
    },
    {
      title: 'Clinical Calculators',
      description: 'Evidence-based calculations and scoring tools',
      icon: Calculator,
      path: '/calculators',
      color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
      iconColor: 'text-emerald-600',
      items: ['Glasgow Coma Scale', 'APGAR & AVPU', 'Drug dosing assistant']
    },
    {
      title: 'EMT Medications',
      description: 'Complete formulary and administration guides',
      icon: Pill,
      path: '/medications',
      color: 'bg-rose-50 border-rose-200 hover:bg-rose-100',
      iconColor: 'text-rose-600',
      items: ['Scope of practice drugs', 'Dosages & contraindications', 'Administration routes']
    },
    {
      title: 'Patient Assessment Lab',
      description: 'Voice-assisted NREMT practice with guided rubrics',
      icon: ClipboardList,
      path: '/tools/patient-assessment',
      color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
      iconColor: 'text-cyan-600',
      items: ['Medical & trauma checklists', 'Interactive scenarios', 'Auto-scored feedback']
    },
    {
      title: 'Interactive Flashcards',
      description: 'Rapid review decks aligned to each module',
      icon: Brain,
      path: '/flashcards',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      items: ['Clinical mnemonics', 'Scenario prompts', 'Step-by-step skills']
    },
    {
      title: 'Practice Quizzes',
      description: 'Enhanced quiz system with 900 questions and scenario focus',
      icon: Target,
      path: '/enhanced-quiz',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      items: ['900 total questions', '450 scenario-based', 'NHTSA 2022 aligned']
    },
    {
      title: 'Simulation Lab',
      description: 'Scenario-driven skill refreshers and decision pathways',
      icon: Stethoscope,
      path: '/scenarios',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      items: ['Cardiac & trauma cases', 'Medication administration', 'Field decision practice']
    },
    {
      title: 'Voice Note Transcriber',
      description: 'Professional audio-to-text for study notes and scenarios',
      icon: Mic,
      path: '/tools/voice-transcriber',
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
      iconColor: 'text-pink-600',
      items: ['Real-time transcription', 'Medical terminology', 'Export & save notes']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div id="study" className="text-center space-y-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center space-y-3">
            <Link to="/">
              <ProMedixLogo variant="landing" size="2xl" animated className="px-4 py-3" />
            </Link>
            <div className="flex justify-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Emergency Medical Technician - Basic
              </span>
            </div>
            <div className="text-sm text-gray-600 text-center mt-2 max-w-md">
              The Next-Gen Education Tool for Emergency Medical Services
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your trusted companion to formal EMT-B training—designed for clarity, retention, and confident field application.
        </p>
      </div>

      <div id="emtb" className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {navigationCards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            id={index === 0 ? "tools" : index === 3 ? "more" : undefined}
            className={`block p-6 border-2 rounded-xl transition-all duration-200 ${card.color} group`}
          >
            <div className="flex items-start justify-between mb-4">
              <card.icon className={`h-10 w-10 ${card.iconColor} group-hover:scale-110 transition-transform`} />
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.description}</p>
            
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700 mb-2">Includes:</div>
              {card.items.slice(0, 3).map((item, itemIndex) => (
                <div key={itemIndex} className="text-sm text-gray-600 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                  {item}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EMTBNavigation;




