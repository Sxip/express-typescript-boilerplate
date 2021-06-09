import { HTTPErrorContract } from '../shared/contracts'
import { HTTPError } from './HTTPError'

export class ExpiredTokenError extends HTTPError {
  /**
   * @constructor
   * @param {Object} options
   * @param {string} [options.message='Expired token'] - The error's message.
   * @param {Object} options.info - The error's info.
   */
  constructor ({ message = 'Expired token', info }: HTTPErrorContract = {}) {
    super({ name: 'expired_token', message, info, status: 401 })
  }
}
