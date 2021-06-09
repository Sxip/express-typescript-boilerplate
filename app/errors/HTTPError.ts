import { WError, VError, Info } from 'verror'
import { HTTPErrorContract } from '@/contracts'

export class HTTPError extends WError {
  /**
   * Http status code.
   * 
   * @public
   */
  public readonly status: number

  /**
   * Http info.
   * 
   * @public
   */
  public readonly info?: Info

  /**
   * Is http error.
   * 
   * @public
   */
  public readonly isHTTPError: boolean

  /**
   * Can be used to signal if message should be sent to the client.
   * 
   * @public
   */
  public readonly expose: boolean

  /**
   * Constructor.
   * 
   * @param options
   * @public
   */
  // eslint-disable-next-line max-len
  public constructor ({ cause, name, message = 'Http error', info, status = 404, expose = true }: HTTPErrorContract) {
    super({ cause, message, name, info }, message)

    this.isHTTPError = true
    this.status = status
    this.expose = expose
    this.info = info
  }

  /**
   * A string containing the full stack trace.
   * 
   * @public
   */
  public fullStack (): string {
    return VError.fullStack(this)
  }
}
