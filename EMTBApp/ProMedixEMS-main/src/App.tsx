import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('./auth/LoginPage'));
const ExamScreen = lazy(() => import('./screens/ExamScreen'));
const CompanionDashboard = lazy(() => import('./app/components/dashboard/CompanionDashboard'));
const InstrumentationValidator = lazy(() => import('./components/debug/InstrumentationValidator'));
const InstrumentationTests = lazy(() => import('./components/debug/InstrumentationTests'));
const EMTBFlashcards = lazy(() => import('./components/emtb/EMTBFlashcards'));
const EMTBPcrTrainer = lazy(() => import('./components/emtb/EMTBPcrTrainer'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<CompanionDashboard />} />
        <Route path="/dashboard" element={<CompanionDashboard />} />
        <Route path="/simulator" element={<ExamScreen />} />
        <Route path="/flashcards" element={<EMTBFlashcards />} />
        <Route path="/pcr-trainer" element={<EMTBPcrTrainer />} />
        <>
          <Route path="/validate" element={<InstrumentationValidator />} />
          <Route path="/tests" element={<InstrumentationTests />} />
        </>
      </Routes>
    </Suspense>
  );
};

export default App;
