import { HTTPErrorContract } from '../shared/contracts'
import { HTTPError } from './HTTPError'

export class BadCredentialsError extends HTTPError {
  /**
   * Constructor.
   * 
   * @constructor
   */
  constructor ({ message = 'Bad credentials', info }: HTTPErrorContract = {}) {
    super({ name: 'bad_credentials', message, info, status: 401 })
  }
}
