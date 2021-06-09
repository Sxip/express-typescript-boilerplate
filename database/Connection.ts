import { Connection, createConnection } from 'typeorm'

/**
 * Creates a database connection.
 * 
 * @public
 */
export function connection (): Promise<Connection> {
  return createConnection()
}
