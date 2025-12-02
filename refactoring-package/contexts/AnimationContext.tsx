'use client'

import { createContext, ReactNode, useState, useEffect } from 'react'

export interface AnimationContextValue {
  time: number
  scrollY: number
  mousePosition: { x: number; y: number }
}

export const AnimationContext = createContext<AnimationContextValue | null>(null)

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [time, setTime] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 0.1)
    }, 100)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const value: AnimationContextValue = { time, scrollY, mousePosition }
  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}
