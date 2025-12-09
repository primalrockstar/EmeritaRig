# EMT-B - Website Distribution Guide

## 🌐 **Selling Your App via Your Website**

This guide covers how to distribute and sell your EMT-B app directly from your website, bypassing app store fees and restrictions.

---

## 💰 **Benefits of Direct Sales**

- ✅ **No App Store Fees** - Keep 100% of revenue (no 15-30% commission)
- ✅ **Full Control** - Set your own pricing and run promotions
- ✅ **Direct Customer Relationship** - Build your email list
- ✅ **Faster Updates** - No app store review delays
- ✅ **Flexible Payment Options** - Accept any payment processor

---

## 📱 **Distribution Methods**

### **Option 1: iOS - TestFlight Distribution**

**Best for:** Beta testing and trusted customers

**Requirements:**
- Apple Developer Account ($99/year)
- TestFlight app (free on App Store)

**Setup:**
1. Build your app in Xcode
2. Upload to App Store Connect
3. Add testers via email (up to 10,000 external testers)
4. Testers install via TestFlight link

**Limitations:**
- 90-day build expiration
- Requires TestFlight app
- Apple review for external testing

---

### **Option 2: iOS - Enterprise Distribution**

**Best for:** Corporate/institutional sales

**Requirements:**
- Apple Developer Enterprise Program ($299/year)
- D-U-N-S Number
- Legal entity

**Advantages:**
- Unlimited internal distribution
- No TestFlight required
- Direct .ipa file distribution

**Process:**
1. Build with Enterprise certificate
2. Host .ipa and manifest.plist on HTTPS server
3. Customers install via Safari link
4. Devices must trust your enterprise certificate

---

### **Option 3: Android - Direct APK Distribution**

**Best for:** Maximum flexibility and control

**Requirements:**
- Signed release APK
- Website with download capability

**Setup:**

1. **Build Signed Release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Sign the APK:**
   ```bash
   # Generate keystore (first time only)
   keytool -genkey -v -keystore emtb-release-key.keystore \
     -alias emtb-key -keyalg RSA -keysize 2048 -validity 10000
   
   # Sign APK
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore emtb-release-key.keystore \
     app/build/outputs/apk/release/app-release-unsigned.apk emtb-key
   ```

3. **Host on Your Website:**
   - Upload APK to your web server
   - Create download page with installation instructions

**Installation Instructions for Customers:**
```
1. Download the APK file from our website
2. On your Android device, go to Settings → Security
3. Enable "Install from Unknown Sources" or "Allow from this source"
4. Open the downloaded APK file
5. Tap "Install"
6. Launch EMT-B from your app drawer
```

---

### **Option 4: Android - AAB with Private Distribution**

**Alternative:** Use Google Play's internal app sharing or private track

---

## 💳 **Payment & License Management**

### **Recommended Payment Processors**

1. **Stripe**
   - Easy integration
   - Accept cards, Apple Pay, Google Pay
   - 2.9% + $0.30 per transaction
   - Good for subscriptions

2. **PayPal**
   - Widely trusted
   - Similar fees to Stripe
   - Good for one-time purchases

3. **Gumroad**
   - Built for digital products
   - Handles payments and file delivery
   - 10% + payment processing fees

4. **Paddle**
   - Merchant of record (handles taxes/VAT)
   - Higher fees but less administrative work

### **License Key System**

**Simple License Verification:**

```typescript
// In your app
const LICENSE_API = 'https://yourwebsite.com/api/verify-license';

async function verifyLicense(licenseKey: string) {
  const response = await fetch(LICENSE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ licenseKey, deviceId: getDeviceId() })
  });
  
  const data = await response.json();
  return data.valid;
}
```

**Backend API (Node.js example):**

```javascript
app.post('/api/verify-license', async (req, res) => {
  const { licenseKey, deviceId } = req.body;
  
  // Check database
  const license = await db.licenses.findOne({ key: licenseKey });
  
  if (!license) {
    return res.json({ valid: false, message: 'Invalid license key' });
  }
  
  if (license.devices.length >= license.maxDevices) {
    return res.json({ valid: false, message: 'Device limit reached' });
  }
  
  // Add device if not already registered
  if (!license.devices.includes(deviceId)) {
    license.devices.push(deviceId);
    await license.save();
  }
  
  res.json({ valid: true, expiresAt: license.expiresAt });
});
```

