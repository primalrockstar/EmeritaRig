import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const LoginPage = lazy(() => import('./auth/LoginPage'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));

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
      </Routes>
    </Suspense>
  );
};

export default App;
