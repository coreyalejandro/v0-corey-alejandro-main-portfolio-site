"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ArrowRight, Star, Eye, Waves, Palette, Zap, Sparkles, Orbit } from "lucide-react"
import Link from "next/link"
import { useAnimation } from "@/hooks/useAnimation"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"
import { BreathingBackground } from "@/components/animations/BreathingBackground"

/**
 * CTASection - "Build the Future" CTA section
 *
 * Features:
 * - Living conic gradient background
 * - Email signup form
 * - Floating stats
 * - Feature cards in magazine layout
 * - Superpowers section
 * - Final CTA
 */
export function CTASection() {
  const { time, mousePosition } = useAnimation()
  const [email, setEmail] = useState("")

  return (
    <AudioSection
      id="landing"
      title="Build the Future"
      description="Revolutionary design featuring neural depth motion, organic parallax, and joyful interactions."
      position={{ x: 0, y: 2, z: -6 }}
    >
      <section className="relative min-h-screen mb-16">
        {/* Living, breathing background */}
        <BreathingBackground time={time} variant="cta" />

        <div className="relative h-screen">
          {/* Main Title */}
          <div
            className="absolute left-4 top-16 md:left-12 md:top-24"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.01}px) rotate(${Math.sin(time * 0.6) * 2}deg)`,
            }}
          >
            <div className="space-y-2">
              <div className="text-sm font-bold text-white/80 tracking-widest uppercase">Revolutionary Design</div>
              <h1 className="text-7xl md:text-8xl font-black text-white leading-none">
                <span className="block transform rotate-1">Build</span>
                <span className="block transform -rotate-2 ml-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  the
                </span>
                <span className="block transform rotate-1 ml-4 text-6xl">Future</span>
              </h1>
            </div>
          </div>

          {/* Floating description box */}
          <div
            className="absolute right-8 top-1/3 max-w-sm md:right-16"
            style={{
              transform: `translate(${-mousePosition.x * 0.02}px, ${mousePosition.y * 0.015}px) rotate(${Math.sin(time * 0.8) * 1.5}deg)`,
            }}
          >
            <div className="bg-white/15 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20 shadow-2xl">
              <p className="text-lg text-white/95 text-pretty leading-relaxed mb-6">
                Experience neural depth motion, organic parallax, and joyful interactions that make users fall in love
              </p>
              <div className="flex gap-3">
                <Link href="/contact">
                  <AudioButton
                    description="Start creating with the Creative Chaos design system"
                    className="bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full px-6 py-3 inline-flex items-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Start Creating
                  </AudioButton>
                </Link>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div
            className="absolute bottom-32 left-8 md:left-16"
            style={{
              transform: `translate(${Math.sin(time * 0.9) * 15}px, ${Math.cos(time * 0.7) * 10}px) rotate(${Math.sin(time * 0.4) * 1}deg)`,
            }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md">
              <div className="text-white/90 mb-4 font-medium">Join the revolution</div>
              <div className="flex gap-3">
                <Input
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                />
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 rounded-xl">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div
            className="absolute top-1/2 left-1/3"
            style={{
              transform: `translate(${Math.cos(time * 1.3) * 20}px, ${Math.sin(time * 0.8) * 15}px)`,
            }}
          >
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full w-20 h-20 flex flex-col items-center justify-center text-white text-center">
              <div className="text-xl font-bold">4.9</div>
              <div className="text-xs">rating</div>
            </div>
          </div>

          <div
            className="absolute bottom-1/4 right-1/3"
            style={{
              transform: `translate(${-Math.sin(time * 1.1) * 25}px, ${Math.cos(time * 0.9) * 18}px) rotate(${time * 15}deg)`,
            }}
          >
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-amber-300 text-amber-300" />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <FeatureCards time={time} />

        {/* Superpowers Section */}
        <SuperpowersSection time={time} />

        {/* Final CTA */}
        <FinalCTA time={time} />
      </section>
    </AudioSection>
  )
}

function FeatureCards({ time }: { time: number }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${135 + Math.sin(time * 0.5) * 15}deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))`,
          clipPath: `polygon(0 ${5 + Math.sin(time * 0.3) * 3}%, 100% 0%, 100% ${95 + Math.cos(time * 0.4) * 3}%, 0% 100%)`,
          opacity: 0.1,
          transition: "background 3s ease-in-out",
        }}
      />
      <div className="relative container mx-auto px-4">
        <div className="space-y-24">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div
              className="col-span-12 md:col-span-8"
              style={{
                transform: `translate(${Math.sin(time * 0.6) * 12}px, ${Math.cos(time * 0.4) * 8}px) rotate(${Math.sin(time * 0.3) * 0.5}deg)`,
              }}
            >
              <div
                className="rounded-[3rem] p-12 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--theme-card), var(--theme-primary))",
                  borderColor: "var(--theme-border)",
                  border: "1px solid",
                  transition: "all 3s ease-in-out",
                }}
              >
                <div className="flex items-start space-x-6">
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))",
                      transition: "background 3s ease-in-out",
                    }}
                  >
                    <Eye className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-4xl font-black mb-4"
                      style={{
                        color: "var(--theme-text)",
                        transition: "color 3s ease-in-out",
                      }}
                    >
                      Neural Depth Vision
                    </h3>
                    <p className="text-xl text-muted-foreground text-pretty leading-relaxed mb-6">
                      Interfaces that see, feel, and respond to human emotion
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--theme-card)",
                          color: "var(--theme-text)",
                          transition: "all 3s ease-in-out",
                        }}
                      >
                        Real-time depth
                      </span>
                      <span
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--theme-card)",
                          color: "var(--theme-text)",
                          transition: "all 3s ease-in-out",
                        }}
                      >
                        Emotion detection
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <div
                className="space-y-6"
                style={{
                  transform: `translate(${-Math.cos(time * 0.7) * 8}px, ${Math.sin(time * 0.5) * 6}px)`,
                }}
              >
                <div
                  className="rounded-2xl p-6 text-white transform rotate-2"
                  style={{
                    background: "linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))",
                    transition: "background 3s ease-in-out",
                  }}
                >
                  <Waves className="w-8 h-8 mb-3" />
                  <h4 className="text-xl font-bold mb-2">Fluid Motion</h4>
                  <p className="text-sm opacity-90">Every interaction flows</p>
                </div>
                <div
                  className="rounded-2xl p-6 shadow-lg transform -rotate-1"
                  style={{
                    backgroundColor: "var(--theme-card)",
                    color: "var(--theme-text)",
                    transition: "all 3s ease-in-out",
                  }}
                >
                  <Palette
                    className="w-8 h-8 mb-3"
                    style={{
                      color: "var(--theme-accent)",
                      transition: "color 3s ease-in-out",
                    }}
                  />
                  <h4 className="text-xl font-bold mb-2">Living Colors</h4>
                  <p className="text-sm text-muted-foreground">Gradients that breathe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SuperpowersSection({ time }: { time: number }) {
  const skills = [
    { name: "Neural Motion", level: 95, icon: Zap, position: { x: 20, y: 30 } },
    { name: "Chaos Design", level: 98, icon: Palette, position: { x: 70, y: 20 } },
    { name: "Joy Engineering", level: 92, icon: Sparkles, position: { x: 60, y: 70 } },
    { name: "Reality Bending", level: 89, icon: Orbit, position: { x: 15, y: 80 } },
    { name: "Soul Coding", level: 94, icon: Star, position: { x: 80, y: 50 } },
  ]

  return (
    <section id="superpowers" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
          opacity: 0.2,
          transform: `rotate(${time * 0.5}deg) scale(${1.2 + Math.sin(time) * 0.1})`,
          transition: "background 3s ease-in-out",
        }}
      />

      <div className="relative container mx-auto px-4 text-center mb-20 z-10">
        <h2
          className="text-6xl md:text-8xl font-black"
          style={{
            background: "linear-gradient(90deg, var(--theme-accent), var(--theme-text))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: `rotate(${Math.sin(time * 0.3) * 3}deg)`,
            transition: "background 3s ease-in-out",
          }}
        >
          SUPERPOWERS
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto h-96">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="absolute group cursor-pointer"
            style={{
              left: `${skill.position.x}%`,
              top: `${skill.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${Math.sin(time * 0.4 + i) * 10}deg) scale(${1 + Math.sin(time * 0.6 + i) * 0.1})`,
            }}
          >
            <div
              className="backdrop-blur-sm rounded-2xl p-6 text-center group-hover:scale-125 transition-all duration-500 shadow-2xl"
              style={{
                backgroundColor: "var(--theme-card)",
                borderColor: "var(--theme-border)",
                border: "1px solid",
                transition: "all 3s ease-in-out",
              }}
            >
              <skill.icon
                className="w-12 h-12 mx-auto mb-4"
                style={{
                  transform: `rotate(${time * 20 + i * 45}deg)`,
                  color: "var(--theme-accent)",
                  transition: "color 3s ease-in-out",
                }}
              />
              <div
                className="font-bold text-lg"
                style={{
                  color: "var(--theme-text)",
                  transition: "color 3s ease-in-out",
                }}
              >
                {skill.name}
              </div>
              <div
                className="text-3xl font-black mt-2"
                style={{
                  color: "var(--theme-accent)",
                  transition: "color 3s ease-in-out",
                }}
              >
                {skill.level}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCTA({ time }: { time: number }) {
  return (
    <section className="relative py-32 text-center">
      <div className="max-w-4xl mx-auto space-y-12" style={{ transform: `translateY(${Math.sin(time * 0.5) * 20}px)` }}>
        <h2
          className="text-9xl font-black leading-none"
          style={{
            background: "linear-gradient(90deg, var(--theme-accent), var(--theme-secondary), var(--theme-accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: `rotate(${Math.sin(time * 0.2) * 2}deg)`,
            transition: "background 3s ease-in-out",
          }}
        >
          LET'S CREATE
          <br />
          <span className="text-7xl">MAGIC TOGETHER</span>
        </h2>

        <div
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          style={{ transform: `translateY(${Math.cos(time * 0.7) * 10}px)` }}
        >
          <Link href="/contact">
            <AudioButton
              description="Start the chaos - Begin your journey"
              className="text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl inline-flex items-center"
              style={{
                background: "linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))",
                transition: "background 3s ease-in-out",
              }}
            >
              <Orbit className="w-6 h-6 mr-3" />
              Start the Chaos
            </AudioButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
