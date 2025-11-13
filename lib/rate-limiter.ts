interface RateLimitConfig {
  interval: number // milliseconds
  maxRequests: number
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  check(key: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const windowStart = now - config.interval

    // Get existing requests for this key
    const userRequests = this.requests.get(key) || []

    // Filter out old requests outside the time window
    const recentRequests = userRequests.filter((time) => time > windowStart)

    // Check if limit exceeded
    if (recentRequests.length >= config.maxRequests) {
      return false
    }

    // Add current request
    recentRequests.push(now)
    this.requests.set(key, recentRequests)

    // Cleanup old entries periodically
    this.cleanup()

    return true
  }

  private cleanup() {
    const now = Date.now()
    const maxAge = 3600000 // 1 hour

    for (const [key, requests] of this.requests.entries()) {
      const recentRequests = requests.filter((time) => now - time < maxAge)
      if (recentRequests.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, recentRequests)
      }
    }
  }

  reset(key: string) {
    this.requests.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

// Rate limit configurations
export const RATE_LIMITS = {
  CONTACT_FORM: { interval: 60000, maxRequests: 3 }, // 3 per minute
  GITHUB_API: { interval: 3600000, maxRequests: 50 }, // 50 per hour
  AUDIO_EVENTS: { interval: 1000, maxRequests: 10 }, // 10 per second
}
