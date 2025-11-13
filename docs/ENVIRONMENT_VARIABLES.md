# Environment Variables Guide

## Overview
This document explains all environment variables used in the Creative Chaos portfolio site.

## Required Variables

### Upstash Redis
These are automatically configured when you connect Upstash integration in v0:

- `KV_URL` - Upstash KV connection URL
- `KV_REST_API_URL` - REST API endpoint
- `KV_REST_API_TOKEN` - Full access token
- `KV_REST_API_READ_ONLY_TOKEN` - Read-only token
- `REDIS_URL` - Redis connection string

**Status:** ✅ Already configured in your v0 project

## Optional Variables

### Site Configuration

#### NEXT_PUBLIC_SITE_URL
- **Purpose:** Your website's public URL
- **Used for:** 
  - Canonical URLs in meta tags
  - Social sharing links
  - Sitemap generation
- **Default:** Falls back to `window.location.origin` in browser
- **Example:** `https://coreyalejandro.com` or `http://localhost:3000` for development
- **When to set:** Only needed if you want explicit canonical URLs for SEO

#### How to add:
1. Open v0 sidebar
2. Click "Vars" section
3. Add new variable:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `http://localhost:3000` (or your production URL)

### Error Monitoring

#### NEXT_PUBLIC_SENTRY_DSN
- **Purpose:** Sentry error tracking integration
- **Used for:** Monitoring JavaScript errors and performance
- **Default:** Error monitoring is disabled if not set
- **Example:** `https://your-key@sentry.io/your-project-id`
- **When to set:** Only if you create a Sentry account and want error tracking

#### How to set up Sentry (optional):
1. Create account at https://sentry.io
2. Create new project for Next.js
3. Copy the DSN from project settings
4. Add to v0 Vars section

## Quick Setup for Development

The site will run perfectly fine with just the Upstash variables (already configured). 

If you want to add the optional site URL:

\`\`\`bash
# In v0 Vars section, add:
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## Production Deployment

When deploying to production (Vercel), set:

\`\`\`bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
\`\`\`

All Upstash variables will transfer automatically from v0.

## Troubleshooting

### "Missing NEXT_PUBLIC_SITE_URL"
This is just a warning. The site works fine without it. If you want to suppress the warning:
- Add the variable in v0 Vars section with `http://localhost:3000`

### "Missing NEXT_PUBLIC_SENTRY_DSN"
This is completely optional. Ignore it unless you want error monitoring.

### Upstash connection errors
Your Upstash integration is already properly configured. If you see connection errors:
1. Check v0 Vars section to confirm all KV variables are present
2. Test the connection in the Upstash dashboard
3. Regenerate tokens if needed

## Variable Prefixes

- `NEXT_PUBLIC_*` - Available in browser (client-side)
- No prefix - Server-side only (more secure)

Use `NEXT_PUBLIC_` prefix only for values that need to be accessible in the browser.
