"use client"

import { useState, useEffect } from "react"

interface OrganicTitleProps {
  lines: string[]
  className?: string
  mouseInteraction?: boolean
}

export function OrganicTitle({ lines, className = "", mouseInteraction = true }: OrganicTitleProps) {
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

  const rotations = [-3, 2, -1]
  const gradients = ["", "bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent", ""]

  return (
    <div
      className={`${className}`}
      style={{
        transform: mouseInteraction
          ? `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.015}px) rotate(${Math.sin(time) * 2}deg)`
          : `rotate(${Math.sin(time) * 2}deg)`,
      }}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className={`block transform rotate-${Math.abs(rotations[index % rotations.length])} ${
            index === 1 ? "ml-12" : index === 2 ? "ml-6 text-7xl" : ""
          } ${gradients[index % gradients.length]}`}
          style={{
            transform: `rotate(${rotations[index % rotations.length]}deg)`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  )
}
