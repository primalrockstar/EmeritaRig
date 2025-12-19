import React from 'react';
import LandingNavbar from '../components/LandingNavbar';
import LandingHero from '../components/LandingHero';
import LandingStats from '../components/LandingStats';

const LandingPage: React.FC = () => {
  const handleLogin = () => {
    // Navigate to login page
    window.location.href = '/auth/login';
  };

  const handleStartTraining = () => {
    // Navigate to registration or dashboard
    window.location.href = '/auth/register';
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <LandingNavbar
        onLogin={handleLogin}
        onStartTraining={handleStartTraining}
      />

      <main>
        <LandingHero onStartTraining={handleStartTraining} />
        <LandingStats />
      </main>
    </div>
  );
};

export default LandingPage;