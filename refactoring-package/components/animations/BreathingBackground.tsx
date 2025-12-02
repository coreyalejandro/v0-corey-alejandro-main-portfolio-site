import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface BreathingBackgroundProps {
  time: number
  className?: string
  variant?: 'hero' | 'cta' | 'portfolio'
}

export function BreathingBackground({ time, className, variant = 'hero' }: BreathingBackgroundProps) {
  const style = useMemo(() => {
    const x1 = 20 + Math.sin(time) * 10
    const y1 = 30 + Math.cos(time * 0.7) * 15
    const x2 = 80 + Math.cos(time * 1.2) * 8
    const y2 = 70 + Math.sin(time * 0.9) * 12

    let background: string

    switch (variant) {
      case 'hero':
        background = `
          radial-gradient(ellipse at ${x1}% ${y1}%, 
            rgba(251, 191, 36, 0.8) 0%, 
            rgba(239, 68, 68, 0.6) 30%, 
            rgba(194, 65, 12, 0.9) 70%, 
            rgba(120, 53, 15, 1) 100%),
          radial-gradient(ellipse at ${x2}% ${y2}%, 
            rgba(251, 146, 60, 0.7) 0%, 
            transparent 50%)
        `
        break
      case 'cta':
        background = `
          conic-gradient(from ${time * 20}deg at ${x1}% ${y1}%, 
            rgba(251, 191, 36, 0.9) 0deg,
            rgba(239, 68, 68, 0.8) 90deg,
            rgba(194, 65, 12, 0.9) 180deg,
            rgba(251, 146, 60, 0.7) 270deg,
            rgba(251, 191, 36, 0.9) 360deg)
        `
        break
      case 'portfolio':
        background = `
          radial-gradient(circle at ${x1}% ${y1}%, rgba(251, 191, 36, 0.6) 0%, transparent 40%),
          radial-gradient(circle at ${x2}% ${y2}%, rgba(239, 68, 68, 0.5) 0%, transparent 45%)
        `
        break
    }

    return {
      background,
      transform: `scale(${1 + Math.sin(time * 0.5) * 0.05}) rotate(${Math.sin(time * 0.3) * 2}deg)`,
    }
  }, [time, variant])

  return <div className={cn("absolute inset-0 transition-transform", className)} style={style} />
}
