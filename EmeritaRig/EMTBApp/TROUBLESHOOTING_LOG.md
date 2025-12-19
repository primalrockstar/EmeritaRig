# EMT-B - Android Troubleshooting Log

## 🛠️ Build & Runtime Fixes (November 2025)

This document records the specific technical interventions required to get the React Native 0.72.6 app running on Android API 36 (Android 15).

### 1. Build Failures (Gradle/Kotlin)
**Issue:** Incompatibility between React Native 0.72.6 and modern Android libraries (AndroidX, Kotlin 2.0).
**Fix:**
- Added `resolutionStrategy` to `android/app/build.gradle` to force compatible versions:
  ```gradle
  configurations.all {
      resolutionStrategy {
          force 'androidx.core:core:1.10.1'
          force 'androidx.core:core-ktx:1.10.1'
          force 'androidx.fragment:fragment:1.6.1'
      }
  }
  ```

### 2. Runtime Crash (Launch)
**Issue:** App crashed immediately on launch with `java.lang.NoClassDefFoundError: Failed resolution of: Landroidx/datastore/preferences/core/PreferencesKeys;`.
**Cause:** `react-native-keychain` v10+ introduced a dependency on `androidx.datastore` which wasn't resolving correctly in this environment.
**Fix:**
- Downgraded `react-native-keychain` to v8.2.0 in `package.json`.
- Re-ran `npm install`.

### 3. Metro Bundler Connection
**Issue:** App launched but showed "Unable to load script" / "Could not connect to server".
**Cause:** Metro bundler was not correctly forwarded to the emulator, or the previous Metro instance was zombie/unresponsive.
**Fix:**
- Restarted Metro: `npx react-native start`
- Re-established port forwarding: `adb reverse tcp:8081 tcp:8081`
- Reloaded app via ADB: `adb shell input text "rr"` or `adb shell am force-stop ...`

### 4. Animation Library
**Issue:** `react-native-reanimated` build failures.
**Fix:**
- Downgraded to v3.6.3 which is known to be stable with RN 0.72.x.

### 5. Default Login Role
**Issue:** App defaulted to "Instructor" login, but the target is the "Student/Commercial" version.
**Fix:**
- Updated `src/auth/LoginPage.tsx` to default `prefillEmail` to `'student@example.com'`.
- This automatically hides the "Instructor Access Code" field and logs the user in with the 'student' role.

### 6. Authentication Removal (Commercial Version)
**Requirement:** "There is no sign in for this version."
**Implementation:**
- Modified `src/auth/AuthContext.tsx` to auto-initialize a default "Student" user on app launch, bypassing `LoginPage`.
- Removed `login` and `logout` logic (replaced with no-ops).
- Removed "Logout" button from `src/screens/DashboardScreen.tsx`.
- Removed "Logout" button from `src/screens/ProfileScreen.tsx`.
- This ensures the app launches directly into the main content (Dashboard) for all users.

### 7. Navigation Architecture Upgrade
**Requirement:** "Focus on the correct version with UWorld-style UI."
**Implementation:**
- Switched `src/App.tsx` to use `UWorldStyleNavigator` instead of the legacy `AppNavigator`.
- This enables the Drawer Navigation system with "Study Tools" and "Clinical Cases".
- Verified `src/screens/EnhancedQuizScreen.tsx` implements the advanced clinical reasoning logic.
- Verified `src/data/unfoldingCases.ts` contains the "Cardiac Arrest" scenario.
- The app now defaults to the "Student" role with full access to the new reasoning engine.

## 📱 Verification Status
- **Build:** ✅ Successful (APK generated)
- **Install:** ✅ Successful
- **Launch:** ✅ Successful (No crash)
- **Bundling:** ⏳ In Progress (Connecting to Metro)
