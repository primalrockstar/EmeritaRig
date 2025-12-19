import React from 'react';
import { StudyNotesOverview } from '../../components/StudyNotesNavigator';
import EMTBNavigation from '../../features/study/EMTBNavigation';

const CompanionLearnTab = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Study Materials</h1>
          <p className="text-slate-600 dark:text-slate-300">
            45 comprehensive chapters organized into 10 modules aligned with National EMS Education Standards
          </p>
        </div>
        
        <div className="space-y-6">
          <StudyNotesOverview />
          <EMTBNavigation />
        </div>
      </div>
    </div>
  );
};

export default CompanionLearnTab;