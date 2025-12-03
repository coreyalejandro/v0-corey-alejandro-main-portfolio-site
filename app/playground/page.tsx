"use client"

import { useState, useEffect, useRef } from "react"
import { BreathingBackground } from "@/components/creative-chaos/breathing-background"
import { FloatingCard } from "@/components/creative-chaos/floating-card"
import { OrganicTitle } from "@/components/creative-chaos/organic-title"
import { Send, Sparkles, Save, Folder } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

type SavedProject = {
  id: string
  name: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "What do you want to build?",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState("Untitled Project")
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadSavedProjects()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadSavedProjects = async () => {
    try {
      const response = await fetch("/api/playground/projects")
      if (response.ok) {
        const projects = await response.json()
        setSavedProjects(projects)
      }
    } catch (error) {
      console.error("[v0] Failed to load projects:", error)
    }
  }

  const saveCurrentProject = async () => {
    try {
      const project: SavedProject = {
        id: currentProjectId || `project-${Date.now()}`,
        name: projectName,
        messages,
        createdAt: currentProjectId
          ? savedProjects.find((p) => p.id === currentProjectId)?.createdAt || Date.now()
          : Date.now(),
        updatedAt: Date.now(),
      }

      const response = await fetch("/api/playground/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })

      if (response.ok) {
        setCurrentProjectId(project.id)
        await loadSavedProjects()
      }
    } catch (error) {
      console.error("[v0] Failed to save project:", error)
    }
  }

  const loadProject = (project: SavedProject) => {
    setMessages(project.messages)
    setProjectName(project.name)
    setCurrentProjectId(project.id)
  }

  const newProject = () => {
    setMessages([
      {
        role: "assistant",
        content: "What do you want to build?",
        timestamp: Date.now(),
      },
    ])
    setProjectName("Untitled Project")
    setCurrentProjectId(null)
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/playground/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          model: selectedModel,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("[v0] Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative h-screen overflow-hidden flex">
      <BreathingBackground colors={["#ea580c", "#b91c1c", "#d97706", "#ea580c"]} className="opacity-90" />

      <div className="relative z-10 w-80 border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 overflow-y-auto">
        <div className="mb-6">
          <OrganicTitle lines={["Saved", "Projects"]} className="text-3xl font-black text-white" />
        </div>

        <button
          onClick={newProject}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          New Project
        </button>

        <div className="space-y-2">
          {savedProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => loadProject(project)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                currentProjectId === project.id
                  ? "border-amber-400 bg-amber-500/20"
                  : "border-white/20 bg-white/5 hover:border-amber-300/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Folder className="w-4 h-4 text-amber-400" />
                <div className="font-semibold text-white text-sm truncate">{project.name}</div>
              </div>
              <div className="text-xs text-white/60">{new Date(project.updatedAt).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-2xl font-bold text-white bg-transparent border-none outline-none"
            placeholder="Project Name"
          />

          <div className="flex items-center gap-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold cursor-pointer hover:bg-white/20 transition-all"
            >
              <option value="gpt-4o" className="bg-gray-900">
                GPT-4o
              </option>
              <option value="gpt-4o-mini" className="bg-gray-900">
                GPT-4o Mini
              </option>
              <option value="anthropic/claude-sonnet-4" className="bg-gray-900">
                Claude Sonnet 4
              </option>
              <option value="openai/gpt-5-mini" className="bg-gray-900">
                GPT-5 Mini
              </option>
            </select>

            <button
              onClick={saveCurrentProject}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <FloatingCard
                className={`max-w-2xl ${
                  message.role === "user" ? "bg-amber-500/20 border-amber-400/40" : "bg-white/10"
                }`}
                rotationIntensity={0.3}
              >
                <div className="text-sm text-white/80 mb-2 font-semibold">
                  {message.role === "user" ? "You" : "Creative Chaos AI"}
                </div>
                <div className="text-white whitespace-pre-wrap">{message.content}</div>
              </FloatingCard>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <FloatingCard className="max-w-2xl bg-white/10" rotationIntensity={0.3}>
                <div className="text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-75" />
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-150" />
                </div>
              </FloatingCard>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl px-8 py-6">
          <div className="flex gap-4 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Describe what you want to build..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-amber-400/60"
              rows={3}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
