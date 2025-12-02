"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { CustomIcons } from "./custom-icons"

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const leftNavItems = [
    { name: "Design System", href: "/design-system", icon: CustomIcons.DesignSystem },
    { name: "Resume", href: "/templates/resume", icon: CustomIcons.Components },
    { name: "Superpowers", href: "/#superpowers", icon: CustomIcons.DesignSystem },
    { name: "Projects", href: "/#projects", icon: CustomIcons.Components },
  ]

  const rightNavItems = [
    { name: "Templates", href: "/templates", icon: CustomIcons.Templates },
    { name: "Playground", href: "/playground", icon: CustomIcons.Playground },
    { name: "Documentation", href: "/documentation", icon: CustomIcons.Documentation },
  ]

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className="backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl transition-all duration-[3000ms]"
        style={{
          background: "var(--theme-nav-bg)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--theme-card-border)",
          boxShadow: "0 0 40px var(--theme-nav-glow)",
        }}
      >
        <div className="flex items-center justify-center space-x-2">
          {/* Left navigation items */}
          <div className="flex items-center space-x-2">
            {leftNavItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="group-hover:animate-pulse">
                  <item.icon />
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div
            className="h-8 w-px mx-2 transition-colors duration-[3000ms]"
            style={{ backgroundColor: "var(--theme-card-border)" }}
          />

          <Link
            href="/"
            className="group relative flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 hover:scale-110 mx-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "var(--theme-card-border)",
              transition: "all 3s ease-in-out",
            }}
          >
            <CustomIcons.Home />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white tracking-wide">Corey</span>
              <span className="text-lg font-bold text-white tracking-wide">Alejandro</span>
            </div>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{ backgroundColor: "var(--theme-accent)" }}
            />
          </Link>

          <div
            className="h-8 w-px mx-2 transition-colors duration-[3000ms]"
            style={{ backgroundColor: "var(--theme-card-border)" }}
          />

          {/* Right navigation items */}
          <div className="flex items-center space-x-2">
            {rightNavItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="group-hover:animate-pulse">
                  <item.icon />
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
