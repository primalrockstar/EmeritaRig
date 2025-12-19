import React, { useState } from 'react';
import { AlertTriangle, Shield, X, ExternalLink } from 'lucide-react';

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'modal' | 'inline';
  onClose?: () => void;
  showOnce?: boolean;
}

const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({ 
  variant = 'inline', 
  onClose,
  showOnce = false
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
    if (showOnce) {
      localStorage.setItem('promedix_disclaimer_accepted', 'true');
    }
  };

  const handleAcknowledge = () => {
    localStorage.setItem('promedix_disclaimer_acknowledged', Date.now().toString());
    handleClose();
  };

  if (!isVisible) return null;

  const bannerClasses = "fixed top-0 left-0 right-0 bg-red-50 border-b-2 border-red-200 z-50 shadow-md";
  const modalClasses = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
  const inlineClasses = "bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm";

  const containerClasses = variant === 'banner' ? bannerClasses : 
                          variant === 'modal' ? modalClasses : inlineClasses;

  return (
    <div className={containerClasses}>
      {variant === 'modal' && (
        <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Medical & Protocol Disclaimer</h2>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            <DisclaimerContent />
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleAcknowledge}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                I Understand and Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {variant === 'banner' && (
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-xs md:text-sm font-medium text-red-800">
                <span className="font-bold">DISCLAIMER:</span> Educational only. Follow local protocols.
              </p>
            </div>
            <button 
              onClick={handleClose}
              className="p-1 hover:bg-red-100 rounded transition-colors ml-2 flex-shrink-0"
            >
              <X className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
            </button>
          </div>
        </div>
      )}

      {variant === 'inline' && (
        <div className="p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Medical & Protocol Disclaimer
              </h3>
              <DisclaimerContent compact />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DisclaimerContent: React.FC<{ compact?: boolean }> = ({ compact }) => {
  if (compact) {
    return (
      <div className="text-sm text-red-700 space-y-2">
        <p className="font-medium">
          <strong>FOR EDUCATIONAL PURPOSES ONLY:</strong> This platform provides training materials and is not a substitute for official medical protocols or direct medical supervision.
        </p>
        <p>
          Always follow your current local EMS protocols, medical director guidelines, and receive proper authorization before performing any medical procedures.
        </p>
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-700 space-y-4">
      <div className="bg-red-100 border border-red-300 rounded-lg p-4">
        <h4 className="font-bold text-red-800 text-base mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          CRITICAL DISCLAIMER - READ CAREFULLY
        </h4>
        <p className="text-red-700 font-medium">
          This educational platform is designed for training purposes only and does not constitute medical advice, 
          diagnosis, treatment, or official emergency medical protocols.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Educational Purpose Only</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>All content is for educational and training purposes only</li>
          <li>Information may not reflect current local protocols or guidelines</li>
          <li>This platform is not a substitute for formal EMS education or certification programs</li>
          <li>Always verify information with current textbooks, protocols, and instructors</li>
        </ul>

        <h4 className="font-semibold text-gray-900">Medical Practice Limitations</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Do NOT use this platform to make actual patient care decisions</li>
          <li>Always follow your current local EMS protocols and medical director guidelines</li>
          <li>Obtain proper medical direction and authorization before performing procedures</li>
          <li>Practice only within your certified scope of practice and training level</li>
        </ul>

        <h4 className="font-semibold text-gray-900">Protocol Compliance</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Protocols vary by jurisdiction, agency, and medical director</li>
          <li>Always refer to your current, official local protocols</li>
          <li>Medication dosages and procedures may differ from local standards</li>
          <li>Contact medical control for guidance in actual emergency situations</li>
        </ul>

        <h4 className="font-semibold text-gray-900">Liability and Responsibility</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Users assume full responsibility for their actions and decisions</li>
          <li>ProMedix EMS™ and its creators are not liable for any outcomes from platform use</li>
          <li>This platform does not guarantee certification, employment, or competency</li>
          <li>Professional judgment and current training supersede all platform content</li>
        </ul>

        <h4 className="font-semibold text-gray-900">Emergency Situations</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>In actual emergencies, call 911 or your local emergency number immediately</li>
          <li>Do not delay care to consult educational materials</li>
          <li>Follow established emergency protocols and seek immediate medical direction</li>
          <li>This platform is not designed for real-time emergency consultation</li>
        </ul>

        <h4 className="font-semibold text-gray-900">Content Accuracy</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Information is provided as-is without warranty of accuracy or completeness</li>
          <li>Medical knowledge evolves rapidly; content may become outdated</li>
          <li>Always cross-reference with current medical literature and protocols</li>
          <li>Report any errors or concerns to your instructor or supervisor</li>
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Professional Resources</h4>
        <p className="text-blue-700 text-sm">
          For official protocols and medical guidance, consult:
        </p>
        <ul className="list-disc list-inside text-sm text-blue-600 mt-2 space-y-1">
          <li>Your local EMS medical director and protocols</li>
          <li>Current NREMT standards and scope of practice</li>
          <li>State and regional EMS authority guidelines</li>
          <li>Approved EMS textbooks and continuing education providers</li>
        </ul>
      </div>

      <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
        <p>
          By using this platform, you acknowledge that you have read, understood, and agree to these terms. 
          This disclaimer was last updated on August 12, 2025.
        </p>
        <p className="mt-2">
          ProMedix EMS™ - Educational Training Platform | 
          <span className="font-medium"> For Training Purposes Only</span>
        </p>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
