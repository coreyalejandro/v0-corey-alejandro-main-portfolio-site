"use client"
import { OrganicTitle } from "@/components/creative-chaos/organic-title"
import { FloatingCard } from "@/components/creative-chaos/floating-card"
import { LaydownCard } from "@/components/laydown-card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function ComponentsPage() {
  const [time, setTime] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState("LaydownCard")
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copiedComponent, setCopiedComponent] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)
    return () => clearInterval(timer)
  }, [])

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedComponent(selectedComponent)
    setTimeout(() => setCopiedComponent(null), 2000)
  }

  const components = [
    {
      name: "LaydownCard",
      category: "Interactive",
      description: "3D perspective cards that lay down with depth and motion",
      importPath: "@/components/laydown-card",
      code: `"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LaydownCardProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
  image?: React.ReactNode
}

export function LaydownCard({ title, description, children, className, image }: LaydownCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("relative group", className)}
      style={{
        perspective: "2000px",
        perspectiveOrigin: "center center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000 ease-out border-white/20"
        style={{
          transform: isHovered
            ? "rotateX(75deg) translateZ(-100px) scale(0.9)"
            : "rotateX(0deg) translateZ(0px) scale(1)",
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
          background:
            "linear-gradient(135deg, rgba(234, 88, 12, 0.95) 0%, rgba(185, 28, 28, 0.9) 50%, rgba(217, 119, 6, 0.95) 100%)",
        }}
      >
        {image && (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-600 via-red-700 to-amber-800">
            {image}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-3xl font-black text-white drop-shadow-lg">{title}</CardTitle>
          <CardDescription className="text-lg text-white/90 leading-relaxed">{description}</CardDescription>
        </CardHeader>

        {children && <CardContent className="text-white/80">{children}</CardContent>}

        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400/20 via-red-500/20 to-amber-500/20 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
        />
      </Card>
    </div>
  )
}`,
      preview: (
        <div className="flex items-center justify-center min-h-[600px] p-8">
          <LaydownCard
            title="Laydown Effect"
            description="Hover to see the card lay down flat with smooth 3D perspective transforms and depth"
            className="w-full max-w-lg"
            image={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
            }
          >
            <div className="space-y-4">
              <p className="text-white/90 leading-relaxed">
                This card demonstrates a 3D laydown animation effect. When you hover over it, the card rotates on the
                X-axis to create a laying down motion with perspective depth.
              </p>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium">Interactive</div>
                <div className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium">3D Transform</div>
              </div>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                Explore Effect
              </Button>
            </div>
          </LaydownCard>
        </div>
      ),
    },
    {
      name: "BreathingBackground",
      category: "Backgrounds",
      description: "Living, breathing gradient backgrounds that evolve over time",
      importPath: "@/components/creative-chaos/breathing-background",
      code: `"use client"

import { useState, useEffect } from "react"

interface BreathingBackgroundProps {
  colors?: string[]
  intensity?: number
}

export function BreathingBackground({
  colors = ["rgba(251, 191, 36, 0.8)", "rgba(239, 68, 68, 0.6)", "rgba(194, 65, 12, 0.9)", "rgba(120, 53, 15, 1)"],
  intensity = 1,
}: BreathingBackgroundProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        background: \`
          radial-gradient(ellipse at \${20 + Math.sin(time) * 10 * intensity}% \${30 + Math.cos(time * 0.7) * 15 * intensity}%, 
            \${colors[0]} 0%, 
            \${colors[1]} 30%, 
            \${colors[2]} 70%, 
            \${colors[3]} 100%),
          radial-gradient(ellipse at \${80 + Math.cos(time * 1.2) * 8 * intensity}% \${70 + Math.sin(time * 0.9) * 12 * intensity}%, 
            rgba(251, 146, 60, 0.7) 0%, 
            transparent 50%)
        \`,
        transform: \`scale(\${1 + Math.sin(time * 0.5) * 0.05 * intensity}) rotate(\${Math.sin(time * 0.3) * 2 * intensity}deg)\`,
      }}
    />
  )
}`,
      preview: (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%, 
                  rgba(234, 88, 12, 0.9) 0%, 
                  rgba(185, 28, 28, 0.8) 30%, 
                  rgba(146, 64, 14, 0.95) 70%, 
                  rgba(92, 25, 2, 1) 100%)
              `,
              transform: `scale(${1 + Math.sin(time * 0.5) * 0.05})`,
            }}
          />
        </div>
      ),
    },
    {
      name: "FloatingParticles",
      category: "Effects",
      description: "Organic particle systems that respond to mouse movement",
      importPath: "@/components/creative-chaos/floating-particles",
      code: `<FloatingParticles 
  count={15}
  mouseInteraction={true}
/>`,
      preview: (
        <div className="relative w-full h-[400px] bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${15 + ((i * 11) % 70)}%`,
                transform: `
                  translate(
                    ${Math.sin(time + i) * 30}px,
                    ${Math.cos(time * 0.8 + i) * 20}px
                  ) 
                  rotate(${time * 10 + i * 30}deg)
                  scale(${0.5 + Math.sin(time + i) * 0.3})
                `,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white/40 backdrop-blur-sm" />
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "OrganicTitle",
      category: "Typography",
      description: "Typography that breathes and moves with neural depth",
      importPath: "@/components/creative-chaos/organic-title",
      code: `"use client"

import { useState, useEffect } from "react"

interface OrganicTitleProps {
  lines: string[]
  className?: string
  mouseInteraction?: boolean
}

export function OrganicTitle({ lines, className = "", mouseInteraction = true }: OrganicTitleProps) {
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInteraction) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      clearInterval(timer)
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [mouseInteraction])

  const rotations = [-3, 2, -1]
  const gradients = ["", "bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent", ""]

  return (
    <div
      className={\`\${className}\`}
      style={{
        transform: mouseInteraction
          ? \`translate(\${mousePosition.x * 0.02}px, \${mousePosition.y * 0.015}px) rotate(\${Math.sin(time) * 2}deg)\`
          : \`rotate(\${Math.sin(time) * 2}deg)\`,
      }}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className={\`block transform rotate-\${Math.abs(rotations[index % rotations.length])} \${
            index === 1 ? "ml-12" : index === 2 ? "ml-6 text-7xl" : ""
          } \${gradients[index % gradients.length]}\`}
          style={{
            transform: \`rotate(\${rotations[index % rotations.length]}deg)\`,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  )
}
`,
      preview: (
        <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-orange-800 to-red-900 rounded-2xl">
          <OrganicTitle lines={["Neural", "Depth", "Magic"]} className="text-5xl md:text-7xl font-black text-white" />
        </div>
      ),
    },
    {
      name: "FloatingCard",
      category: "Interactive",
      description: "Cards that float and respond to user interaction",
      importPath: "@/components/creative-chaos/floating-card",
      code: `"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  mouseInteraction?: boolean
  rotationIntensity?: number
}

export function FloatingCard({
  children,
  className = "",
  mouseInteraction = true,
  rotationIntensity = 1,
}: FloatingCardProps) {
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInteraction) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      clearInterval(timer)
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [mouseInteraction])

  return (
    <div
      className={\`bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 \${className}\`}
      style={{
        transform: mouseInteraction
          ? \`translate(\${-mousePosition.x * 0.01}px, \${mousePosition.y * 0.02}px) rotate(\${-Math.sin(time * 0.7) * rotationIntensity}deg)\`
          : \`rotate(\${-Math.sin(time * 0.7) * rotationIntensity}deg)\`,
      }}
    >
      {children}
    </div>
  )
}
`,
      preview: (
        <div className="relative flex items-center justify-center min-h-[500px] bg-gradient-to-br from-orange-800 via-red-900 to-amber-900 rounded-2xl overflow-hidden">
          {/* Background particles for depth */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + ((i * 13) % 70)}%`,
                top: `${20 + ((i * 17) % 60)}%`,
                transform: `
                  translate(
                    ${Math.sin(time + i * 0.5) * 20}px,
                    ${Math.cos(time * 0.6 + i * 0.5) * 15}px
                  )
                `,
              }}
            >
              <div className="w-3 h-3 rounded-full bg-white/20 backdrop-blur-sm" />
            </div>
          ))}

          <FloatingCard className="max-w-md shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Floating Card</h3>
                  <p className="text-sm text-white/60">Interactive Component</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                This card floats and responds to your mouse movement, creating an organic, living interface that feels
                alive and responsive.
              </p>
              <div className="flex gap-2 flex-wrap">
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">Mouse Tracking</div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">
                  Smooth Animation
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">3D Rotation</div>
              </div>
            </div>
          </FloatingCard>
        </div>
      ),
    },
  ]

  const selectedComponentData = components.find((c) => c.name === selectedComponent) || components[0]
  const categories = Array.from(new Set(components.map((c) => c.category)))

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%, 
              rgba(234, 88, 12, 0.9) 0%, 
              rgba(185, 28, 28, 0.8) 30%, 
              rgba(146, 64, 14, 0.95) 70%, 
              rgba(92, 25, 2, 1) 100%)
          `,
        }}
      />

      <div className="flex h-screen">
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-80 bg-black/40 backdrop-blur-xl border-r border-white/10
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          role="navigation"
          aria-label="Component navigation"
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-2xl font-black text-white mb-2">Components</h1>
              <p className="text-sm text-white/60">Creative Chaos Library</p>
            </div>

            {/* Component List */}
            <nav className="flex-1 overflow-y-auto p-4" aria-label="Component list">
              {categories.map((category) => (
                <div key={category} className="mb-6">
                  <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 px-3">{category}</h2>
                  <ul className="space-y-1">
                    {components
                      .filter((c) => c.category === category)
                      .map((component) => (
                        <li key={component.name}>
                          <button
                            onClick={() => {
                              setSelectedComponent(component.name)
                              setSidebarOpen(false)
                            }}
                            className={`
                              w-full text-left px-3 py-2 rounded-lg transition-all
                              ${
                                selectedComponent === component.name
                                  ? "bg-orange-600 text-white shadow-lg"
                                  : "text-white/70 hover:bg-white/10 hover:text-white"
                              }
                            `}
                            aria-current={selectedComponent === component.name ? "page" : undefined}
                          >
                            <div className="font-medium">{component.name}</div>
                            <div className="text-xs opacity-70 mt-0.5 line-clamp-1">{component.description}</div>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="text-xs text-white/40 text-center">{components.length} Components Available</div>
            </div>
          </div>
        </aside>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-orange-600 rounded-full shadow-lg"
          aria-label="Toggle component navigation"
        >
          <div className="w-5 h-5 text-white">☰</div>
        </button>

        <main className="flex-1 overflow-y-auto" role="main">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            {/* Component Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-4xl font-black text-white mb-2">{selectedComponentData.name}</h2>
                  <p className="text-lg text-white/70">{selectedComponentData.description}</p>
                </div>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/20">
                  {selectedComponentData.category}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div
                className="inline-flex bg-black/30 backdrop-blur-sm rounded-lg p-1 border border-white/10"
                role="tablist"
                aria-label="Component view options"
              >
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`
                    px-6 py-2 rounded-md font-medium transition-all
                    ${activeTab === "preview" ? "bg-orange-600 text-white shadow-lg" : "text-white/60 hover:text-white"}
                  `}
                  role="tab"
                  aria-selected={activeTab === "preview"}
                  aria-controls="preview-panel"
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`
                    px-6 py-2 rounded-md font-medium transition-all
                    ${activeTab === "code" ? "bg-orange-600 text-white shadow-lg" : "text-white/60 hover:text-white"}
                  `}
                  role="tab"
                  aria-selected={activeTab === "code"}
                  aria-controls="code-panel"
                >
                  Code
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {activeTab === "preview" && (
                <div id="preview-panel" role="tabpanel" aria-labelledby="preview-tab" className="p-8">
                  {selectedComponentData.preview}
                </div>
              )}

              {activeTab === "code" && (
                <div id="code-panel" role="tabpanel" aria-labelledby="code-tab" className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      onClick={() => copyToClipboard(selectedComponentData.code)}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg"
                      aria-label="Copy code to clipboard"
                    >
                      {copiedComponent === selectedComponent ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>
                  <div className="p-8 font-mono text-sm text-gray-100 overflow-x-auto bg-gray-900/95">
                    <pre className="whitespace-pre-wrap break-words">{selectedComponentData.code}</pre>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/95 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-orange-400">📦</span>
                  Installation
                </h3>
                <div className="bg-gray-900/95 rounded-lg p-4 font-mono text-xs text-gray-100 mb-3 overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-words">{`import { ${selectedComponentData.name} } from "${selectedComponentData.importPath}"`}</pre>
                </div>
                <p className="text-sm text-white/70">
                  Import the component and use it with your preferred props and styling.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-orange-400">⚙️</span>
                  Customization
                </h3>
                <ul className="text-sm text-white/70 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>Adjust colors to match your brand palette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>Control animation intensity and behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>Toggle mouse interaction on or off</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
