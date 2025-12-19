import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Search, ArrowLeft, Calculator as CalculatorIcon } from 'lucide-react';
import { clinicalCalculators } from '../data/clinical-calculators';
import { GlassCard, ModernButton } from './ui/ModernGlassComponents';
import ProMedixLogo from './ProMedixLogo';
import { useFTOCoach } from '../hooks/useFTOCoach';

const categoryLabels: Record<string, string> = {
  cardiac: 'Cardiac',
  trauma: 'Trauma',
  pediatric: 'Pediatric',
  respiratory: 'Respiratory',
  assessment: 'Assessment',
  general: 'General'
};

const categoryAccent: Record<string, string> = {
  cardiac: 'text-red-600 bg-red-50 border-red-100',
  trauma: 'text-orange-600 bg-orange-50 border-orange-100',
  pediatric: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  respiratory: 'text-sky-600 bg-sky-50 border-sky-100',
  assessment: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  general: 'text-blue-600 bg-blue-50 border-blue-100'
};

export const ClinicalCalculatorsDirectory: React.FC = () => {
  const [query, setQuery] = useState('');

  const calculators = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return clinicalCalculators;
    return clinicalCalculators.filter((calculator) => {
      return (
        calculator.name.toLowerCase().includes(normalizedQuery) ||
        calculator.description.toLowerCase().includes(normalizedQuery) ||
        calculator.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <div className="flex justify-center">
          <ProMedixLogo variant="landing" size="xl" className="px-4 py-3" animated />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Clinical Calculator Library
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Evidence-based tools for airway, cardiac, pediatric, and trauma decision support—designed for frontline EMS clinicians.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm md:text-base"
            placeholder="Search by calculator name, category, or clinical focus..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {calculators.map((calculator) => {
          const badgeStyle = categoryAccent[calculator.category] || categoryAccent.general;
          return (
            <GlassCard key={calculator.id} className="p-6 bg-white/80" intensity="light">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${badgeStyle}`}>
                  {categoryLabels[calculator.category] || 'Reference'}
                </div>
                <CalculatorIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {calculator.name}
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {calculator.description}
              </p>
              <Link to={`/calculators/${calculator.id}`} className="block">
                <ModernButton variant="gradient" size="sm" fullWidth>
                  Open Calculator
                </ModernButton>
              </Link>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export const ClinicalCalculatorDetail: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const navigate = useNavigate();
  const calculator = clinicalCalculators.find((item) => item.id === calculatorId);

  if (!calculator) {
    return (
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Calculator not found</h2>
          <p className="text-sm text-gray-600">
            The requested calculator is unavailable. Please return to the directory and choose another tool.
          </p>
          <ModernButton variant="gradient" onClick={() => navigate('/calculators')}>
            Back to calculators
          </ModernButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to calculators
        </button>
      </div>

      <GlassCard className="p-8 bg-white/90" intensity="light" hoverable={false}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{calculator.name}</h1>
            <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
              {calculator.description}
            </p>
          </div>
          <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${
            categoryAccent[calculator.category] || categoryAccent.general
          }`}>
            {categoryLabels[calculator.category] || 'Reference'}
          </div>
        </div>
      </GlassCard>

      <CalculatorRunner calculator={calculator} />
    </div>
  );
};

export const CalculatorRunner: React.FC<{ calculator: any }> = ({ calculator }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const { triggerFeedback } = useFTOCoach();

  const handleChange = (input: any, raw: string | boolean) => {
    if (input.type === 'number') {
      const numeric = raw === '' ? '' : Number(raw);
      setValues((previous) => ({ ...previous, [input.id]: isNaN(numeric as number) ? 0 : numeric }));
    } else if (input.type === 'select') {
      const option = (input.options || []).find((candidate: any) => String(candidate.value) === String(raw));
      setValues((previous) => ({ ...previous, [input.id]: option ? option.value : raw }));
    } else if (input.type === 'checkbox') {
      setValues((previous) => ({ ...previous, [input.id]: Boolean(raw) }));
    }
  };

  const runCalculation = () => {
    // Safety validation
    const gcs = values.gcs || values.GCS;
    if (gcs !== undefined && (gcs < 3 || gcs > 15)) {
      triggerFeedback('WARNING');
      setResult({ interpretation: 'Invalid GCS score. Please check your inputs.' });
      return;
    }

    // Check for massive pediatric doses (assuming weight < 40kg and dose > 10mg/kg or similar)
    const weight = values.weight || values.patientWeight;
    const dose = values.dose || values.medicationDose;
    if (weight !== undefined && dose !== undefined && weight < 40 && dose > weight * 0.5) {
      triggerFeedback('WARNING');
      setResult({ interpretation: 'Massive dose for pediatric patient. Verify calculation.' });
      return;
    }

    try {
      const outcome = calculator.calculate(values);
      setResult(outcome);
    } catch (error) {
      console.error('Calculation error', error);
      setResult({ interpretation: 'Unable to compute result. Please verify inputs.' });
    }
  };

  const riskBadge = (risk?: string) => {
    if (!risk) return null;
    const palette: Record<string, string> = {
      'very-high': 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      moderate: 'bg-yellow-100 text-yellow-700',
      low: 'bg-emerald-100 text-emerald-700'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${palette[risk] || 'bg-gray-100 text-gray-700'}`}>
        {risk}
      </span>
    );
  };

  return (
    <GlassCard className="p-8 bg-white" intensity="light" hoverable={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculator.inputs.map((input: any) => (
          <div key={input.id} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {input.label}
              {input.unit ? <span className="text-gray-500"> ({input.unit})</span> : null}
              {input.required ? <span className="text-red-500 ml-1">*</span> : null}
            </label>
            {input.type === 'number' && (
              <input
                type="number"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                value={values[input.id] ?? ''}
                min={input.min}
                max={input.max}
                step={input.step}
                onChange={(event) => handleChange(input, event.target.value)}
              />
            )}
            {input.type === 'select' && (
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                value={values[input.id] ?? ''}
                onChange={(event) => handleChange(input, event.target.value)}
              >
                <option value="" disabled>Select...</option>
                {(input.options || []).map((option: any) => (
                  <option key={String(option.value)} value={String(option.value)}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {input.type === 'checkbox' && (
              <label className="inline-flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  checked={Boolean(values[input.id])}
                  onChange={(event) => handleChange(input, event.target.checked)}
                />
                <span>{input.description ?? 'Include in calculation'}</span>
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <ModernButton variant="gradient" onClick={runCalculation}>
          Calculate result
        </ModernButton>
        {riskBadge(result?.risk)}
      </div>

      {result && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-3">
          {typeof result.score !== 'undefined' && (
            <div className="text-sm text-gray-600">
              Score: <span className="font-semibold text-gray-900">{result.score}</span>
            </div>
          )}
          <div className="text-base font-medium text-gray-900">
            {result.interpretation}
          </div>
          {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {result.recommendations.map((recommendation: string, index: number) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          )}
          {result.details && (
            <div className="text-xs text-gray-500">
              {Object.entries(result.details).map(([key, value]) => `${key}: ${value}`).join(' | ')}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
};
