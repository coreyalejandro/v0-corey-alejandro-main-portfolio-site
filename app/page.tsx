"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Heart,
  Star,
  Eye,
  Waves,
  Palette,
  Layers,
  Orbit,
  Target,
  Github,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProjectModal } from "@/components/project-modal"
import { projects as projectsData } from "@/config/projects"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const [email, setEmail] = useState("")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (projectId: string) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

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

  const projects = [
    {
      id: "creative-chaos",
      title: "Neural Commerce",
      description: "E-commerce platform that reads your mind before you know what you want",
      image: "/modern-ecommerce-interface.png",
      tags: ["Soul-Reading AI", "Quantum UX", "Empathy Engine"],
      gradient: "from-orange-600 via-red-500 to-pink-600",
      size: "large",
      rotation: -8,
      position: { x: 10, y: 20 },
    },
    {
      id: "neural-depth-scroll",
      title: "Depth Analytics",
      description: "Data that dances, numbers that sing, insights that whisper secrets",
      image: "/data-analytics-dashboard.png",
      tags: ["Living Data", "Emotional Analytics", "Synesthetic Viz"],
      gradient: "from-amber-700 via-orange-600 to-red-700",
      size: "medium",
      rotation: 12,
      position: { x: 60, y: 5 },
    },
    {
      id: "creative-chaos",
      title: "Motion Studio",
      description: "Where pixels fall in love and animations have feelings",
      image: "/creative-agency-website.png",
      tags: ["Emotional Motion", "Sentient UI", "Love-Driven Design"],
      gradient: "from-red-800 via-orange-700 to-amber-600",
      size: "small",
      rotation: -15,
      position: { x: 75, y: 45 },
    },
    {
      id: "neural-depth-scroll",
      title: "Chaos Symphony",
      description: "Beautiful disorder that somehow makes perfect sense",
      tags: ["Organized Chaos", "Intuitive Madness", "Joyful Rebellion"],
      gradient: "from-orange-500 via-red-600 to-purple-700",
      size: "medium",
      rotation: 25,
      position: { x: 15, y: 65 },
    },
    {
      id: "creative-chaos",
      title: "Whisper Interface",
      description: "UI so subtle it communicates through telepathy",
      tags: ["Invisible Design", "Psychic UX", "Mindful Interaction"],
      gradient: "from-amber-600 via-orange-500 to-red-500",
      size: "large",
      rotation: -5,
      position: { x: 45, y: 80 },
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AudioSection
        id="hero"
        title="Hero Section - Neural Depth Magic"
        description="Experience the Creative Chaos design philosophy. Living gradients, organic motion, and joyful interactions that breathe with every scroll."
        position={{ x: 0, y: 0, z: -5 }}
      >
        <section className="relative min-h-screen rounded-3xl mb-8">
          {/* Breathing, Living Background */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `
                radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%, 
                  rgba(251, 191, 36, 0.8) 0%, 
                  rgba(239, 68, 68, 0.6) 30%, 
                  rgba(194, 65, 12, 0.9) 70%, 
                  rgba(120, 53, 15, 1) 100%),
                radial-gradient(ellipse at ${80 + Math.cos(time * 1.2) * 8}% ${70 + Math.sin(time * 0.9) * 12}%, 
                  rgba(251, 146, 60, 0.7) 0%, 
                  transparent 50%)
              `,
              transform: `scale(${1 + Math.sin(time * 0.5) * 0.05}) rotate(${Math.sin(time * 0.3) * 2}deg)`,
            }}
          />

          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + ((i * 7) % 80)}%`,
                  top: `${15 + ((i * 11) % 70)}%`,
                  transform: `
                    translate(
                      ${Math.sin(time + i) * 54 + mousePosition.x * 0.018}px,
                      ${Math.cos(time * 0.8 + i) * 36 + mousePosition.y * 0.014}px
                    ) 
                    rotate(${time * 18 + i * 45}deg)
                    scale(${0.5 + Math.sin(time + i) * 0.5})
                  `,
                }}
              >
                <div className={`w-${3 + (i % 4)} h-${3 + (i % 4)} rounded-full bg-white/20 backdrop-blur-sm`} />
              </div>
            ))}
          </div>

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
              <div
                className="absolute bottom-32 left-1/4"
                style={{
                  transform: `translate(${Math.sin(time * 1.2) * 20}px, ${Math.cos(time) * 15}px)`,
                }}
              >
                <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>

              <div
                className="absolute top-1/2 right-1/4"
                style={{
                  transform: `translate(${-Math.cos(time * 0.9) * 25}px, ${Math.sin(time * 1.1) * 18}px) rotate(${time * 20}deg)`,
                }}
              >
                <Star className="w-12 h-12 text-amber-300 opacity-80" />
              </div>
            </div>
          </div>

          {/* Collage-Style Feature Section */}
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

          <section className="py-32 relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `
                  linear-gradient(${45 + Math.sin(time) * 10}deg, 
                    rgba(251, 191, 36, 0.1) 0%, 
                    rgba(239, 68, 68, 0.1) 50%, 
                    rgba(194, 65, 12, 0.1) 100%)
                `,
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
        </section>
      </AudioSection>

      <AudioSection
        id="landing"
        title="Build the Future"
        description="Revolutionary design featuring neural depth motion, organic parallax, and joyful interactions. Join the movement to create interfaces that users fall in love with."
        position={{ x: 0, y: 2, z: -6 }}
      >
        <section className="relative min-h-screen mb-8">
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

          <section className="py-20 relative overflow-hidden">
            {" "}
            {/* Reduced padding from py-32 to py-20 to make CTA section shorter */}
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
                            Interfaces that see, feel, and respond to human emotion through advanced depth perception
                            and organic motion
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
                <div className="relative" style={{ minHeight: "600px" }}>
                  {" "}
                  {/* Increased container height to give more space for cards */}
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

          <section className="relative py-32 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-amber-600/20"
              style={{ transform: `rotate(${time * 0.5}deg) scale(${1.2 + Math.sin(time) * 0.1})` }}
            />

            <div className="relative text-center mb-20">
              <h2
                className="text-8xl font-black text-transparent bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text"
                style={{ transform: `rotate(${Math.sin(time * 0.3) * 3}deg)` }}
              >
                SUPERPOWERS
              </h2>
            </div>

            <div className="relative max-w-6xl mx-auto h-96">
              {[
                { name: "Neural Motion", level: 95, icon: Zap, position: { x: 20, y: 30 } },
                { name: "Chaos Design", level: 98, icon: Palette, position: { x: 70, y: 20 } },
                { name: "Joy Engineering", level: 92, icon: Sparkles, position: { x: 60, y: 70 } },
                { name: "Reality Bending", level: 89, icon: Target, position: { x: 15, y: 80 } },
                { name: "Soul Coding", level: 94, icon: Star, position: { x: 80, y: 50 } },
              ].map((skill, i) => (
                <div
                  key={i}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${skill.position.x}%`,
                    top: `${skill.position.y}%`,
                    transform: `
                      translate(-50%, -50%) 
                      rotate(${Math.sin(time * 0.4 + i) * 10}deg)
                      scale(${1 + Math.sin(time * 0.6 + i) * 0.1})
                    `,
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-orange-300/30 p-6 text-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                    <skill.icon
                      className="w-12 h-12 mx-auto mb-4 text-orange-600"
                      style={{ transform: `rotate(${time * 20 + i * 45}deg)` }}
                    />
                    <div className="text-orange-800 font-bold text-lg">{skill.name}</div>
                    <div className="text-3xl font-black text-red-600 mt-2">{skill.level}%</div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section className="relative py-32 text-center">
            <div
              className="max-w-4xl mx-auto space-y-12"
              style={{ transform: `translateY(${Math.sin(time * 0.5) * 20}px)` }}
            >
              <h2
                className="text-9xl font-black text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text leading-none"
                style={{ transform: `rotate(${Math.sin(time * 0.2) * 2}deg)` }}
              >
                LET'S CREATE
                <br />
                <span className="text-7xl" style={{ transform: `rotate(${Math.cos(time * 0.3) * -3}deg)` }}>
                  MAGIC TOGETHER
                </span>
              </h2>

              <p
                className="text-2xl text-orange-800 font-medium max-w-2xl mx-auto leading-relaxed"
                style={{ transform: `rotate(${Math.sin(time * 0.4) * 1}deg)` }}
              >
                Ready to break every rule and create something that makes people's hearts skip a beat?
              </p>

              <div
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                style={{ transform: `translateY(${Math.cos(time * 0.7) * 10}px)` }}
              >
                <Link href="/contact">
                  <AudioButton
                    description="Start the chaos - Begin your creative journey"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 inline-flex items-center"
                    style={{ transform: `rotate(${Math.sin(time * 0.8) * 3}deg)` }}
                  >
                    <Orbit className="w-6 h-6 mr-3" />
                    Start the Chaos
                  </AudioButton>
                </Link>
                <Link href="https://github.com">
                  <AudioButton
                    description="See my soul - Explore my creative code"
                    className="border-2 border-orange-400 text-orange-700 hover:bg-orange-100 font-bold text-xl px-12 py-6 rounded-full backdrop-blur-sm bg-white/30 inline-flex items-center"
                    style={{ transform: `rotate(${Math.cos(time * 0.9) * -3}deg)` }}
                  >
                    <Palette className="w-6 h-6 mr-3" />
                    See My Soul
                  </AudioButton>
                </Link>
              </div>
            </div>
          </section>
        </section>
      </AudioSection>

      <AudioSection
        id="portfolio"
        title="Projects - Creative Chaos Portfolio"
        description="Explore innovative projects showcasing neural motion, chaos design, and joyful engineering. Each project breaks conventions to create memorable experiences."
        position={{ x: 0, y: 4, z: -7 }}
      >
        <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden rounded-3xl">
          <div className="relative min-h-screen flex items-center justify-center p-8">
            {/* Living background that breathes */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(circle at ${30 + Math.sin(time) * 20}% ${50 + Math.cos(time * 0.7) * 15}%, rgba(251, 191, 36, 0.6) 0%, transparent 40%),
                  radial-gradient(circle at ${70 + Math.cos(time * 0.5) * 25}% ${30 + Math.sin(time * 0.8) * 20}%, rgba(239, 68, 68, 0.5) 0%, transparent 45%),
                  radial-gradient(circle at ${50 + Math.sin(time * 1.2) * 15}% ${80 + Math.cos(time * 0.9) * 10}%, rgba(245, 101, 101, 0.4) 0%, transparent 35%)
                `,
                transform: `rotate(${time * 2}deg) scale(${1 + Math.sin(time) * 0.1})`,
              }}
            />

            {/* Floating title that orbits around the center */}
            <div
              className="absolute text-center z-20"
              style={{
                transform: `
                  translate(${Math.sin(time * 0.3) * 100}px, ${Math.cos(time * 0.3) * 50}px) 
                  rotate(${Math.sin(time * 0.2) * 5}deg)
                `,
              }}
            >
              <h1 className="text-8xl font-black text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-amber-700 bg-clip-text drop-shadow-2xl">
                CREATIVE
              </h1>
              <div
                className="text-6xl font-light text-orange-800 mt-4"
                style={{ transform: `rotate(${Math.cos(time * 0.4) * 10}deg)` }}
              >
                CHAOS
              </div>
            </div>

            {/* Orbiting badges */}
            {["Neural Artist", "Chaos Engineer", "Joy Architect"].map((badge, i) => (
              <Badge
                key={i}
                className="absolute bg-white/20 backdrop-blur-sm border-orange-300/50 text-orange-800 font-semibold z-10"
                style={{
                  transform: `
                    translate(
                      ${200 + Math.cos(time * 0.5 + i * 2) * 150}px, 
                      ${200 + Math.sin(time * 0.5 + i * 2) * 150}px
                    ) 
                    rotate(${time * 10 + i * 45}deg)
                  `,
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {badge}
              </Badge>
            ))}

            {/* Floating action buttons */}
            <div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-6 z-20"
              style={{
                transform: `translateX(-50%) translateY(${Math.sin(time * 0.8) * 20}px)`,
              }}
            >
              <Link href="/contact">
                <AudioButton
                  description="Enter the chaos - Connect with me for collaboration"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl inline-flex items-center"
                  style={{ transform: `rotate(${Math.sin(time * 0.6) * 3}deg)` }}
                >
                  <Orbit className="w-5 h-5 mr-2" />
                  Enter the Chaos
                </AudioButton>
              </Link>
              <Link href="https://github.com">
                <AudioButton
                  description="Source magic - View the code behind the magic"
                  className="border-orange-400 text-orange-700 hover:bg-orange-100 font-semibold px-8 py-4 rounded-full backdrop-blur-sm bg-white/30 border inline-flex items-center"
                  style={{ transform: `rotate(${Math.cos(time * 0.7) * -3}deg)` }}
                >
                  <Github className="w-5 h-5 mr-2" />
                  Source Magic
                </Github>
              </Link>
            </div>
          </div>

          <section className="relative py-32 px-8">
            <div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-10"
              style={{ transform: `translateX(-50%) rotate(${Math.sin(scrollY * 0.01) * 2}deg)` }}
            >
              <h2 className="text-7xl font-black text-orange-800 mb-4">PROJECTS</h2>
              <div className="w-32 h-2 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
              {projects.map((project, i) => {
                const sizeClasses = {
                  small: "w-80 h-64",
                  medium: "w-96 h-80",
                  large: "w-[500px] h-96",
                }

                return (
                  <Card
                    key={i}
                    onClick={() => openProjectModal(project.id)}
                    className={`absolute group cursor-pointer transition-all duration-700 hover:scale-110 hover:z-30 ${sizeClasses[project.size]} shadow-2xl`}
                    style={{
                      left: `${project.position.x}%`,
                      top: `${project.position.y + i * 120}px`,
                      transform: `
                      rotate(${project.rotation + Math.sin(time * 0.3 + i) * 3}deg) 
                      translateY(${scrollY * (0.1 + i * 0.02)}px)
                      translateX(${Math.sin(time * 0.2 + i) * 10}px)
                    `,
                      zIndex: 10 + i,
                    }}
                  >
                    <div className="relative h-full overflow-hidden rounded-lg">
                      {/* Dynamic gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}
                        style={{
                          background: `
                            linear-gradient(
                              ${45 + Math.sin(time + i) * 30}deg,
                              rgba(251, 191, 36, ${0.8 + Math.sin(time * 0.5) * 0.2}),
                              rgba(239, 68, 68, ${0.7 + Math.cos(time * 0.7) * 0.2}),
                              rgba(245, 101, 101, ${0.6 + Math.sin(time * 0.9) * 0.3})
                            )
                          `,
                        }}
                      />

                      {/* Floating content */}
                      <CardContent className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Layers className="w-5 h-5" />
                            <span className="text-sm font-medium opacity-80">Project #{i + 1}</span>
                          </div>

                          <h3
                            className="text-2xl font-black mb-3 leading-tight"
                            style={{ transform: `rotate(${Math.sin(time * 0.4 + i) * 2}deg)` }}
                          >
                            {project.title}
                          </h3>

                          <p className="text-white/90 text-sm leading-relaxed mb-6">{project.description}</p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, j) => (
                              <Badge
                                key={j}
                                className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm"
                                style={{ transform: `rotate(${Math.cos(time * 0.6 + j) * 5}deg)` }}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{Math.floor(Math.random() * 100) + 20}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{Math.floor(Math.random() * 500) + 100}</span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm group/btn"
                          >
                            Explore
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-orange-600 hover:bg-white/90 font-bold">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="relative py-32 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-amber-600/20"
              style={{ transform: `rotate(${time * 0.5}deg) scale(${1.2 + Math.sin(time) * 0.1})` }}
            />

            <div className="relative text-center mb-20">
              <h2
                className="text-8xl font-black text-transparent bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text"
                style={{ transform: `rotate(${Math.sin(time * 0.3) * 3}deg)` }}
              >
                SUPERPOWERS
              </h2>
            </div>

            <div className="relative max-w-6xl mx-auto h-96">
              {[
                { name: "Neural Motion", level: 95, icon: Zap, position: { x: 20, y: 30 } },
                { name: "Chaos Design", level: 98, icon: Palette, position: { x: 70, y: 20 } },
                { name: "Joy Engineering", level: 92, icon: Sparkles, position: { x: 60, y: 70 } },
                { name: "Reality Bending", level: 89, icon: Target, position: { x: 15, y: 80 } },
                { name: "Soul Coding", level: 94, icon: Star, position: { x: 80, y: 50 } },
              ].map((skill, i) => (
                <div
                  key={i}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${skill.position.x}%`,
                    top: `${skill.position.y}%`,
                    transform: `
                      translate(-50%, -50%) 
                      rotate(${Math.sin(time * 0.4 + i) * 10}deg)
                      scale(${1 + Math.sin(time * 0.6 + i) * 0.1})
                    `,
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-orange-300/30 p-6 text-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                    <skill.icon
                      className="w-12 h-12 mx-auto mb-4 text-orange-600"
                      style={{ transform: `rotate(${time * 20 + i * 45}deg)` }}
                    />
                    <div className="text-orange-800 font-bold text-lg">{skill.name}</div>
                    <div className="text-3xl font-black text-red-600 mt-2">{skill.level}%</div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section className="relative py-32 text-center">
            <div
              className="max-w-4xl mx-auto space-y-12"
              style={{ transform: `translateY(${Math.sin(time * 0.5) * 20}px)` }}
            >
              <h2
                className="text-9xl font-black text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text leading-none"
                style={{ transform: `rotate(${Math.sin(time * 0.2) * 2}deg)` }}
              >
                LET'S CREATE
                <br />
                <span className="text-7xl" style={{ transform: `rotate(${Math.cos(time * 0.3) * -3}deg)` }}>
                  MAGIC TOGETHER
                </span>
              </h2>

              <p
                className="text-2xl text-orange-800 font-medium max-w-2xl mx-auto leading-relaxed"
                style={{ transform: `rotate(${Math.sin(time * 0.4) * 1}deg)` }}
              >
                Ready to break every rule and create something that makes people's hearts skip a beat?
              </p>

              <div
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                style={{ transform: `translateY(${Math.cos(time * 0.7) * 10}px)` }}
              >
                <Link href="/contact">
                  <AudioButton
                    description="Start the chaos - Let's create magic together"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 inline-flex items-center"
                    style={{ transform: `rotate(${Math.sin(time * 0.8) * 3}deg)` }}
                  >
                    <Orbit className="w-6 h-6 mr-3" />
                    Start the Chaos
                  </AudioButton>
                </Link>
                <Link href="https://github.com">
                  <AudioButton
                    description="See my soul - Explore my creative code"
                    className="border-2 border-orange-400 text-orange-700 hover:bg-orange-100 font-bold text-xl px-12 py-6 rounded-full backdrop-blur-sm bg-white/30 inline-flex items-center"
                    style={{ transform: `rotate(${Math.cos(time * 0.9) * -3}deg)` }}
                  >
                    <Palette className="w-6 h-6 mr-3" />
                    See My Soul
                  </AudioButton>
                </Link>
              </div>
            </div>
          </section>
        </section>
      </AudioSection>
    </div>
  )
}
