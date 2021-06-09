import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '..'

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  /**
   * Refresh token primary key.
   *
   * @public
   */
  @PrimaryGeneratedColumn()
  public readonly id!: number

  /**
   * Token column.
   * 
   * @public
   */
  @Column()
  public readonly token!: string

  /**
   * Expires at column.
   * 
   * @public
   */
  @Column()
  public readonly expiresAt!: Date

  /**
   * User id column.
   * 
   * @public
   */
  @Column()
  public readonly userId!: number

  /**
   * User relation.
   */
  @OneToOne(() => User)
  @JoinColumn()
  public readonly user!: User
}
