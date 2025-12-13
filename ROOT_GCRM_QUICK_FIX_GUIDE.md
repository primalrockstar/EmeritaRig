# ROOT/GCRM - Quick Fix Guide
## Database Initialization & Critical Security Fixes

**Time Required:** 2-3 hours  
**Impact:** Unlocks full platform functionality  
**Priority:** CRITICAL 🔴

---

## 🚨 THE PROBLEM

**Current Status:**
```bash
# Health check shows:
{
  "status": "degraded",
  "services": {
    "database": {
      "status": "unhealthy",
      "stats": {"status": "not_initialized"}
    }
  }
}
```

**Impact:**
- ❌ Login broken (internal server error)
- ❌ Studies endpoint broken
- ❌ Screening templates broken
- ❌ Most API endpoints non-functional
- ✅ Demo endpoints working (but use mock data)

---

## ✅ THE FIX (Step-by-Step)

### Step 1: Access Railway Database (5 minutes)

```bash
# Get database connection string from Railway dashboard
# Railway → Your Project → PostgreSQL → Connection String

# Set environment variable
export DATABASE_URL="postgresql://user:password@host:port/database"

# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

**Expected Output:** PostgreSQL version information

---

### Step 2: Clone Source Code (if accessible)

```bash
# Note: Source code repository appears to be private
# You'll need to access it directly or work in your development environment

# If you have the code locally:
cd /path/to/gcrm-backend

# Install dependencies
pip install -r requirements.txt

# Or if using poetry:
poetry install
```

---

### Step 3: Run Database Migrations (10 minutes)

```bash
# Initialize Alembic (if not already initialized)
alembic init alembic  # Skip if alembic/ folder exists

# Create migration (if needed)
alembic revision --autogenerate -m "Initial schema"

# Run all migrations
alembic upgrade head
```

**Expected Tables to be Created:**
- `users` - User accounts with RBAC
- `studies` - Research studies
- `participants` - Study participants
- `consents` - Consent records
- `screeners` - Screening questionnaires
- `files` - File metadata
- `audit_logs` - Audit trail (HIPAA requirement)
- `sessions` - User sessions

**Verify:**
```bash
psql $DATABASE_URL -c "\dt"
# Should list all tables
```

---

### Step 4: Seed Demo Data (15 minutes)

```bash
# Create seed script if it doesn't exist
# File: scripts/seed_demo_data.py

python scripts/seed_demo_data.py
```

**Required Seed Data:**

**1. User Roles:**
```sql
INSERT INTO roles (name, description) VALUES
('admin', 'Study Administrator'),
('pi', 'Principal Investigator'),
('coordinator', 'Research Coordinator'),
('assistant', 'Research Assistant');
```

**2. Demo Users:**
```sql
-- Admin user (update with actual hashed password)
INSERT INTO users (email, hashed_password, role, is_active) VALUES
('admin@example-dental.com', '$2b$12$...', 'admin', true),
('pi@example-dental.com', '$2b$12$...', 'pi', true),
('coordinator@example-dental.com', '$2b$12$...', 'coordinator', true),
('assistant@example-dental.com', '$2b$12$...', 'assistant', true);
```

**3. Demo Studies:**
```sql
INSERT INTO studies (id, title, status, phase) VALUES
('nf-001', 'NovaFluo Dental Study', 'recruiting', 'phase-2'),
('di-001', 'Digital Impression Study', 'recruiting', 'phase-3');
```

**4. Screening Templates:**
```sql
INSERT INTO screener_templates (id, name, questions) VALUES
('dental-basic', 'Basic Dental Screening', '[...]');
```

---

### Step 5: Verify Database Initialization (5 minutes)

```bash
# Test health endpoint
curl https://gcrm-demo-production.up.railway.app/api/v1/health/

# Expected: "status": "healthy"
# Expected: "database": {"status": "healthy"}
```

```bash
# Test login endpoint
curl -X POST https://gcrm-demo-production.up.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin@example-dental.com","password":"demo"}'

# Expected: JWT token returned
```

```bash
# Test studies endpoint
curl https://gcrm-demo-production.up.railway.app/api/v1/demo/studies

# Expected: List of studies (not internal server error)
```

---

### Step 6: Fix CORS Policy (5 minutes)

**File:** `main.py` or `app/main.py`

**Find:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ❌ SECURITY RISK
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Replace With:**
```python
import os

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://gcrm.netlify.app").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # ✅ SECURE
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Request-ID"],
)
```

**Set Environment Variable in Railway:**
```bash
ALLOWED_ORIGINS=https://gcrm.netlify.app,https://www.gcrm.com
```

---

### Step 7: Add Security Headers (10 minutes)

**File:** `main.py` or `app/main.py`

**Add Middleware:**
```python
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    
    # HIPAA-compliant security headers
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    
    return response
```

---

### Step 8: Deploy Changes (10 minutes)

**Option A: Railway Auto-Deploy (if connected to GitHub)**
```bash
git add .
git commit -m "fix: initialize database and harden security"
git push origin main

# Railway will auto-deploy
```

**Option B: Manual Deployment**
```bash
# Railway will rebuild on next push
# Or use Railway CLI:
railway up
```

---

### Step 9: Verify All Fixes (15 minutes)

**1. Health Check:**
```bash
curl https://gcrm-demo-production.up.railway.app/api/v1/health/ | jq
```
**Expected:** `"status": "healthy"`, `"database": {"status": "healthy"}`

**2. CORS Check:**
```bash
curl -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS \
  https://gcrm-demo-production.up.railway.app/api/v1/auth/login \
  -I
