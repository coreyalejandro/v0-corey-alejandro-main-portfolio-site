"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, Github, Eye, Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectsPage() {
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.01), 16)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      clearInterval(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const projects = [
    {
      title: "Neural Commerce",
      description:
        "E-commerce platform that reads your mind before you know what you want. Features soul-reading AI, quantum UX patterns, and an empathy engine that creates personalized shopping experiences.",
      image: "/modern-ecommerce-interface.png",
      tags: ["Soul-Reading AI", "Quantum UX", "Empathy Engine"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Depth Analytics",
      description:
        "Data visualization that dances, numbers that sing, insights that whisper secrets. Transform boring spreadsheets into living, breathing art installations.",
      image: "/data-analytics-dashboard.png",
      tags: ["Living Data", "Emotional Analytics", "Synesthetic Viz"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Motion Studio",
      description:
        "Where pixels fall in love and animations have feelings. A creative playground for building interfaces with emotional depth and organic motion.",
      image: "/creative-agency-website.png",
      tags: ["Emotional Motion", "Sentient UI", "Love-Driven Design"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Living background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${30 + Math.sin(time) * 20}% ${50 + Math.cos(time * 0.7) * 15}%, rgba(251, 191, 36, 0.6) 0%, transparent 40%),
            radial-gradient(circle at ${70 + Math.cos(time * 0.5) * 25}% ${30 + Math.sin(time * 0.8) * 20}%, rgba(239, 68, 68, 0.5) 0%, transparent 45%)
          `,
          transform: `rotate(${time * 2}deg) scale(${1 + Math.sin(time) * 0.05})`,
        }}
      />

      <div className="relative container mx-auto px-8 py-16">
        {/* Back button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 text-orange-700 hover:bg-orange-100"
            style={{
              transform: `translate(${Math.sin(time * 0.6) * 5}px, ${Math.cos(time * 0.4) * 3}px)`,
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-20">
          <h1
            className="text-8xl font-black text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-amber-700 bg-clip-text mb-6"
            style={{
              transform: `rotate(${Math.sin(time * 0.3) * 2}deg)`,
            }}
          >
            CREATIVE PROJECTS
          </h1>
          <p className="text-2xl text-orange-800 max-w-3xl mx-auto text-pretty">
            A collection of joyful rebellions against boring design
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="group overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              style={{
                transform: `rotate(${Math.sin(time * 0.2 + i) * 1}deg) translateY(${Math.sin(time * 0.3 + i) * 5}px)`,
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-400 text-black font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <CardContent className="p-8">
                <h3 className="text-3xl font-black mb-4 text-orange-800">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <Badge key={j} variant="secondary" className="bg-orange-100 text-orange-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 100) + 20}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-32">
          <h2
            className="text-6xl font-black text-orange-800 mb-8"
            style={{
              transform: `rotate(${Math.sin(time * 0.4) * 2}deg)`,
            }}
          >
            Want to Create Together?
          </h2>
          <Link href="/contact">
            <Button
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300"
              style={{
                transform: `rotate(${Math.cos(time * 0.5) * 1}deg)`,
              }}
            >
              <Heart className="w-6 h-6 mr-3" />
              Let's Make Magic
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
