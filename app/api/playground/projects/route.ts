import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const PROJECTS_KEY = "playground:all-projects"

interface Project {
  id: string
  title: string
  description: string
  messages: Array<{ role: string; content: string }>
  createdAt: number
  updatedAt: number
}

export async function GET() {
  try {
    console.log("[v0] Fetching all projects from Redis...")
    const projects = (await redis.get<Project[]>(PROJECTS_KEY)) || []
    console.log("[v0] Fetched projects:", projects.length)

    // Sort by updatedAt descending
    const sorted = projects.sort((a, b) => b.updatedAt - a.updatedAt)

    return NextResponse.json(sorted)
  } catch (error) {
    console.error("[v0] Failed to fetch projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json()
    console.log("[v0] Saving project:", newProject.id)

    // Get all projects
    const projects = (await redis.get<Project[]>(PROJECTS_KEY)) || []

    // Update or add project
    const existingIndex = projects.findIndex((p) => p.id === newProject.id)
    if (existingIndex >= 0) {
      projects[existingIndex] = newProject
    } else {
      projects.push(newProject)
    }

    // Save back
    await redis.set(PROJECTS_KEY, projects)
    console.log("[v0] Project saved successfully")

    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    console.error("[v0] Failed to save project:", error)
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    console.log("[v0] Deleting project:", id)

    // Get all projects
    const projects = (await redis.get<Project[]>(PROJECTS_KEY)) || []

    // Remove project
    const filtered = projects.filter((p) => p.id !== id)

    // Save back
    await redis.set(PROJECTS_KEY, filtered)
    console.log("[v0] Project deleted successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Failed to delete project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
