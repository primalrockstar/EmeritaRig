// Main App Component - EMT-B Mobile App
import React from 'react';
import { StatusBar } from 'react-native';

// Import navigation and auth
import AppNavigator from './navigation/UWorldStyleNavigator';
import { AuthProvider } from './auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;