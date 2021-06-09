import { User } from '../models/user'
import { hash } from 'argon2'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreateUsersSeed implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'sxip',
          password: await hash('password'),
          avatar: `https://api.hello-avatar.com/adorables/${Math.random()}`,
          email: 'hello@sxip.dev',
        },
      ])
      .execute()
  }
}
