const { getDefaultConfig } = require('@expo/metro-config');

/**
 * Metro configuration aligned with Expo tooling.
 * https://docs.expo.dev/guides/customizing-metro/
 */
const config = getDefaultConfig(__dirname);

module.exports = config;
