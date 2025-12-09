import {AppRegistry} from 'react-native';
import * as Sentry from '@sentry/react-native';
import App from './src/App';
import {name as appName} from './app.json';

Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://your-sentry-dsn-here',
  tracesSampleRate: 1.0,
  enableTracing: true,
});

AppRegistry.registerComponent(appName, () => App);