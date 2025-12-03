import { NextResponse } from "next/server"

interface Project {
  id: string
  title: string
  description: string
  messages: Array<{ role: string; content: string }>
  createdAt: number
  updatedAt: number
}

// This will reset on each deployment, but works for demo purposes
let projectsStore: Project[] = []

export async function GET() {
  try {
    console.log("[v0] Fetching all projects from memory store...")
    console.log("[v0] Fetched projects:", projectsStore.length)

    // Sort by updatedAt descending
    const sorted = [...projectsStore].sort((a, b) => b.updatedAt - a.updatedAt)

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

    // Update or add project
    const existingIndex = projectsStore.findIndex((p) => p.id === newProject.id)
    if (existingIndex >= 0) {
      projectsStore[existingIndex] = newProject
    } else {
      projectsStore.push(newProject)
    }

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

    // Remove project
    projectsStore = projectsStore.filter((p) => p.id !== id)

    console.log("[v0] Project deleted successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Failed to delete project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
