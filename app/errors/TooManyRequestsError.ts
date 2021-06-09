import { HTTPErrorContract } from '../shared/contracts'
import { HTTPError } from './HTTPError'

export class TooManyRequestsError extends HTTPError {
  /**
   * Constructor.
   * 
   * @constructor
   */
  constructor ({ message = 'Too many requests, please try again later.', info }: HTTPErrorContract = {}) {
    super({ name: 'too_many_requests', message, info, status: 429 })
  }
}
