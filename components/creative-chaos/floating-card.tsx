"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  mouseInteraction?: boolean
  rotationIntensity?: number
}

export function FloatingCard({
  children,
  className = "",
  mouseInteraction = true,
  rotationIntensity = 1,
}: FloatingCardProps) {
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
    <div
      className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 ${className}`}
      style={{
        transform: mouseInteraction
          ? `translate(${-mousePosition.x * 0.01}px, ${mousePosition.y * 0.02}px) rotate(${-Math.sin(time * 0.7) * rotationIntensity}deg)`
          : `rotate(${-Math.sin(time * 0.7) * rotationIntensity}deg)`,
      }}
    >
      {children}
    </div>
  )
}
