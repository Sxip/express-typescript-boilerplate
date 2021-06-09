import { Router } from 'express'
import { AuthenticationController } from '@/controllers'
import { LoginValidation, RefreshTokenValidation } from '@/validators'
import { AuthenticatedMiddleware, DefaultRateLimit } from '@/middlewares'

/**
 * Express routes.
 * 
 * @constant
 */
const routes: Router = Router()

/**
 * Authentication routes.
 */
routes.post(
  '/auth/login',
  LoginValidation,
  AuthenticationController.login
)

routes.put(
  '/auth/refresh',
  RefreshTokenValidation,
  AuthenticationController.refresh
)

routes.post(
  '/auth/logout',
  AuthenticatedMiddleware,
  AuthenticationController.logout
)

export default routes
