"use client"

import { useState, useEffect } from "react"
import { useColorTheme } from "@/contexts/ColorThemeContext"

interface BreathingBackgroundProps {
  colors?: string[]
  intensity?: number
}

export function BreathingBackground({ colors, intensity = 1 }: BreathingBackgroundProps) {
  const [time, setTime] = useState(0)
  const { currentPalette } = useColorTheme()

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)
    return () => clearInterval(timer)
  }, [])

  const activeColors = colors || [
    currentPalette.breathing.primary,
    currentPalette.breathing.secondary,
    currentPalette.breathing.tertiary,
    currentPalette.breathing.deep,
  ]

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at ${20 + Math.sin(time) * 25 * intensity}% ${30 + Math.cos(time * 0.7) * 35 * intensity}%, 
            ${activeColors[0]} 0%, 
            ${activeColors[1]} 30%, 
            ${activeColors[2]} 70%, 
            ${activeColors[3]} 100%),
          radial-gradient(ellipse at ${80 + Math.cos(time * 1.2) * 20 * intensity}% ${70 + Math.sin(time * 0.9) * 28 * intensity}%, 
            ${currentPalette.breathing.accent} 0%, 
            transparent 50%)
        `,
        transform: `scale(${1 + Math.sin(time * 0.5) * 0.15 * intensity}) rotate(${Math.sin(time * 0.3) * 8 * intensity}deg)`,
        transition: "background 3s ease-in-out",
      }}
    />
  )
}
