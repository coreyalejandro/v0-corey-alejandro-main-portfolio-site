# Creative Chaos - Deployment Guide

Complete guide for deploying the Creative Chaos portfolio to production.

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account with repository access
- [ ] Vercel account (recommended) or alternative hosting
- [ ] Domain name (optional but recommended)
- [ ] All environment variables documented

---

## Pre-Deployment Checklist

### 1. Code Quality

\`\`\`bash
# Run all checks locally
npm run type-check  # TypeScript errors
npm run lint        # ESLint warnings
npm run build       # Build succeeds
npm run start       # Production build runs

# No console.log("[v0]") in production
grep -r 'console.log\("\[v0\]' app/ components/
# Should return no results
\`\`\`

### 2. Security Audit

\`\`\`bash
# Check for vulnerabilities
npm audit

# Fix if possible
npm audit fix

# Review high/critical issues
npm audit --audit-level=high
\`\`\`

### 3. Performance Check

\`\`\`bash
# Build and check bundle size
npm run build

# Look for large chunks (should be <500KB gzipped)
# Check .next/static/chunks/

# Test performance locally
npm run start
# Run Lighthouse in Chrome DevTools
# Target: Score >90 in all categories
\`\`\`

### 4. Content Review

- [ ] All placeholder text replaced with real content
- [ ] Project data in `config/projects.ts` is accurate
- [ ] Contact information is correct
- [ ] All links work (no 404s)
- [ ] Images are optimized (WebP where possible)

---

## Deployment to Vercel (Recommended)

### Step 1: Connect Repository

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "creative-chaos" repository

### Step 2: Configure Project

\`\`\`
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (default)
Output Directory: .next (default)
Install Command: npm install (default)
\`\`\`

### Step 3: Environment Variables

Add the following in Vercel project settings:

\`\`\`bash
# Required
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional (for higher GitHub API limits)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
\`\`\`

To get GitHub token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Select scopes: `public_repo`
4. Copy token and add to Vercel

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build (2-5 minutes)
3. Check deployment logs for errors
4. Visit provided URL (e.g., creative-chaos.vercel.app)

### Step 5: Custom Domain (Optional)

1. Go to Vercel project > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed:
   \`\`\`
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   \`\`\`
4. Wait for DNS propagation (up to 48 hours, usually <1 hour)
5. Vercel auto-provisions SSL certificate

---

## Alternative Deployment Options

### Netlify

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Follow prompts
Build command: npm run build
Publish directory: .next
\`\`\`

### Self-Hosted (VPS/Docker)

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build image
docker build -t creative-chaos .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  creative-chaos
\`\`\`

### Static Export (Not Recommended)

The audio system requires Node.js runtime, so static export will lose functionality:

\`\`\`javascript
// next.config.mjs
const nextConfig = {
  output: 'export', // ⚠ Disables audio system
};
\`\`\`

---

## Post-Deployment Verification

### 1. Smoke Tests

\`\`\`bash
# Check site is live
curl -I https://your-domain.com
# Should return: HTTP/2 200

# Check API routes
curl https://your-domain.com/api/health
# Should return: {"status":"healthy",...}
\`\`\`

### 2. Security Headers Check

\`\`\`bash
# Use securityheaders.com or curl
curl -I https://your-domain.com

# Should see:
# content-security-policy: ...
# x-frame-options: DENY
# x-content-type-options: nosniff
# strict-transport-security: max-age=31536000
\`\`\`

Visit: https://securityheaders.com/?q=your-domain.com

### 3. Performance Check

1. Open site in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Click "Generate report"

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

### 4. Cross-Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Check:
- [ ] Site loads correctly
- [ ] Animations work smoothly
- [ ] Audio system works (after user interaction)
- [ ] Forms submit successfully
- [ ] Modals open/close properly
- [ ] Navigation works
- [ ] Mobile responsive

### 5. Accessibility Testing

\`\`\`bash
# Install aXe DevTools extension
# Run automated scan
# Fix any issues found

# Manual keyboard testing
# Tab through entire site
# Ensure all interactive elements are reachable
# Ensure focus indicators are visible
\`\`\`

---

## Monitoring Setup

### 1. Vercel Analytics (Included)

Automatically enabled for all Vercel projects:
- Page views
- Performance metrics (Web Vitals)
- Geographic distribution

View at: Vercel Dashboard > Your Project > Analytics

### 2. Error Tracking (Recommended)

#### Option A: Sentry

\`\`\`bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs

# Add to .env.local
NEXT_PUBLIC_SENTRY_DSN=your-dsn-here
\`\`\`

\`\`\`typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
\`\`\`

#### Option B: LogRocket

\`\`\`bash
npm install logrocket
\`\`\`

\`\`\`typescript
// app/layout.tsx
import LogRocket from 'logrocket';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  LogRocket.init('your-app-id');
}
\`\`\`

### 3. Uptime Monitoring

Use any of:
- UptimeRobot (free tier: 50 monitors)
- Pingdom
- StatusCake
- Better Uptime

Configuration:
\`\`\`
URL: https://your-domain.com/api/health
Method: GET
Interval: 5 minutes
Expected Status: 200
Expected Content: "healthy"
\`\`\`

### 4. Performance Monitoring

#### Lighthouse CI

\`\`\`bash
# Install
npm install -D @lhci/cli

# Configure
# .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["https://your-domain.com"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}

# Run
npx lhci autorun
\`\`\`

Add to CI/CD:
\`\`\`yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: npx lhci autorun
\`\`\`

---

## Continuous Deployment

### GitHub Actions

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test # Add when tests exist
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.SITE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

Setup:
1. Get Vercel token: Settings > Tokens > Create
2. Get org ID: Settings > General > Organization ID
3. Get project ID: Project Settings > General > Project ID
4. Add as GitHub secrets: Settings > Secrets > Actions

---

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "..." menu
6. Select "Promote to Production"

Instant rollback (< 1 minute)

### Git Rollback

\`\`\`bash
# Find commit to rollback to
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Push
git push origin main

# Vercel auto-deploys reverted version
\`\`\`

---

## Troubleshooting Deployment Issues

### Build Fails

**Symptom:** Vercel build fails with errors

**Common Causes:**
1. TypeScript errors
2. Missing dependencies
3. Environment variables not set
4. Build command incorrect

**Solution:**
\`\`\`bash
# Reproduce locally
npm run build

# Fix errors shown
# Commit and push

# Check Vercel build logs for specific error
\`\`\`

### Site Loads But Features Broken

**Symptom:** Site deploys but audio/modals don't work

**Check:**
1. Browser console for errors
2. Environment variables set correctly
3. API routes return 200 status
4. Network tab shows successful requests

### Slow Performance

**Symptom:** Site loads slowly (>5s)

**Diagnose:**
\`\`\`bash
# Check bundle size
npm run build
# Look for chunks >500KB

# Check Vercel analytics
# Identify slow pages

# Run Lighthouse
# Look for recommendations
\`\`\`

**Fix:**
- Add lazy loading to heavy components
- Optimize images (use WebP, proper sizes)
- Enable caching headers
- Minimize JavaScript

### Security Headers Not Applied

**Symptom:** securityheaders.com shows F grade

**Check:**
1. `middleware.ts` is in root directory
2. Headers are being set correctly
3. No other middleware overriding

**Solution:**
\`\`\`bash
# Verify middleware runs
# Add console.log in middleware.ts
console.log('[Middleware] Running');

# Check deployment logs
# Should see log entry
\`\`\`

---

## Maintenance Schedule

### Daily
- [ ] Check uptime monitor (should be automated alerts)
- [ ] Review error tracking dashboard
- [ ] Monitor performance metrics

### Weekly
- [ ] Check Vercel analytics for trends
- [ ] Review deployment logs
- [ ] Test critical user flows
- [ ] Check security headers

### Monthly
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Update dependencies: `npm update`
- [ ] Review and update content
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (aXe, WAVE)

### Quarterly
- [ ] Major dependency upgrades (Next.js, React)
- [ ] Security penetration testing
- [ ] Load testing
- [ ] User experience review
- [ ] SEO audit

---

## Scaling Considerations

### Current Capacity

\`\`\`
Vercel Free Tier:
- 100GB bandwidth/month
- 100GB-hours serverless function execution
- 6,000 minutes build time
- Unlimited static requests

Expected to handle:
~100,000 page views/month comfortably
\`\`\`

### If Traffic Grows

**At 50% capacity:**
- [ ] Upgrade to Pro plan ($20/month)
- [ ] Add Redis for rate limiting
- [ ] Implement caching strategies

**At 80% capacity:**
- [ ] Consider Enterprise plan
- [ ] Add CDN for assets
- [ ] Database for project data
- [ ] Dedicated backend API

---

## Support & Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Docs](https://react.dev)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

### Internal Docs
- [Handbook](./HANDBOOK.md) - Complete guide
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues
- [Architecture](./ARCHITECTURE.md) - System design
- [Security](./SECURITY.md) - Security guide

---

**Deployment Checklist Summary**

Before going live:
- [ ] Code quality checks pass
- [ ] Security audit clean
- [ ] Performance > 90 Lighthouse score
- [ ] All content reviewed
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring setup (analytics, errors, uptime)
- [ ] Backup/rollback plan documented
- [ ] Team knows how to deploy/rollback

After going live:
- [ ] All smoke tests pass
- [ ] Security headers verified
- [ ] Cross-browser testing complete
- [ ] Accessibility verified
- [ ] Mobile responsive confirmed
- [ ] Contact form works
- [ ] GitHub data loads
- [ ] Audio system works

---

**Last Updated:** 2025-01-12  
**Guide Version:** 1.0.0  
**Maintainer:** Corey Alejandro
