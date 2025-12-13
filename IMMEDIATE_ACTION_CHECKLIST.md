# ROOT Platform - Immediate Action Checklist
## CRITICAL ITEMS - Do These FIRST (Before ANY Deployment)

**Created:** December 13, 2025  
**Priority:** CRITICAL 🔴  
**Estimated Time:** 2-3 days

---

## 🚨 STOP - Security Vulnerabilities

### 1. Replace Hardcoded Secret Key ⚠️ CRITICAL
**File:** `/backend/auth.py` Line 5

**Current Code:**
```python
SECRET_KEY = "CHANGE_THIS_IN_PROD"  # ❌ SECURITY RISK
```

**Fix:**
```python
import os
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable must be set in production")
```

**Generate Secure Key:**
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(64))"
```

**Set in Railway:**
1. Go to Railway Dashboard → Your Project → Variables
2. Add: `SECRET_KEY=<generated-key>`

---

### 2. Change Admin Password ⚠️ CRITICAL
**Files:** 
- `/backend/main.py` Lines 48-50
- `/STRIPE_SETUP.md` Lines 83-84

**Current:** `Fdd1FU1cH58e3T0_z05xkA` (EXPOSED IN PUBLIC REPO!)

**Fix:**
1. Generate new secure password:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

2. Update code:
```python
# Remove hardcoded password
admin_password = os.getenv("ADMIN_PASSWORD")
if not admin_password:
    raise ValueError("ADMIN_PASSWORD must be set")
hashed_password = get_password_hash(admin_password)
```

3. Set in Railway:
```env
ADMIN_PASSWORD=<new-secure-password>
```

4. Remove from all documentation files

---

### 3. Restrict CORS Origins ⚠️ HIGH RISK
**File:** `/backend/main.py` Lines 74-80

**Current Code:**
```python
allow_origins=["*"],  # ❌ Allows ANY website to access your API
```

**Fix:**
```python
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
if not ALLOWED_ORIGINS or ALLOWED_ORIGINS == [""]:
    raise ValueError("ALLOWED_ORIGINS must be set in production")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # ✅ Only your domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Set in Railway:**
```env
ALLOWED_ORIGINS=https://your-production-domain.com,https://www.your-production-domain.com
```

---

## 🗄️ Database Migration (Production Blocker)

### 4. Migrate from SQLite to PostgreSQL
**Current:** `sqlite:///./emt_app.db` (56 KB, empty, not production-ready)

**Why Critical:**
- SQLite cannot handle concurrent connections
- Railway needs proper database
- Will crash under load

**Fix:**

1. **Provision PostgreSQL on Railway:**
   - Railway Dashboard → New → Database → PostgreSQL
   - Copy connection string

2. **Update database.py:**
```python
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL must be set in production")

# Railway provides postgres://, but SQLAlchemy needs postgresql://
DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=3600
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

3. **Run migrations:**
```bash
cd /workspace/backend
source venv/bin/activate  # if using venv
alembic upgrade head
```

4. **Seed database:**
```bash
python3 seed_admin.py
python3 seed_exam.py
python3 seed_flashcards.py
python3 seed_scenarios.py
```

---

## 📦 Backend Setup (Deployment Blocker)

### 5. Install Backend Dependencies
**Current Status:** `ModuleNotFoundError: No module named 'fastapi'`

**Fix:**
```bash
cd /workspace/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Verify installation
python3 -c "import fastapi; print('FastAPI installed:', fastapi.__version__)"
```

**Missing from requirements.txt - Add:**
```txt
python-multipart
aiofiles
redis
celery
```

---

### 6. Consolidate Backend Folders
**Issue:** Two backend folders exist:
- `/workspace/backend/` (19 files, no dependencies)
- `/workspace/EMTBApp/backend/` (5,704 files, has venv)

**Decision Required:** Which is production backend?

**Recommendation:** Use `/workspace/backend` and:
1. Copy any missing files from `/workspace/EMTBApp/backend`
2. Update `/railway.toml` to point to correct location
3. Remove or archive the other folder

---

## 🔐 Environment Variables Setup

### 7. Create Environment Configuration
**Create:** `/backend/.env.production` (DO NOT COMMIT TO GIT)

```env
# Application
SECRET_KEY=<generated-64-char-key>
ALGORITHM=HS256
ENVIRONMENT=production

