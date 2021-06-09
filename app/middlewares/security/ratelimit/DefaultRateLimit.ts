import { rateLimitByBrowserFingerpint } from './generators'
import { RateLimitMiddleware } from './RateLimitMiddleware'

/**
 * Default rate limit.
 */
export const DefaultRateLimit = RateLimitMiddleware({
  windowsMs: 3 * 60 * 1000, // 3 minutes
  max: 1000,
  message: 'Too many requests, please try again later.',
  keyGenerator: rateLimitByBrowserFingerpint,
})
