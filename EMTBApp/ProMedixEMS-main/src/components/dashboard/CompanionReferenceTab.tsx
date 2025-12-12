import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicalCalculatorsHub from '../tools/ClinicalCalculatorsHub';
import EMTScopeMedications from '../../features/tools/EMTScopeMedications';
import { ModernButton } from '../ui/ModernGlassComponents';
import GlassCard from '../ui/GlassCard';

const CompanionReferenceTab = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'calculators' | 'medications'>('overview');
  const navigate = useNavigate();

  if (activeSection === 'calculators') {
    return (
      <div className="space-y-6">
        <ModernButton variant="glass" onClick={() => setActiveSection('overview')}>
          ← Back to Reference Overview
        </ModernButton>
        <ClinicalCalculatorsHub />
      </div>
    );
  }

  if (activeSection === 'medications') {
    return (
      <div className="space-y-6">
        <ModernButton variant="glass" onClick={() => setActiveSection('overview')}>
          ← Back to Reference Overview
        </ModernButton>
        <EMTScopeMedications />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Clinical Reference</h1>
        <p className="text-slate-300">
          Essential tools and references <span className="font-bold text-emerald-400">within EMT-B scope of practice</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Calculators Card */}
        <GlassCard className="p-6 hover:bg-slate-800/60 transition-colors cursor-pointer" onClick={() => setActiveSection('calculators')}>
          <div className="text-4xl mb-4">🧮</div>
          <h3 className="text-xl font-bold text-white mb-2">Medical Calculators</h3>
          <p className="text-slate-300 mb-4">
            Evidence-based clinical decision tools
          </p>
          <ul className="space-y-2 text-sm text-slate-400 mb-6">
            <li>✓ Glasgow Coma Scale (GCS)</li>
            <li>✓ APGAR Score</li>
            <li>✓ Pediatric Dosing Calculator</li>
            <li>✓ IV Drip Rate Calculator</li>
            <li>✓ Weight-based Dosing</li>
          </ul>
          <ModernButton variant="gradient" className="w-full">
            Open Calculators
          </ModernButton>
        </GlassCard>

        {/* EMT-B Medications Card */}
        <GlassCard className="p-6 hover:bg-slate-800/60 transition-colors cursor-pointer" onClick={() => setActiveSection('medications')}>
          <div className="text-4xl mb-4">💊</div>
          <h3 className="text-xl font-bold text-white mb-2">EMT-B Medications</h3>
          <p className="text-slate-300 mb-4">
            Complete formulary with administration guides
          </p>
          <ul className="space-y-2 text-sm text-slate-400 mb-6">
            <li>✓ Scope of practice medications</li>
            <li>✓ Indications & contraindications</li>
            <li>✓ Dosages & administration routes</li>
            <li>✓ Side effects & precautions</li>
            <li>✓ Quick reference cards</li>
          </ul>
          <ModernButton variant="gradient" className="w-full">
            Open Medications
          </ModernButton>
        </GlassCard>
      </div>
    </div>
  );
};

export default CompanionReferenceTab;