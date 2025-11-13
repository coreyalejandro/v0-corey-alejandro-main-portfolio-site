import { type NextRequest, NextResponse } from "next/server"
import { rateLimiter, RATE_LIMITS } from "@/lib/rate-limiter"
import { sanitizeInput, sanitizeEmail } from "@/lib/sanitize"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Apply rate limiting
    if (!rateLimiter.check(`contact-${ip}`, RATE_LIMITS.CONTACT_FORM)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Parse and validate request body
    const body = await request.json()

    const name = sanitizeInput(body.name)
    const email = sanitizeEmail(body.email)
    const message = sanitizeInput(body.message)

    // Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 })
    }

    // TODO: Send email using a service like SendGrid, Resend, or AWS SES
    // For now, log securely (in production, never log user data)
    console.log("[CONTACT FORM SUBMISSION]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      messageLength: message.length,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("[CONTACT FORM ERROR]", error)
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 })
  }
}

// Prevent other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
