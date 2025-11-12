"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BreathingBackground } from "@/components/creative-chaos/breathing-background"

export default function DesignSystemPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [timeValues, setTimeValues] = useState(Array(20).fill(0))

  useEffect(() => {
    const timers = timeValues.map((_, i) => {
      const timer = setInterval(() => {
        setTimeValues((prevTimeValues) => {
          const newTimeValues = [...prevTimeValues]
          newTimeValues[i] += 0.1
          return newTimeValues
        })
      }, 100)
      return timer
    })

    return () => {
      timers.forEach((timer) => clearInterval(timer))
    }
  }, [])

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const v0ColorTokens = [
    { name: "Primary", value: "oklch(0.6461 0.1943 41.116)", bg: "bg-orange-600" },
    { name: "Primary Foreground", value: "oklch(0.985 0 0)", bg: "bg-white" },
    { name: "Secondary", value: "oklch(0.97 0 0)", bg: "bg-gray-100" },
    { name: "Secondary Foreground", value: "oklch(0.205 0 0)", bg: "bg-gray-900" },
    { name: "Accent", value: "oklch(0.97 0 0)", bg: "bg-gray-100" },
    { name: "Accent Foreground", value: "oklch(0.205 0 0)", bg: "bg-gray-900" },
    { name: "Background", value: "oklch(1 0 0)", bg: "bg-white" },
    { name: "Foreground", value: "oklch(0.145 0 0)", bg: "bg-gray-900" },
    { name: "Card", value: "oklch(1 0 0)", bg: "bg-white" },
    { name: "Card Foreground", value: "oklch(0.145 0 0)", bg: "bg-gray-900" },
    { name: "Popover", value: "oklch(1 0 0)", bg: "bg-white" },
    { name: "Popover Foreground", value: "oklch(0.145 0 0)", bg: "bg-gray-900" },
    { name: "Muted", value: "oklch(0.97 0 0)", bg: "bg-gray-100" },
    { name: "Muted Foreground", value: "oklch(0.556 0 0)", bg: "bg-gray-500" },
    { name: "Destructive", value: "oklch(0.577 0.245 27.325)", bg: "bg-red-600" },
    { name: "Destructive Foreground", value: "oklch(0.985 0 0)", bg: "bg-white" },
    { name: "Border", value: "oklch(0.922 0 0)", bg: "bg-gray-200" },
    { name: "Input", value: "oklch(0.922 0 0)", bg: "bg-gray-200" },
    { name: "Ring", value: "oklch(0.708 0 0)", bg: "bg-gray-600" },
  ]

  const v0ChartColors = [
    { name: "Chart 1", value: "oklch(0.646 0.222 41.116)", bg: "bg-orange-500" },
    { name: "Chart 2", value: "oklch(0.6 0.118 184.704)", bg: "bg-cyan-500" },
    { name: "Chart 3", value: "oklch(0.398 0.07 227.392)", bg: "bg-blue-600" },
    { name: "Chart 4", value: "oklch(0.828 0.189 84.429)", bg: "bg-yellow-400" },
    { name: "Chart 5", value: "oklch(0.769 0.188 70.08)", bg: "bg-amber-500" },
  ]

  const gradients = [
    {
      name: "Warm Sunset",
      class: "from-orange-600 via-red-700 to-amber-800",
      usage: "Primary backgrounds, hero sections",
    },
    {
      name: "Neural Depth",
      class: "from-amber-700 via-orange-800 to-red-900",
      usage: "Interactive elements, cards",
    },
    {
      name: "Organic Flow",
      class: "from-red-800 via-amber-900 to-orange-900",
      usage: "Accent sections",
    },
    {
      name: "Ocean Depths",
      class: "from-blue-800 via-teal-700 to-cyan-800",
      usage: "Info states, tech themes",
    },
    {
      name: "Mystic Purple",
      class: "from-purple-800 via-pink-700 to-rose-800",
      usage: "Premium features, luxury themes",
    },
    {
      name: "Forest Canopy",
      class: "from-green-800 via-emerald-700 to-teal-800",
      usage: "Success states, nature themes",
    },
    {
      name: "Electric Storm",
      class: "from-indigo-800 via-purple-700 to-blue-800",
      usage: "Interactive highlights, CTAs",
    },
    {
      name: "Crimson Fire",
      class: "from-red-900 via-rose-800 to-pink-800",
      usage: "Error states, urgent actions",
    },
    {
      name: "Golden Hour",
      class: "from-yellow-700 via-amber-800 to-orange-800",
      usage: "Warning states, highlights",
    },
  ]

  const animations = [
    {
      name: "Breathing",
      code: "animate-pulse",
      description: "Subtle pulsing for backgrounds",
    },
    {
      name: "Floating",
      code: "animate-bounce",
      description: "Gentle floating motion for particles",
    },
    {
      name: "Organic Hover",
      code: "hover:scale-105 transition-transform duration-300",
      description: "Interactive element responses",
    },
  ]

  const typography = [
    {
      name: "Display Large",
      class: "text-6xl font-bold",
      usage: "Hero titles, main headings",
    },
    {
      name: "Display Medium",
      class: "text-4xl font-semibold",
      usage: "Section headers",
    },
    {
      name: "Body Large",
      class: "text-lg leading-relaxed",
      usage: "Primary content, descriptions",
    },
    {
      name: "Body Small",
      class: "text-sm opacity-80",
      usage: "Captions, metadata",
    },
  ]

  const spacing = [
    {
      name: "Micro",
      value: "0.25rem (4px)",
      class: "p-1, m-1, gap-1",
    },
    {
      name: "Small",
      value: "0.5rem (8px)",
      class: "p-2, m-2, gap-2",
    },
    {
      name: "Medium",
      value: "1rem (16px)",
      class: "p-4, m-4, gap-4",
    },
    {
      name: "Large",
      value: "1.5rem (24px)",
      class: "p-6, m-6, gap-6",
    },
    {
      name: "XLarge",
      value: "2rem (32px)",
      class: "p-8, m-8, gap-8",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <BreathingBackground
        colors={["rgba(234, 88, 12, 0.9)", "rgba(185, 28, 28, 0.8)", "rgba(146, 64, 14, 0.95)", "rgba(92, 25, 2, 1)"]}
        intensity={1}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {timeValues.map((time, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `
                translate(
                  ${Math.sin(time + i * 0.5) * 60}px,
                  ${Math.cos(time * 0.8 + i * 0.3) * 50}px
                )
                rotate(${time * 30 + i * 45}deg)
                scale(${0.8 + Math.sin(time + i) * 0.6})
              `,
              opacity: 0.3 + Math.sin(time + i) * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 text-balance">
            Creative Chaos
            <br />
            <span className="text-amber-200">Design System</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Complete design system with creative guidelines, technical implementation, and platform-specific exports
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-4">Platform Exports</h2>
          <p className="text-white/90 mb-8 text-lg">Export Creative Chaos tokens to different design platforms</p>

          {/* v0 Export */}
          <div className="bg-gray-900 rounded-3xl overflow-hidden mb-6 border border-white/20">
            <button
              onClick={() => toggleSection("v0")}
              className="w-full px-8 py-6 flex items-center justify-between text-white hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <span className="text-2xl font-semibold block">v0.dev Format</span>
                  <span className="text-sm text-gray-400">OKLCH color tokens for v0 design system</span>
                </div>
              </div>
              <span className="text-3xl">{expandedSection === "v0" ? "−" : "+"}</span>
            </button>

            {expandedSection === "v0" && (
              <div className="px-8 py-8 bg-gray-950">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {v0ColorTokens.map((token) => (
                    <div key={token.name} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${token.bg} border border-gray-700 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{token.name}</div>
                        <div className="text-xs text-gray-400 font-mono truncate">{token.value}</div>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(token.value, `v0-${token.name}`)}
                        className="bg-white/10 hover:bg-white/20 text-white border-0 text-xs"
                      >
                        {copiedItem === `v0-${token.name}` ? "✓" : "📋"}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-800">
                  <h3 className="text-white font-semibold mb-4">Chart Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {v0ChartColors.map((color) => (
                      <div key={color.name} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${color.bg} border border-gray-700 flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white">{color.name}</div>
                          <div className="text-xs text-gray-400 font-mono truncate">{color.value}</div>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(color.value, `v0-chart-${color.name}`)}
                          className="bg-white/10 hover:bg-white/20 text-white border-0 text-xs"
                        >
                          {copiedItem === `v0-chart-${color.name}` ? "✓" : "📋"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Figma Export Placeholder */}
          <div className="bg-gray-900/50 rounded-3xl overflow-hidden mb-6 border border-white/20">
            <div className="px-8 py-6 flex items-center justify-between text-white/50">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎨</span>
                <div className="text-left">
                  <span className="text-2xl font-semibold block">Figma Format</span>
                  <span className="text-sm text-gray-500">Coming soon - Export to Figma design tokens</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tailwind Export Placeholder */}
          <div className="bg-gray-900/50 rounded-3xl overflow-hidden border border-white/20">
            <div className="px-8 py-6 flex items-center justify-between text-white/50">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <span className="text-2xl font-semibold block">Tailwind Config</span>
                  <span className="text-sm text-gray-500">Coming soon - Export to tailwind.config.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Gradients */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">Color Gradients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {gradients.map((gradient, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${gradient.class} backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-xl`}
              >
                <div
                  className={`w-full h-24 rounded-2xl bg-gradient-to-r ${gradient.class} mb-4 ring-2 ring-white/30`}
                />
                <h3 className="text-xl font-semibold text-white mb-2">{gradient.name}</h3>
                <p className="text-white/95 text-sm mb-4">{gradient.usage}</p>
                <Button
                  onClick={() => copyToClipboard(`bg-gradient-to-r ${gradient.class}`, `gradient-${index}`)}
                  className="w-full bg-white/40 hover:bg-white/50 text-white border-0 font-semibold"
                >
                  {copiedItem === `gradient-${index}` ? "✓ Copied!" : "📋 Copy Class"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">Typography Scale</h2>
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl">
            {typography.map((type, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                    <p className="text-white/80 text-sm">{type.usage}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(type.class, `typo-${index}`)}
                    className="bg-white/30 hover:bg-white/40 text-white border-0"
                  >
                    {copiedItem === `typo-${index}` ? "✓" : "📋"}
                  </Button>
                </div>
                <div className={`${type.class} text-white`}>The quick brown fox jumps over the lazy dog</div>
                <code className="text-xs text-yellow-200 bg-black/30 px-2 py-1 rounded mt-2 inline-block">
                  {type.class}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Animations */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">Motion Patterns</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {animations.map((anim, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-xl"
              >
                <div className="flex items-center justify-center h-24 mb-4">
                  <div className={`w-12 h-12 bg-white/40 rounded-full ${anim.code}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{anim.name}</h3>
                <p className="text-white/90 text-sm mb-4">{anim.description}</p>
                <Button
                  onClick={() => copyToClipboard(anim.code, `anim-${index}`)}
                  className="w-full bg-white/30 hover:bg-white/40 text-white border-0"
                >
                  {copiedItem === `anim-${index}` ? "✓ Copied!" : "📋 Copy Class"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing System */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">Spacing System</h2>
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl">
            {spacing.map((space, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b border-white/20 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="bg-white/40 rounded"
                    style={{ width: space.value.split(" ")[0], height: space.value.split(" ")[0] }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{space.name}</h3>
                    <p className="text-white/80 text-sm">{space.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <code className="text-yellow-200 text-sm">{space.class}</code>
                  <Button
                    onClick={() => copyToClipboard(space.class, `space-${index}`)}
                    className="ml-4 bg-white/30 hover:bg-white/40 text-white border-0"
                  >
                    {copiedItem === `space-${index}` ? "✓" : "📋"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Guidelines */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-8">Implementation Rules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">✅ Do This</h3>
              <ul className="space-y-4 text-white/95">
                <li>• Use asymmetrical layouts for visual interest</li>
                <li>• Layer gradients with breathing animations</li>
                <li>• Break conventional grid systems</li>
                <li>• Add subtle floating particles</li>
                <li>• Use organic, flowing shapes</li>
                <li>• Implement gentle hover interactions</li>
              </ul>
            </div>
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">❌ Avoid This</h3>
              <ul className="space-y-4 text-white/95">
                <li>• Rigid, corporate layouts</li>
                <li>• Static, lifeless backgrounds</li>
                <li>• Perfect symmetry everywhere</li>
                <li>• Harsh, jarring animations</li>
                <li>• Sharp, angular designs only</li>
                <li>• Overwhelming motion effects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="text-4xl font-semibold text-white mb-8">Quick Start Template</h2>
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl">
            <pre className="text-amber-200 text-sm overflow-x-auto">
              {`<div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-amber-800">
  {/* Floating particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce"
        style={{
          left: \`\${Math.random() * 100}%\`,
          top: \`\${Math.random() * 100}%\`,
          animationDelay: \`\${Math.random() * 2}s\`,
          animationDuration: \`\${2 + Math.random() * 2}s\`
        }}
      />
    ))}
  </div>
  
  <div className="relative z-10 container mx-auto px-6 py-12">
    <h1 className="text-6xl font-bold text-white mb-6">
      Your Creative Title
    </h1>
    {/* Your content here */}
  </div>
</div>`}
            </pre>
            <Button
              onClick={() =>
                copyToClipboard(
                  `<div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-amber-800">
  {/* Floating particles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce"
        style={{
          left: \`\${Math.random() * 100}%\`,
          top: \`\${Math.random() * 100}%\`,
          animationDelay: \`\${Math.random() * 2}s\`,
          animationDuration: \`\${2 + Math.random() * 2}s\`
        }}
      />
    ))}
  </div>
  
  <div className="relative z-10 container mx-auto px-6 py-12">
    <h1 className="text-6xl font-bold text-white mb-6">
      Your Creative Title
    </h1>
    {/* Your content here */}
  </div>
</div>`,
                  "template",
                )
              }
              className="mt-6 bg-white/30 hover:bg-white/40 text-white border-0"
            >
              {copiedItem === "template" ? "✓ Copied Template!" : "📋 Copy Quick Start"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
