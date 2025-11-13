# Creative Chaos - System Architecture

## Overview

Creative Chaos is a dual-purpose portfolio and design system built on Next.js 15+ with cutting-edge audio accessibility features.

---

## System Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER CLIENT                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Visual Layer │  │ Audio Layer  │  │ Input Layer  │      │
│  │              │  │              │  │              │      │
│  │ - Components │  │ - AudioEngine│  │ - Forms      │      │
│  │ - Animations │  │ - Spatial 3D │  │ - Modals     │      │
│  │ - Gradients  │  │ - Narration  │  │ - Navigation │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  React Context  │                        │
│                   │  - AudioContext │                        │
│                   │  - ThemeContext │                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                      NEXT.JS SERVER                           │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ API Routes   │  │ Middleware   │  │ SSR/SSG      │      │
│  │              │  │              │  │              │      │
│  │ - /contact   │  │ - Security   │  │ - Pages      │      │
│  │ - /health    │  │ - Headers    │  │ - Metadata   │      │
│  │              │  │ - Rate Limit │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘      │
│         │                  │                                 │
└─────────┼──────────────────┼──────────────────────────────────┘
          │                  │
          ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│ External APIs    │  │ Static Assets    │
│ - GitHub API     │  │ - Images         │
│ - Analytics      │  │ - Audio Files    │
└──────────────────┘  └──────────────────┘
\`\`\`

---

## Directory Structure

\`\`\`
creative-chaos/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Portfolio (Hero + Landing + Projects)
│   ├── layout.tsx                # Root layout + AudioEngine
│   ├── globals.css               # Design tokens + Tailwind
│   │
│   ├── api/                      # API Routes
│   │   ├── contact/route.ts      # Contact form handler
│   │   └── health/route.ts       # Health check endpoint
│   │
│   ├── components/page.tsx       # Component library showcase
│   ├── templates/page.tsx        # Template previews
│   ├── design-system/page.tsx    # Design tokens + guidelines
│   ├── documentation/            # Documentation pages
│   │   ├── page.tsx
│   │   └── audio-experience/page.tsx
│   └── contact/page.tsx          # Contact form
│
├── components/                   # React Components
│   ├── audio-experience/         # Audio System
│   │   ├── audio-engine.tsx      # Core audio logic
│   │   ├── audio-toggle.tsx      # UI control
│   │   ├── audio-section.tsx     # Spatial narration
│   │   └── audio-button.tsx      # Interactive feedback
│   │
│   ├── creative-chaos/           # Design Components
│   │   ├── breathing-background.tsx
│   │   ├── floating-card.tsx
│   │   ├── organic-title.tsx
│   │   └── laydown-card.tsx
│   │
│   ├── floating-nav.tsx          # Main navigation
│   ├── project-modal.tsx         # Project showcase modal
│   ├── custom-icons.tsx          # SVG icon set
│   │
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (40+ components)
│
├── lib/                          # Utility Libraries
│   ├── utils.ts                  # General utilities (cn, etc.)
│   ├── sanitize.ts               # Input sanitization
│   └── rate-limiter.ts           # Rate limiting logic
│
├── config/                       # Configuration
│   └── projects.ts               # Project data (GitHub repos)
│
├── docs/                         # Documentation
│   ├── HANDBOOK.md               # Complete guide
│   ├── API_REFERENCE.md          # API documentation
│   ├── SECURITY.md               # Security guide
│   ├── TROUBLESHOOTING.md        # This file
│   └── ARCHITECTURE.md           # This file
│
├── public/                       # Static Assets
│   ├── images/                   # Project screenshots
│   └── audio/                    # Audio files (optional)
│
├── middleware.ts                 # Edge middleware (security)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
\`\`\`

---

## Component Architecture

### Audio System Flow

\`\`\`
User Interaction (click toggle)
        │
        ▼
┌───────────────────┐
│  AudioToggle      │ User control button
│  (UI Component)   │
└─────────┬─────────┘
          │ setEnabled(true)
          ▼
┌───────────────────┐
│  AudioEngine      │ Core audio logic
│  (Context)        │
│  - AudioContext   │ Web Audio API
│  - SpeechSynth    │ Text-to-speech
│  - Oscillators    │ Sound generation
└─────────┬─────────┘
          │ Audio methods available
          ├─────────────┬─────────────┐
          ▼             ▼             ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│AudioSection │  │AudioButton  │  │ProjectModal │
│             │  │             │  │             │
│narrate()    │  │playClick()  │  │playOpen()   │
│position3D() │  │playHover()  │  │narrate()    │
└─────────────┘  └─────────────┘  └─────────────┘
\`\`\`

### Data Flow

\`\`\`
User scrolls page
        │
        ▼
┌───────────────────┐
│ IntersectionOb-   │
│ server detects    │
│ AudioSection      │
└─────────┬─────────┘
          │ Section 50% visible
          ▼
┌───────────────────┐
│ AudioSection      │
│ - Gets position   │
│ - Calculates 3D   │
│ - Triggers narra- │
│   tion (throttled)│
└─────────┬─────────┘
          │ audioEngine.narrate()
          ▼
┌───────────────────┐
│ AudioEngine       │
│ - Checks enabled  │
│ - Checks queue    │
│ - Speaks text     │
│ - Positions audio │
└───────────────────┘
\`\`\`

---

## State Management

### Global State (React Context)

\`\`\`typescript
// Audio State
interface AudioContextType {
  enabled: boolean;
  volume: number;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  playClick: () => void;
  playHover: () => void;
  narrate: (text: string, priority?: 'high' | 'normal') => void;
  position3D: (x: number, y: number, z: number) => void;
}

// Provided by: components/audio-experience/audio-engine.tsx
// Consumed by: All audio-aware components
\`\`\`

### Local Component State

\`\`\`typescript
// Example: LaydownCard
const [isHovered, setIsHovered] = useState(false);
const [time, setTime] = useState(0);

// Example: ProjectModal
const [isOpen, setIsOpen] = useState(false);
const [githubData, setGithubData] = useState(null);
\`\`\`

### URL State

\`\`\`typescript
// Query parameters for modals
const [searchParams, setSearchParams] = useSearchParams();
const projectSlug = searchParams.get('project');

// Open modal: ?project=creative-chaos
// Close modal: Remove query param
\`\`\`

---

## Security Architecture

### Defense Layers

\`\`\`
┌─────────────────────────────────────────────┐
│ Layer 1: Browser Security                   │
│ - Content Security Policy                   │
│ - HTTPS Enforcement                         │
│ - X-Frame-Options                           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ Layer 2: Edge Middleware                    │
│ - Security headers (middleware.ts)          │
│ - Rate limiting                             │
│ - Input validation                          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ Layer 3: API Route Protection               │
│ - Server-side validation                    │
│ - Sanitization (lib/sanitize.ts)            │
│ - Error handling                            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│ Layer 4: External API Security              │
│ - URL validation                            │
│ - Timeout limits                            │
│ - Response validation                       │
└─────────────────────────────────────────────┘
\`\`\`

### Request Flow with Security

\`\`\`
1. Browser Request
   ↓
2. Middleware.ts
   - Add security headers
   - Check rate limit (client-side for now)
   - Log request
   ↓
3. API Route (e.g., /api/contact)
   - Validate input schema
   - Sanitize all inputs
   - Check rate limit (should add server-side)
   - Process request
   ↓
4. External API (if needed)
   - Validate URL
   - Add timeout
   - Handle errors
   ↓
5. Response
   - Sanitize output
   - Add security headers
   - Return to client
\`\`\`

---

## Performance Optimization

### Code Splitting Strategy

\`\`\`typescript
// Lazy load audio system (only when enabled)
const AudioEngine = dynamic(() => import('@/components/audio-experience/audio-engine'), {
  ssr: false, // Client-only
  loading: () => null, // No loading state needed
});

// Lazy load project modal
const ProjectModal = dynamic(() => import('@/components/project-modal'), {
  ssr: false,
});

// Heavy animations loaded on interaction
const BreathingBackground = dynamic(() => import('@/components/creative-chaos/breathing-background'), {
  ssr: false,
});
\`\`\`

### Asset Optimization

\`\`\`
Images:
- Format: WebP with PNG fallback
- Sizes: Multiple sizes for responsive
- Loading: Lazy below fold
- CDN: Serve from Vercel/CDN

Audio (if added):
- Format: MP3 (best compatibility)
- Bitrate: 128kbps (quality vs size)
- Preload: none (load on demand)
- Fallback: Synthetic tones if files missing

Fonts:
- Format: WOFF2
- Loading: font-display: swap
- Subset: Latin only (reduce size)
\`\`\`

### Rendering Strategy

\`\`\`
Portfolio page (app/page.tsx):
- SSG (Static Site Generation)
- Revalidate: Never (pure static)
- Why: Content doesn't change often

Component library (app/components/page.tsx):
- SSG
- Revalidate: Daily
- Why: Component code is static

Project data (GitHub API):
- CSR (Client-Side Rendering)
- Cache: 5 minutes in browser
- Why: Data changes, don't want stale cache

Contact form:
- CSR
- API Route for submission
- Why: Requires user interaction
\`\`\`

---

## Accessibility Architecture

### WCAG 2.1 AA Compliance

\`\`\`
Visual Accessibility:
✓ Color contrast: All text meets 4.5:1 ratio
✓ Focus indicators: Visible on all interactive elements
✓ Keyboard navigation: Full site navigable
✓ Responsive text: Scales to 200% without breaking

Audio Accessibility:
✓ Alternative to visual: Audio system provides equivalent experience
✓ User control: Can enable/disable, adjust volume
✓ No autoplay: Requires user interaction
✓ Captions: Text alternatives provided

Motor Accessibility:
✓ Large click targets: Minimum 44x44px
✓ No time limits: Users can take their time
✓ Keyboard shortcuts: Added for common actions
✓ No precision required: Forgiving interactions

Cognitive Accessibility:
✓ Clear language: Simple, direct copy
✓ Consistent navigation: Same structure throughout
✓ Error prevention: Validation before submission
✓ Progress indicators: Show loading states
\`\`\`

### Screen Reader Support

\`\`\`
Semantic HTML:
<header> - Site header with navigation
<main> - Main content area
<section> - Discrete content sections
<article> - Project cards, blog posts
<aside> - Supplementary content
<footer> - Site footer

ARIA Labels:
- All icons have aria-label
- All interactive elements have accessible names
- Form inputs have associated labels
- Modals have aria-modal="true"
- Navigation has aria-current for active page

Live Regions:
<div aria-live="polite"> - Audio system status
<div aria-live="assertive"> - Error messages
<div role="status"> - Loading indicators
\`\`\`

---

## Testing Strategy

### Unit Tests (Recommended)

\`\`\`typescript
// Example: Audio Engine tests
describe('AudioEngine', () => {
  it('should initialize AudioContext on user interaction', () => {
    // Test audio context creation
  });

  it('should properly cleanup oscillators', () => {
    // Test memory leak prevention
  });

  it('should throttle narration calls', () => {
    // Test narration throttling
  });
});

// Example: Sanitization tests
describe('sanitizeInput', () => {
  it('should escape HTML entities', () => {
    expect(sanitizeInput('<script>alert("xss")</script>'))
      .toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
  });
});
\`\`\`

### Integration Tests

\`\`\`typescript
// Example: Contact form flow
describe('Contact Form', () => {
  it('should submit valid form and show success', async () => {
    // 1. Fill form
    // 2. Submit
    // 3. Check API called
    // 4. Verify success message
  });

  it('should show validation errors for invalid input', () => {
    // 1. Submit empty form
    // 2. Verify error messages shown
  });
});
\`\`\`

### E2E Tests (Playwright recommended)

\`\`\`typescript
// Example: Full portfolio flow
test('user can view project details', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-project="creative-chaos"]');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await expect(page.locator('h2')).toContainText('Creative Chaos');
});
\`\`\`

### Manual Testing Checklist

\`\`\`
Cross-Browser:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Devices:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

Accessibility:
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Screen reader (VoiceOver, NVDA)
- [ ] Color blindness (Chrome DevTools)
- [ ] High contrast mode

Performance:
- [ ] Lighthouse score >90
- [ ] Load time <3s
- [ ] No console errors
- [ ] No memory leaks (24hr test)
\`\`\`

---

## Deployment Architecture

### Vercel Deployment (Recommended)

\`\`\`
┌─────────────────────────────────────┐
│         Git Repository               │
│         (GitHub)                     │
└────────────┬────────────────────────┘
             │ Push to main
             ▼
┌─────────────────────────────────────┐
│      Vercel Build Pipeline           │
│  1. Install dependencies             │
│  2. Run type checking                │
│  3. Build Next.js app                │
│  4. Optimize assets                  │
│  5. Generate static pages            │
└────────────┬────────────────────────┘
             │ Deploy
             ▼
┌─────────────────────────────────────┐
│      Vercel Edge Network             │
│  - Global CDN                        │
│  - Edge middleware                   │
│  - Serverless functions              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│         End Users                    │
└─────────────────────────────────────┘
\`\`\`

### Environment Configuration

\`\`\`bash
# Development (.env.local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (Vercel Environment Variables)
NEXT_PUBLIC_SITE_URL=https://creative-chaos.com
GITHUB_TOKEN= (optional, for higher API limits)
\`\`\`

---

## Monitoring & Observability

### Metrics to Track

\`\`\`
Performance:
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

User Behavior:
- Page views per session
- Audio system adoption rate
- Project modal open rate
- Contact form conversion
- Average session duration

Errors:
- JavaScript errors (caught & uncaught)
- API route failures
- Rate limit hits
- CSP violations
- 404 errors

Resource Usage:
- Bundle size over time
- Memory usage (heap snapshots)
- CPU usage during animations
- Network bandwidth
\`\`\`

### Recommended Tools

\`\`\`
Analytics:
- Vercel Analytics (built-in)
- Google Analytics 4
- Plausible (privacy-friendly)

Error Tracking:
- Sentry
- LogRocket
- Rollbar

Performance:
- Lighthouse CI
- WebPageTest
- Calibre

Uptime:
- UptimeRobot
- Pingdom
- StatusCake
\`\`\`

---

## Scaling Considerations

### Current Architecture

\`\`\`
Type: Static Site with API Routes
Hosting: Vercel (Edge + Serverless)
Limitations:
- GitHub API rate limit: 60 req/hour (unauth)
- Client-side rate limiting (localStorage)
- No persistent database
- No user authentication
\`\`\`

### Future Scaling Needs

\`\`\`
If traffic increases significantly:

1. Add Redis for rate limiting
   - Replace localStorage with Redis
   - Track by IP address
   - Distribute across edge network

2. Add database for projects
   - Cache GitHub data in PostgreSQL/MongoDB
   - Reduce API calls
   - Add full-text search

3. Add CDN for assets
   - Separate asset domain
   - Aggressive caching
   - Image optimization service

4. Add analytics backend
   - Track user behavior server-side
   - Generate usage reports
   - A/B testing capabilities

5. Add email service
   - Contact form → email service (SendGrid, etc.)
   - Newsletter subscriptions
   - Automated responses
\`\`\`

---

## Security Threat Model

### Potential Threats

\`\`\`
1. Cross-Site Scripting (XSS)
   Risk: High
   Mitigation: Input sanitization, CSP headers
   Status: ✓ Protected

2. Cross-Site Request Forgery (CSRF)
   Risk: Medium
   Mitigation: SameSite cookies, CSRF tokens
   Status: ⚠ Add CSRF tokens if auth added

3. Rate Limit Abuse
   Risk: Medium
   Mitigation: Client-side rate limiting
   Status: ⚠ Add server-side rate limiting

4. API Abuse (GitHub)
   Risk: Low
   Mitigation: Caching, rate limiting
   Status: ✓ Protected

5. DDoS Attack
   Risk: Low (Vercel handles)
   Mitigation: Vercel's DDoS protection
   Status: ✓ Protected by platform

6. Data Exfiltration
   Risk: Very Low (no sensitive data)
   Mitigation: No PII stored
   Status: ✓ No sensitive data

7. Supply Chain Attack
   Risk: Medium
   Mitigation: Dependency auditing
   Status: ⚠ Regular npm audit needed
\`\`\`

---

## Disaster Recovery

### Backup Strategy

\`\`\`
Code:
- Git repository (GitHub)
- Multiple maintainer access
- Automated backups by GitHub

Configuration:
- Environment variables documented
- Vercel project settings exported
- Infrastructure as code (when applicable)

Data:
- No database = no data loss risk
- GitHub API data can be re-fetched
- Static assets in git
\`\`\`

### Recovery Procedures

\`\`\`
Complete Site Loss:
1. Create new Vercel project
2. Connect GitHub repository
3. Set environment variables
4. Redeploy (automatic)
5. Update DNS (if needed)
   
Time to recover: ~15 minutes

Git Repository Loss:
1. Restore from local clone
2. Push to new GitHub repo
3. Update Vercel connection
4. Redeploy

Time to recover: ~30 minutes

Vercel Account Loss:
1. Create new account
2. Import project from GitHub
3. Configure deployment settings
4. Redeploy

Time to recover: ~20 minutes
\`\`\`

---

## Contributing Guidelines

### Code Standards

\`\`\`typescript
// File naming
kebab-case.tsx // Components
kebab-case.ts  // Utilities
UPPERCASE.md   // Documentation

// Component structure
export default function ComponentName() {
  // 1. Hooks (useState, useEffect, etc.)
  // 2. Event handlers
  // 3. Render logic
  // 4. Return JSX
}

// TypeScript
- Always type props: interface ComponentProps
- Use type inference where obvious
- Avoid 'any' type
- Export types for reuse

// CSS/Tailwind
- Use semantic classes: bg-background, text-foreground
- Avoid arbitrary values: p-4 not p-[16px]
- Mobile-first: base then md:, lg:
- Group related classes
\`\`\`

### Pull Request Process

\`\`\`
1. Create feature branch: feature/audio-improvements
2. Make changes with clear commits
3. Test locally: npm run build && npm run start
4. Update documentation if needed
5. Open PR with description of changes
6. Wait for review and approval
7. Merge to main (auto-deploys)
\`\`\`

---

## Future Roadmap

### Phase 1: Current (v1.0)
- ✓ Portfolio site
- ✓ Audio accessibility system
- ✓ Component library
- ✓ Security hardening
- ✓ Comprehensive documentation

### Phase 2: Enhancement (v1.1)
- [ ] Server-side rate limiting (Redis)
- [ ] Project database (cache GitHub data)
- [ ] Email service integration
- [ ] Advanced analytics
- [ ] Automated testing suite

### Phase 3: Expansion (v2.0)
- [ ] User accounts (save preferences)
- [ ] Community submissions
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)
- [ ] AI-powered design suggestions

---

**Last Updated:** 2025-01-12  
**Architecture Version:** 1.0.0  
**Maintainer:** Corey Alejandro
