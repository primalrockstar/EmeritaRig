import React, { useEffect, useMemo, useState } from 'react';
import {
  clinicalCalculators,
  Calculator,
  CalculatorInput,
  CalculatorResult
} from '../../data/clinical-calculators';
import { drugFormulary, Medication } from '../../data/pharmacology';
import {
  GlassCard,
  ModernButton
} from '../ui/ModernGlassComponents';
import {
  Activity,
  Baby,
  Brain,
  Calculator as CalculatorIcon,
  ClipboardList,
  HeartPulse,
  Pill,
  Search,
  Stethoscope,
  Wind
} from 'lucide-react';

interface CategoryMeta {
  label: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

type CalculatorValues = Record<string, any>;

type CalculatorGroups = Partial<Record<Calculator['category'], Calculator[]>>;

const categoryMeta: Record<Calculator['category'], CategoryMeta> = {
  general: {
    label: 'General Assessment',
    accent: 'text-blue-600',
    icon: Brain,
    description: 'Core neurologic and patient assessment tools used on every call.'
  },
  cardiac: {
    label: 'Cardiac & Perfusion',
    accent: 'text-red-600',
    icon: HeartPulse,
    description: 'Risk scores and decision aids for chest pain and cardiac care.'
  },
  trauma: {
    label: 'Trauma & Burns',
    accent: 'text-orange-500',
    icon: Activity,
    description: 'Rapid trauma assessments including burn surface estimates.'
  },
  pediatric: {
    label: 'Pediatric Care',
    accent: 'text-emerald-600',
    icon: Baby,
    description: 'Growth, vital sign, and dosing tools tailored to pediatric patients.'
  },
  respiratory: {
    label: 'Respiratory Support',
    accent: 'text-teal-600',
    icon: Wind,
    description: 'Assessment aids for airway and ventilation management.'
  },
  assessment: {
    label: 'Field Assessment Aids',
    accent: 'text-indigo-600',
    icon: ClipboardList,
    description: 'Rapid reference tools for level-of-consciousness and triage decisions.'
  }
};

const categoryOrder: Calculator['category'][] = [
  'assessment',
  'general',
  'cardiac',
  'respiratory',
  'trauma',
  'pediatric'
];

const riskAccent: Record<NonNullable<CalculatorResult['risk']>, string> = {
  'low': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'moderate': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  'high': 'bg-orange-100 text-orange-700 border border-orange-200',
  'very-high': 'bg-red-100 text-red-700 border border-red-200'
};

type ViewMode = 'calculators' | 'pharmacology';

const ClinicalCalculatorsHub: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('calculators');
  const [searchQuery, setSearchQuery] = useState('');

  const calculatorsByCategory = useMemo<CalculatorGroups>(() => {
    return clinicalCalculators.reduce<CalculatorGroups>((groups, calc) => {
      const existing = groups[calc.category] ?? [];
      groups[calc.category] = [...existing, calc];
      return groups;
    }, {});
  }, []);

