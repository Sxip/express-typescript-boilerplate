import { NextFunction } from 'express'
import { InternalServerError, MissingRequiredParameterError } from '@/errors'
import { pick } from 'lodash'
import { isCelebrateError } from 'celebrate'
import Logger from '@/app/Logger'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ErrorHandlerMiddleware (e: any, request: any, response: any, next: NextFunction): void {
  if (isCelebrateError(e)) {
    const messages = Array.from(e.details.values()).map(
      (error) => error.message,
    )

    if (messages) {
      e = new MissingRequiredParameterError({
        message: 'Missing required parameters.',
        info: messages,
      })
    }
  }

  // Log the error
  Logger.error(e.message)

  if (!e.isHTTPError) {
    e = new InternalServerError({ cause: e })
  }

  if (response.headersSent) return next(e)

  return response.status(e.status).json(pick(e, 'info', 'message', 'name', 'status'))
}
