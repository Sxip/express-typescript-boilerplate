import { HTTPErrorContract } from '@/contracts'
import { HTTPError } from './HTTPError'

export class InvalidTokenError extends HTTPError {
  /**
   * Constructor.
   * 
   * @public
   */
  constructor ({ message = 'Invalid token', info }: HTTPErrorContract = {}) {
    super({ name: 'invalid_token', message, info, status: 401 })
  }
}
