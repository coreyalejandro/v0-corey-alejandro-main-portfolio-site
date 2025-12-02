import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface FloatingOrbProps {
  time: number
  index: number
  mousePosition: { x: number; y: number }
  basePosition: { left: string; top: string }
  className?: string
}

export function FloatingOrb({ time, index, mousePosition, basePosition, className }: FloatingOrbProps) {
  const style: CSSProperties = {
    ...basePosition,
    transform: `
      translate(
        ${Math.sin(time + index) * 54 + mousePosition.x * 0.018}px,
        ${Math.cos(time * 0.8 + index) * 36 + mousePosition.y * 0.014}px
      ) 
      rotate(${time * 18 + index * 45}deg)
      scale(${0.5 + Math.sin(time + index) * 0.5})
    `,
  }

  const size = 3 + (index % 4)

  return (
    <div className="absolute" style={style}>
      <div className={cn(`w-${size} h-${size} rounded-full bg-white/20 backdrop-blur-sm`, className)} />
    </div>
  )
}
