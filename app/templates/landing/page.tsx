"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { ArrowRight, Star, Heart, Zap, Sparkles, Eye, Waves, Palette } from "lucide-react"
import Link from "next/link"

export default function LandingTemplate() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="relative min-h-screen">
        {/* Living, breathing background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from ${time * 20}deg at ${30 + Math.sin(time) * 10}% ${40 + Math.cos(time * 0.7) * 15}%, 
                rgba(251, 191, 36, 0.9) 0deg,
                rgba(239, 68, 68, 0.8) 90deg,
                rgba(194, 65, 12, 0.9) 180deg,
                rgba(251, 146, 60, 0.7) 270deg,
                rgba(251, 191, 36, 0.9) 360deg),
              radial-gradient(ellipse at ${70 + Math.cos(time * 1.1) * 8}% ${60 + Math.sin(time * 0.9) * 12}%, 
                rgba(255, 255, 255, 0.1) 0%, 
                transparent 60%)
            `,
            transform: `scale(${1 + Math.sin(time * 0.3) * 0.03}) rotate(${Math.cos(time * 0.2) * 1}deg)`,
          }}
        />

        <div className="relative h-screen">
          {/* Main Title - Positioned like a magazine cover */}
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
                with your interface
              </p>
              <div className="flex gap-3">
                <Link href="/contact">
                  <Button className="bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full px-6">
                    <Heart className="w-4 h-4 mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Email signup - positioned organically */}
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
      </div>

      <div className="relative">
        <section className="py-32 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(${135 + Math.sin(time * 0.5) * 15}deg, 
                  rgba(251, 191, 36, 0.05) 0%, 
                  rgba(239, 68, 68, 0.08) 50%, 
                  rgba(194, 65, 12, 0.05) 100%)
              `,
              clipPath: `polygon(0 ${5 + Math.sin(time * 0.3) * 3}%, 100% 0%, 100% ${95 + Math.cos(time * 0.4) * 3}%, 0% 100%)`,
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="space-y-24">
              {/* Feature 1 - Large, dominant */}
              <div className="grid grid-cols-12 gap-8 items-center">
                <div
                  className="col-span-12 md:col-span-8"
                  style={{
                    transform: `translate(${Math.sin(time * 0.6) * 12}px, ${Math.cos(time * 0.4) * 8}px) rotate(${Math.sin(time * 0.3) * 0.5}deg)`,
                  }}
                >
                  <div className="bg-gradient-to-br from-white via-amber-50 to-orange-100 rounded-[3rem] p-12 shadow-2xl border border-orange-200/30">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4">
                        <Eye className="w-12 h-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-4xl font-black mb-4 text-balance">Neural Depth Vision</h3>
                        <p className="text-xl text-muted-foreground text-pretty leading-relaxed mb-6">
                          Interfaces that see, feel, and respond to human emotion through advanced depth perception and
                          organic motion
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                            Real-time depth
                          </span>
                          <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                            Emotion detection
                          </span>
                          <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                            Organic response
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
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white transform rotate-2">
                      <Waves className="w-8 h-8 mb-3" />
                      <h4 className="text-xl font-bold mb-2">Fluid Motion</h4>
                      <p className="text-sm opacity-90">Every interaction flows like water</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1">
                      <Palette className="w-8 h-8 text-orange-600 mb-3" />
                      <h4 className="text-xl font-bold mb-2">Living Colors</h4>
                      <p className="text-sm text-muted-foreground">Gradients that breathe and evolve</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Scattered, magazine style */}
              <div className="relative">
                <div
                  className="absolute left-0 top-0 max-w-md"
                  style={{
                    transform: `translate(${Math.sin(time * 0.8) * 15}px, ${Math.cos(time * 0.6) * 10}px) rotate(${Math.sin(time * 0.4) * 2}deg)`,
                  }}
                >
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2rem] p-8 text-white shadow-2xl">
                    <Sparkles className="w-12 h-12 mb-4" />
                    <h3 className="text-3xl font-black mb-3">Joyful Interactions</h3>
                    <p className="text-white/90 text-pretty">
                      Every click, hover, and scroll brings delight through carefully crafted micro-animations
                    </p>
                  </div>
                </div>

                <div
                  className="absolute right-0 top-12 max-w-sm"
                  style={{
                    transform: `translate(${-Math.cos(time * 0.9) * 12}px, ${Math.sin(time * 0.7) * 8}px) rotate(${-Math.sin(time * 0.5) * 1.5}deg)`,
                  }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-200/50">
                    <Zap className="w-10 h-10 text-orange-600 mb-4" />
                    <h4 className="text-2xl font-bold mb-3">Lightning Fast</h4>
                    <p className="text-muted-foreground">Optimized for performance without sacrificing beauty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${40 + Math.sin(time * 0.6) * 15}% ${60 + Math.cos(time * 0.8) * 20}%, 
                  rgba(251, 191, 36, 0.9) 0%, 
                  rgba(239, 68, 68, 0.8) 40%, 
                  rgba(194, 65, 12, 0.9) 100%)
              `,
              transform: `scale(${1 + Math.sin(time * 0.4) * 0.02}) rotate(${Math.cos(time * 0.3) * 0.5}deg)`,
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div
                className="col-span-12 md:col-span-7"
                style={{
                  transform: `translate(${Math.sin(time * 0.5) * 10}px, ${Math.cos(time * 0.7) * 8}px) rotate(${Math.sin(time * 0.3) * 1}deg)`,
                }}
              >
                <div className="space-y-8">
                  <h2 className="text-6xl font-black text-white leading-none">
                    <span className="block transform rotate-1">Ready to</span>
                    <span className="block transform -rotate-1 ml-8">Create</span>
                    <span className="block transform rotate-1 ml-4 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                      Magic?
                    </span>
                  </h2>
                  <p className="text-xl text-white/90 max-w-lg text-pretty">
                    Join thousands of creators who are building the future of joyful, organic web experiences
                  </p>
                </div>
              </div>

              <div
                className="col-span-12 md:col-span-5"
                style={{
                  transform: `translate(${-Math.cos(time * 0.8) * 8}px, ${Math.sin(time * 0.6) * 6}px) rotate(${-Math.sin(time * 0.4) * 0.8}deg)`,
                }}
              >
                <div className="bg-white/15 backdrop-blur-xl rounded-[2rem] p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <Input
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl flex-1"
                      />
                      <Link href="/contact">
                        <Button className="bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl px-6">
                          <Heart className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </Link>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      No boring forms • Instant magic • Pure joy guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
