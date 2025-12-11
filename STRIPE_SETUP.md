# Stripe Setup Guide for Emerita Clinical

## 1. Create Stripe Products

Go to: https://dashboard.stripe.com/products

### Product 1: Premium Monthly
- **Name:** Emerita Clinical Premium
- **Description:** Full access to all EMT training materials
- **Pricing:**
  - Type: `Recurring`
  - Price: `$24.99 USD`
  - Billing period: `Monthly`
  - Currency: `USD`
- **Copy the Price ID:** `price_xxxxxxxxxxxxx`

### Product 2: Semester Pass (One-Time)
- **Name:** Emerita Clinical Semester Pass  
- **Description:** 6 months of full access - Save $70!
- **Pricing:**
  - Type: `One time`
  - Price: `$79.99 USD`
  - Currency: `USD`
- **Copy the Price ID:** `price_xxxxxxxxxxxxx`

---

## 2. Set Environment Variables in Railway

Go to: Railway Dashboard → Your Service → Variables

Add these variables:

```env
STRIPE_API_KEY=sk_live_xxxxxxxxxxxxx (or sk_test_ for testing)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx (get this in step 3)
STRIPE_PREMIUM_PRICE_ID=price_xxxxxxxxxxxxx (from step 1)
STRIPE_SEMESTER_PRICE_ID=price_xxxxxxxxxxxxx (from step 1)
FRONTEND_URL=https://your-netlify-url.netlify.app
```

---

## 3. Setup Webhook

Go to: https://dashboard.stripe.com/webhooks

### Create Webhook Endpoint

- **URL:** `https://emeritarig-production.up.railway.app/api/stripe/webhook`
- **Description:** Emerita Clinical payment webhook
- **Events to listen for:**
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`

### Get Signing Secret

After creating the webhook, Stripe will show a **Signing secret** like: `whsec_xxxxxxxxxxxxx`

Copy this and add it to Railway as `STRIPE_WEBHOOK_SECRET`

---

## 4. Test Mode First

Before going live, test with Stripe Test Mode:

1. Use **test API keys** (starts with `sk_test_`)
2. Use **test cards**: 
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Test the full checkout flow
4. Verify webhook events arrive

---

## 5. Admin Account

Your superuser account is ready:

**Email:** `admin@emeritaclinical.com`  
**Password:** `Fdd1FU1cH58e3T0_z05xkA`

**IMPORTANT:** Change this password immediately after first login!

---

## 6. Go Live Checklist

- [ ] Stripe account activated (business verification complete)
- [ ] Live API keys set in Railway
- [ ] Webhook configured with live endpoint
- [ ] Test purchase in production
- [ ] Verify user gets premium access after payment
- [ ] Test subscription cancellation
- [ ] Test semester pass expiration logic

---

## Support Contacts

All support emails forward to: `shaun@emeritaclinical.com`

- `support@emeritaclinical.com` - General support
- `billing@emeritaclinical.com` - Payment issues  
- `legal@emeritaclinical.com` - Terms/compliance
- `hello@emeritaclinical.com` - General inquiries
