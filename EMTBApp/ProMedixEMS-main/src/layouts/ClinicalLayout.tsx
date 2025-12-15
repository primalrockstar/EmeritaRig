import React from 'react';
import { GraduationCap } from 'lucide-react';
import LegalDisclaimer from '../components/common/LegalDisclaimer';

interface ClinicalLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ClinicalLayout: React.FC<ClinicalLayoutProps> = ({
  children,
  title = "NREMT EXAM SIMULATOR"
}) => {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header - Solid Blue */}
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-white" />
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">NREMT</h1>
                  <p className="text-xs text-blue-100 uppercase tracking-wider">National Registry of Emergency Medical Technicians</p>
                </div>
              </div>
              {title && title !== "NREMT EXAM SIMULATOR" && (
                <div className="hidden md:block">
                  <div className="w-px h-8 bg-blue-600" />
                  <span className="ml-4 text-sm font-medium text-blue-100">{title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white text-black">
        {children}
      </main>

      {/* Footer - Grey bar with Next/Prev buttons */}
      <footer className="bg-gray-100 border-t border-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              © 2025 National Registry of Emergency Medical Technicians
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Next
              </button>
            </div>
          </div>
          <LegalDisclaimer />
        </div>
      </footer>
    </div>
  );
};

export default ClinicalLayout;