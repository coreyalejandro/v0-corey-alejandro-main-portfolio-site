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

  const navItems = [
    { name: "Templates", href: "/templates", icon: CustomIcons.Templates },
    { name: "Design System", href: "/design-system", icon: CustomIcons.DesignSystem },
    { name: "Components", href: "/components", icon: CustomIcons.Components },
    { name: "Playground", href: "/playground", icon: CustomIcons.Playground },
    { name: "Documentation", href: "/documentation", icon: CustomIcons.Documentation },
    { name: "Contact", href: "/contact", icon: CustomIcons.Contact },
  ]

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-orange-800/95 via-red-800/95 to-amber-800/95 backdrop-blur-xl border border-orange-600/40 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="group relative flex items-center space-x-2 px-5 py-2 rounded-full bg-white/10 border border-orange-400/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-orange-300/50"
          >
            <CustomIcons.Home />
            <span className="text-base font-bold text-white tracking-wide">Corey Alejandro</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/0 via-red-500/0 to-amber-500/0 group-hover:from-orange-500/20 group-hover:via-red-500/20 group-hover:to-amber-500/20 transition-all duration-300" />
          </Link>

          <div className="h-8 w-px bg-orange-400/30" />

          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="group-hover:animate-pulse">
                <item.icon />
              </div>
              <span className="text-sm font-medium text-orange-100 group-hover:text-white transition-colors duration-300">
                {item.name}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
