import React from 'react';
import ReactDOM from 'react-dom/client';
/*
import * as Sentry from '@sentry/react';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
*/
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import App from './App';
import './index.css';

/*
const analytics = Analytics({
  app: 'EMT-B Web App',
  plugins: [
    googleAnalytics({
      trackingId: import.meta.env.VITE_GA_TRACKING_ID || 'GA_MEASUREMENT_ID',
    }),
  ],
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || 'https://your-sentry-dsn-here',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Track page views
analytics.page();
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
