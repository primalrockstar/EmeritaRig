import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ArrowRight, Layers, Compass, PlayCircle, Target, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import ProMedixLogo from './ProMedixLogo';
import { GlassCard, ModernButton } from './ui/ModernGlassComponents';
import EMTBStudyNotesEnhanced from './emtb/EMTBStudyNotesEnhanced';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';
import { SCOPE_WARNINGS } from './ScopeWarning';

interface ModuleDefinition {
  id: string;
  title: string;
  summary: string;
  chapters: { id: string; title: string }[];
  accent: string;
  highlight: string;
}

const modules: ModuleDefinition[] = [
  {
    id: 'module1',
    title: 'Module 1 · Foundations of EMS Practice',
    summary: 'Essential EMS systems, professional responsibilities, and communication principles.',
    accent: 'border-blue-200',
    highlight: 'text-blue-700',
    chapters: [
      { id: 'chapter1', title: 'Chapter 1 · EMS System Fundamentals' },
      { id: 'chapter2', title: 'Chapter 2 · Responder Safety & Resilience' },
      { id: 'chapter3', title: 'Chapter 3 · EMS Law & Ethical Practice' },
      { id: 'chapter4', title: 'Chapter 4 · Emergency Communication Protocols' }
    ]
  },
  {
    id: 'module2',
    title: 'Module 2 · Clinical Foundations',
    summary: 'Medical terminology, anatomy, patient movement, and interdisciplinary teamwork.',
    accent: 'border-slate-200',
    highlight: 'text-slate-700',
    chapters: [
      { id: 'chapter5', title: 'Chapter 5 · Medical Language for Responders' },
      { id: 'chapter6', title: 'Chapter 6 · Anatomy for Emergency Care' },
      { id: 'chapter7', title: 'Chapter 7 · Developmental Considerations in EMS' },
      { id: 'chapter8', title: 'Chapter 8 · Patient Movement & Handling' },
      { id: 'chapter9', title: 'Chapter 9 · Interprofessional EMS Teams' }
    ]
  },
  {
    id: 'module3',
    title: 'Module 3 · Patient Assessment & Airway',
    summary: 'Comprehensive patient evaluation, airway management, and ventilation strategies.',
    accent: 'border-indigo-200',
    highlight: 'text-indigo-700',
    chapters: [
      { id: 'chapter10', title: 'Chapter 10 · Comprehensive Patient Evaluation' },
      { id: 'chapter11', title: 'Chapter 11 · Advanced Airway Interventions' }
    ]
  },
  {
    id: 'module4',
    title: 'Module 4 · Pharmacology, Shock & Resuscitation',
    summary: 'Medication administration, shock recognition, and life support protocols.',
    accent: 'border-emerald-200',
    highlight: 'text-emerald-700',
    chapters: [
      { id: 'chapter12', title: 'Chapter 12 · Medication Administration Standards' },
      { id: 'chapter13', title: 'Chapter 13 · Shock Recognition & Management' },
      { id: 'chapter14', title: 'Chapter 14 · BLS Life Support Protocols' }
    ]
  },
  {
    id: 'module5',
    title: 'Module 5 · Medical Emergencies I',
    summary: 'Respiratory, cardiovascular, neurological, and abdominal emergencies.',
    accent: 'border-purple-200',
    highlight: 'text-purple-700',
    chapters: [
      { id: 'chapter15', title: 'Chapter 15 · Medical Crisis Assessment' },
      { id: 'chapter16', title: 'Chapter 16 · Respiratory Emergency Protocols' },
      { id: 'chapter17', title: 'Chapter 17 · Cardiovascular Emergency Management' },
      { id: 'chapter18', title: 'Chapter 18 · Neurological Crisis Intervention' },
      { id: 'chapter19', title: 'Chapter 19 · Abdominal Emergency Protocols' }
    ]
  },
  {
    id: 'module6',
    title: 'Module 6 · Medical Emergencies II',
    summary: 'Metabolic, allergic, toxicological, behavioral, and gynecological emergencies.',
    accent: 'border-fuchsia-200',
    highlight: 'text-fuchsia-700',
    chapters: [
      { id: 'chapter20', title: 'Chapter 20 · Metabolic & Hematologic Emergencies' },
      { id: 'chapter21', title: 'Chapter 21 · Allergic & Anaphylactic Response' },
      { id: 'chapter22', title: 'Chapter 22 · Toxicological Emergencies' },
      { id: 'chapter23', title: 'Chapter 23 · Behavioral Crisis Protocols' },
      { id: 'chapter24', title: 'Chapter 24 · Gynecological Emergency Care' }
    ]
  },
  {
    id: 'module7',
    title: 'Module 7 · Trauma Emergencies I',
    summary: 'Trauma systems, hemorrhage control, soft tissue, and head/spine trauma.',
    accent: 'border-rose-200',
    highlight: 'text-rose-700',
    chapters: [
      { id: 'chapter25', title: 'Chapter 25 · Trauma System Fundamentals' },
      { id: 'chapter26', title: 'Chapter 26 · Hemorrhage Control Techniques' },
      { id: 'chapter27', title: 'Chapter 27 · Soft Tissue Trauma Management' },
      { id: 'chapter28', title: 'Chapter 28 · Craniofacial Trauma Response' },
      { id: 'chapter29', title: 'Chapter 29 · Spinal Trauma Protocols' }
    ]
  },
  {
    id: 'module8',
    title: 'Module 8 · Trauma Emergencies II & Environmental',
    summary: 'Thoracic, abdominal, orthopedic trauma, and environmental emergencies.',
    accent: 'border-stone-200',
    highlight: 'text-stone-700',
    chapters: [
      { id: 'chapter30', title: 'Chapter 30 · Thoracic Injury Interventions' },
      { id: 'chapter31', title: 'Chapter 31 · Abdominal & GU Trauma Essentials' },
      { id: 'chapter32', title: 'Chapter 32 · Orthopedic Injury Management' },
      { id: 'chapter33', title: 'Chapter 33 · Environmental Exposure Protocols' }
    ]
  },
  {
    id: 'module9',
    title: 'Module 9 · Special Patient Populations',
    summary: 'Obstetric, neonatal, pediatric, geriatric, and special needs considerations.',
    accent: 'border-teal-200',
    highlight: 'text-teal-700',
    chapters: [
      { id: 'chapter34', title: 'Chapter 34 · Obstetric & Neonatal Emergencies' },
      { id: 'chapter35', title: 'Chapter 35 · Pediatric Emergency Response' },
      { id: 'chapter36', title: 'Chapter 36 · Geriatric Emergency Care' },
      { id: 'chapter37', title: 'Chapter 37 · Patients with Unique Needs' }
    ]
  },
  {
    id: 'module10',
    title: 'Module 10 · EMS Operations & Disaster Response',
    summary: 'Operations, transport logistics, incident management, and mass casualty readiness.',
    accent: 'border-sky-200',
    highlight: 'text-sky-700',
    chapters: [
      { id: 'chapter38', title: 'Chapter 38 · Medical Transport Operations' },
      { id: 'chapter39', title: 'Chapter 39 · Technical Rescue Protocols' },
      { id: 'chapter40', title: 'Chapter 40 · Incident Command Systems' },
      { id: 'chapter41', title: 'Chapter 41 · Mass Casualty Incident Response' }
    ]
  }
];

