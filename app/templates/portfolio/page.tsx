"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ExternalLink,
  Github,
  Eye,
  Heart,
  Star,
  Sparkles,
  Zap,
  Target,
  Palette,
  Layers,
  Orbit,
} from "lucide-react"

export default function PortfolioTemplate() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const timer = setInterval(() => setTime((prev) => prev + 0.01), 16)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  const projects = [
    {
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
      title: "Chaos Symphony",
      description: "Beautiful disorder that somehow makes perfect sense",
      tags: ["Organized Chaos", "Intuitive Madness", "Joyful Rebellion"],
      gradient: "from-orange-500 via-red-600 to-purple-700",
      size: "medium",
      rotation: 25,
      position: { x: 15, y: 65 },
    },
    {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
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
            <Button
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl"
              style={{ transform: `rotate(${Math.sin(time * 0.6) * 3}deg)` }}
            >
              <Orbit className="w-5 h-5 mr-2" />
              Enter the Chaos
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              variant="outline"
              className="border-orange-400 text-orange-700 hover:bg-orange-100 font-semibold px-8 py-4 rounded-full backdrop-blur-sm bg-white/30"
              style={{ transform: `rotate(${Math.cos(time * 0.7) * -3}deg)` }}
            >
              <Github className="w-5 h-5 mr-2" />
              Source Magic
            </Button>
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

                      <Link href="/projects">
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm group/btn"
                        >
                          Explore
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/projects">
                      <Button className="bg-white text-orange-600 hover:bg-white/90 font-bold">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Launch Project
                      </Button>
                    </Link>
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
              <Button
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
                style={{ transform: `rotate(${Math.sin(time * 0.8) * 3}deg)` }}
              >
                <Orbit className="w-6 h-6 mr-3" />
                Start the Chaos
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-2 border-orange-400 text-orange-700 hover:bg-orange-100 font-bold text-xl px-12 py-6 rounded-full backdrop-blur-sm bg-white/30"
                style={{ transform: `rotate(${Math.cos(time * 0.9) * -3}deg)` }}
              >
                <Palette className="w-6 h-6 mr-3" />
                See My Soul
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
