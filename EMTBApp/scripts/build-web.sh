#!/bin/bash

# Production build script for web app

set -e

echo "Building web app for production..."

cd ../ProMedixEMS-main

# Install dependencies if node_modules not present
if [ ! -d "node_modules" ]; then
    npm install
fi

# Build the app
npm run build

# The build output is in dist/ directory

echo "Web app built successfully in dist/"

# Optional: Copy to a deployment directory
mkdir -p ../builds/web
cp -r dist/* ../builds/web/

echo "Build copied to ../builds/web/"