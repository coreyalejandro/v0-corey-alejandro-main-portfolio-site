"use client"

import { useState, useEffect } from "react"

interface BreathingBackgroundProps {
  colors?: string[]
  intensity?: number
}

export function BreathingBackground({
  colors = ["rgba(251, 191, 36, 0.8)", "rgba(239, 68, 68, 0.6)", "rgba(194, 65, 12, 0.9)", "rgba(120, 53, 15, 1)"],
  intensity = 1,
}: BreathingBackgroundProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at ${20 + Math.sin(time) * 25 * intensity}% ${30 + Math.cos(time * 0.7) * 35 * intensity}%, 
            ${colors[0]} 0%, 
            ${colors[1]} 30%, 
            ${colors[2]} 70%, 
            ${colors[3]} 100%),
          radial-gradient(ellipse at ${80 + Math.cos(time * 1.2) * 20 * intensity}% ${70 + Math.sin(time * 0.9) * 28 * intensity}%, 
            rgba(251, 146, 60, 0.7) 0%, 
            transparent 50%)
        `,
        transform: `scale(${1 + Math.sin(time * 0.5) * 0.15 * intensity}) rotate(${Math.sin(time * 0.3) * 8 * intensity}deg)`,
      }}
    />
  )
}