```
**Expected:** No `Access-Control-Allow-Origin` header (request blocked)

**3. Security Headers Check:**
```bash
curl -I https://gcrm-demo-production.up.railway.app/api/v1/health/
```
**Expected:** See `Content-Security-Policy`, `X-Frame-Options`, etc.

**4. Login Test:**
```bash
curl -X POST https://gcrm-demo-production.up.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin@example-dental.com","password":"demo"}' | jq
```
**Expected:** JWT token returned

**5. Studies Test:**
```bash
curl https://gcrm-demo-production.up.railway.app/api/v1/demo/studies | jq
```
**Expected:** List of studies (NovaFluo, Digital Impression)

---

## 🎯 QUICK VALIDATION CHECKLIST

After completing all steps, verify:

- [ ] Health endpoint shows "healthy" status
- [ ] Database shows "healthy" status
- [ ] Login endpoint returns JWT token (not error)
- [ ] Studies endpoint returns study list
- [ ] Screening template endpoint loads
- [ ] CORS only allows gcrm.netlify.app
- [ ] Security headers present in responses
- [ ] No "internal server error" responses
- [ ] Demo features still working
- [ ] Performance still ~170-180ms

---

## 🚀 WHAT'S FIXED AFTER THIS

### ✅ Newly Working Features
- User authentication (login, register, logout)
- Study management (create, view, update studies)
- Participant enrollment
- Consent management
- Screening templates
- File uploads
- Audit logging
- Session management

### ✅ Security Improvements
- CORS restricted to your domains only
- Security headers protecting against XSS, clickjacking
- Request validation
- HIPAA-compliant header configuration

### ✅ System Health
- Database connected and operational
- All 48 API endpoints functional
- Health checks passing
- Production-ready foundation

---

## ⚠️ WHAT'S STILL NEEDED (For Full Production)

**Week 2-4 (After Quick Fix):**
1. Execute BAAs with Railway, Netlify
2. Conduct HIPAA risk assessment
3. Create policies & procedures manual
4. Security penetration testing
5. Third-party compliance audit
6. Load testing (100+ concurrent users)
7. Comprehensive monitoring setup
8. Incident response plan
9. Data retention policies
10. Backup and disaster recovery testing

**See:** `ROOT_GCRM_PRODUCTION_VALIDATION_REPORT.md` for full details

---

## 🔧 TROUBLESHOOTING

### Database Connection Issues
```bash
# Test database connectivity
psql $DATABASE_URL -c "SELECT 1;"

# Check Railway database status
railway status

# View Railway logs
railway logs
```

### Migration Errors
```bash
# Reset migrations (CAUTION: drops all data)
alembic downgrade base
alembic upgrade head

# Or manually connect and verify:
psql $DATABASE_URL
\dt  # List tables
\d users  # Describe users table
```

### Authentication Still Broken
```bash
# Check if users table exists and has data
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;"

# Verify password hashing
psql $DATABASE_URL -c "SELECT email, hashed_password FROM users LIMIT 5;"

# Test password verification in Python:
python -c "
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
print(pwd_context.verify('demo', '<hash-from-database>'))
"
```

### CORS Still Wide Open
```bash
# Verify environment variable set in Railway
railway env

# Check actual CORS header in response
curl -I -H "Origin: https://test.com" https://gcrm-demo-production.up.railway.app/api/v1/health/
# Should NOT see: Access-Control-Allow-Origin: *
```

---

## 💡 PRO TIPS

1. **Backup First:** Before running migrations, backup Railway database
2. **Test Locally:** Run migrations on local database first
3. **Incremental Deploy:** Deploy CORS fix separately from database changes
4. **Monitor Logs:** Watch Railway logs during deployment
5. **Keep Demo Data:** Don't delete demo endpoints - they're working great

---

## 📞 NEED HELP?

**If you get stuck:**
1. Check Railway logs: `railway logs`
2. Verify database connection: `psql $DATABASE_URL -c "SELECT version();"`
3. Test endpoints one by one with curl
4. Review error messages in Railway dashboard
5. Verify environment variables are set correctly

**Common Issues:**
- **"relation does not exist"** → Run migrations: `alembic upgrade head`
- **"password authentication failed"** → Check DATABASE_URL
- **"CORS policy blocked"** → Restart Railway service after env var change
- **"Internal server error"** → Check Railway logs for Python traceback

---

## ✅ SUCCESS CRITERIA

**You're done when:**
1. ✅ Health check shows "healthy" for database
2. ✅ Can log in with demo credentials
3. ✅ Studies endpoint returns data
4. ✅ CORS restricted to gcrm.netlify.app
5. ✅ Security headers present
6. ✅ No internal server errors
7. ✅ Performance still excellent (~170ms)

**Time Investment:** 2-3 hours  
**Value Unlocked:** Entire platform functionality  
**Cost:** $0 (DIY) or $5K-10K (hire developer)

---

**Created:** December 13, 2025  
**For:** ROOT/GCRM Platform  
**Priority:** CRITICAL - Do this weekend  
**Next:** Complete HIPAA compliance checklist (Week 2-4)
