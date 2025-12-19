import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, FileText, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MedicalDisclaimer from './MedicalDisclaimer';

interface DisclaimerPageProps {
  onComplete?: () => void;
  autoAdvance?: boolean;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onComplete, autoAdvance = false }) => {
  const [countdown, setCountdown] = useState(autoAdvance ? 5 : 0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoAdvance) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoAdvance]);

  const handleComplete = () => {
    if (autoAdvance && onComplete) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  const handleAccept = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (autoAdvance && !isVisible) return null;
  return (
    <div className={`min-h-screen bg-gray-50 ${autoAdvance ? 'fixed inset-0 z-[100] transition-opacity duration-300' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {!autoAdvance && (
            <div className="flex items-center space-x-4 mb-4">
              <Link 
                to="/"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Medical & Protocol Disclaimer</h1>
              <p className="text-gray-600 mt-2">
                Complete legal and medical disclaimer for ProMedix EMS™ educational platform
              </p>
              {autoAdvance && countdown > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Auto-advancing in {countdown} seconds
                  </div>
                  <button 
                    onClick={handleComplete}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Skip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                CRITICAL: Read Before Using Platform
              </h2>
              <p className="text-red-700 text-sm leading-relaxed">
                This platform is for educational purposes only. It does not constitute medical advice, 
                diagnosis, treatment, or official emergency medical protocols. Always follow your current 
                local EMS protocols and obtain proper medical direction.
              </p>
            </div>
          </div>
        </div>

        {/* Full Disclaimer Component */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <MedicalDisclaimer variant="inline" />
        </div>

        {/* Additional Resources */}
        <div className="bg-blue-50 rounded-xl p-6 mt-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Additional Resources</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <h4 className="font-medium text-blue-900">Complete Medical Disclaimer Document</h4>
                <p className="text-sm text-blue-600">Comprehensive legal and medical disclaimer (PDF)</p>
              </div>
              <a 
                href="/MEDICAL_DISCLAIMER.md" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Document
              </a>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <h4 className="font-medium text-blue-900">NREMT Standards</h4>
                <p className="text-sm text-blue-600">Official EMT scope of practice and standards</p>
              </div>
              <a 
                href="https://www.nremt.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit NREMT
              </a>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <h4 className="font-medium text-blue-900">Local EMS Protocols</h4>
                <p className="text-sm text-blue-600">Always consult your local medical director and protocols</p>
              </div>
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                Contact Medical Control
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Information */}
        <div className="bg-red-50 rounded-xl p-6 mt-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Emergency Contacts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-1">Emergency Services</h4>
              <p className="text-red-700">911 (or local emergency number)</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-1">Poison Control</h4>
              <p className="text-red-700">1-800-222-1222</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-1">Medical Control</h4>
              <p className="text-red-700">Contact your local medical control</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-1">EMS Supervisor</h4>
              <p className="text-red-700">Contact your agency supervisor</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-sm text-gray-500">
          <p>ProMedix EMS™ - Educational Training Platform</p>
          <p className="font-medium">FOR TRAINING PURPOSES ONLY</p>
          <p className="mt-2">Last Updated: August 12, 2025</p>
          
          {autoAdvance && (
            <div className="mt-6">
              <button 
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                I Understand & Accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
