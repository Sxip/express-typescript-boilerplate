import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateUsersConfirmations1610731682578 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users_confirmations',
      columns: [
        {
          name: 'user_id',
          type: 'bigint',
          isNullable: false,
        },
        {
          name: 'completed',
          type: 'boolean',
          isNullable: false,
        },
        {
          name: 'key',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
      ],
    }))

    /**
     * Creates a foreign key for users confirmations.
     */
    return queryRunner.createForeignKey('users_confirmations', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users_confirmations')
  }
}