# Database
DATABASE_URL=<railway-postgresql-connection-string>

# Admin
ADMIN_EMAIL=admin@emeritaclinical.com
ADMIN_PASSWORD=<new-secure-password>

# Frontend
FRONTEND_URL=https://your-netlify-domain.netlify.app
ALLOWED_ORIGINS=https://your-netlify-domain.netlify.app,https://www.your-netlify-domain.netlify.app

# Stripe (TEST MODE FIRST)
STRIPE_MODE=test
STRIPE_API_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
STRIPE_PREMIUM_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_SEMESTER_PRICE_ID=price_xxxxxxxxxxxxx

# Monitoring
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxxxxxxxx

# Email (Optional)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

**Add to `.gitignore`:**
```
.env
.env.local
.env.production
*.db
```

---

## 🧪 Testing Before Deployment

### 8. Test Backend Startup
```bash
cd /workspace/backend
source venv/bin/activate
export $(cat .env.production | xargs)  # Load env vars
uvicorn main:app --host 0.0.0.0 --port 8000

# In another terminal:
curl http://localhost:8000/health
# Should return: {"status": "healthy", "timestamp": "..."}

curl http://localhost:8000/
# Should return: {"Status": "EMT-B Backend is Live"}
```

---

### 9. Test Database Connection
```bash
cd /workspace/backend
python3 -c "
from database import SessionLocal
from models import User
db = SessionLocal()
try:
    users = db.query(User).count()
    print(f'✅ Database connected. Users: {users}')
except Exception as e:
    print(f'❌ Database error: {e}')
finally:
    db.close()
"
```

---

### 10. Test Stripe Integration (Test Mode)
1. **Create Stripe Test Account:** https://dashboard.stripe.com/test

2. **Create Products:**
   - Premium Monthly: $24.99 recurring
   - Semester Pass: $79.99 one-time

3. **Get Test API Keys:**
   - API Key: `sk_test_xxxxxxxxxxxxx`
   - Webhook Secret: `whsec_xxxxxxxxxxxxx`

4. **Test Checkout:**
```bash
# Start backend
uvicorn main:app --reload

# Test endpoint
curl -X POST http://localhost:8000/api/stripe/create-checkout-session \
  -H "Authorization: Bearer <your-test-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"price_type": "premium"}'
```

5. **Use Stripe Test Card:**
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits

---

## 📋 Quick Verification Checklist

Before deploying to Railway/Netlify, verify:

- [ ] SECRET_KEY changed and set in environment
- [ ] Admin password changed and NOT in code
- [ ] CORS origins restricted to production domains
- [ ] PostgreSQL database provisioned
- [ ] DATABASE_URL set in environment
- [ ] All backend dependencies installed
- [ ] Backend starts without errors
- [ ] Database connection successful
- [ ] Health check endpoint returns 200
- [ ] Stripe test mode configured
- [ ] Environment variables documented
- [ ] .env files added to .gitignore
- [ ] No secrets in code or documentation

---

## 🚀 Deploy to Staging First

**DO NOT deploy to production yet!**

1. Create staging environment
2. Deploy backend to Railway (staging)
3. Deploy frontend to Netlify (staging)
4. Test full user flow:
   - Registration
   - Login
   - Browse content
   - Attempt payment (test mode)
   - Verify premium access
5. Monitor logs for errors
6. Fix any issues
7. Repeat until stable

**Only then** deploy to production.

---

## 📞 Questions?

Refer to:
- Full Report: `ROOT_PLATFORM_VALIDATION_REPORT.md`
- Stripe Setup: `STRIPE_SETUP.md`
- Platform Summary: `EMTBApp/PLATFORM_SUMMARY.md`

---

**Last Updated:** December 13, 2025  
**Priority:** Complete ALL items before production deployment  
**Estimated Time:** 2-3 days for experienced developer
