"use client"

import { useState } from "react"
import { Sparkles, Orbit, Github, Layers, Heart, Eye, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { FloatingCard } from "@/components/creative-chaos/floating-card"
import { useAnimation } from "@/hooks/useAnimation"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"
import { ProjectModal } from "@/components/project-modal"
import { projects as projectsData } from "@/config/projects"
import type { HomepageProject } from "@/types"

/**
 * PortfolioSection - Creative Chaos portfolio showcase
 */
export function PortfolioSection() {
  const { time, scrollY, mousePosition } = useAnimation()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (projectId: string) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

  // TODO: Consolidate with config/projects.ts
  const projects: HomepageProject[] = [
    {
      id: "creative-chaos",
      title: "Neural Commerce",
      description: "E-commerce platform that reads your mind",
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
      description: "Data that dances, numbers that sing",
      image: "/data-analytics-dashboard.png",
      tags: ["Living Data", "Emotional Analytics"],
      gradient: "from-amber-700 via-orange-600 to-red-700",
      size: "medium",
      rotation: 12,
      position: { x: 60, y: 5 },
    },
    {
      id: "creative-chaos",
      title: "Motion Studio",
      description: "Where pixels fall in love",
      image: "/creative-agency-website.png",
      tags: ["Emotional Motion", "Sentient UI"],
      gradient: "from-red-800 via-orange-700 to-amber-600",
      size: "small",
      rotation: -15,
      position: { x: 75, y: 45 },
    },
    {
      id: "neural-depth-scroll",
      title: "Chaos Symphony",
      description: "Beautiful disorder that makes sense",
      tags: ["Organized Chaos", "Intuitive Madness"],
      gradient: "from-orange-500 via-red-600 to-purple-700",
      size: "medium",
      rotation: 25,
      position: { x: 15, y: 65 },
    },
    {
      id: "creative-chaos",
      title: "Whisper Interface",
      description: "UI so subtle it communicates telepathically",
      tags: ["Invisible Design", "Psychic UX"],
      gradient: "from-amber-600 via-orange-500 to-red-500",
      size: "large",
      rotation: -5,
      position: { x: 45, y: 80 },
    },
  ]

  return (
    <AudioSection
      title="Projects - Creative Chaos Portfolio"
      description="Explore innovative projects showcasing neural motion and chaos design."
      position={{ x: 0, y: 4, z: -7 }}
    >
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section
        id="projects"
        className="relative rounded-3xl mb-16 overflow-visible"
        style={{
          background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
          transition: "background 3s ease-in-out",
        }}
      >
        <div className="relative min-h-screen flex items-center justify-center p-8">
          {/* Living background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at ${30 + Math.sin(time) * 20}% ${50 + Math.cos(time * 0.7) * 15}%, var(--theme-accent) 0%, transparent 40%),
                radial-gradient(circle at ${70 + Math.cos(time * 0.5) * 25}% ${30 + Math.sin(time * 0.8) * 20}%, var(--theme-secondary) 0%, transparent 45%)
              `,
              transform: `rotate(${time * 2}deg) scale(${1 + Math.sin(time) * 0.1})`,
              transition: "background 3s ease-in-out",
            }}
          />

          {/* Floating title */}
          <div
            className="absolute text-center z-20"
            style={{
              transform: `translate(${Math.sin(time * 0.3) * 100}px, ${Math.cos(time * 0.3) * 50}px) rotate(${Math.sin(time * 0.2) * 5}deg)`,
            }}
          >
            <h1 className="text-8xl font-black drop-shadow-2xl bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
              CREATIVE
            </h1>
            <h1
              className="text-8xl font-black mt-4 drop-shadow-2xl bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent"
              style={{
                transform: `rotate(${Math.cos(time * 0.4) * 10}deg)`,
              }}
            >
              CHAOS
            </h1>
          </div>

          {/* Orbiting badges */}
          {["Neural Artist", "Chaos Engineer", "Joy Architect"].map((badge, i) => (
            <div
              key={i}
              className="absolute backdrop-blur-sm font-semibold z-10"
              style={{
                backgroundColor: "var(--theme-card)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-text)",
                transform: `translate(${200 + Math.cos(time * 0.5 + i * 2) * 150}px, ${200 + Math.sin(time * 0.5 + i * 2) * 150}px) rotate(${time * 10 + i * 45}deg)`,
                transition: "background-color 3s ease-in-out, border-color 3s ease-in-out, color 3s ease-in-out",
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {badge}
            </div>
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
                description="Enter the chaos - Connect for collaboration"
                className="text-white font-bold px-8 py-4 rounded-full shadow-2xl inline-flex items-center"
                style={{
                  background: "linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))",
                  transition: "background 3s ease-in-out",
                }}
              >
                <Orbit className="w-5 h-5 mr-2" />
                Enter the Chaos
              </AudioButton>
            </Link>
            <Link href="https://github.com">
              <AudioButton
                description="Source magic - View the code"
                className="font-semibold px-8 py-4 rounded-full backdrop-blur-sm border inline-flex items-center"
                style={{
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-text)",
                  backgroundColor: "var(--theme-card)",
                  transition: "all 3s ease-in-out",
                }}
              >
                <Github className="w-5 h-5 mr-2" />
                Source Magic
              </AudioButton>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <section className="relative py-32 px-8 pb-64">
          <div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-10"
            style={{ transform: `translateX(-50%) rotate(${Math.sin(scrollY * 0.01) * 2}deg)` }}
          >
            <h2
              className="text-7xl font-black mb-4"
              style={{
                color: "var(--theme-text)",
                transition: "color 3s ease-in-out",
              }}
            >
              PROJECTS
            </h2>
            <div
              className="w-32 h-2 mx-auto rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--theme-accent), var(--theme-secondary))",
                transition: "background 3s ease-in-out",
              }}
            ></div>
          </div>

          <div className="relative max-w-7xl mx-auto" style={{ minHeight: "1400px", paddingTop: "200px" }}>
            {projects.map((project, i) => {
              const sizeClasses: Record<"small" | "medium" | "large", string> = {
                small: "w-80 h-64",
                medium: "w-96 h-80",
                large: "w-[500px] h-96",
              }

              return (
                <FloatingCard
                  key={i}
                  onClick={() => openProjectModal(project.id)}
                  className={`absolute group cursor-pointer transition-all duration-700 hover:scale-110 hover:z-30 ${sizeClasses[project.size]} shadow-2xl`}
                  style={{
                    left: `${project.position.x}%`,
                    top: `${project.position.y + i * 150}px`,
                    transform: `rotate(${project.rotation + Math.sin(time * 0.3 + i) * 3}deg) translateX(${Math.sin(time * 0.2 + i) * 10}px)`,
                    zIndex: 10 + i,
                    backgroundColor: "var(--theme-card)",
                    borderColor: "var(--theme-border)",
                    transition: "background-color 3s ease-in-out, border-color 3s ease-in-out",
                  }}
                >
                  <div className="relative h-full overflow-hidden rounded-lg">
                    {/* Dynamic gradient */}
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{
                        background: `linear-gradient(${45 + Math.sin(time + i) * 30}deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))`,
                        transition: "background 3s ease-in-out",
                      }}
                    />

                    <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
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
                            <div
                              key={j}
                              className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm px-2 py-1 rounded"
                            >
                              {tag}
                            </div>
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

                        <div className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-2 rounded flex items-center gap-1">
                          Explore
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white text-orange-600 hover:bg-white/90 font-bold px-4 py-2 rounded flex items-center gap-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              )
            })}
          </div>
        </section>
      </section>
    </AudioSection>
  )
}
