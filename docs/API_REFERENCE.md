# Creative Chaos - API Reference

Complete API documentation for all components and hooks.

## Audio System

### useAudio()

\`\`\`typescript
const {
  isEnabled,
  isInitialized,
  volume,
  toggleAudio,
  setVolume,
  narrate,
  playTone,
  playSectionSound,
  playHoverSound,
  playClickSound,
  playSuccessSound,
} = useAudio()
\`\`\`

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `isEnabled` | `boolean` | Whether audio is currently enabled |
| `isInitialized` | `boolean` | Whether AudioContext is initialized |
| `volume` | `number` | Current volume (0-1) |
| `toggleAudio` | `() => void` | Enable/disable audio system |
| `setVolume` | `(vol: number) => void` | Set volume level |
| `narrate` | `(text: string, priority?: 'high'\|'normal'\|'low') => void` | Speak text |
| `playTone` | `(freq: number, duration?: number, pos?: {x,y,z}) => void` | Play audio tone |
| `playSectionSound` | `(id: string) => void` | Play section entry sound |
| `playHoverSound` | `() => void` | Play hover feedback |
| `playClickSound` | `() => void` | Play click feedback |
| `playSuccessSound` | `() => void` | Play success feedback |

**Example:**

\`\`\`tsx
import { useAudio } from '@/components/audio-experience/audio-engine'

function MyComponent() {
  const { narrate, playSuccessSound } = useAudio()
  
  const handleSubmit = () => {
    narrate('Form submitted successfully!', 'high')
    playSuccessSound()
  }
  
  return <button onClick={handleSubmit}>Submit</button>
}
\`\`\`

### AudioSection

\`\`\`typescript
interface AudioSectionProps {
  id: string;
  title: string;
  description: string;
  position?: { x: number; y: number; z: number };
  children: React.ReactNode;
}
\`\`\`

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | - | Unique section identifier |
| `title` | `string` | Yes | - | Section title (narrated) |
| `description` | `string` | Yes | - | Section description (narrated) |
| `position` | `{x,y,z}` | No | `{0,0,0}` | 3D spatial position |
| `children` | `ReactNode` | Yes | - | Section content |

**Example:**

\`\`\`tsx
<AudioSection
  id="features"
  title="Features"
  description="Explore our amazing features"
  position={{ x: -50, y: 0, z: -100 }}
>
  <FeatureList />
</AudioSection>
\`\`\`

### AudioButton

\`\`\`typescript
interface AudioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  soundType?: 'default' | 'success' | 'error';
  label?: string;
}
\`\`\`

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `soundType` | `'default'\|'success'\|'error'` | No | `'default'` | Type of sound to play |
| `label` | `string` | No | - | Text to narrate on click |
| `...rest` | `ButtonHTMLAttributes` | No | - | Standard button props |

**Example:**

\`\`\`tsx
<AudioButton
  soundType="success"
  label="Project submitted"
  onClick={handleSubmit}
>
  Submit Project
</AudioButton>
\`\`\`

## Components

### LaydownCard

\`\`\`typescript
interface LaydownCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  image?: React.ReactNode;
}
\`\`\`

### BreathingBackground

\`\`\`typescript
interface BreathingBackgroundProps {
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  children?: React.ReactNode;
}
\`\`\`

### FloatingCard

\`\`\`typescript
interface FloatingCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
\`\`\`

### OrganicTitle

\`\`\`typescript
interface OrganicTitleProps {
  text: string;
  className?: string;
  gradient?: boolean;
}
\`\`\`

### FloatingParticles

\`\`\`typescript
interface FloatingParticlesProps {
  count?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

### ProjectModal

\`\`\`typescript
interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  github?: string;
  demo?: string;
  images: string[];
  category: string;
  featured?: boolean;
}
\`\`\`

---

For complete usage examples, see the [Handbook](./HANDBOOK.md).
