"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface ColorPalette {
  name: string
  breathing: {
    primary: string
    secondary: string
    tertiary: string
    deep: string
    accent: string
  }
  nav: {
    background: string
    glow: string
  }
  card: {
    background: string
    border: string
  }
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Deep Ember",
    breathing: {
      primary: "rgba(180, 83, 9, 0.9)", // Deep burnt orange
      secondary: "rgba(153, 27, 27, 0.8)", // Dark crimson
      tertiary: "rgba(124, 45, 18, 0.95)", // Deep rust
      deep: "rgba(23, 23, 23, 1)", // Near black charcoal
      accent: "rgba(217, 119, 6, 0.85)", // Rich orange accent
    },
    nav: {
      background: "rgba(30, 30, 30, 0.95)",
      glow: "rgba(180, 83, 9, 0.4)",
    },
    card: {
      background: "rgba(38, 38, 38, 0.85)",
      border: "rgba(180, 83, 9, 0.4)",
    },
  },
  {
    name: "Deep Crimson",
    breathing: {
      primary: "rgba(159, 18, 57, 0.9)", // Deep wine
      secondary: "rgba(136, 19, 55, 0.85)", // Dark rose
      tertiary: "rgba(190, 18, 60, 0.9)", // Rich crimson
      deep: "rgba(20, 20, 20, 1)", // Charcoal
      accent: "rgba(225, 29, 72, 0.8)", // Deep rose accent
    },
    nav: {
      background: "rgba(28, 25, 27, 0.95)",
      glow: "rgba(159, 18, 57, 0.4)",
    },
    card: {
      background: "rgba(35, 30, 33, 0.85)",
      border: "rgba(159, 18, 57, 0.4)",
    },
  },
  {
    name: "Deep Ocean",
    breathing: {
      primary: "rgba(8, 145, 178, 0.9)", // Deep teal
      secondary: "rgba(7, 89, 133, 0.85)", // Deep blue
      tertiary: "rgba(12, 74, 110, 0.95)", // Dark cyan
      deep: "rgba(17, 24, 39, 1)", // Deep navy charcoal
      accent: "rgba(14, 165, 233, 0.8)", // Rich cyan accent
    },
    nav: {
      background: "rgba(23, 30, 42, 0.95)",
      glow: "rgba(8, 145, 178, 0.4)",
    },
    card: {
      background: "rgba(30, 38, 52, 0.85)",
      border: "rgba(8, 145, 178, 0.4)",
    },
  },
  {
    name: "Deep Jungle",
    breathing: {
      primary: "rgba(21, 128, 61, 0.9)", // Forest green
      secondary: "rgba(20, 83, 45, 0.85)", // Deep emerald
      tertiary: "rgba(22, 101, 52, 0.95)", // Rich green
      deep: "rgba(18, 24, 20, 1)", // Deep forest charcoal
      accent: "rgba(34, 197, 94, 0.8)", // Saturated green accent
    },
    nav: {
      background: "rgba(22, 28, 24, 0.95)",
      glow: "rgba(21, 128, 61, 0.4)",
    },
    card: {
      background: "rgba(28, 36, 30, 0.85)",
      border: "rgba(21, 128, 61, 0.4)",
    },
  },
  {
    name: "Deep Solar",
    breathing: {
      primary: "rgba(161, 98, 7, 0.9)", // Deep amber
      secondary: "rgba(146, 64, 14, 0.85)", // Dark bronze
      tertiary: "rgba(180, 83, 9, 0.95)", // Rich gold
      deep: "rgba(24, 20, 16, 1)", // Deep brown charcoal
      accent: "rgba(217, 119, 6, 0.85)", // Saturated gold accent
    },
    nav: {
      background: "rgba(30, 26, 22, 0.95)",
      glow: "rgba(161, 98, 7, 0.4)",
    },
    card: {
      background: "rgba(38, 32, 26, 0.85)",
      border: "rgba(161, 98, 7, 0.4)",
    },
  },
  {
    name: "Deep Coral",
    breathing: {
      primary: "rgba(194, 65, 12, 0.9)", // Deep coral
      secondary: "rgba(154, 52, 18, 0.85)", // Dark rust
      tertiary: "rgba(234, 88, 12, 0.9)", // Rich orange-red
      deep: "rgba(23, 20, 19, 1)", // Warm charcoal
      accent: "rgba(251, 146, 60, 0.8)", // Saturated coral accent
    },
    nav: {
      background: "rgba(30, 25, 23, 0.95)",
      glow: "rgba(194, 65, 12, 0.4)",
    },
    card: {
      background: "rgba(38, 32, 28, 0.85)",
      border: "rgba(194, 65, 12, 0.4)",
    },
  },
  {
    name: "Deep Amethyst",
    breathing: {
      primary: "rgba(109, 40, 217, 0.9)", // Deep rich purple
      secondary: "rgba(88, 28, 135, 0.85)", // Dark violet
      tertiary: "rgba(126, 34, 206, 0.95)", // Rich purple
      deep: "rgba(20, 17, 27, 1)", // Deep purple-tinted charcoal
      accent: "rgba(168, 85, 247, 0.8)", // Saturated purple accent
    },
    nav: {
      background: "rgba(26, 22, 33, 0.95)",
      glow: "rgba(109, 40, 217, 0.4)",
    },
    card: {
      background: "rgba(33, 28, 42, 0.85)",
      border: "rgba(109, 40, 217, 0.4)",
    },
  },
]

interface ColorThemeContextType {
  currentPalette: ColorPalette
  paletteIndex: number
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  currentPalette: COLOR_PALETTES[0],
  paletteIndex: 0,
})

export const useColorTheme = () => useContext(ColorThemeContext)

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [paletteIndex, setPaletteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % COLOR_PALETTES.length)
      console.log("[v0] Color palette shifting...")
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [])

  const currentPalette = COLOR_PALETTES[paletteIndex]

  useEffect(() => {
    const root = document.documentElement
    const palette = currentPalette

    root.style.setProperty("--theme-primary", palette.breathing.primary)
    root.style.setProperty("--theme-secondary", palette.breathing.secondary)
    root.style.setProperty("--theme-tertiary", palette.breathing.tertiary)
    root.style.setProperty("--theme-deep", palette.breathing.deep)
    root.style.setProperty("--theme-accent", palette.breathing.accent)
    root.style.setProperty("--theme-nav-bg", palette.nav.background)
    root.style.setProperty("--theme-nav-glow", palette.nav.glow)
    root.style.setProperty("--theme-card-bg", palette.card.background)
    root.style.setProperty("--theme-card-border", palette.card.border)

    console.log("[v0] Applied theme:", palette.name)
  }, [currentPalette])

  return <ColorThemeContext.Provider value={{ currentPalette, paletteIndex }}>{children}</ColorThemeContext.Provider>
}
