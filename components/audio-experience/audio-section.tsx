"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useAudioEngine } from "./audio-engine"

interface AudioSectionProps {
  id: string
  title: string
  description: string
  position: { x: number; y: number; z: number }
  children: React.ReactNode
}

export function AudioSection({ id, title, description, position, children }: AudioSectionProps) {
  const { isActive, narrateSection, setSpatialPosition } = useAudioEngine()
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasNarratedRef = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!isActive || !sectionRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasNarratedRef.current) {
            // Update spatial position
            setSpatialPosition(position.x, position.y, position.z)

            // Narrate section with delay
            setTimeout(() => {
              narrateSection(id, `${title}. ${description}`)
            }, 300)

            hasNarratedRef.current = true
          } else if (!entry.isIntersecting) {
            // Reset when leaving viewport
            hasNarratedRef.current = false
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }, // Trigger earlier, more conservative
    )

    observerRef.current.observe(sectionRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isActive, id, title, description, position, narrateSection, setSpatialPosition])

  return (
    <div ref={sectionRef} data-audio-section={id} role="region" aria-label={title}>
      {children}
    </div>
  )
}