// All 47 chapters for the comprehensive dropdown
const allChapters = [
  { id: 'chapter1', title: 'Chapter 1 · EMS System Fundamentals', module: 'Foundations of EMS Practice' },
  { id: 'chapter2', title: 'Chapter 2 · Responder Safety & Resilience', module: 'Foundations of EMS Practice' },
  { id: 'chapter3', title: 'Chapter 3 · EMS Law & Ethical Practice', module: 'Foundations of EMS Practice' },
  { id: 'chapter4', title: 'Chapter 4 · Emergency Communication Protocols', module: 'Foundations of EMS Practice' },
  { id: 'chapter5', title: 'Chapter 5 · Medical Language for Responders', module: 'Clinical Foundations' },
  { id: 'chapter6', title: 'Chapter 6 · Anatomy for Emergency Care', module: 'Clinical Foundations' },
  { id: 'chapter7', title: 'Chapter 7 · Developmental Considerations in EMS', module: 'Clinical Foundations' },
  { id: 'chapter8', title: 'Chapter 8 · Patient Movement & Handling', module: 'Clinical Foundations' },
  { id: 'chapter9', title: 'Chapter 9 · Interprofessional EMS Teams', module: 'Clinical Foundations' },
  { id: 'chapter10', title: 'Chapter 10 · Comprehensive Patient Evaluation', module: 'Patient Assessment Mastery' },
  { id: 'chapter11', title: 'Chapter 11 · Advanced Airway Interventions', module: 'Airway & Ventilatory Management' },
  { id: 'chapter12', title: 'Chapter 12 · Medication Administration Standards', module: 'Pharmacology for EMT-B' },
  { id: 'chapter13', title: 'Chapter 13 · Shock Recognition & Management', module: 'Shock & Circulatory Management' },
  { id: 'chapter14', title: 'Chapter 14 · BLS Life Support Protocols', module: 'Shock & Circulatory Management' },
  { id: 'chapter15', title: 'Chapter 15 · Medical Crisis Assessment', module: 'Medical Emergency Response' },
  { id: 'chapter16', title: 'Chapter 16 · Respiratory Emergency Protocols', module: 'Medical Emergency Response' },
  { id: 'chapter17', title: 'Chapter 17 · Cardiovascular Emergency Management', module: 'Medical Emergency Response' },
  { id: 'chapter18', title: 'Chapter 18 · Neurological Crisis Intervention', module: 'Neurologic & Systemic Emergencies' },
  { id: 'chapter19', title: 'Chapter 19 · Abdominal Emergency Protocols', module: 'Neurologic & Systemic Emergencies' },
  { id: 'chapter20', title: 'Chapter 20 · Metabolic & Hematologic Emergencies', module: 'Neurologic & Systemic Emergencies' },
  { id: 'chapter21', title: 'Chapter 21 · Allergic & Anaphylactic Response', module: 'Specialized Emergency Care' },
  { id: 'chapter22', title: 'Chapter 22 · Toxicological Emergencies', module: 'Specialized Emergency Care' },
  { id: 'chapter23', title: 'Chapter 23 · Behavioral Crisis Protocols', module: 'Specialized Emergency Care' },
  { id: 'chapter24', title: 'Chapter 24 · Gynecological Emergency Care', module: 'Specialized Emergency Care' },
  { id: 'chapter25', title: 'Chapter 25 · Trauma System Fundamentals', module: 'Trauma Response Principles' },
  { id: 'chapter26', title: 'Chapter 26 · Hemorrhage Control Techniques', module: 'Trauma Response Principles' },
  { id: 'chapter27', title: 'Chapter 27 · Soft Tissue Trauma Management', module: 'Trauma Response Principles' },
  { id: 'chapter28', title: 'Chapter 28 · Craniofacial Trauma Response', module: 'Traumatic Injury Management' },
  { id: 'chapter29', title: 'Chapter 29 · Spinal Trauma Protocols', module: 'Traumatic Injury Management' },
  { id: 'chapter30', title: 'Chapter 30 · Thoracic Injury Interventions', module: 'Traumatic Injury Management' },
  { id: 'chapter31', title: 'Chapter 31 · Abdominal & GU Trauma Essentials', module: 'Environmental & Musculoskeletal Emergencies' },
  { id: 'chapter32', title: 'Chapter 32 · Orthopedic Injury Management', module: 'Environmental & Musculoskeletal Emergencies' },
  { id: 'chapter33', title: 'Chapter 33 · Environmental Exposure Protocols', module: 'Environmental & Musculoskeletal Emergencies' },
  { id: 'chapter34', title: 'Chapter 34 · Obstetric & Neonatal Emergencies', module: 'Special Patient Populations' },
  { id: 'chapter35', title: 'Chapter 35 · Pediatric Emergency Response', module: 'Special Patient Populations' },
  { id: 'chapter36', title: 'Chapter 36 · Geriatric Emergency Care', module: 'Special Patient Populations' },
  { id: 'chapter37', title: 'Chapter 37 · Patients with Unique Needs', module: 'Special Patient Populations' },
  { id: 'chapter38', title: 'Chapter 38 · Medical Transport Operations', module: 'EMS Operations & Disaster Response' },
  { id: 'chapter39', title: 'Chapter 39 · Technical Rescue Protocols', module: 'EMS Operations & Disaster Response' },
  { id: 'chapter40', title: 'Chapter 40 · Incident Command Systems', module: 'EMS Operations & Disaster Response' },
  { id: 'chapter41', title: 'Chapter 41 · Mass Casualty Incident Response', module: 'EMS Operations & Disaster Response' },
  { id: 'chapter42', title: 'Chapter 42 · Advanced Cardiovascular Anatomy', module: 'Advanced Track' },
  { id: 'chapter43', title: 'Chapter 43 · Advanced Respiratory Physiology', module: 'Advanced Track' },
  { id: 'chapter44', title: 'Chapter 44 · Nervous System in Depth', module: 'Advanced Track' },
  { id: 'chapter45', title: 'Chapter 45 · Endocrine & Metabolic Systems', module: 'Advanced Track' },
  { id: 'bonus', title: 'BONUS · Cellular Structure & Function', module: 'Body Systems Primer' },
  { id: 'bodySystem2', title: 'BONUS · Tissues & Organs', module: 'Body Systems Primer' },
  { id: 'bodySystem3', title: 'BONUS · Skeletal System', module: 'Body Systems Primer' },
  { id: 'bodySystem4', title: 'BONUS · Muscular System', module: 'Body Systems Primer' },
  { id: 'bodySystem5', title: 'BONUS · Cardiovascular System', module: 'Body Systems Primer' },
  { id: 'bodySystem6', title: 'BONUS · Respiratory System', module: 'Body Systems Primer' },
  { id: 'bodySystem7', title: 'BONUS · Nervous System', module: 'Body Systems Primer' },
  { id: 'bodySystem8', title: 'BONUS · Endocrine System', module: 'Body Systems Primer' },
  { id: 'bodySystem9', title: 'BONUS · Digestive System', module: 'Body Systems Primer' },
  { id: 'bodySystem10', title: 'BONUS · Urinary System', module: 'Body Systems Primer' },
  { id: 'bonus2', title: 'BONUS · ALS Integration & Team Dynamics', module: 'Body Systems Primer' }
];

