export function sanitizeInput(input: string): string {
  if (!input) return ""

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .slice(0, 1000) // Limit length
}

export function sanitizeEmail(email: string): string {
  if (!email) return ""

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const sanitized = email.trim().toLowerCase().slice(0, 254)

  return emailRegex.test(sanitized) ? sanitized : ""
}

export function sanitizeUrl(url: string): string {
  if (!url) return ""

  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return ""
    }
    return parsed.toString()
  } catch {
    return ""
  }
}

export function validateGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.hostname === "github.com" && parsed.protocol === "https:"
  } catch {
    return false
  }
}
