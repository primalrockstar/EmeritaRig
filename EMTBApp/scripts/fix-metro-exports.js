#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const packagesNeedingSrcExports = [
  { name: 'metro-cache', target: './src/*.js' },
  { name: 'metro-transform-worker', target: './src/*.js' },
  { name: 'metro', target: './src/*.js' },
  { name: 'metro-transform-plugins', target: './src/*' },
];

packagesNeedingSrcExports.forEach(({ name, target }) => {
  const packageJsonPath = path.join(rootDir, 'node_modules', name, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`[postinstall] Skipping ${name}; package.json was not found.`);
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.exports = packageJson.exports || {};

    if (packageJson.exports['./src/*'] !== target) {
      packageJson.exports['./src/*'] = target;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`[postinstall] Added "./src/*" export to ${name}.`);
    }
  } catch (error) {
    console.warn(`[postinstall] Unable to patch ${name}:`, error.message);
  }
});

const defaultExportPatches = [
  {
    label: 'metro sourceMapString',
    file: path.join(rootDir, 'node_modules', 'metro', 'src', 'DeltaBundler', 'Serializers', 'sourceMapString.js'),
    addition: '\nexports.default = sourceMapString;\n',
  },
  {
    label: 'metro JsFileWrapping',
    file: path.join(rootDir, 'node_modules', 'metro', 'src', 'ModuleGraph', 'worker', 'JsFileWrapping.js'),
    addition: `
exports.default = {
  WRAP_NAME,
  jsonToCommonJS,
  wrapJson,
  wrapModule,
  wrapPolyfill,
};
`,
  },
  {
    label: 'metro-cache-key',
    file: path.join(rootDir, 'node_modules', 'metro-cache-key', 'src', 'index.js'),
    addition: '\nexports.default = getCacheKey;\n',
  },
];

defaultExportPatches.forEach(({ label, file, addition }) => {
  if (!fs.existsSync(file)) {
    console.warn(`[postinstall] Skipping ${label}; file not found.`);
    return;
  }

  try {
    const contents = fs.readFileSync(file, 'utf8');
    if (contents.includes('exports.default')) {
      return;
    }

    fs.writeFileSync(file, `${contents.trimEnd()}\n${addition.trimStart()}`);
    console.log(`[postinstall] Added default export to ${label}.`);
  } catch (error) {
    console.warn(`[postinstall] Unable to add default export to ${label}:`, error.message);
  }
});

const reactIndexPath = path.join(rootDir, 'node_modules', 'react', 'index.js');
const reactPolyfillSnippet = `'use strict';

const React = process.env.NODE_ENV === 'production'
  ? require('./cjs/react.production.min.js')
  : require('./cjs/react.development.js');

if (!React.use && typeof React.useContext === 'function') {
  React.use = React.useContext;
}

module.exports = React;
`;

if (fs.existsSync(reactIndexPath)) {
  try {
    const current = fs.readFileSync(reactIndexPath, 'utf8');
    if (!current.includes('React.use = React.useContext')) {
      fs.writeFileSync(reactIndexPath, reactPolyfillSnippet);
      console.log('[postinstall] Added React.use polyfill for expo-router compatibility.');
    }
  } catch (error) {
    console.warn('[postinstall] Unable to patch react/index.js:', error.message);
  }
}

const expoDomDir = path.join(rootDir, 'node_modules', 'expo', 'dom');
const expoDomGlobalPath = path.join(expoDomDir, 'global.js');
const expoDomIndexPath = path.join(expoDomDir, 'index.js');
const ensureExpoDomShim = () => {
  try {
    fs.mkdirSync(expoDomDir, { recursive: true });
    if (!fs.existsSync(expoDomGlobalPath)) {
      const shim = `'use strict';
const listeners = new Set();

function addGlobalDomEventListener(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitGlobalDomEvent(event) {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (error) {
      console.warn('[postinstall] expo/dom/global listener error:', error?.message ?? error);
    }
  });
}

module.exports = {
  addGlobalDomEventListener,
  emitGlobalDomEvent,
};
`;
      fs.writeFileSync(expoDomGlobalPath, shim);
      console.log('[postinstall] Added expo/dom/global shim.');
    }

    if (!fs.existsSync(expoDomIndexPath)) {
      const indexContents = `'use strict';
const global = require('./global');

module.exports = {
  addGlobalDomEventListener: global.addGlobalDomEventListener,
  emitGlobalDomEvent: global.emitGlobalDomEvent,
};
`;
      fs.writeFileSync(expoDomIndexPath, indexContents);
      console.log('[postinstall] Added expo/dom shim.');
    }
  } catch (error) {
    console.warn('[postinstall] Unable to create expo/dom shim:', error.message);
  }
};

ensureExpoDomShim();