import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { verify } from 'argon2'
import { RefreshToken } from './token'

@Entity('users')
export class User extends BaseEntity {
  /**
   * User primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * Username column.
   * 
   * @public
   */
  @Column()
  public readonly username!: string

  /**
   * Password column.
   * 
   * @public
   */
  @Column({ select: false })
  public readonly password!: string

  /**
   * Email column.
   * 
   * @public
   */
  @Column()
  public readonly email!: string

  /**
   * Avatar column.
   * 
   * @public
   */
  @Column()
  public readonly avatar!: string

  /**
   * Refresh token relation.
   * 
   * @public
   */
  @OneToMany(() => RefreshToken,
    token => token.userId
  )
  public readonly refreshTokens!: RefreshToken[]

  /**
   * Attempts to authenticate a user.
   * 
   * @pram username
   * @pram password
   * @public
   */
  public static async authenticate (username: string, password: string): Promise<User | null> {
    const user = await User.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne()

    if (!user) return null

    const verifyPassword = await verify(user.password, password)
    if (verifyPassword) return user
    return null
  }
}
