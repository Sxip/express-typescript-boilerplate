import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { TypeOrmConnectionOptionsInterfaceContract } from './app/shared/contracts'
import { DATABASE_DB, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } from './config'

/**
 * Orm configuration.
 * 
 * @constant
 */
const ormconfig: TypeOrmConnectionOptionsInterfaceContract = {
  type: 'postgres',
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  logging: false,
  synchronize: false,
  entities: [
    'database/entities/**/*.{ts,js}',
  ],
  subscribers: [
    'database/subscribers/*.{ts,js}',
  ],
  migrations: [
    'database/migrations/*.{ts,js}',
  ],
  seeds: [
    'database/seeds/*.{ts,js}',
  ],
  factories: [
    'database/factories/*.{ts,js}',
  ],
  cli: {
    entitiesDir: 'database/entities',
    migrationsDir: 'database/migrations',
    subscribersDir: 'database/subscribers',
  },
  namingStrategy: new SnakeNamingStrategy(),
}

module.exports = ormconfig