const enhancementModules: ModuleDefinition[] = [
  {
    id: 'moduleBonusClinical',
    title: 'Advanced Clinical Deep Dives',
    summary: 'Extended anatomy and physiology chapters for advanced review. ⚠️ Some content may be beyond EMT-B scope - included for career development.',
    accent: 'border-gray-200',
    highlight: 'text-gray-700',
    chapters: [
      { id: 'chapter42', title: 'Chapter 42 · Advanced Cardiovascular Anatomy' },
      { id: 'chapter43', title: 'Chapter 43 · Advanced Respiratory Physiology' },
      { id: 'chapter44', title: 'Chapter 44 · Nervous System in Depth' },
      { id: 'chapter45', title: 'Chapter 45 · Endocrine & Metabolic Systems' }
    ]
  },
  {
    id: 'moduleBonusFoundations',
    title: 'Body Systems Primer',
    summary: 'Supplemental anatomy sequence ideal for refreshers and cross-training. Educational content for comprehensive EMS knowledge.',
    accent: 'border-zinc-200',
    highlight: 'text-zinc-700',
    chapters: [
      { id: 'bonus', title: 'BONUS · Cellular Structure & Function' },
      { id: 'bodySystem2', title: 'BONUS · Tissues & Organs' },
      { id: 'bodySystem3', title: 'BONUS · Skeletal System' },
      { id: 'bodySystem4', title: 'BONUS · Muscular System' },
      { id: 'bodySystem5', title: 'BONUS · Cardiovascular System' },
      { id: 'bodySystem6', title: 'BONUS · Respiratory System' },
      { id: 'bodySystem7', title: 'BONUS · Nervous System' },
      { id: 'bodySystem8', title: 'BONUS · Endocrine System' },
      { id: 'bodySystem9', title: 'BONUS · Digestive System' },
      { id: 'bodySystem10', title: 'BONUS · Urinary System' },
      { id: 'bonus2', title: 'BONUS · ALS Integration & Team Dynamics' }
    ]
  }
];

