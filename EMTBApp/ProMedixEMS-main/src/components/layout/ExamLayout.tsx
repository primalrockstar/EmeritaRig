import React from 'react';

interface ExamLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ExamLayout: React.FC<ExamLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      {/* Header - Minimal, no navigation */}
      <header className="bg-gray-100 border-b border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/assets/logo.png"
                alt="THE RIG NREMT Exam Simulator"
                className="h-12 w-auto"
              />
              <div className="text-sm text-gray-600">
                <div className="font-semibold">NREMT EMT-Basic Certification Exam</div>
                <div>Computer Adaptive Testing (CAT) Simulator</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>Testing Center Environment</div>
              <div className="font-mono">Session: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Clean, distraction-free */}
      <main className="flex-1">
        {title && (
          <div className="max-w-7xl mx-auto px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-serif text-gray-800">{title}</h1>
          </div>
        )}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer - Minimal testing center info */}
      <footer className="bg-gray-100 border-t border-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div>
              <span className="font-semibold">NREMT Official Testing Environment</span>
              <span className="mx-2">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🔒 Secure Testing Environment</span>
              <span>⏱️ Timed Assessment</span>
              <span>📊 Adaptive Scoring</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExamLayout;