import { HTTPErrorContract } from '../shared/contracts'
import { HTTPError } from './HTTPError'

export class InternalServerError extends HTTPError {
  /**
   * @constructor
   * 
   * @public
   */
  constructor ({ cause, message = 'Internal error server', info }: HTTPErrorContract = {}) {
    super({
      cause,
      name: 'internal_server',
      message,
      info,
      status: 500,
      expose: false,
    })
  }
}
