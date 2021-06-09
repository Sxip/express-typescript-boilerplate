import { Job } from 'bull'

export interface QueueHandlerContract {
  readonly name: string
  handle<T>(data: Job<T>): any
  complete<T>(job: Job<T>, result: any): any
  failed<T>(job: Job<T>, e: Error): any
}