export const StudyNotesOverview: React.FC = () => {
  const { user } = useAuth();
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [showAllChaptersDropdown, setShowAllChaptersDropdown] = useState(false);

  const getChapterNumber = (chapterId: string) => {
    const match = chapterId.match(/chapter(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const isLocked = (chapterId: string) => {
    const number = getChapterNumber(chapterId);
    return number > 4 && !user?.has_lifetime_access;
  };

  const handleLockedClick = () => {
    setShowUnlockModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 space-y-12">
      <header className="text-center space-y-4 pt-8">
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/assets/logo.png"
              alt="THE RIG"
              className="h-32 w-auto drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)]"
            />
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">Study Notes</div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Module-Based Study Notes
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Navigate EMT-B content the way clinicians learn—organized by national education standards, chapters, and bonus master classes.
          </p>
        </div>
      </header>

      {/* All Chapters Dropdown */}
      <section className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">All Study Notes Chapters</h2>
            <p className="text-sm text-slate-300 mt-1">Direct access to all 47 chapters of comprehensive study content</p>
          </div>
          <button
            onClick={() => setShowAllChaptersDropdown(!showAllChaptersDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            {showAllChaptersDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showAllChaptersDropdown ? 'Hide Chapters' : 'Show All Chapters'}
          </button>
        </div>

        {showAllChaptersDropdown && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {allChapters.map((chapter) => {
              const locked = isLocked(chapter.id);
              return locked ? (
                <div
                  key={chapter.id}
                  onClick={handleLockedClick}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-600 bg-gray-700/50 cursor-pointer hover:bg-gray-600/50 transition-colors"
                >
                  <div>
                    <span className="text-sm text-gray-300 block">{chapter.title}</span>
                    <span className="text-xs text-gray-400">{chapter.module}</span>
                  </div>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              ) : (
                <Link
                  to={`/study-notes/chapter/${chapter.id}`}
                  key={chapter.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-600 hover:border-cyan-400 hover:bg-cyan-900/30 transition-colors"
                >
                  <div>
                    <span className="text-sm text-gray-200 block">{chapter.title}</span>
                    <span className="text-xs text-gray-400">{chapter.module}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">How to use this library</h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Choose a module to explore structured study notes, learning objectives, downloadable summaries, and integrated flashcards. Each chapter opens in the enhanced reader for a premium, clinically polished experience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/chapters">
              <ModernButton variant="glass" size="sm" icon={<Compass className="w-4 h-4" />}>
                Curriculum overview
              </ModernButton>
            </Link>
            <Link to="/enhanced-quiz">
              <ModernButton variant="gradient" size="sm" icon={<Target className="w-4 h-4" />}>
                Jump to practice quizzes
              </ModernButton>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module) => (
            <GlassCard
              key={module.id}
              className={`p-6 bg-slate-800/60 backdrop-blur-md border border-white/10 ${module.accent}`}
              intensity="medium"
              hoverable
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className={`inline-flex items-center gap-2 text-sm font-semibold ${module.highlight}`}>
                    <Layers className="w-4 h-4" />
                    Core Module
                  </div>
                  <h3 className="text-xl font-semibold text-white mt-2">
                    {module.title}
                  </h3>
                </div>
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {module.summary}
              </p>
              <div className="space-y-2">
                {module.chapters.map((chapter) => {
                  const locked = isLocked(chapter.id);
                  return locked ? (
                    <div
                      key={chapter.id}
                      onClick={handleLockedClick}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm text-gray-500">{chapter.title}</span>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  ) : (
                    <Link
                      to={`/study-notes/chapter/${chapter.id}`}
                      key={chapter.id}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{chapter.title}</span>
                      <ArrowRight className="w-4 h-4 text-blue-500" />
                    </Link>
                  );
                })}
              </div>
              <div className="mt-5">
                <Link to={`/study-notes/chapter/${module.chapters[0].id}`}>
                  <ModernButton variant="gradient" size="sm" icon={<PlayCircle className="w-4 h-4" />}>
                    Open first chapter
                  </ModernButton>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Bonus Content Scope Warning */}
      <div className="max-w-4xl mx-auto px-4">
        {SCOPE_WARNINGS.bonusContent}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enhancementModules.map((module) => (
          <GlassCard
            key={module.id}
            className={`p-6 bg-slate-800/60 backdrop-blur-md border border-yellow-500/30 ${module.accent}`}
            intensity="medium"
            hoverable
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className={`inline-flex items-center gap-2 text-sm font-semibold text-amber-400`}>
                  <Layers className="w-4 h-4" />
                  ⭐ Bonus Content • May Exceed EMT-B Scope
                </div>
                <h3 className="text-xl font-semibold text-white mt-2">
                  {module.title}
                </h3>
              </div>
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {module.summary}
            </p>
            <div className="space-y-2">
              {module.chapters.map((chapter) => (
                <Link
                  to={`/study-notes/chapter/${chapter.id}`}
                  key={chapter.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm text-gray-700">{chapter.title}</span>
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                </Link>
              ))}
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unlock Full Suite</h3>
            <p className="text-gray-600 mb-6">
              You've completed the free preview! Unlock 1,000+ Flashcards, 50+ Scenarios, and the Full Curriculum for Lifetime Access.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await api.post('/api/create-checkout-session');
                    window.location.href = response.data.checkout_url;
                  } catch (error) {
                    console.error('Error creating checkout session:', error);
                    alert('Error processing payment. Please try again.');
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Secure Checkout with Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const StudyNotesChapterView: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const normalizedChapter = chapterId ?? 'chapter1';
  return <EMTBStudyNotesEnhanced initialChapter={normalizedChapter} />;
};
