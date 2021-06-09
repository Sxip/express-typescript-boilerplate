import { User } from '@/entities'
import { FindOneOptions } from 'typeorm'

export class UserService {
  /**
   * Finds a user by their username.
   * 
   * @param username 
   * @public
   */
  public static async findUserByUsername (username: string, options?: FindOneOptions<User>): Promise<User | null> {
    const user = await User.findOne({ where: { username }, ...options })
    if (!user) return null
    return user
  }

  /**
   * Finds a user by their id.
   * 
   * @param id 
   * @public
   */
  public static async findUserById (id: number): Promise<User | null> {
    const user = await User.findOne(id)
    if (!user) return null
    return user
  }
}
