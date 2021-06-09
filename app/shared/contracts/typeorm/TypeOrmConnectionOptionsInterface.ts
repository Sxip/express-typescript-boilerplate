import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

/**
 * Connection options interface.
 * 
 * @interface
 */
export interface TypeOrmConnectionOptionsInterfaceContract extends PostgresConnectionOptions {
  readonly seeds: string[]
  readonly factories: string[]
}
