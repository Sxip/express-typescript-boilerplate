import { BadCredentialsError } from '@/app/errors'
import Logger from '@/app/Logger'
import { Request } from 'express'

/**
 * Rate limits by the user id.
 * 
 * @param request
 * @param response
 * @public
 */
export function rateLimitByUserId (request: Request): number {
  if (!request.user) {
    throw new BadCredentialsError({
      message: 'User does not exist.',
    })
  }

  Logger.info(`Rate limiting user ${request.user.id}`)
  return request.user.id
}
