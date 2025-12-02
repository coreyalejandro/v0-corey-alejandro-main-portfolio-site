"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useColorTheme } from "@/contexts/ColorThemeContext"

interface BreathingBackgroundProps {
  time: number
  className?: string
  variant?: "hero" | "cta" | "portfolio"
}

export function BreathingBackground({ time, className, variant = "hero" }: BreathingBackgroundProps) {
  const { currentPalette } = useColorTheme()

  const style = useMemo(() => {
    const x1 = 20 + Math.sin(time) * 10
    const y1 = 30 + Math.cos(time * 0.7) * 15
    const x2 = 80 + Math.cos(time * 1.2) * 8
    const y2 = 70 + Math.sin(time * 0.9) * 12

    const { primary, secondary, tertiary, deep, accent } = currentPalette.breathing

    let background: string

    switch (variant) {
      case "hero":
        background = `
          radial-gradient(ellipse at ${x1}% ${y1}%, 
            ${primary} 0%, 
            ${secondary} 30%, 
            ${tertiary} 70%, 
            ${deep} 100%),
          radial-gradient(ellipse at ${x2}% ${y2}%, 
            ${accent} 0%, 
            transparent 50%)
        `
        break
      case "cta":
        background = `
          conic-gradient(from ${time * 20}deg at ${x1}% ${y1}%, 
            ${primary} 0deg,
            ${secondary} 90deg,
            ${tertiary} 180deg,
            ${accent} 270deg,
            ${primary} 360deg)
        `
        break
      case "portfolio":
        background = `
          radial-gradient(circle at ${x1}% ${y1}%, ${primary} 0%, transparent 40%),
          radial-gradient(circle at ${x2}% ${y2}%, ${secondary} 0%, transparent 45%)
        `
        break
    }

    return {
      background,
      transform: `scale(${1 + Math.sin(time * 0.5) * 0.05}) rotate(${Math.sin(time * 0.3) * 2}deg)`,
      transition: "background 3s ease-in-out",
    }
  }, [time, variant, currentPalette])

  return <div className={cn("absolute inset-0", className)} style={style} />
}
