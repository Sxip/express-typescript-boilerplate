import { ENV, PORT } from 'config'

import '@/app/Server'
import Queue from '@/app/Queue'
import { connection as DatabaseConnection } from '@/database'
import { connection as RedisConnection } from '@/app/Redis'
import Logger from '@/app/Logger'

/**
 * Initializes the application.
 *
 * @function
 */
(async () => {
  // console.clear()

  try {
    console.log('----------------------------------------')
    console.info(`Environment: ${ENV}`)
    console.info(`Base URL: http://localhost:${PORT}/api/v1`)
    console.log('----------------------------------------')

    await DatabaseConnection()
    await RedisConnection()

    Queue.process()
    console.log('🚀 Queues have stated!')
  } catch (error) {
    Logger.error(`Initializing failed! Reason: ${error.stack}`)
  }
})()
