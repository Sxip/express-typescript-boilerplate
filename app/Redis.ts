import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@/config'
import Redis from 'ioredis'

/**
 * Redis client instance.
 * 
 * @public
 */
export const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  lazyConnect: true,
})

/**
 * Attempts to connect to the redis server.
 * 
 * @public
 */
export async function connection (): Promise<void> {
  return await redis.connect()
}
