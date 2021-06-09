import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateRefreshTokens1610648834655 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'refresh_tokens',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'token',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'expires_at',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'user_id',
          type: 'bigint',
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
    }), true)

    /**
     * Creates a foreign key for refresh tokens.
     */
    return queryRunner.createForeignKey('refresh_tokens', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('refresh_tokens')
  }
}
