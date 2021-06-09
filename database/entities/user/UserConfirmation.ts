import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './index'

@Entity('users_confirmations')
export class UserConfirmation extends BaseEntity {
  /**
   * Confirmation primary key.
   *
   * @public
   */
  @PrimaryColumn()
  public readonly userId!: number

  /**
   * Completed  column.
   *
   * @public
   */
  @Column()
  public readonly completed!: boolean

  /**
   * Key column.
   *
   * @public
   */
  @Column()
  public readonly key!: string

  /**
   * User relation.
   *
   * @public
   */
  @OneToOne(() => User)
  @JoinColumn()
  public readonly user!: User
}
