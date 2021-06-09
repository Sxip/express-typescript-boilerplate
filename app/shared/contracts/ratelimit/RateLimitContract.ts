import { Request, Response } from 'express'

export interface RateLimitContract {
  readonly windowsMs: number
  readonly max: number
  readonly message?: string
  readonly statusCode?: number
  keyGenerator(request: Request, response: Response): any
}
