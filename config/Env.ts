import dotenv from 'dotenv'

/**
 * Development, production enviroment.
 * 
 * @constant
 */
export const ENV = process.env.NODE_ENV || 'development'
export const IS_DEV = ENV === 'development'

/**
 * Load env variables.
 */
dotenv.config({
  path: `.env.${ENV}`,
})

/**
 * Express port.
 * 
 * @constant
 */
export const PORT = Number(process.env.PORT) || 80

/**
 * Database host.
 * 
 * @constant
 */
export const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1'

/**
 * Database username.
 * 
 * @constant
 */
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres'

/**
 * Database password.
 * 
 * @constant
 */
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'dev'

/**
 * Database.
 * 
 * @constant
 */
export const DATABASE_DB = process.env.DATABASE_DB || 'dev'

/**
 * JWT private key.
 * 
 * @constant
 */
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || 'secret'

/**
 * JWT type.
 * 
 * @constant
 */
export const JWT_TYPE = process.env.JWT_TYPE || 'bearer'

/**
 * Access token expires.
 * 
 * @constant
 */
export const ACCESS_TOKEN_EXPIRES_IN = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 3600000

/**
 * Access token expires.
 * 
 * @constant
 */
export const REFRESH_TOKEN_EXPIRES_IN = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 2592000000

/**
 * Redis host.
 * 
 * @constant
 */
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'

/**
 * Redis port.
 * 
 * @constant
 */
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379

/**
 * Redis password.
 * 
 * @constant
 */
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''

/**
 * Queue limiter max.
 * 
 * @constant
 */
export const QUEUE_LIMITER_MAX = Number(process.env.QUEUE_LIMITER_MAX) || 15

/**
 * Queue limiter duruation.
 * 
 * @constant
 */
export const QUEUE_LIMITER_DURATION = Number(process.env.QUEUE_LIMITER_DURATION) || 5000

/**
 * Queue limiter bounceback.
 * 
 * @constant
 */
export const QUEUE_LIMITER_BOUNCEBACK = Boolean(process.env.QUEUE_LIMITER_BOUNCEBACK) || true

/**
 * Mailing host.
 * 
 * @constant
 */
export const MAILING_HOST = process.env.MAILING_HOST || 'host'

/**
 * Mailing PORT.
 * 
 * @constant
 */
export const MAILING_PORT = Number(process.env.MAILING_PORT) || 465

/**
 * Mailing cache.
 * 
 * @constant
 */
export const MAILING_CACHE = process.env.MAILING_CACHE || false

/**
 * Mailing secure.
 * 
 * @constant
 */
export const MAILING_SECURE = Boolean(process.env.MAILING_SECURE) || false

/**
 * Mailing username.
 * 
 * @constant
 */
export const MAILING_USERNAME = process.env.MAILING_USERNAME || 'username'