  // Filter medications based on search
  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) return drugFormulary;
    return drugFormulary.filter(med =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indications.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const [activeCalculatorId, setActiveCalculatorId] = useState<string>(
    clinicalCalculators[0]?.id ?? ''
  );
  const [values, setValues] = useState<CalculatorValues>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const activeCalculator = useMemo(
    () => clinicalCalculators.find((calc) => calc.id === activeCalculatorId),
    [activeCalculatorId]
  );

  useEffect(() => {
    // Reset inputs whenever the active calculator changes
    setValues({});
    setResult(null);
  }, [activeCalculatorId]);

  const handleInputChange = (input: CalculatorInput, rawValue: string | boolean) => {
    if (input.type === 'number') {
      const parsed = rawValue === '' ? '' : Number(rawValue);
      setValues((prev) => ({ ...prev, [input.id]: isNaN(parsed as number) ? '' : parsed }));
      return;
    }

    if (input.type === 'select') {
      const option = (input.options ?? []).find((opt) => String(opt.value) === String(rawValue));
      setValues((prev) => ({ ...prev, [input.id]: option ? option.value : rawValue }));
      return;
    }

    setValues((prev) => ({ ...prev, [input.id]: Boolean(rawValue) }));
  };

  const runCalculation = () => {
    if (!activeCalculator) return;

    try {
      const output = activeCalculator.calculate(values);
      setResult(output);
    } catch (error) {
      console.error('Calculator error', error);
      setResult({
        interpretation: 'Unable to complete calculation. Please verify your inputs.',
        recommendations: []
      });
    }
  };

  const resetInputs = () => {
    setValues({});
    setResult(null);
  };

  // Pharmacology view component
  const PharmacologyView = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <GlassCard className="p-4 bg-slate-800/60 backdrop-blur-md border border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search medications by name, indication, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-slate-900/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-cyan-400/70"
          />
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="text-sm text-slate-400">
        Showing {filteredMedications.length} of {drugFormulary.length} medications
      </div>

      {/* Medication Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMedications.map((medication) => (
          <GlassCard
            key={medication.id}
            className="p-6 bg-slate-800/60 backdrop-blur-md border border-white/10 hover:border-cyan-400/30 transition-all duration-200"
            intensity="medium"
            hoverable
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-500/20 p-2">
                    <Pill className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{medication.name}</h3>
                    <p className="text-sm text-slate-400">{medication.genericName}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                  {medication.certificationLevel}
                </span>
              </div>

              {/* Dosage */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Dosage</div>
                <div className="text-sm text-slate-100 font-medium">{medication.dosage}</div>
              </div>

              {/* Route */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Route</div>
                <div className="text-sm text-slate-100">{medication.route}</div>
              </div>

              {/* Indications */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Indications</div>
                <div className="space-y-1">
                  {medication.indications.slice(0, 2).map((indication, index) => (
                    <div key={index} className="text-xs text-slate-300 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-cyan-400" />
                      {indication}
                    </div>
                  ))}
                  {medication.indications.length > 2 && (
                    <div className="text-xs text-slate-500">+{medication.indications.length - 2} more</div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No medications found</h3>
          <p className="text-slate-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-cyan-500/20 text-cyan-400">
          {viewMode === 'calculators' ? <CalculatorIcon className="w-8 h-8" /> : <Pill className="w-8 h-8" />}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Clinical Tools Hub
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Access evidence-based calculators and complete medication formulary for EMT-B practice.
          </p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-slate-800/60 backdrop-blur-md border border-white/10 p-1">
          <button
            onClick={() => setViewMode('calculators')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'calculators'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <CalculatorIcon className="w-4 h-4 inline mr-2" />
            Calculators
          </button>
          <button
            onClick={() => setViewMode('pharmacology')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              viewMode === 'pharmacology'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Pill className="w-4 h-4 inline mr-2" />
            Pharmacology
          </button>
        </div>
      </div>

      {viewMode === 'calculators' ? (
        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <GlassCard className="p-6 space-y-6" intensity="medium">
          {categoryOrder.map((category) => {
            const calculators = calculatorsByCategory[category];
            if (!calculators || calculators.length === 0) {
              return null;
            }

            const meta = categoryMeta[category];
            const Icon = meta.icon;

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-xl bg-white/50 dark:bg-gray-800/60 p-2 shadow-inner">
                    <Icon className={`w-5 h-5 ${meta.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {meta.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {meta.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {calculators.map((calculator) => {
                    const isActive = calculator.id === activeCalculatorId;
                    return (
                      <button
                        key={calculator.id}
                        onClick={() => setActiveCalculatorId(calculator.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 backdrop-blur-sm ${
                          isActive
                            ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300 shadow-inner'
                            : 'border-white/30 bg-white/5 hover:bg-white/10 dark:border-gray-700 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        <div className="font-medium">{calculator.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{calculator.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </GlassCard>

        <GlassCard className="p-6 space-y-6" intensity="strong">
          {activeCalculator ? (
            <>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                  <Stethoscope className="w-4 h-4" />
                  Active Calculator
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeCalculator.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeCalculator.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCalculator.inputs.map((input) => {
                  const value = values[input.id];
                  const baseClasses = 'w-full rounded-xl border border-white/40 bg-white/60 dark:bg-gray-900/60 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400/70';

                  return (
                    <div key={input.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {input.label}
                        {input.unit && <span className="ml-1 text-xs text-gray-500">({input.unit})</span>}
                        {input.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {input.type === 'number' && (
                        <input
                          type="number"
                          className={baseClasses}
                          value={value === undefined ? '' : value}
                          min={input.min}
                          max={input.max}
                          step={input.step}
                          onChange={(event) => handleInputChange(input, event.target.value)}
                        />
                      )}

                      {input.type === 'select' && (
                        <select
                          className={baseClasses}
                          value={value === undefined ? '' : String(value)}
                          onChange={(event) => handleInputChange(input, event.target.value)}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {(input.options ?? []).map((option) => (
                            <option key={String(option.value)} value={String(option.value)}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {input.type === 'checkbox' && (
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-white/40 text-blue-600 focus:ring-blue-500"
                            checked={Boolean(value)}
                            onChange={(event) => handleInputChange(input, event.target.checked)}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {input.description || 'Toggle if applicable'}
                          </span>
                        </div>
                      )}

                      {input.description && input.type !== 'checkbox' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {input.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <ModernButton variant="gradient" size="lg" onClick={runCalculation}>
                  Calculate Result
                </ModernButton>
                <ModernButton variant="glass" size="lg" onClick={resetInputs}>
                  Reset Inputs
                </ModernButton>
              </div>

              {result && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/30 bg-white/40 dark:bg-gray-900/60 p-5 shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Interpretation
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {result.interpretation}
                        </div>
                      </div>
                      {result.risk && (
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${riskAccent[result.risk]}`}>
                          {result.risk.toUpperCase()} RISK
                        </span>
                      )}
                    </div>

                    {typeof result.score !== 'undefined' && (
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        Calculated Score: <span className="font-semibold text-gray-900 dark:text-white">{result.score}</span>
                      </div>
                    )}

                    {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Recommended Actions
                        </div>
                        <ul className="space-y-2">
                          {result.recommendations.map((recommendation, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.details && (
                      <div className="mt-4 rounded-xl bg-white/50 dark:bg-gray-800/70 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                          Calculation Breakdown
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 grid sm:grid-cols-2 gap-2">
                          {Object.entries(result.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium text-gray-700 dark:text-gray-200 mr-1">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                              </span>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-blue-500/10 p-4 text-blue-600">
                <CalculatorIcon className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Select a calculator to begin
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a clinical tool from the list to load interactive inputs and interpretations.
                </p>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
      ) : (
        <PharmacologyView />
      )}
    </div>
  );
};

export default ClinicalCalculatorsHub;
