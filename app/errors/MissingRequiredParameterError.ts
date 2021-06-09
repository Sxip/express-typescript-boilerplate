import { HTTPErrorContract } from '../shared/contracts'
import { HTTPError } from './HTTPError'

export class MissingRequiredParameterError extends HTTPError {
  /**
   * @constructor
   * @param {Object} options
   * @param {string} [options.message='Missing required parameters'] - The error's message.
   * @param {Object} options.info - The error's info.
   */
  constructor ({ message = 'Missing required parameters', info }: HTTPErrorContract = {}) {
    super({ name: 'missing_required_parameter', message, info, status: 400 })
  }
}
