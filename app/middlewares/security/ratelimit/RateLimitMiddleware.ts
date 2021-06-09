import { redis } from '@/app/Redis'
import { RateLimitContract } from '@/app/shared/contracts/ratelimit'
import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { rateLimitByUserId } from './generators/RateLimitByUserId'
import { Request, Response } from 'express'
import { TooManyRequestsError } from '@/app/errors'

/**
 * Rate limit middleware.
 */
export function RateLimitMiddleware ({
  windowsMs: windowMs = 2 * 1000,
  max = 100,
  message = 'Too many requests.',
  keyGenerator = rateLimitByUserId,
  statusCode = 429,
}: RateLimitContract): RateLimit.RateLimit {
  return RateLimit({
    store: new RedisStore({
      client: redis,
    }),
    windowMs,
    max,
    message,
    keyGenerator,
    statusCode,
    handler: () => {
      throw new TooManyRequestsError()
    },
  })
}
