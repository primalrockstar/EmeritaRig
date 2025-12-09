#!/bin/bash

# Production build script for Android APK

set -e

echo "Building Android APK for production..."

# Clean previous builds
cd android
./gradlew clean

# Build release APK
./gradlew assembleRelease

# The APK will be in android/app/build/outputs/apk/release/app-release.apk

echo "APK built successfully: android/app/build/outputs/apk/release/app-release.apk"

# Optional: Copy to a deployment directory
mkdir -p ../../builds/android
cp app/build/outputs/apk/release/app-release.apk ../../builds/android/EMT-B-v$(date +%Y%m%d-%H%M%S).apk

echo "APK copied to builds/android/"