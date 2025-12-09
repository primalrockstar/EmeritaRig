import React from 'react';
import { EMT_SCOPE_MEDICATIONS } from '../../data/emtb/emt-scope-medications';
import { GlassCard } from '../../components/ui/ModernGlassComponents';

const EMTScopeMedications: React.FC = () => {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">EMT Scope of Practice Medications</h2>
        <p className="text-slate-600 leading-relaxed">
          Quick reference for medications EMTs may administer or assist with under most state protocols.
          Verify local guidelines and medical direction because formularies and standing orders vary by region.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {EMT_SCOPE_MEDICATIONS.map((medication) => (
          <GlassCard key={medication.name} className="p-6 space-y-5" intensity="low">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900">{medication.name}</h3>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                {medication.classification}
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Forms</p>
                <ul className="ml-4 list-disc space-y-1">
                  {medication.forms.map((form) => (
                    <li key={form}>{form}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-inner">
                <p className="font-semibold text-slate-900">Dosage & Route</p>
                <ul className="mt-2 space-y-1 text-slate-700">
                  <li>
                    <span className="font-semibold">Adult:</span> {medication.dosage.adult}
                  </li>
                  <li>
                    <span className="font-semibold">Pediatric:</span> {medication.dosage.pediatric}
                  </li>
                  <li>
                    <span className="font-semibold">Route:</span> {medication.dosage.route}
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Indications</p>
                <ul className="ml-4 list-disc space-y-1">
                  {medication.indications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Contraindications</p>
                <ul className="ml-4 list-disc space-y-1">
                  {medication.contraindications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {medication.precautions && medication.precautions.length > 0 && (
                <div>
                  <p className="font-semibold text-slate-900">Precautions</p>
                  <ul className="ml-4 list-disc space-y-1">
                    {medication.precautions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="font-semibold text-slate-900">Common Side Effects</p>
                <ul className="ml-4 list-disc space-y-1">
                  {medication.sideEffects.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {medication.notes && medication.notes.length > 0 && (
                <div className="rounded-xl border border-dashed border-slate-200/70 bg-slate-50/60 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Protocol Notes
                  </p>
                  <ul className="mt-2 ml-4 list-disc space-y-1 text-slate-700">
                    {medication.notes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default EMTScopeMedications;