---

## 🌐 **Website Sales Page Elements**

### **Essential Components:**

1. **Product Description**
   - Clear feature list
   - Screenshots/demo video
   - System requirements
   - Pricing

2. **Download Instructions**
   - Step-by-step installation guide
   - Platform-specific instructions
   - Video tutorial (recommended)

3. **Payment Integration**
   - Secure checkout
   - Multiple payment options
   - Instant delivery

4. **License Delivery**
   - Email confirmation
   - Download link
   - License key (if applicable)

5. **Support**
   - FAQ section
   - Contact form
   - Installation troubleshooting

### **Sample Sales Copy:**

```
🚑 EMT-B Training App - Professional Edition

Master your EMT-B certification with our comprehensive mobile training platform.

✅ 1,500+ practice questions
✅ Interactive clinical scenarios
✅ Performance tracking & analytics
✅ Offline study capability
✅ Lifetime updates included

$49.99 one-time purchase
No subscriptions. No hidden fees.

[Download for iOS] [Download for Android]

30-Day Money-Back Guarantee
```

---

## 📦 **Automated Delivery System**

### **Using Gumroad (Simplest):**

1. Create product on Gumroad
2. Upload APK file (for Android)
3. Add purchase → email automation
4. Customers get instant download link

### **Custom Solution:**

1. **Payment → Webhook**
   - Stripe/PayPal sends webhook on successful payment
   
2. **Generate License**
   - Create unique license key
   - Store in database with customer email
   
3. **Send Email**
   - Download link
   - License key
   - Installation instructions
   
4. **Customer Portal**
   - Login to download updates
   - View license info
   - Manage devices

---

## 🔒 **Security & Piracy Protection**

### **Basic Protection:**

1. **License Verification**
   - Check license key on app launch
   - Store encrypted on device
   - Periodic re-verification

2. **Device Binding**
   - Limit installations per license (e.g., 2-3 devices)
   - Track device IDs
   - Allow device resets

3. **Update Control**
   - Only licensed users get updates
   - Version checking

### **Advanced Protection:**

1. **Code Obfuscation**
   - ProGuard for Android
   - App thinning for iOS

2. **Certificate Pinning**
   - Prevent man-in-the-middle attacks

3. **Jailbreak/Root Detection**
   - Optional: Disable on compromised devices

**Note:** No protection is perfect. Focus on providing value that makes piracy not worth the effort.

---

## 📊 **Analytics & Tracking**

### **Track:**
- Download conversions
- License activations
- Active users
- Feature usage
- Retention rates

### **Tools:**
- Google Analytics
- Mixpanel
- Amplitude
- Custom dashboard

---

## 💌 **Email Marketing**

### **Email Sequence:**

1. **Purchase Confirmation**
   - Thank you
   - Download link
   - License key
   - Installation guide

2. **Day 3: Getting Started**
   - Feature highlights
   - Tutorial video
   - Support resources

3. **Day 7: Check-in**
   - How's it going?
   - Tips & tricks
   - Ask for feedback

4. **Day 30: Update Announcement**
   - New features
   - Community highlights
   - Referral program

### **Retention:**
- Regular feature updates
- Study tips newsletter
- Exclusive content for customers
- Community forum access

---

## 🎯 **Pricing Strategies**

### **One-Time Purchase**
- **$39.99 - $79.99** for full featured app
- Pros: Simple, attractive to customers
- Cons: No recurring revenue

### **Subscription**
- **$9.99/month or $79.99/year**
- Pros: Recurring revenue
- Cons: Harder sell, requires ongoing content

### **Tiered Pricing**
- **Basic:** $29.99 (core features)
- **Pro:** $59.99 (all features + updates)
- **Lifetime:** $99.99 (all current + future features)

### **Launch Pricing**
- Early bird discount (40% off)
- Limited time offer
- Create urgency

---

## 🚀 **Marketing Channels**

1. **SEO**
   - Blog about EMT-B topics
   - Keyword optimization
   - Content marketing

