# Demo Version Deployment Guide

## ✅ Demo Branch Created

The `demo` branch is configured with 10% content limits for try-before-you-buy.

## 📊 Demo Limits Configured

- **Chapters**: First 4 chapters only (Module 1)
- **Flashcards**: 60 cards (4 chapters × 15 cards each)
- **Quiz Questions**: 10 questions max
- **Scenarios**: 3 clinical scenarios
- **Calculators**: All available (viral/shareable)
- **Progress Tracking**: Enabled (shows value)

## 🚀 Deploy to Netlify

### Step 1: Push Demo Branch
```bash
git push origin demo
```

### Step 2: Configure Netlify
1. Go to https://app.netlify.com/projects/emtbapp
2. Site settings → Build & deploy → Deploy contexts
3. Add branch deploy: `demo`
4. Set environment variable: `VITE_DEMO_MODE=true`

### Step 3: Update Sales URL
Before deploying, update this file:
`EMTBApp/ProMedixEMS-main/src/config/demoLimits.ts`

Change line 25:
```typescript
export const UPGRADE_URL = 'https://YOUR-ACTUAL-SALES-SITE.com/purchase';
```

### Step 4: Deploy
- Netlify will auto-deploy when you push
- Demo URL will be: `demo--emtbapp.netlify.app`
- Or set custom domain for demo

## 🎯 What Customers Will Experience

1. **Landing**: Full access to first 4 chapters
2. **Engagement**: Can try flashcards, limited quiz, calculators
3. **Conversion Point**: Hit limits → upgrade modal appears
4. **CTA**: "Unlock Full Access - $49.99" button → your sales site

## 🔧 Technical Implementation Status

### ✅ Completed
- Demo branch created
- Netlify config updated
- Demo limits defined
- Upgrade components created
- Environment variable setup

### 🚧 Next Steps (Do These Before Push)
1. Update `UPGRADE_URL` in `demoLimits.ts` with your actual sales website
2. Integrate upgrade banners into quiz/chapter components
3. Add limit enforcement to data loading functions
4. Test locally with `VITE_DEMO_MODE=true npm run dev`

## 💡 Strategic Notes

**Why this works:**
- 4 chapters = enough to see quality, not enough to pass the exam
- 10 questions = taste of quiz system without full prep value
- All calculators = viral potential (people share these)
- Progress tracking = shows what they're missing

**Psychology:**
- We're selling FOMO (fear of missing out) on the other 41 chapters
- Calculator access makes demo feel generous
- Hard limits (not soft gates) create urgency

## 📱 Mobile App vs Demo Relationship

- **Demo** = Web version with limits (instant try)
- **Full Product** = Mobile app with 1,500+ questions (after purchase)
- Demo drives purchases of the mobile app

## ⚠️ Critical Before Launch

Update `UPGRADE_URL` or all conversion will fail!

Current placeholder: `https://your-sales-website.com/purchase`
