import Logger from '@/app/Logger'
import { Request } from 'express'

/**
 * Rate limits by the user id.
 * 
 * @param request
 * @param response
 * @public
 */
export function rateLimitByBrowserFingerpint (request: Request): string {
  const hash = request.fingerprint!.hash
  Logger.info(`Rate limiting fingerprint hash ${hash}`)
  return hash
}
