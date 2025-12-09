# EMT-B App Production Deployment Guide

This guide provides comprehensive procedures for deploying the EMT-B App to production environments.

## Overview

The EMT-B App consists of:
- **Backend**: FastAPI application with PostgreSQL database
- **React Native App**: Mobile application for iOS and Android
- **Web App**: React/Vite web application

## Prerequisites

- GitHub repository access
- Railway account for backend deployment
- Netlify account for web app deployment
- Apple Developer Program membership (for iOS)
- Google Play Developer account (for Android)
- Docker Hub account
- Environment variables configured

## Environment Variables

### Backend (Railway)
```
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=your-secret-key
ALGORITHM=HS256
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ALLOWED_ORIGINS=https://your-web-app.com,https://your-mobile-app.com
```

### Web App (Netlify)
```
REACT_APP_API_BASE_URL=https://your-backend.railway.app
```

## Deployment Procedures

### 1. Backend Deployment (Railway)

#### Automated Deployment (CI/CD)
1. Push code to `main` branch
2. GitHub Actions will:
   - Run backend tests
   - Build Docker image
   - Push to Docker Hub
   - Trigger Railway deployment

#### Manual Deployment
1. Connect GitHub repository to Railway project
2. Railway will auto-detect Dockerfile and deploy
3. Set environment variables in Railway dashboard
4. Database migrations run automatically on startup

### 2. Web App Deployment (Netlify)

#### Automated Deployment
1. GitHub Actions builds web app on push to main
2. Deploys to Netlify via CLI

#### Manual Deployment
1. Build web app: `./scripts/build-web.sh`
2. Deploy via Netlify dashboard or CLI:
   ```bash
   netlify deploy --dir=builds/web --prod
   ```

### 3. Mobile App Deployment

#### Android APK
1. Run build script: `./scripts/build-android.sh`
2. Upload `builds/android/EMT-B-v*.apk` to Google Play Console
3. Submit for review

#### iOS IPA
1. Ensure exportOptions.plist is configured for App Store
2. Run build script: `./scripts/build-ios.sh`
3. Upload `builds/ios/ProMedixEMS.ipa` to App Store Connect
4. Submit for review

## Database Management

### Production Migrations
- Migrations run automatically on backend startup
- To run manually: `docker exec <container> ./migrate.sh`

### Rollback
- Rollback deployment: Use Railway dashboard rollback
- Rollback database: `docker exec <container> ./rollback-db.sh`

## Monitoring and Health Checks

- Backend health: Check Railway logs and metrics
- Web app: Netlify analytics and uptime monitoring
- Mobile apps: App Store/Google Play crash reports

## Rollback Procedures

### Backend Rollback
1. In Railway dashboard, rollback to previous deployment
2. If database changes need rollback: Run `./rollback-db.sh`
3. Verify app functionality

### Web App Rollback
1. In Netlify dashboard, rollback to previous deploy
2. Or redeploy previous build from `builds/web/`

### Mobile App Rollback
1. Submit previous version to app stores
2. Or use phased rollout to limit impact

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database backup taken
- [ ] Rollback plan documented

### Backend Deployment
- [ ] Railway project connected to GitHub
- [ ] Environment variables set
- [ ] Database accessible
- [ ] Health checks passing

### Web App Deployment
- [ ] Netlify site connected
- [ ] Build settings configured
- [ ] Domain configured
- [ ] SSL certificate active

### Mobile Deployment
- [ ] Build scripts executable
- [ ] Signing certificates configured
- [ ] App store accounts active
- [ ] Screenshots and metadata ready

### Post-Deployment
- [ ] Functionality tested
- [ ] Performance monitored
- [ ] Logs checked for errors
- [ ] User feedback collected

## Troubleshooting

### Common Issues
- **Build failures**: Check logs in GitHub Actions/Railway
- **Database connection**: Verify DATABASE_URL format
- **Environment variables**: Ensure all required vars are set
- **CORS errors**: Check ALLOWED_ORIGINS configuration

### Emergency Contacts
- DevOps: [contact]
- Database Admin: [contact]
- App Store Support: [contact]

## Security Considerations

- Never commit secrets to code
- Use environment-specific configurations
- Regularly rotate API keys
- Monitor for vulnerabilities
- Implement rate limiting and DDoS protection

## Performance Optimization

- Enable caching (Redis/Cloudflare)
- Optimize database queries
- Use CDN for static assets
- Monitor memory/CPU usage
- Implement horizontal scaling if needed