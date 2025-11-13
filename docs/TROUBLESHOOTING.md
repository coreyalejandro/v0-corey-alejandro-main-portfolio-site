# Creative Chaos - Complete Troubleshooting Guide

## Table of Contents
1. [Quick Diagnostics](#quick-diagnostics)
2. [Audio System Issues](#audio-system-issues)
3. [Component Rendering Issues](#component-rendering-issues)
4. [Performance Problems](#performance-problems)
5. [Security Issues](#security-issues)
6. [Build & Deployment](#build--deployment)
7. [Browser Compatibility](#browser-compatibility)
8. [Error Reference](#error-reference)

---

## Quick Diagnostics

### System Health Check
Run this command in browser console to check all systems:

\`\`\`javascript
// Paste this in browser console for instant diagnostics
(function healthCheck() {
  const results = {
    audioContext: typeof AudioContext !== 'undefined',
    speechSynthesis: typeof speechSynthesis !== 'undefined',
    intersectionObserver: typeof IntersectionObserver !== 'undefined',
    webAnimations: typeof Element.prototype.animate !== 'undefined',
    localStorage: (() => { try { localStorage.setItem('test', 'test'); localStorage.removeItem('test'); return true; } catch(e) { return false; }})(),
    serviceWorker: 'serviceWorker' in navigator,
  };
  
  console.table(results);
  return results;
})();
\`\`\`

### Quick Fix Checklist
- [ ] Clear browser cache and reload
- [ ] Check browser console for errors (F12)
- [ ] Verify all dependencies installed: `npm install`
- [ ] Check Node version: `node --version` (requires 18+)
- [ ] Restart development server
- [ ] Check network tab for failed requests

---

## Audio System Issues

### Problem: Audio Not Playing

**Symptoms:**
- Audio toggle button doesn't work
- No spatial audio effects
- Narration doesn't trigger

**Diagnosis:**
\`\`\`javascript
// Run in console to check audio state
console.log('AudioContext State:', window.audioContextState);
console.log('Audio Enabled:', localStorage.getItem('audio-enabled'));
console.log('Speech Synthesis:', speechSynthesis.getVoices().length);
\`\`\`

**Solutions:**

1. **User Interaction Required**
   - **Cause:** Browser requires user click before audio plays
   - **Fix:** Click the audio toggle button (top right)
   - **Code Check:** `components/audio-experience/audio-engine.tsx` line 45-60

2. **AudioContext Suspended**
   \`\`\`javascript
   // Force resume AudioContext
   if (window.audioContext && window.audioContext.state === 'suspended') {
     window.audioContext.resume().then(() => console.log('AudioContext resumed'));
   }
   \`\`\`

3. **Speech Synthesis Voices Not Loaded**
   \`\`\`javascript
   // Check if voices are loaded
   speechSynthesis.getVoices();
   // If empty, wait for voiceschanged event
   speechSynthesis.addEventListener('voiceschanged', () => {
     console.log('Voices loaded:', speechSynthesis.getVoices().length);
   });
   \`\`\`

4. **Missing Audio Files**
   - Check `public/audio/` directory exists
   - Verify audio files are present: `ambient-bg.mp3`, `click.mp3`, etc.
   - Fallback: System generates synthetic tones if files missing

**Prevention:**
- Always test audio with fresh browser session
- Test in incognito mode (no cached state)
- Test with browser autoplay policies: chrome://settings/content/sound

---

### Problem: Audio Memory Leak

**Symptoms:**
- Browser becomes slow over time
- Tab crashes after extended use
- DevTools shows increasing memory usage

**Diagnosis:**
\`\`\`javascript
// Monitor active audio nodes
console.log('Active Nodes:', window.audioContext?.state);
// Check for orphaned oscillators
console.log('Performance:', performance.memory); // Chrome only
\`\`\`

**Solution:**
1. Check oscillator cleanup in `audio-engine.tsx` line 150-165
2. Verify IntersectionObserver cleanup in `audio-section.tsx` line 45-50
3. Clear audio cache:
   \`\`\`javascript
   if (window.audioContext) {
     window.audioContext.close().then(() => {
       window.location.reload();
     });
   }
   \`\`\`

**Files to Check:**
- `components/audio-experience/audio-engine.tsx` - Oscillator pooling
- `components/audio-experience/audio-section.tsx` - Observer cleanup
- `components/audio-experience/audio-button.tsx` - Event cleanup

---

### Problem: Narration Stuttering

**Symptoms:**
- Voice narration cuts off
- Audio overlaps
- Glitchy playback

**Diagnosis:**
\`\`\`javascript
// Check speech queue
console.log('Speaking:', speechSynthesis.speaking);
console.log('Pending:', speechSynthesis.pending);
\`\`\`

**Solutions:**

1. **Clear Speech Queue**
   \`\`\`javascript
   speechSynthesis.cancel(); // Stop all speech
   \`\`\`

2. **Check Throttling**
   - File: `components/audio-experience/audio-section.tsx` line 78
   - Should have 2000ms throttle between narrations
   - Increase if still stuttering: `NARRATION_THROTTLE = 3000`

3. **Reduce Concurrent Narrations**
   - Limit to 1 active narration at a time
   - Queue system should prevent overlap
   - Check `audio-engine.tsx` line 200-220

---

## Component Rendering Issues

### Problem: LaydownCard Not Animating

**Symptoms:**
- Card doesn't rotate on hover
- No 3D perspective effect
- Card appears flat

**Diagnosis:**
\`\`\`javascript
// Check if card is mounted
const card = document.querySelector('[data-component="laydown-card"]');
console.log('Card found:', !!card);
console.log('Transform:', getComputedStyle(card).transform);
\`\`\`

**Solutions:**

1. **Check CSS Transform Support**
   \`\`\`javascript
   // Test browser support
   const el = document.createElement('div');
   el.style.transform = 'rotateX(90deg)';
   console.log('Transform support:', el.style.transform !== '');
   \`\`\`

2. **Verify Parent Container**
   - Parent must have `perspective` style
   - Check `components/laydown-card.tsx` line 35
   - Perspective should be 2000px or higher

3. **Check Hover State**
   - File: `components/laydown-card.tsx` line 85-95
   - Verify `isHovered` state updates
   - Add debug log: `console.log('[v0] Hover state:', isHovered);`

**Fix:**
\`\`\`tsx
// In laydown-card.tsx
const [isHovered, setIsHovered] = useState(false);

// Add debug logging
useEffect(() => {
  console.log('[v0] Hover state changed:', isHovered);
}, [isHovered]);
\`\`\`

---

### Problem: BreathingBackground Not Moving

**Symptoms:**
- Background is static
- No gradient animation
- Colors don't shift

**Diagnosis:**
\`\`\`javascript
// Check if animation frame is running
let frameCount = 0;
const id = requestAnimationFrame(function count() {
  frameCount++;
  if (frameCount > 60) console.log('Animation running:', frameCount);
  else requestAnimationFrame(count);
});
\`\`\`

**Solutions:**

1. **Check Animation State**
   - File: `components/creative-chaos/breathing-background.tsx` line 25-40
   - Verify `requestAnimationFrame` is called
   - Check if `time` state is updating

2. **Browser Throttling**
   - Chrome throttles inactive tabs
   - Test in active tab
   - Check if tab is visible: `document.hidden`

3. **Performance Mode**
   - User might have "Reduce Motion" enabled
   - Check: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
   - Respect accessibility preference

**Fix:**
\`\`\`tsx
// Add reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Run animations
}
\`\`\`

---

### Problem: FloatingCard Not Tracking Mouse

**Symptoms:**
- Card doesn't follow mouse
- No rotation effect
- Card stays static

**Diagnosis:**
\`\`\`javascript
// Test mouse events
document.addEventListener('mousemove', (e) => {
  console.log('[v0] Mouse:', e.clientX, e.clientY);
});
\`\`\`

**Solutions:**

1. **Check Event Listeners**
   - File: `components/creative-chaos/floating-card.tsx` line 45-60
   - Verify `mousemove` listener attached
   - Check if `mouseX` and `mouseY` states update

2. **Z-Index Conflicts**
   - Card might be behind other elements
   - Check computed z-index: `getComputedStyle(card).zIndex`
   - Increase if needed: `z-50` or higher

3. **Pointer Events Blocked**
   \`\`\`javascript
   // Check if pointer events work
   const card = document.querySelector('[data-component="floating-card"]');
   console.log('Pointer events:', getComputedStyle(card).pointerEvents);
   \`\`\`

---

## Performance Problems

### Problem: Slow Page Load

**Symptoms:**
- Long initial load time (>3 seconds)
- Large bundle size
- Poor Lighthouse scores

**Diagnosis:**
\`\`\`bash
# Check bundle size
npm run build
# Look for large chunks in output

# Analyze bundle
npm install -g webpack-bundle-analyzer
npm run analyze
\`\`\`

**Solutions:**

1. **Lazy Load Components**
   \`\`\`tsx
   // Use dynamic imports
   const ProjectModal = dynamic(() => import('@/components/project-modal'), {
     loading: () => <p>Loading...</p>,
     ssr: false // If client-only
   });
   \`\`\`

2. **Optimize Images**
   \`\`\`bash
   # Install sharp for image optimization
   npm install sharp
   
   # Images in public/ should be:
   # - WebP format
   # - Properly sized (not larger than display)
   # - Lazy loaded below fold
   \`\`\`

3. **Code Splitting**
   - Audio system should be lazy loaded
   - Load on user interaction, not initially
   - File: `app/layout.tsx` line 25-30

4. **Reduce Animation Complexity**
   - Limit particle count on mobile
   - Use `will-change` sparingly
   - Throttle scroll handlers

**Target Metrics:**
- First Contentful Paint: <1.8s
- Time to Interactive: <3.8s
- Cumulative Layout Shift: <0.1
- Bundle size: <500KB (gzipped)

---

### Problem: Janky Animations

**Symptoms:**
- Animations stutter
- Low frame rate (<60fps)
- Scroll feels laggy

**Diagnosis:**
\`\`\`javascript
// Monitor frame rate
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
  frames++;
  const currentTime = performance.now();
  if (currentTime >= lastTime + 1000) {
    console.log('FPS:', frames);
    frames = 0;
    lastTime = currentTime;
  }
  requestAnimationFrame(checkFPS);
}
checkFPS();
\`\`\`

**Solutions:**

1. **Use CSS Transforms (GPU Accelerated)**
   \`\`\`css
   /* Instead of left/top */
   .element {
     transform: translate3d(x, y, 0);
     will-change: transform; /* Use sparingly */
   }
   \`\`\`

2. **Reduce Particle Count**
   - File: `components/creative-chaos/breathing-background.tsx` line 15
   - Reduce from 20 to 10 particles on mobile
   - Check screen width: `window.innerWidth < 768`

3. **Throttle Scroll Events**
   \`\`\`javascript
   // Use requestAnimationFrame for scroll
   let ticking = false;
   
   window.addEventListener('scroll', () => {
     if (!ticking) {
       requestAnimationFrame(() => {
         // Handle scroll
         ticking = false;
       });
       ticking = true;
     }
   });
   \`\`\`

4. **Disable on Low-End Devices**
   \`\`\`javascript
   // Check device performance
   const isLowEnd = navigator.hardwareConcurrency < 4 || 
                    navigator.deviceMemory < 4;
   if (isLowEnd) {
     // Reduce effects
   }
   \`\`\`

---

## Security Issues

### Problem: Content Security Policy Violations

**Symptoms:**
- Browser console shows CSP errors
- External resources blocked
- Inline scripts fail

**Diagnosis:**
\`\`\`javascript
// Check CSP header
fetch(window.location.href).then(r => {
  console.log('CSP:', r.headers.get('content-security-policy'));
});
\`\`\`

**Solutions:**

1. **Update CSP in Middleware**
   - File: `middleware.ts` line 10-30
   - Add trusted domains to CSP directives
   - Example for GitHub API:
   \`\`\`typescript
   connect-src: ['self', 'https://api.github.com']
   \`\`\`

2. **Use Nonce for Inline Scripts**
   \`\`\`tsx
   // Generate nonce per request
   const nonce = crypto.randomUUID();
   
   // Add to CSP
   script-src: ['self', `'nonce-${nonce}'`]
   
   // Use in script tag
   <script nonce={nonce}>...</script>
   \`\`\`

3. **External Resources**
   - Whitelist specific domains only
   - Avoid 'unsafe-inline' and 'unsafe-eval'
   - Use subresource integrity (SRI) for CDN resources

---

### Problem: Rate Limit Exceeded

**Symptoms:**
- Contact form stops working
- GitHub API fails
- 429 errors in console

**Diagnosis:**
\`\`\`javascript
// Check rate limit status
fetch('/api/contact', {
  method: 'HEAD'
}).then(r => {
  console.log('Rate limit remaining:', r.headers.get('x-ratelimit-remaining'));
  console.log('Rate limit reset:', new Date(r.headers.get('x-ratelimit-reset') * 1000));
});
\`\`\`

**Solutions:**

1. **Check Rate Limiter Config**
   - File: `lib/rate-limiter.ts` line 20-40
   - Default: 5 requests per 60 seconds
   - Adjust for your needs: `MAX_REQUESTS = 10`

2. **Clear Rate Limit (Dev Only)**
   \`\`\`javascript
   // In browser console
   localStorage.removeItem('rate-limit-contact');
   localStorage.removeItem('rate-limit-github');
   \`\`\`

3. **Server-Side Rate Limiting**
   - Implement Redis-based rate limiting for production
   - Use IP-based tracking
   - Add CAPTCHA for additional protection

**Production Implementation:**
\`\`\`typescript
// Install: npm install @upstash/redis @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'),
});

// In API route
const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
const { success } = await ratelimit.limit(identifier);
if (!success) return Response.json({ error: 'Too many requests' }, { status: 429 });
\`\`\`

---

### Problem: XSS Vulnerability

**Symptoms:**
- User input not sanitized
- Scripts executing from user data
- Security audit failures

**Diagnosis:**
\`\`\`javascript
// Test input sanitization
const testInput = '<script>alert("XSS")</script>';
// Should be escaped: &lt;script&gt;alert("XSS")&lt;/script&gt;
\`\`\`

**Solutions:**

1. **Use Sanitization Utility**
   - File: `lib/sanitize.ts`
   - All user inputs MUST go through sanitization
   - Example:
   \`\`\`typescript
   import { sanitizeInput } from '@/lib/sanitize';
   const clean = sanitizeInput(userInput);
   \`\`\`

2. **Never Use dangerouslySetInnerHTML**
   - Scan codebase: `grep -r "dangerouslySetInnerHTML" .`
   - If found, replace with proper React rendering
   - Use DOMPurify if HTML rendering required

3. **Validate All Inputs**
   \`\`\`typescript
   // Server-side validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     return { error: 'Invalid email' };
   }
   \`\`\`

---

## Build & Deployment

### Problem: Build Fails

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- Module not found errors

**Diagnosis:**
\`\`\`bash
# Check Node version
node --version  # Requires 18+

# Check dependencies
npm list --depth=0

# Clear cache
rm -rf .next node_modules package-lock.json
npm install
\`\`\`

**Solutions:**

1. **TypeScript Errors**
   \`\`\`bash
   # Check types
   npm run type-check
   
   # Fix common issues
   # - Missing types: npm install @types/[package]
   # - Wrong import: Check file exists and path correct
   # - Type mismatch: Check component props
   \`\`\`

2. **Environment Variables**
   \`\`\`bash
   # Create .env.local for development
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # For production, set in hosting platform
   # Never commit .env.local to git
   \`\`\`

3. **Import Path Errors**
   \`\`\`typescript
   // Use path aliases from tsconfig.json
   import { Component } from '@/components/component'  // ✅
   import { Component } from '../../components/component'  // ❌
   \`\`\`

**Build Checklist:**
- [ ] No TypeScript errors: `npm run type-check`
- [ ] All dependencies installed: `npm install`
- [ ] Environment variables set
- [ ] No console.log("[v0]") statements in production
- [ ] Bundle size acceptable: `npm run build` (check output)

---

### Problem: Deployment Issues

**Symptoms:**
- Site works locally but not in production
- Features missing after deploy
- API routes fail

**Common Causes & Fixes:**

1. **Environment Variables Not Set**
   - Set all required env vars in hosting platform
   - Check: `process.env.NEXT_PUBLIC_SITE_URL`
   - Restart deployment after setting

2. **API Routes 404**
   - Verify `app/api/` directory structure
   - Check route exports: `export async function POST(request: Request)`
   - Test locally: `npm run build && npm run start`

3. **Static Export Issues**
   - Audio system requires Node.js runtime
   - Cannot use `output: 'export'` in next.config.mjs
   - Use Vercel, Netlify, or Node hosting

4. **CORS Errors**
   - Add middleware CORS headers
   - File: `middleware.ts` line 50-60
   - Allow your domain in Access-Control-Allow-Origin

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Build succeeds locally: `npm run build`
- [ ] Test production build: `npm run start`
- [ ] Security headers configured (middleware.ts)
- [ ] Rate limiting configured
- [ ] Analytics/monitoring setup
- [ ] Error tracking (Sentry, etc.) configured

---

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues

**Safari < 14:**
- Web Audio API limited support
- Fallback: Disable spatial audio
- Check: `if (typeof AudioContext === 'undefined')`

**Firefox:**
- Speech Synthesis voices limited
- Workaround: Provide manual voice selection
- Check available voices: `speechSynthesis.getVoices()`

**Mobile Browsers:**
- Reduced particle effects for performance
- Touch events instead of mouse tracking
- File: `components/creative-chaos/floating-card.tsx` line 70-85

**Testing Matrix:**
\`\`\`javascript
// Browser feature detection
const features = {
  audioContext: typeof AudioContext !== 'undefined',
  speechSynthesis: typeof speechSynthesis !== 'undefined',
  intersectionObserver: typeof IntersectionObserver !== 'undefined',
  transforms3d: (() => {
    const el = document.createElement('div');
    el.style.transform = 'translate3d(0,0,0)';
    return el.style.transform !== '';
  })(),
};

console.table(features);
\`\`\`

---

## Error Reference

### Audio Errors

| Error Code | Message | Cause | Solution |
|------------|---------|-------|----------|
| AUD-001 | "AudioContext failed to initialize" | Browser blocked audio | User must interact first |
| AUD-002 | "Speech synthesis unavailable" | Browser doesn't support | Fallback to visual-only mode |
| AUD-003 | "Audio node creation failed" | Memory exhausted | Cleanup old nodes, reduce effects |
| AUD-004 | "Narration queue overflow" | Too many narrations | Increase throttle delay |

**Debug Commands:**
\`\`\`javascript
// AUD-001
window.audioContext.resume();

// AUD-002
console.log(speechSynthesis.getVoices());

// AUD-003
window.location.reload(); // Clear audio memory

// AUD-004
speechSynthesis.cancel(); // Clear queue
\`\`\`

---

### Component Errors

| Error Code | Message | Cause | Solution |
|------------|---------|-------|----------|
| CMP-001 | "Component failed to mount" | Missing dependency | Check imports |
| CMP-002 | "Animation frame dropped" | Performance issue | Reduce complexity |
| CMP-003 | "Event listener leak" | Cleanup missing | Add cleanup in useEffect |
| CMP-004 | "Style conflict detected" | CSS specificity | Use !important or increase specificity |

---

### API Errors

| Error Code | Message | Cause | Solution |
|------------|---------|-------|----------|
| API-001 | "GitHub rate limit exceeded" | Too many requests | Wait or use auth token |
| API-002 | "Contact form submission failed" | Validation error | Check input format |
| API-003 | "CORS policy blocked request" | Missing headers | Update middleware.ts |
| API-004 | "Network timeout" | Slow connection | Increase timeout, add retry |

---

## Recovery Procedures

### Complete System Reset

If all else fails, perform a complete reset:

\`\`\`bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear all caches
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json

# 3. Clear browser data
# Chrome: Settings > Privacy > Clear browsing data
# Select: Cached images, Site settings, Cookies

# 4. Reinstall dependencies
npm install

# 5. Rebuild
npm run build

# 6. Start fresh
npm run dev
\`\`\`

### Database Reset (if applicable)
\`\`\`bash
# Clear localStorage
localStorage.clear();

# Clear sessionStorage
sessionStorage.clear();

# Clear IndexedDB
indexedDB.databases().then(dbs => {
  dbs.forEach(db => indexedDB.deleteDatabase(db.name));
});
\`\`\`

### Audio System Reset
\`\`\`javascript
// Run in browser console
(function resetAudio() {
  // Stop all audio
  speechSynthesis.cancel();
  
  // Close AudioContext
  if (window.audioContext) {
    window.audioContext.close();
  }
  
  // Clear settings
  localStorage.removeItem('audio-enabled');
  localStorage.removeItem('audio-volume');
  
  // Reload page
  window.location.reload();
})();
\`\`\`

---

## Maintenance Procedures

### Weekly Tasks
- [ ] Check browser console for warnings
- [ ] Test audio system in all browsers
- [ ] Monitor bundle size: `npm run build`
- [ ] Check for dependency updates: `npm outdated`

### Monthly Tasks
- [ ] Security audit: `npm audit`
- [ ] Update dependencies: `npm update`
- [ ] Performance testing (Lighthouse)
- [ ] Accessibility testing (WAVE, aXe)
- [ ] Cross-browser testing

### Quarterly Tasks
- [ ] Major dependency upgrades
- [ ] Security penetration testing
- [ ] Load testing
- [ ] User experience review

---

## Monitoring & Logging

### Production Monitoring Setup

\`\`\`typescript
// Add to app/layout.tsx
useEffect(() => {
  // Error tracking
  window.addEventListener('error', (e) => {
    console.error('[Error]', e.error);
    // Send to error tracking service
    // e.g., Sentry.captureException(e.error);
  });

  // Performance tracking
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('[Perf] Load time:', loadTime, 'ms');
      // Send to analytics
    });
  }
}, []);
\`\`\`

### Health Check Endpoint

\`\`\`typescript
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    node: process.version,
  };
  
  return Response.json(health);
}
\`\`\`

---

## Getting Help

### Internal Documentation
- Main handbook: `docs/HANDBOOK.md`
- API reference: `docs/API_REFERENCE.md`
- Security guide: `docs/SECURITY.md`

### External Resources
- Next.js docs: https://nextjs.org/docs
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- React docs: https://react.dev

### Support Checklist

When asking for help, include:
1. Error message (exact text)
2. Browser and version
3. Steps to reproduce
4. Expected vs actual behavior
5. Console logs
6. Network tab (for API issues)

---

**Last Updated:** 2025-01-12  
**Version:** 1.0.0  
**Maintainer:** Corey Alejandro
