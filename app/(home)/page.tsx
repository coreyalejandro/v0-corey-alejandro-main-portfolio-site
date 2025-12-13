"use client"

import { AnimationProvider } from "@/contexts/AnimationContext"
import { HeroSection, CTASection, PortfolioSection } from "./sections"

/**
 * HomePage - Clean orchestrator component
 *
 * This file went from 42KB (1000+ lines) to ~1KB (50 lines)
 *
 * All logic has been extracted into:
 * - Sections (./sections/)
 * - Hooks (../../hooks/)
 * - Context (../../contexts/AnimationContext)
 * - Components (../../components/)
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnimationProvider>
        <HeroSection />
        <PortfolioSection />
        <CTASection />
      </AnimationProvider>
    </div>
  )
}
