# Creative Chaos - Quick Start Guide

Get up and running with Creative Chaos in 5 minutes.

## Installation

\`\`\`bash
# Clone or download the project
git clone https://github.com/yourusername/creative-chaos.git
cd creative-chaos

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using Components

### Audio System

1. **Enable Audio** - Click the audio toggle button in the top right
2. **Navigate** - Scroll through sections to hear spatial audio narration
3. **Interact** - Hover and click buttons for audio feedback

### LaydownCard

\`\`\`tsx
import { LaydownCard } from '@/components/laydown-card'

<LaydownCard
  title="My Project"
  description="An amazing project description"
>
  <p>Content goes here</p>
</LaydownCard>
\`\`\`

### BreathingBackground

\`\`\`tsx
import { BreathingBackground } from '@/components/creative-chaos/breathing-background'

<BreathingBackground
  gradientFrom="from-orange-500"
  gradientVia="via-pink-500"
  gradientTo="to-purple-600"
>
  <div>Your content</div>
</BreathingBackground>
\`\`\`

### Audio-Enhanced Sections

\`\`\`tsx
import { AudioSection } from '@/components/audio-experience/audio-section'

<AudioSection
  id="hero"
  title="Welcome"
  description="This section narrates automatically when scrolled into view"
>
  <div>Your content</div>
</AudioSection>
\`\`\`

## Adding Projects

Edit `config/projects.ts`:

\`\`\`typescript
export const projects = [
  {
    id: 'my-project',
    title: 'My Amazing Project',
    description: 'A short description',
    longDescription: 'A longer, detailed description',
    challenge: 'The problem I solved',
    solution: 'How I solved it',
    impact: 'The results',
    technologies: ['React', 'TypeScript', 'Next.js'],
    github: 'https://github.com/user/repo',
    demo: 'https://demo.com',
    images: ['/project-1.jpg', '/project-2.jpg'],
    category: 'Web Development',
    featured: true,
  },
]
\`\`\`

Projects automatically appear in your portfolio!

## Customizing Colors

Edit `app/globals.css`:

\`\`\`css
:root {
  --primary: oklch(0.75 0.25 30);  /* Your brand color */
  --secondary: oklch(0.55 0.28 355);
  /* ... more tokens */
}
\`\`\`

## Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Need Help?

See the [Complete Handbook](./HANDBOOK.md) for detailed documentation.
