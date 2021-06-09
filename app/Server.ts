import express, { Express } from 'express'

import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { errors } from 'celebrate'
import morgan from 'morgan'
import Fingerprint from 'express-fingerprint'

import { IS_DEV, PORT } from 'config'
import routes from './Routes'
import { DefaultRateLimit, ErrorHandlerMiddleware } from './middlewares'

/**
 * Express instance.
 * 
 * @constant
 */
const app: Express = express()

/**
 * Express middlewares.
 * 
 * @void
 */
app
  /**
   * Common middleware.
   */
  .use(helmet())
  .use(cors())
  .use(urlencoded({ extended: true, limit: '512mb' }))
  .use(json({ limit: '512mb' }))
  .use(morgan(IS_DEV ? 'dev' : 'tiny'))
  .use(Fingerprint())
  /**
   * Global rate limit
   */
  .use(DefaultRateLimit)
  /**
   * Router api.
   */
  .use('/api/v1', routes)
  /**
   * Global error handler.
   */
  .use(ErrorHandlerMiddleware)
  .use(errors())

/**
 * Express listen.
 * 
 * @returns {void}
 */
app.listen(PORT)
