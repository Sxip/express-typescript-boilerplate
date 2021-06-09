import { AuthenticationService } from '@/app/services'
import { NextFunction, Request, Response } from 'express-serve-static-core'

export class AuthenticationController {
  /**
   * Authenticates into an account.
   * 
   * @param Request
   * @param Response
   * @public
   */
  public static async login (request: Request, response: Response, next: NextFunction): Promise<void> {
    const { username, password } = request.body

    try {
      const token = await AuthenticationService.authenticateWithUsername(username, password)
      response.json(token)
    } catch(e) {
      next(e)
    }
  }

  /**
   * Destroys the refresh token upon logout.
  
   * @param Request
   * @param Response
   * @public
   */
  public static async logout (request: Request, response: Response, next: NextFunction): Promise<void> {
    const user = request.user
    const { token } = request.body

    try {
      await AuthenticationService.logout(user.id, token)
    } catch (e) {
      next(e)
    }
  }

  /**
   * Refreshes the authentication token.
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  public static async refresh (request: Request, response: Response, next: NextFunction): Promise<void> {
    const { token } = request.body

    try {
      const refresh = await AuthenticationService.refresh(token)
      response.json(refresh)
    } catch (e) {
      next(e)
    }
  }
}
