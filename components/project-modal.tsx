"use client"

import { useState, useEffect, useRef } from "react"
import { X, Github, ExternalLink, Star, GitFork, Eye } from "lucide-react"
import { rateLimiter, RATE_LIMITS } from "@/lib/rate-limiter"
import { validateGitHubUrl } from "@/lib/sanitize"

interface ProjectData {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  images: string[]
  challenge?: string
  solution?: string
  impact?: string
  featured?: boolean
}

interface ProjectModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [githubStats, setGithubStats] = useState<any>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  // Fetch GitHub stats if GitHub URL is provided
  useEffect(() => {
    if (project?.githubUrl && isOpen) {
      // Validate GitHub URL
      if (!validateGitHubUrl(project.githubUrl)) {
        console.error("[SECURITY] Invalid GitHub URL")
        return
      }

      // Apply rate limiting
      if (!rateLimiter.check("github-api", RATE_LIMITS.GITHUB_API)) {
        console.warn("[RATE LIMIT] GitHub API rate limit exceeded")
        setGithubStats({
          stars: 0,
          forks: 0,
          watchers: 0,
          language: "Rate Limited",
        })
        return
      }

      const repoPath = project.githubUrl.replace("https://github.com/", "")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      fetch(`https://api.github.com/repos/${repoPath}`, {
        signal: controller.signal,
      })
        .then((res) => {
          clearTimeout(timeoutId)
          if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          // Validate response data
          setGithubStats({
            stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
            forks: typeof data.forks_count === "number" ? data.forks_count : 0,
            watchers: typeof data.watchers_count === "number" ? data.watchers_count : 0,
            language: typeof data.language === "string" ? data.language : "Unknown",
          })
        })
        .catch((err) => {
          clearTimeout(timeoutId)
          // Only log in development, silently fail in production
          if (process.env.NODE_ENV === "development") {
            console.warn("[GITHUB API]", err.message)
          }
          // Don't expose error details to users
          setGithubStats(null)
        })
    }
  }, [project, isOpen])

  // Track scroll progress for visual effects
  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const scrolled = modalRef.current.scrollTop
        const height = modalRef.current.scrollHeight - modalRef.current.clientHeight
        setScrollProgress(scrolled / height)
      }
    }

    const ref = modalRef.current
    ref?.addEventListener("scroll", handleScroll)
    return () => ref?.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setScrollProgress(0)
      setGithubStats(null)
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-1 transition-all duration-300"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `var(--theme-primary)`,
        }}
      />

      {/* Modal container with 3D perspective */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-[3000ms]"
        style={{
          transform: `perspective(2000px) rotateX(${scrollProgress * 5}deg)`,
          transition: "transform 0.3s ease-out, background-color 3s ease-in-out",
          backgroundColor: "var(--theme-card)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-10 p-3 rounded-full shadow-lg transition-all hover:scale-110 duration-[3000ms]"
          style={{
            backgroundColor: "var(--theme-card)",
            color: "var(--theme-text)",
          }}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero section with image carousel */}
        <div className="relative h-[400px] overflow-hidden rounded-t-3xl">
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {project.images.map((image, index) => (
              <div
                key={index}
                className="min-w-full h-full transition-colors duration-[3000ms]"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            ))}
          </div>

          {/* Image navigation dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Floating project badge */}
          {project.featured && (
            <div
              className="absolute top-6 left-6 px-4 py-2 font-bold rounded-full shadow-lg animate-pulse transition-colors duration-[3000ms]"
              style={{
                backgroundColor: "var(--theme-accent)",
                color: "var(--theme-bg)",
              }}
            >
              Featured Project
            </div>
          )}
        </div>

        {/* Content sections */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Header with title and links */}
          <div className="space-y-6">
            <h2
              className="text-5xl md:text-6xl font-bold transition-colors duration-[3000ms]"
              style={{
                color: "var(--theme-primary)",
              }}
            >
              {project.title}
            </h2>

            <p
              className="text-xl leading-relaxed transition-colors duration-[3000ms]"
              style={{ color: "var(--theme-text)" }}
            >
              {project.longDescription || project.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105 duration-[3000ms]"
                  style={{
                    backgroundColor: "var(--theme-bg)",
                    color: "var(--theme-text)",
                    border: "2px solid var(--theme-border)",
                  }}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105 duration-[3000ms]"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                    color: "var(--theme-card)",
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
            </div>

            {/* GitHub stats */}
            {githubStats && (
              <div className="flex flex-wrap gap-6 pt-4 transition-colors duration-[3000ms]">
                <div className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                  <Star className="w-5 h-5" style={{ color: "var(--theme-accent)" }} />
                  <span className="font-semibold">{githubStats.stars}</span>
                  <span className="text-sm">stars</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                  <GitFork className="w-5 h-5" style={{ color: "var(--theme-accent)" }} />
                  <span className="font-semibold">{githubStats.forks}</span>
                  <span className="text-sm">forks</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: "var(--theme-text)" }}>
                  <Eye className="w-5 h-5" style={{ color: "var(--theme-accent)" }} />
                  <span className="font-semibold">{githubStats.watchers}</span>
                  <span className="text-sm">watchers</span>
                </div>
                {githubStats.language && (
                  <div
                    className="px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-[3000ms]"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                      color: "var(--theme-bg)",
                    }}
                  >
                    {githubStats.language}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-bold transition-colors duration-[3000ms]"
              style={{ color: "var(--theme-text)" }}
            >
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-5 py-2 rounded-full font-medium hover:scale-105 transition-all duration-[3000ms]"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "var(--theme-bg)",
                    animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Challenge section */}
          {project.challenge && (
            <div
              className="p-8 rounded-2xl shadow-lg space-y-4 transition-colors duration-[3000ms]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderLeft: "4px solid var(--theme-primary)",
              }}
            >
              <h3
                className="text-2xl font-bold transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                The Challenge
              </h3>
              <p className="leading-relaxed text-gray-200 transition-colors duration-[3000ms]">{project.challenge}</p>
            </div>
          )}

          {/* Solution section */}
          {project.solution && (
            <div
              className="p-8 rounded-2xl shadow-lg space-y-4 transition-colors duration-[3000ms]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderLeft: "4px solid var(--theme-secondary)",
              }}
            >
              <h3
                className="text-2xl font-bold transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-secondary)" }}
              >
                The Solution
              </h3>
              <p className="leading-relaxed text-gray-200 transition-colors duration-[3000ms]">{project.solution}</p>
            </div>
          )}

          {/* Impact section */}
          {project.impact && (
            <div
              className="p-8 rounded-2xl shadow-lg space-y-4 transition-colors duration-[3000ms]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderLeft: "4px solid var(--theme-accent)",
              }}
            >
              <h3
                className="text-2xl font-bold transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-accent)" }}
              >
                The Impact
              </h3>
              <p className="leading-relaxed text-gray-200 transition-colors duration-[3000ms]">{project.impact}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
