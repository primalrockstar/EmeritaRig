# EMT-B - Development & Testing Guide

## 🎯 **Personal Use & Development**

This app is designed for personal use and development purposes. It is not intended for distribution on Google Play Store or Apple App Store.

---

## 📱 **Running the App**

### **iOS (Simulator or Device)**

1. **Install Dependencies**
   ```bash
   cd "/Users/macbook/Desktop/EMT-B App/EMTBApp"
   npm install
   cd ios && pod install && cd ..
   ```

2. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

3. **Run on Physical iOS Device**
   - Open `ios/EMTB.xcworkspace` in Xcode
   - Select your device from the device list
   - Click Run (⌘R)
   - You may need to trust the developer certificate on your device

### **Android (Emulator or Device)**

1. **Install Dependencies**
   ```bash
   cd "/Users/macbook/Desktop/EMT-B App/EMTBApp"
   npm install
   ```

2. **Run on Android Emulator**
   - Start Android emulator from Android Studio
   ```bash
   npm run android
   ```

3. **Run on Physical Android Device**
   - Enable Developer Mode and USB Debugging on your device
   - Connect device via USB
   ```bash
   npm run android
   ```

---

## 🔧 **Building for Personal Testing**

### **iOS Development Build**

1. **Create Development Build**
   ```bash
   cd ios
   xcodebuild -workspace EMTB.xcworkspace \
              -scheme EMTB \
              -configuration Debug \
              -destination 'generic/platform=iOS' \
              -archivePath ./build/EMTB.xcarchive \
              archive
   ```

2. **Install on Device**
   - Use Xcode to install the archive on your device
   - Or use TestFlight for internal testing (requires Apple Developer account)

### **Android Development Build (APK)**

1. **Create Debug APK**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   - APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

2. **Install on Device**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 🧪 **Testing Features**

### **Login Credentials (Development)**
- **Email**: `student@emtb.app`
- **Password**: `demo123`

### **Key Features to Test**
- ✅ Quiz system with clinical scenarios
- ✅ Flashcards and study notes
- ✅ Performance tracking
- ✅ Clinical calculators
- ✅ Progress monitoring
- ✅ Navigation between modules

---

## 🔒 **Privacy & Data**

### **Data Storage (Local Only)**
- All user data is stored locally on the device
- Uses AsyncStorage for preferences
- Encrypted storage for sensitive data
- No data is sent to external servers

### **Permissions Required**
- **Storage**: For saving user progress and preferences
- **Network**: For potential future features (currently offline-capable)

---

## 🛠 **Development Tips**

### **Debugging**
1. **React Native Debugger**
   ```bash
   npm start
   # Press 'd' in terminal and select "Debug"
   ```

2. **iOS Debug Menu**
   - Shake device or press ⌘D in simulator
   - Enable "Debug JS Remotely"

3. **Android Debug Menu**
   - Shake device or press ⌘M in emulator
   - Enable "Debug JS Remotely"

### **Hot Reloading**
- Changes to code will automatically reload in the app
- If issues occur, try restarting Metro bundler:
  ```bash
  npm start -- --reset-cache
  ```

### **Clearing App Data**
- **iOS**: Uninstall and reinstall the app
- **Android**: Settings → Apps → EMT-B → Clear Data

---

## 📝 **Distribution for Personal Use**

### **iOS - Ad Hoc Distribution**
1. Requires Apple Developer account ($99/year)
2. Register devices by UDID
3. Create Ad Hoc provisioning profile
4. Build and distribute .ipa file to registered devices

### **Android - Direct APK Installation**
1. Build release APK (see above)
2. Share APK file directly
3. Users must enable "Install from Unknown Sources"
4. Install APK on their device

### **Enterprise Distribution (Internal Use)**
- **iOS**: Apple Enterprise Program ($299/year)
- **Android**: Google Play for Work or direct APK distribution

---

## ⚠️ **Important Notes**

- This app is for **educational purposes only**
- Not intended for clinical decision-making
- Always verify medical information with current protocols
- Keep app updated with latest medical guidelines

---

## 🆘 **Troubleshooting**

### **Build Errors**
```bash
# Clean build
cd ios && pod install && cd ..
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

### **Metro Bundler Issues**
```bash
# Kill any existing Metro processes
pkill -f metro
# Restart
npm start -- --reset-cache
```

### **iOS Signing Issues**
- Check Xcode → Preferences → Accounts
- Ensure correct team is selected
- Verify provisioning profiles are valid

### **Android Gradle Issues**
```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

---

## 📚 **Additional Resources**

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [iOS Development Guide](https://developer.apple.com/documentation/)
- [Android Development Guide](https://developer.android.com/docs)

---

**Happy Learning! 📖💉🚑**