2. **Social Media**
   - Instagram/TikTok demos
   - Facebook groups for EMTs
   - LinkedIn for professional audience

3. **Partnerships**
   - EMT training schools
   - Affiliate program (15-20% commission)
   - Influencer partnerships

4. **Paid Ads**
   - Google Ads (search intent)
   - Facebook/Instagram (targeting EMT students)
   - Reddit ads in relevant subreddits

5. **Content Marketing**
   - Free study guides
   - YouTube tutorials
   - Podcast sponsorships

---

## 📱 **Update Distribution**

### **Android:**
- Host new APK versions on website
- Send email to customers with update link
- In-app update notification

### **iOS:**
- Upload new build to TestFlight
- Customers auto-update via TestFlight
- Or: Rebuild enterprise distribution

### **Version Management:**
```javascript
// Check for updates
const CURRENT_VERSION = '1.0.0';
const UPDATE_CHECK_URL = 'https://yourwebsite.com/api/latest-version';

async function checkForUpdates() {
  const response = await fetch(UPDATE_CHECK_URL);
  const { latestVersion, downloadUrl } = await response.json();
  
  if (latestVersion > CURRENT_VERSION) {
    // Show update prompt
    Alert.alert('Update Available', 
      `Version ${latestVersion} is now available!`,
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Update', onPress: () => Linking.openURL(downloadUrl) }
      ]
    );
  }
}
```

---

## ⚖️ **Legal Considerations**

### **Required:**
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Refund Policy
- [ ] Medical Disclaimer
- [ ] DMCA Policy (if applicable)
- [ ] Business license
- [ ] Sales tax compliance

### **Recommended:**
- End User License Agreement (EULA)
- Liability waiver
- Professional indemnity insurance

---

## 🎁 **Launch Checklist**

- [ ] Website sales page ready
- [ ] Payment processor integrated
- [ ] Automated email delivery set up
- [ ] License system implemented
- [ ] APK/IPA files signed and tested
- [ ] Installation instructions clear
- [ ] Support system ready (email/ticketing)
- [ ] Analytics tracking installed
- [ ] Social media accounts created
- [ ] Launch marketing materials prepared
- [ ] Beta testers provided feedback
- [ ] Refund policy defined
- [ ] Legal documents in place

---

## 💡 **Pro Tips**

1. **Offer a Free Trial**
   - Limited features or time-limited
   - Collect emails for marketing
   - Convert to paid

2. **Bundle with Other Products**
   - Study guides
   - Practice exam access
   - Private community membership

3. **Create Urgency**
   - Limited launch pricing
   - Countdown timers
   - Bonuses for early buyers

4. **Social Proof**
   - Testimonials
   - Student success stories
   - Number of users
   - Star ratings/reviews

5. **Money-Back Guarantee**
   - 30-day guarantee reduces purchase anxiety
   - Most won't use it
   - Builds trust

---

## 📞 **Customer Support**

### **Support Channels:**
- Email: support@emtb.app
- Help center/FAQ
- Video tutorials
- Live chat (optional)

### **Common Issues:**
- Installation problems
- License activation
- Device compatibility
- Feature questions
- Update issues

### **Response Time Goals:**
- Critical issues: 24 hours
- General support: 48 hours
- Feature requests: 1 week

---

## 📈 **Success Metrics**

### **Track:**
- Website visitors
- Conversion rate (visitor → customer)
- Average order value
- Customer lifetime value
- Churn rate
- Net Promoter Score (NPS)
- Support ticket volume

### **Goals:**
- Month 1: 50-100 customers
- Month 3: 250-500 customers
- Month 6: 1,000+ customers
- Month 12: 2,500+ customers

**Revenue Potential:**
- 1,000 customers × $49.99 = $49,990
- With 70% margin = $34,993 profit
- Minus Apple Dev ($99) + hosting + tools

---

## 🌟 **Next Steps**

1. Set up website and payment processing
2. Build and sign app releases
3. Create installation documentation
4. Set up license/delivery system
5. Prepare marketing materials
6. Launch with early bird pricing
7. Gather feedback and iterate
8. Scale marketing efforts

---

**Good luck with your direct sales! 🚀💰**
