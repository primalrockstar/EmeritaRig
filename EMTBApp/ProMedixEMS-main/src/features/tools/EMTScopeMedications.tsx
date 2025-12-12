import React, { useState } from 'react';
import { medicationsData } from '../../data/medications';
import { GlassCard } from '../../components/ui/ModernGlassComponents';
import { Shield, AlertTriangle, GraduationCap } from 'lucide-react';

const ScopeBadge: React.FC<{ level: string }> = ({ level }) => {
  const configs = {
    'EMT': {
      color: 'bg-green-500/10 text-green-600 border-green-500/30',
      icon: Shield,
      label: 'EMT-B',
      description: 'Your Scope'
    },
    'AEMT': {
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
      icon: AlertTriangle,
      label: 'AEMT',
      description: 'Assist/Future'
    },
    'Paramedic': {
      color: 'bg-red-500/10 text-red-600 border-red-500/30',
      icon: GraduationCap,
      label: 'Paramedic',
      description: 'Career Preview'
    }
  };

  const config = configs[level as keyof typeof configs];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.color} text-xs font-bold`}>
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
      <span className="text-[10px] opacity-75">• {config.description}</span>
    </div>
  );
};

const EMTScopeMedications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emt' | 'aemt' | 'paramedic'>('emt');

  const emtMeds = medicationsData.filter(m => m.certificationLevel === 'EMT');
  const aemtMeds = medicationsData.filter(m => m.certificationLevel === 'AEMT');
  const paramedicMeds = medicationsData.filter(m => m.certificationLevel === 'Paramedic');

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          EMT-B Medications & Advanced Reference
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Complete EMS medication reference organized by certification level. 
          Study YOUR scope, understand what advanced providers can do, and preview your career progression.
        </p>
      </div>

      {/* Scope Disclaimer */}
      <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
              🎯 Scope of Practice Guidance
            </h3>
            <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                <strong>🟢 EMT-B Medications:</strong> You can administer these independently under protocol/medical direction.
              </p>
              <p>
                <strong>🟡 AEMT Medications:</strong> Beyond your scope for independent use. You may assist or prepare. Included for comprehensive understanding.
              </p>
              <p>
                <strong>🔴 Paramedic Medications:</strong> Advanced life support only. Included for career knowledge and team coordination.
              </p>
              <p className="text-xs text-slate-500 mt-3">
                Always verify local protocols. Some jurisdictions expand or restrict EMT-B formularies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('emt')}
          className={`px-6 py-3 font-semibold transition-all relative ${
            activeTab === 'emt'
              ? 'text-green-600 dark:text-green-400'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Your Scope ({emtMeds.length})</span>
          </div>
          {activeTab === 'emt' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('aemt')}
          className={`px-6 py-3 font-semibold transition-all relative ${
            activeTab === 'aemt'
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>AEMT Reference ({aemtMeds.length})</span>
          </div>
          {activeTab === 'aemt' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('paramedic')}
          className={`px-6 py-3 font-semibold transition-all relative ${
            activeTab === 'paramedic'
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Paramedic Reference ({paramedicMeds.length})</span>
          </div>
          {activeTab === 'paramedic' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
          )}
        </button>
      </div>

      {/* EMT-B Medications */}
      {activeTab === 'emt' && (
        <div className="space-y-6">
          <div className="bg-green-900/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-900 dark:text-green-300 font-semibold">
              ✅ These medications are within YOUR scope as an EMT-B. Study them thoroughly - they're on the NREMT!
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {emtMeds.map((medication) => (
              <GlassCard key={medication.name} className="p-6 space-y-4 border-l-4 border-green-500" intensity="low">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{medication.name}</h3>
                    <ScopeBadge level={medication.certificationLevel} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {medication.genericName}
                  </p>
                  <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {medication.category}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Dosage</p>
                    <p className="text-slate-700 dark:text-slate-300">{medication.dosage}</p>
                    <p className="text-xs text-slate-500 mt-1">Route: {medication.route}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Indications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.indications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Contraindications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.contraindications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {medication.administrationNotes && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">⚕️ Administration Notes</p>
                      <p className="text-xs text-blue-800 dark:text-blue-200">{medication.administrationNotes}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* AEMT Medications */}
      {activeTab === 'aemt' && (
        <div className="space-y-6">
          <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-yellow-900 dark:text-yellow-300">
                <p className="font-semibold mb-1">⚠️ AEMT-Level Medications - Beyond Your Current Scope</p>
                <p className="text-sm">
                  As an EMT-B, you may <strong>assist</strong> with these medications or prepare them under ALS supervision. 
                  This content is included for comprehensive understanding and career advancement. 
                  <strong> Do NOT administer independently.</strong>
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aemtMeds.map((medication) => (
              <GlassCard key={medication.name} className="p-6 space-y-4 border-l-4 border-yellow-500" intensity="low">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{medication.name}</h3>
                    <ScopeBadge level={medication.certificationLevel} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {medication.genericName}
                  </p>
                  <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {medication.category}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Dosage</p>
                    <p className="text-slate-700 dark:text-slate-300">{medication.dosage}</p>
                    <p className="text-xs text-slate-500 mt-1">Route: {medication.route}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Indications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.indications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Contraindications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.contraindications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {medication.administrationNotes && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-300 mb-1">📚 For Your Knowledge</p>
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">{medication.administrationNotes}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Paramedic Medications */}
      {activeTab === 'paramedic' && (
        <div className="space-y-6">
          <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-red-900 dark:text-red-300">
                <p className="font-semibold mb-1">🚨 Paramedic-Level Medications - WAY Beyond EMT-B Scope</p>
                <p className="text-sm">
                  These medications require <strong>Paramedic certification, advanced training, and specific protocols</strong>. 
                  As an EMT-B, you will <strong>never administer these independently</strong>. 
                  This content is included to help you understand what ALS providers are doing when you work together and to preview advanced career options.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paramedicMeds.map((medication) => (
              <GlassCard key={medication.name} className="p-6 space-y-4 border-l-4 border-red-500 opacity-90" intensity="low">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{medication.name}</h3>
                    <ScopeBadge level={medication.certificationLevel} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {medication.genericName}
                  </p>
                  <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {medication.category}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Dosage</p>
                    <p className="text-slate-700 dark:text-slate-300">{medication.dosage}</p>
                    <p className="text-xs text-slate-500 mt-1">Route: {medication.route}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Indications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.indications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Contraindications</p>
                    <ul className="ml-4 list-disc space-y-0.5 text-slate-700 dark:text-slate-300">
                      {medication.contraindications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {medication.administrationNotes && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-300 mb-1">🎓 Career Knowledge</p>
                      <p className="text-xs text-red-800 dark:text-red-200">{medication.administrationNotes}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Educational Footer */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>💡 Study Tip:</strong> Focus on EMT-B medications for your NREMT exam. 
          Understanding advanced medications helps you work effectively with ALS teams and prepares you for career advancement.
        </p>
      </div>
    </section>
  );
};

export default EMTScopeMedications;
