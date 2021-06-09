import Queue, { Job } from 'bull'

import * as jobs from '@/queues'
import {
  QUEUE_LIMITER_BOUNCEBACK,
  QUEUE_LIMITER_DURATION,
  QUEUE_LIMITER_MAX,
  REDIS_HOST,
  REDIS_PORT,
} from 'config'

import { QueueHandlerContract } from './shared/contracts'

/**
 * Queues.
 * 
 * @constant
 */
const queues = Object.values(jobs)
  .map(Job => {
    const job = new Job() as QueueHandlerContract

    return {
      bull: new Queue(job.name, {
        redis: {
          host: REDIS_HOST,
          port: Number(REDIS_PORT),
        },
        limiter: {
          max: QUEUE_LIMITER_MAX,
          duration: QUEUE_LIMITER_DURATION,
          bounceBack: QUEUE_LIMITER_BOUNCEBACK,
        },
        defaultJobOptions: {
          removeOnComplete: true,
        },
      }),
      instance: job,
      name: job.name,
      handle: job?.handle,
      complete: job?.complete,
      failed: job?.failed,
    }
  })

export default {
  queues,

  /**
   * Add to a queue.
   * 
   * @param name 
   * @param data 
   * @public
   */
  add (name: string, data: Record<string, unknown>): Promise<Job> {
    const queue = this.queues.find(value => value.name === name)
    return queue!.bull.add(data)
  },

  /**
   * Process the queues.
   * 
   * @public
   */
  process (): void {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle.bind(queue.instance))

      // Queue events
      queue.bull.on('completed', queue.complete.bind(queue.instance))
      queue.bull.on('failed', queue.failed.bind(queue.instance))
    })
  },
}
