"use client"

import { AnimationProvider } from "@/contexts/AnimationContext"
import { HeroSection } from "@/app/(home)/sections/HeroSection"
import { CTASection } from "@/app/(home)/sections/CTASection"
import { PortfolioSection } from "@/app/(home)/sections/PortfolioSection"
import ResumeTemplate from "@/app/templates/resume/page"

/**
 * HomePage - Clean orchestrator component
 *
 * This file went from 42KB (1000+ lines) to ~1KB (50 lines)
 *
 * All logic has been extracted into:
 * - Sections (./(home)/sections/)
 * - Hooks (../hooks/)
 * - Context (../contexts/AnimationContext)
 * - Components (../components/)
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AnimationProvider>
        <HeroSection />
        <ResumeTemplate />
        <CTASection />
        <PortfolioSection />
      </AnimationProvider>
    </div>
  )
}
