import { QueueHandlerContract } from '@/contracts'
import { Job } from 'bull'

export class RegisterMailingQueue implements QueueHandlerContract {
  /**
   * Queue name.
   */
  public readonly name = 'REGISTER_MAILING_QUEUE'

  /**
   * Handles the queue process.
   * 
   * @returns {void}
   */
  public handle (): void {
    console.log('Yeep')
  }

  /**
   * Handles the completed job.
   * 
   * @returns {void}
   */
  public complete (job: Job, e: Error): void {
    console.log('Job complete!')
    console.log(e)
  }

  /**
   * Handles the failed queue.
   * 
   * @returns {void}
   */
  public failed (): void {
    console.log('Job failed!')
  }
}
