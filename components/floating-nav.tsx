"use client"

import {
  Maximize2,
  Minimize2,
  Zap,
  SlidersHorizontal,
  Sparkles,
  FileText,
  FolderOpen,
  LayoutTemplate,
  Beaker,
  BookOpen,
  Volume2,
  VolumeX,
  Move,
} from "lucide-react"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAudioEngine } from "@/components/audio-experience/audio-engine"

export default function FloatingNav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [opacity, setOpacity] = useState(0.95)
  const [showOpacityControl, setShowOpacityControl] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout>()
  const [isVisible, setIsVisible] = useState(true)
  const [isDraggable, setIsDraggable] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { isActive: audioEnabled, toggleAudio } = useAudioEngine()

  useEffect(() => {
    if (isDraggable) return

    const handleScroll = () => {
      setIsVisible(window.scrollY < 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      } else if (!isHovered) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => {
          if (!isHovered && window.scrollY > 50) setIsVisible(false)
        }, 1500)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    hideTimerRef.current = setTimeout(() => {
      if (!isHovered && window.scrollY > 50) setIsVisible(false)
    }, 1500)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isDraggable, isHovered])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable || isCollapsed) return

    setIsDragging(true)
    const navElement = navRef.current
    if (navElement) {
      const rect = navElement.getBoundingClientRect()
      const startX = e.clientX - rect.left
      const startY = e.clientY - rect.top

      const handleMouseMove = (moveEvent: MouseEvent) => {
        setPosition({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY,
        })
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
  }

  const handleCollapsedMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return

    setIsDragging(true)
    const navElement = navRef.current
    if (navElement) {
      const rect = navElement.getBoundingClientRect()
      const startX = e.clientX - rect.left
      const startY = e.clientY - rect.top

      const handleMouseMove = (moveEvent: MouseEvent) => {
        setPosition({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY,
        })
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
  }

  const leftNavItems = [
    { name: "Design System", href: "/design-system", icon: Sparkles },
    { name: "Resume", href: "/templates/resume", icon: FileText },
    { name: "Superpowers", href: "/#superpowers", icon: Zap },
    { name: "Projects", href: "/#projects", icon: FolderOpen },
  ]

  const rightNavItems = [
    { name: "Templates", href: "/templates", icon: LayoutTemplate },
    { name: "Playground", href: "/playground", icon: Beaker },
    { name: "Documentation", href: "/documentation", icon: BookOpen },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed z-50 transition-all duration-500 ${
        isDraggable && !isCollapsed ? "cursor-move" : ""
      } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      style={
        isDraggable
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "none",
            }
          : {
              top: "24px",
              left: "50%",
              transform: "translateX(-50%)",
            }
      }
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="backdrop-blur-xl rounded-full shadow-2xl transition-all duration-[3000ms] relative"
        style={{
          background: `rgba(30, 30, 30, ${opacity})`,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--theme-card-border)",
          boxShadow: isDraggable
            ? "0 0 60px var(--theme-nav-glow), 0 10px 40px rgba(0,0,0,0.3)"
            : "0 0 40px var(--theme-nav-glow)",
          padding: isCollapsed ? "12px 16px" : "8px 16px",
        }}
      >
        {isCollapsed ? (
          <div
            className="flex items-center justify-center space-x-2 cursor-move"
            onMouseDown={handleCollapsedMouseDown}
          >
            <Move className="w-4 h-4 text-white/40" />
            <span className="text-lg font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              CA
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDraggable(false)
                setIsCollapsed(false)
              }}
              className="p-1.5 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
              title="Dock nav bar"
            >
              <Minimize2 className="w-3.5 h-3.5 text-white/60" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (isDraggable) {
                  setIsCollapsed(true)
                } else {
                  setIsDraggable(true)
                }
              }}
              className="p-1.5 rounded-full transition-all duration-300 hover:scale-110 group mr-1"
              style={{
                background: isDraggable ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
              }}
              title={isDraggable ? "Collapse nav bar" : "Detach nav bar"}
            >
              <Maximize2 className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowOpacityControl(!showOpacityControl)
              }}
              className="p-1.5 rounded-full transition-all duration-300 hover:scale-110 group mr-2"
              style={{
                background: showOpacityControl ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
              }}
              title="Adjust opacity"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
            </button>

            <div className="flex items-center space-x-1">
              {leftNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative p-2 rounded-full transition-all duration-300 hover:scale-110"
                  onClick={(e) => isDragging && e.preventDefault()}
                  title={item.name}
                >
                  <div className="group-hover:animate-pulse">
                    <item.icon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="mx-3 px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 group"
              style={{
                background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
              }}
              onClick={(e) => isDragging && e.preventDefault()}
            >
              <div className="text-sm font-bold text-white flex flex-col items-center leading-tight">
                <span>Corey</span>
                <span>Alejandro</span>
              </div>
            </Link>

            <div className="flex items-center space-x-1">
              {rightNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative p-2 rounded-full transition-all duration-300 hover:scale-110"
                  onClick={(e) => isDragging && e.preventDefault()}
                  title={item.name}
                >
                  <div className="group-hover:animate-pulse">
                    <item.icon className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                </Link>
              ))}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleAudio()
                }}
                className="group relative p-2 rounded-full transition-all duration-300 hover:scale-110 ml-1"
                title={audioEnabled ? "Disable Audio Mode" : "Enable Audio Mode"}
              >
                <div className="group-hover:animate-pulse">
                  {audioEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300 transition-colors" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </button>
            </div>
          </div>
        )}

        {showOpacityControl && !isCollapsed && (
          <div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl"
            style={{
              background: `rgba(30, 30, 30, ${opacity})`,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "var(--theme-card-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xs text-white/60 whitespace-nowrap">Opacity</span>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number.parseFloat(e.target.value))}
                className="nav-opacity-slider w-32 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--theme-accent) 0%, var(--theme-accent) ${opacity * 100}%, rgba(255,255,255,0.2) ${opacity * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
              <span className="text-xs text-white/80 font-mono w-10">{Math.round(opacity * 100)}%</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
