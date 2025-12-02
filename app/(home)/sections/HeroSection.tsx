'use client'

import { Button } from '@/components/ui/button'
import { Heart, Play, Star, Zap, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAnimation } from '@/hooks'
import { AudioSection } from '@/components/audio-experience/audio-section'
import { AudioButton } from '@/components/audio-experience/audio-button'
import { BreathingBackground, FloatingOrb, FloatingElement } from '@/components/animations'

/**
 * HeroSection - Neural Depth Magic hero
 * 
 * Extracted from app/page.tsx
 * Features:
 * - Breathing background gradient
 * - Floating orbs that respond to mouse
 * - Organic title positioning
 * - Collage-style features section
 */
export function HeroSection() {
  const { time, mousePosition } = useAnimation()

  return (
    <AudioSection
      id="hero"
      title="Hero Section - Neural Depth Magic"
      description="Experience the Creative Chaos design philosophy. Living gradients, organic motion, and joyful interactions that breathe with every scroll."
      position={{ x: 0, y: 0, z: -5 }}
    >
      <section className="relative min-h-screen rounded-3xl mb-16">
        {/* Breathing, Living Background */}
        <BreathingBackground time={time} variant="hero" className="rounded-3xl" />

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <FloatingOrb
              key={i}
              time={time}
              index={i}
              mousePosition={mousePosition}
              basePosition={{
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${15 + ((i * 11) % 70)}%`,
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative h-screen flex items-center">
          <div className="container mx-auto px-4">
            {/* Main Title - Positioned Organically */}
            <div
              className="absolute left-8 top-1/4"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.015}px) rotate(${Math.sin(time) * 2}deg)`,
              }}
            >
              <h1 className="text-8xl md:text-9xl font-black text-white leading-none">
                <span className="block transform -rotate-3">Neural</span>
                <span className="block transform rotate-2 ml-12 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Depth
                </span>
                <span className="block transform -rotate-1 ml-6 text-7xl">Magic</span>
              </h1>
            </div>

            {/* Floating Description */}
            <div
              className="absolute right-12 top-1/3 max-w-md"
              style={{
                transform: `translate(${-mousePosition.x * 0.01}px, ${mousePosition.y * 0.02}px) rotate(${-Math.sin(time * 0.7) * 1}deg)`,
              }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-[4rem] p-8 border border-white/20">
                <p className="text-xl text-white/90 text-pretty leading-relaxed">
                  Where creativity meets technology in a dance of organic motion and neural intelligence
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="/contact">
                    <AudioButton
                      description="Feel the magic - Contact me to start creating"
                      className="bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full px-6 py-3 inline-flex items-center"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Feel the Magic
                    </AudioButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Scattered Interactive Elements */}
            <FloatingElement
              time={time}
              index={0}
              amplitude={{ x: 20, y: 15 }}
              speed={{ x: 1.2, y: 1.0 }}
              className="bottom-32 left-1/4"
            >
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white" />
              </div>
            </FloatingElement>

            <FloatingElement
              time={time}
              index={1}
              amplitude={{ x: 25, y: 18 }}
              speed={{ x: 0.9, y: 1.1 }}
              className="top-1/2 right-1/4"
            >
              <Star className="w-12 h-12 text-amber-300 opacity-80" style={{ transform: `rotate(${time * 20}deg)` }} />
            </FloatingElement>
          </div>
        </div>

        {/* Collage-Style Feature Section */}
        <FeaturesCollage time={time} />

        {/* Interactive Neural Experience Section */}
        <InteractiveNeuralSection time={time} mousePosition={mousePosition} />
      </section>
    </AudioSection>
  )
}

/**
 * FeaturesCollage - Collage-style features subsection
 */
function FeaturesCollage({ time }: { time: number }) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl"
        style={{
          clipPath: `polygon(0 ${10 + Math.sin(time) * 5}%, 100% 0%, 100% ${90 + Math.cos(time) * 5}%, 0% 100%)`,
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Large Feature */}
          <div
            className="col-span-12 md:col-span-7"
            style={{
              transform: `translate(${Math.sin(time * 0.6) * 10}px, ${Math.cos(time * 0.4) * 8}px) rotate(${Math.sin(time * 0.3) * 1}deg)`,
            }}
          >
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-[4rem] p-12 shadow-2xl border border-orange-200/50">
              <Zap className="w-16 h-16 text-orange-600 mb-6" />
              <h3 className="text-4xl font-bold mb-4 text-balance">Neural Depth Revolution</h3>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Experience interfaces that breathe, respond, and evolve with your every interaction
              </p>
            </div>
          </div>

          {/* Stacked Small Features */}
          <div className="col-span-12 md:col-span-5 space-y-6">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-6 text-white transform rotate-2"
              style={{
                transform: `rotate(${2 + Math.sin(time * 0.8) * 2}deg) translate(${Math.cos(time) * 5}px, ${Math.sin(time * 1.1) * 3}px)`,
              }}
            >
              <Sparkles className="w-8 h-8 mb-3" />
              <h4 className="text-xl font-semibold mb-2">Motion Poetry</h4>
              <p className="text-sm opacity-90">Every scroll tells a story</p>
            </div>

            <div
              className="bg-white rounded-3xl p-6 shadow-lg transform -rotate-1"
              style={{
                transform: `rotate(${-1 + Math.cos(time * 0.7) * 1.5}deg) translate(${-Math.sin(time * 0.9) * 8}px, ${Math.cos(time * 0.6) * 4}px)`,
              }}
            >
              <ArrowRight className="w-8 h-8 text-orange-600 mb-3" />
              <h4 className="text-xl font-semibold mb-2">Parallax Dreams</h4>
              <p className="text-sm text-muted-foreground">Beyond traditional scrolling</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * InteractiveNeuralSection - Interactive neural experience
 */
function InteractiveNeuralSection({
  time,
  mousePosition,
}: {
  time: number
  mousePosition: { x: number; y: number }
}) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(${45 + Math.sin(time) * 10}deg, rgba(251, 191, 36, 0.1) 0%, rgba(239, 68, 68, 0.1) 50%, rgba(194, 65, 12, 0.1) 100%)`,
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-20">
          <h2
            className="text-7xl font-black text-balance leading-none"
            style={{
              transform: `rotate(${Math.sin(time * 0.5) * 3}deg)`,
            }}
          >
            <span className="block text-orange-600">Interactive</span>
            <span className="block transform rotate-1 ml-8">Neural</span>
            <span className="block transform -rotate-2 -ml-4 bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            className="relative group cursor-none"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
            }}
          >
            {/* Floating cursor follower */}
            <div
              className="absolute w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full pointer-events-none z-20 transition-all duration-100"
              style={{
                left: mousePosition.x * 0.02,
                top: mousePosition.y * 0.02,
                transform: `scale(${1 + Math.sin(time * 2) * 0.2})`,
              }}
            />

            <div className="bg-gradient-to-br from-white via-amber-50 to-orange-100 rounded-[5rem] p-16 shadow-2xl border border-orange-200/30">
              <div
                className="text-center"
                style={{
                  transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
                }}
              >
                <div className="text-8xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent mb-8">
                  Neural Magic
                </div>
                <p className="text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Move your cursor to feel the organic response of neural depth in action
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
