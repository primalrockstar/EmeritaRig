import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function MedicalDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already agreed in this browser session/storage
    const hasAgreed = localStorage.getItem('rig_legal_consent');
    if (!hasAgreed) {
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    // Save consent timestamp
    localStorage.setItem('rig_legal_consent', new Date().toISOString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    // FULL SCREEN OVERLAY (Blocks interaction)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">

      <div className="bg-slate-900 border-2 border-red-500/50 rounded-xl max-w-2xl w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-in zoom-in-95 duration-300">

        {/* HEADER */}
        <div className="flex items-center gap-4 border-b border-slate-800 p-6 bg-red-500/10 rounded-t-xl">
          <div className="bg-red-500/20 p-3 rounded-full text-red-500 animate-pulse">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
              Critical Educational Notice
            </h2>
            <p className="text-red-400 text-xs font-mono uppercase tracking-widest">
              Review Required Before Access
            </p>
          </div>
        </div>

        {/* SCROLLABLE LEGAL TEXT */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-gray-300 leading-relaxed custom-scrollbar">

          <div className="bg-slate-800 p-4 rounded border-l-4 border-red-500">
            <p className="font-bold text-white mb-1">NO MEDICAL ADVICE</p>
            <p className="text-sm">
              THE RIG is a simulation and training tool designed solely for educational purposes.
              It is <strong>not</strong> a substitute for professional medical training, official certification,
              or live clinical judgment.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              <strong>1. Not a Clinical Tool:</strong> Do not use this application to diagnose, treat, or manage actual patients.
              This software is not an FDA-approved medical device.
            </p>
            <p>
              <strong>2. Protocols Vary:</strong> The scenarios, drugs, and dosages presented within THE RIG are based on
              National EMS Education Standards (NREMT). Your local protocols, Medical Director, and State Scope of Practice
              <strong>always</strong> take precedence.
            </p>
            <p>
              <strong>3. No Affiliation:</strong> Emerita Clinical is an independent entity and is not affiliated with,
              endorsed by, or sponsored by the NREMT, AAOS, or AHA.
            </p>
            <p>
              <strong>4. Assumption of Risk:</strong> By using this platform, you acknowledge that emergency medicine
              is dynamic. The developers assume no liability for errors, omissions, or outcomes related to the use
              of this information in a clinical setting.
            </p>
          </div>

        </div>

        {/* FOOTER / ACTION */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 rounded-b-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            By clicking "Acknowledge", you agree to the Terms of Service.
          </p>

          <button
            onClick={handleAgree}
            className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <CheckCircle size={20} />
            I ACKNOWLEDGE & ENTER
          </button>
        </div>

      </div>
    </div>
  );
}
