import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json()

    const { text } = await generateText({
      model: model || "gpt-4o",
      messages,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
