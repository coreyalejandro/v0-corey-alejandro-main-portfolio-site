import { ReactNode, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
  children: ReactNode
  time: number
  index: number
  className?: string
  amplitude?: { x: number; y: number }
  speed?: { x: number; y: number }
}

export function FloatingElement({
  children,
  time,
  index,
  className,
  amplitude = { x: 20, y: 15 },
  speed = { x: 1.2, y: 1.0 },
}: FloatingElementProps) {
  const style: CSSProperties = {
    transform: `translate(${Math.sin(time * speed.x + index) * amplitude.x}px, ${Math.cos(time * speed.y + index) * amplitude.y}px)`,
  }

  return (
    <div className={cn('absolute transition-transform', className)} style={style}>
      {children}
    </div>
  )
}
