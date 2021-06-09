import { NextFunction, Request, Response } from 'express'
import { BadCredentialsError, ExpiredTokenError, InvalidTokenError } from '@/errors'
import { JWT_TYPE } from '@/config'
import { TokenService, UserService } from '@/services'

export async function AuthenticatedMiddleware (request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const { headers } = request as any
    if (!headers.authorization) {
      throw new BadCredentialsError({
        message: 'Missing Authorization header',
      })
    }

    const [scheme, token] = headers.authorization.split(' ')
    const type = JWT_TYPE

    if (type !== scheme.toLowerCase() || !token) {
      throw new BadCredentialsError({
        message: `Header format is Authorization: ${type} token`,
      })
    }

    const { sub: userId } = TokenService.verify(token)
    const user = await UserService.findUserById(userId)

    if (!user) {
      throw new BadCredentialsError({
        message: `User ${userId} not exists`,
      })
    }

    request.user = user
    return next()
  } catch (e) {
    let error

    if (e.name === 'TokenExpiredError') {
      error = new ExpiredTokenError({
        info: {
          expiredAt: e.expiredAt,
        },
      })
    } else if (e.name === 'JsonWebTokenError') {
      error = new InvalidTokenError({
        message: e.message,
      })
    }

    return next(error)
  }
}
