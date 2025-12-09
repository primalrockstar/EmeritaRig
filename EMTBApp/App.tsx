import React from 'react';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/UWorldStyleNavigator';

/**
 * ProMedix EMS - Main App Entry Point
 * UWorld-style drawer navigation with clinical reasoning engine
 */
const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
