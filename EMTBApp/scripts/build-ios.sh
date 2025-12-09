#!/bin/bash

# Production build script for iOS IPA

set -e

echo "Building iOS IPA for production..."

# Ensure we're on macOS with Xcode
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "iOS builds must be run on macOS with Xcode installed"
    exit 1
fi

# Clean previous builds
cd ios
xcodebuild clean -workspace ProMedixEMS.xcworkspace -scheme ProMedixEMS

# Build archive for release
xcodebuild archive \
  -workspace ProMedixEMS.xcworkspace \
  -scheme ProMedixEMS \
  -configuration Release \
  -archivePath ../builds/ios/EMT-B.xcarchive

# Export IPA from archive
xcodebuild -exportArchive \
  -archivePath ../builds/ios/EMT-B.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath ../builds/ios

echo "IPA built successfully: ../builds/ios/ProMedixEMS.ipa"

# Note: You need to create exportOptions.plist with appropriate settings for App Store or Ad Hoc distribution