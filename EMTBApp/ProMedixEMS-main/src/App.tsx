import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const LoginPage = lazy(() => import('./auth/LoginPage'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const ExamScreen = lazy(() => import('./screens/ExamScreen'));
const EMTBFlashcards = lazy(() => import('./features/quiz/EMTBFlashcards'));
const NREMTSimulator = lazy(() => import('./features/nremt-simulator/NREMTSimulator'));
const ClinicalCalculatorsHub = lazy(() => import('./components/ClinicalCalculatorsHub'));
const EMTScopeMedications = lazy(() => import('./features/tools/EMTScopeMedications'));
// const ComprehensiveEMTBStudyNotes = lazy(() => import('./features/study/ComprehensiveEMTBStudyNotes'));
const EMTBPcrTrainer = lazy(() => import('./components/emtb/EMTBPcrTrainer'));
const ProgressDashboard = lazy(() => import('./components/ProgressDashboard'));

// Payment Success Page
const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Welcome to The Rig Premium! You now have full access to all features.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Session ID: {sessionId?.substring(0, 20)}...
        </p>
        <div className="text-sm text-gray-400">
          Redirecting to dashboard in 3 seconds...
        </div>
      </div>
    </div>
  );
};

// Payment Cancel Page
const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          No charges were made. You can try again anytime.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  const { user, loading } = useAuth();
  
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={
          loading ? (
            <div className="flex items-center justify-center min-h-screen">Loading...</div>
          ) : user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardScreen />
          </PrivateRoute>
        } />
        <Route path="/payment/success" element={
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        } />
        <Route path="/payment/cancel" element={
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        } />
        <Route path="/flashcards" element={
          <PrivateRoute>
            <EMTBFlashcards />
          </PrivateRoute>
        } />
        <Route path="/nremt-simulator" element={
          <PrivateRoute>
            <NREMTSimulator />
          </PrivateRoute>
        } />
        <Route path="/simulator" element={
          <PrivateRoute>
            <ExamScreen />
          </PrivateRoute>
        } />
        <Route path="/calculators" element={
          <PrivateRoute>
            <ClinicalCalculatorsHub />
          </PrivateRoute>
        } />
        <Route path="/medications" element={
          <PrivateRoute>
            <EMTScopeMedications />
          </PrivateRoute>
        } />
        {/* <Route path="/study-notes" element={
          <PrivateRoute>
            <ComprehensiveEMTBStudyNotes />
          </PrivateRoute>
        } /> */}
        <Route path="/pcr-trainer" element={
          <PrivateRoute>
            <EMTBPcrTrainer />
          </PrivateRoute>
        } />
        <Route path="/progress" element={
          <PrivateRoute>
            <ProgressDashboard />
          </PrivateRoute>
        } />
        <Route path="/scenarios" element={
          <PrivateRoute>
            <NREMTSimulator />
          </PrivateRoute>
        } />
        <Route path="/meds" element={
          <PrivateRoute>
            <EMTScopeMedications />
          </PrivateRoute>
        } />
      </Routes>
    </Suspense>
  );
};

export default App;
