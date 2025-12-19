// National Protocol Foundation Manager
// NHTSA 2022 National Model EMS Clinical Guidelines Integration
// Professional EMT-B Training Platform Component

import React, { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { NATIONAL_PROTOCOL_FOUNDATION, type NationalProtocol } from '../data/national-protocols';

interface NationalProtocolManagerProps {
  onProtocolSelect?: (protocol: NationalProtocol) => void;
  showDetailedView?: boolean;
}

const NationalProtocolFoundationManager: React.FC<NationalProtocolManagerProps> = ({ 
  onProtocolSelect, 
  showDetailedView = false 
}) => {
  const protocolCount = NATIONAL_PROTOCOL_FOUNDATION.length;
  const [selectedProtocol, setSelectedProtocol] = useState<NationalProtocol | null>(
    NATIONAL_PROTOCOL_FOUNDATION.length ? NATIONAL_PROTOCOL_FOUNDATION[0] : null
  );
  const [showFullDocument, setShowFullDocument] = useState(false);

  const handleProtocolSelect = (protocol: NationalProtocol) => {
    setSelectedProtocol(protocol);
    if (onProtocolSelect) {
      onProtocolSelect(protocol);
    }
  };

  const applyNationalProtocolFoundation = () => {
    // This would integrate with the platform's protocol system
    if (selectedProtocol) {
      console.log('Applying National Protocol Foundation:', selectedProtocol.title);
      alert('National Protocol Foundation applied successfully!');
    }
  };

  if (showFullDocument) {
    return (
      <div className="min-h-screen bg-blue-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-blue-100 bg-white shadow-xl p-6 md:p-10 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.18em]">EMT Scope</p>
                <h1 className="text-3xl font-bold text-blue-900">National Protocol Foundation Manager</h1>
                <p className="text-slate-600 mt-2 max-w-2xl">
                  Expanded reference view of the {protocolCount} NHTSA-endorsed national protocols for EMT-level care. Use the quick actions to return to the balanced protocol navigator.
                </p>
              </div>
              <button
                onClick={() => setShowFullDocument(false)}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
              >
                Back to Protocols
              </button>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <AlertCircle className="h-10 w-10 flex-shrink-0 text-blue-500" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">NHTSA 2022 National Protocol Foundation</h3>
                    <p className="text-sm text-blue-700">
                      <strong>Document Reference:</strong> DOT HS 813 166 — National Model EMS Clinical Guidelines
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm text-blue-700 sm:grid-cols-2">
                    <p><strong>Attribution:</strong> National Highway Traffic Safety Administration</p>
                    <p><strong>Scope:</strong> EMT-Basic National Standard Curriculum</p>
                    <p><strong>Release:</strong> 2022 Update</p>
                    <p><strong>Use Case:</strong> Education &amp; Competency Development</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    This documentation snapshot maintains fidelity with the official national guidelines and is optimized here for instructional review and protocol mastery.
                  </p>
                </div>
              </div>
            </div>

            {selectedProtocol && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-blue-100 bg-white shadow-lg p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-blue-900">{selectedProtocol.title}</h2>
                      <p className="text-sm text-slate-600">{selectedProtocol.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
                        {selectedProtocol.pageRange}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
                        {selectedProtocol.documentSection}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Clinical Indications</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.clinicalIndications.map((indication, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{indication}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Key Points</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-blue-100 bg-white p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Contraindications</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.contraindications.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 text-rose-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-white p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Procedures</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.procedures.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FileText className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {selectedProtocol.dosages && (
                    <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Medication Dosages</h3>
                      <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-blue-100 text-left text-sm text-slate-700">
                          <thead className="bg-blue-50 text-xs font-semibold uppercase tracking-widest text-blue-600">
                            <tr>
                              <th className="px-4 py-3">Medication</th>
                              <th className="px-4 py-3">Adult Dose</th>
                              <th className="px-4 py-3">Pediatric Dose</th>
                              <th className="px-4 py-3">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-blue-100">
                            {selectedProtocol.dosages.map((dosage, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 font-semibold text-blue-900">{dosage.medication}</td>
                                <td className="px-4 py-3">{dosage.adult}</td>
                                <td className="px-4 py-3">{dosage.pediatric}</td>
                                <td className="px-4 py-3 text-xs text-slate-500">{dosage.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Equipment</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.equipmentRequired.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FileText className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Legal Considerations</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.legalConsiderations.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-700">Quality Assurance</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {selectedProtocol.qualityAssurance.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-blue-100 bg-white shadow-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">National EMT Scope</p>
          <h2 className="text-3xl font-bold text-blue-900">National Protocol Foundation ({protocolCount})</h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Select one of the {protocolCount} nationally recognized EMT protocols to review core indications, interventions, medications, and documentation checkpoints.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFullDocument(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            <ExternalLink className="h-4 w-4" />
            Full Documentation
          </button>
          <button
            onClick={applyNationalProtocolFoundation}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-200"
            disabled={!selectedProtocol}
          >
            <Download className="h-4 w-4" />
            Apply Protocol
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px,1fr] xl:grid-cols-[320px,1fr]">
        <div className="space-y-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            {protocolCount} Core Protocols
          </div>
          {NATIONAL_PROTOCOL_FOUNDATION.map((protocol, index) => {
            const isActive = selectedProtocol?.id === protocol.id;
            return (
              <button
                key={protocol.id}
                type="button"
                onClick={() => handleProtocolSelect(protocol)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition shadow-sm ${
                  isActive
                    ? 'border-blue-400 bg-blue-50 text-blue-900 shadow-md'
                    : 'border-blue-100 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <h3 className="text-base font-semibold">{protocol.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{protocol.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest">
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-blue-600">{protocol.pageRange}</span>
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-blue-600">{protocol.documentSection}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          {selectedProtocol ? (
            <>
              <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Protocol Overview</p>
                    <h3 className="text-2xl font-semibold text-blue-900">{selectedProtocol.title}</h3>
                    <p className="text-sm text-slate-600">{selectedProtocol.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-widest text-blue-700">
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1">{selectedProtocol.pageRange}</span>
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1">{selectedProtocol.documentSection}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Key Points</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Clinical Indications</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.clinicalIndications.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Procedures</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.procedures.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FileText className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Contraindications</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.contraindications.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 text-rose-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedProtocol.dosages && (
                <div className="rounded-2xl border border-blue-100 bg-white p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Medication Dosages</h4>
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-blue-100 text-left text-sm text-slate-700">
                      <thead className="bg-blue-50 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                        <tr>
                          <th className="px-4 py-3">Medication</th>
                          <th className="px-4 py-3">Adult Dose</th>
                          <th className="px-4 py-3">Pediatric Dose</th>
                          <th className="px-4 py-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100">
                        {selectedProtocol.dosages.map((dosage, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 font-semibold text-blue-900">{dosage.medication}</td>
                            <td className="px-4 py-3">{dosage.adult}</td>
                            <td className="px-4 py-3">{dosage.pediatric}</td>
                            <td className="px-4 py-3 text-xs text-slate-500">{dosage.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Equipment</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.equipmentRequired.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FileText className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Legal Considerations</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.legalConsiderations.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Quality Assurance</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {selectedProtocol.qualityAssurance.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-8 text-center text-sm text-slate-600">
              Select a protocol on the left to review national EMT scope guidance supported by the NHTSA 2022 clinical guidelines.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-500" />
          <p className="text-xs text-blue-700">
            <strong>Legal Notice:</strong> These materials integrate the {protocolCount} national EMT protocols cited in the NHTSA 2022 National Model EMS Clinical Guidelines (DOT HS 813 166). Always align with local medical direction, state regulations, and EMS agency policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NationalProtocolFoundationManager;
export { NATIONAL_PROTOCOL_FOUNDATION, type NationalProtocol };