"use client"

import type React from "react"

import { useAudioEngine } from "./audio-engine"

interface AudioButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  description?: string
}

export function AudioButton({ children, onClick, className = "", description }: AudioButtonProps) {
  const { isActive, playComponentSound, narrateSection } = useAudioEngine()

  const handleClick = () => {
    if (isActive) {
      playComponentSound("button")
      if (description) {
        narrateSection("button-interaction", description)
      }
    }
    onClick?.()
  }

  const handleFocus = () => {
    if (isActive && description) {
      narrateSection("button-focus", description)
    }
  }

  return (
    <button onClick={handleClick} onFocus={handleFocus} className={className} aria-label={description}>
      {children}
    </button>
  )
}
