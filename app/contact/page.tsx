"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Heart, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      clearInterval(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      alert("Message sent! Let's create magic together! ✨")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message"
      setSubmitError(message)
      alert(`Error: ${message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Living background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at ${30 + Math.sin(time) * 15}% ${40 + Math.cos(time * 0.7) * 20}%, 
              rgba(251, 191, 36, 0.8) 0%, 
              rgba(239, 68, 68, 0.6) 40%, 
              rgba(194, 65, 12, 0.9) 100%)
          `,
          transform: `scale(${1 + Math.sin(time * 0.4) * 0.03}) rotate(${Math.cos(time * 0.3) * 1}deg)`,
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Back button */}
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 text-white hover:bg-white/20"
              style={{
                transform: `translate(${Math.sin(time * 0.6) * 5}px, ${Math.cos(time * 0.4) * 3}px)`,
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Magic
            </Button>
          </Link>

          {/* Contact form */}
          <div
            className="bg-white/15 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20 shadow-2xl"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px) rotate(${Math.sin(time * 0.5) * 1}deg)`,
            }}
          >
            <div className="text-center mb-8">
              <h1 className="text-6xl font-black text-white mb-4">
                <span className="block transform rotate-1">Let's Create</span>
                <span className="block transform -rotate-1 ml-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Magic Together
                </span>
              </h1>
              <p className="text-xl text-white/90 text-pretty">
                Ready to break conventions and build something joyful?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your magical name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl h-14 text-lg"
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl h-14 text-lg"
                  required
                />
              </div>

              <div>
                <Textarea
                  placeholder="Tell me about your wildest creative dreams..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl min-h-32 text-lg resize-none"
                  required
                />
              </div>

              {/* Update submit button to show loading state */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xl py-6 rounded-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  transform: `rotate(${Math.sin(time * 0.7) * 2}deg)`,
                }}
              >
                <Heart className="w-6 h-6 mr-3" />
                {isSubmitting ? "Sending..." : "Send the Magic"}
                <Sparkles className="w-6 h-6 ml-3" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
