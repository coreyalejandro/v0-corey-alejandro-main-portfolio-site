"use client"

import { useState, useEffect } from "react"

interface FloatingParticlesProps {
  count?: number
  mouseInteraction?: boolean
}

export function FloatingParticles({ count = 15, mouseInteraction = true }: FloatingParticlesProps) {
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInteraction) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      clearInterval(timer)
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [mouseInteraction])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + ((i * 7) % 80)}%`,
            top: `${15 + ((i * 11) % 70)}%`,
            transform: `
              translate(
                ${Math.sin(time + i) * 30 + (mouseInteraction ? mousePosition.x * 0.01 : 0)}px,
                ${Math.cos(time * 0.8 + i) * 20 + (mouseInteraction ? mousePosition.y * 0.008 : 0)}px
              ) 
              rotate(${time * 10 + i * 30}deg)
              scale(${0.5 + Math.sin(time + i) * 0.3})
            `,
          }}
        >
          <div className={`w-${3 + (i % 4)} h-${3 + (i % 4)} rounded-full bg-white/20 backdrop-blur-sm`} />
        </div>
      ))}
    </div>
  )
}
