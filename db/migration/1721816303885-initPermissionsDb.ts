import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class InitPermissionsDb1721816303885 implements MigrationInterface {
    name = 'initPermissionsDb1721816303885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'actions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: 'resource',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: 'permissions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'action_id',
                    type: 'uuid'
                },
                {
                    name: 'resource_id',
                    type: 'uuid'
                }
            ]
        }));
        await queryRunner.createForeignKey('permissions', new TableForeignKey({
            columnNames: ['action_id'],
            referencedTableName: 'actions',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('permissions', new TableForeignKey({
            columnNames: ['resource_id'],
            referencedTableName: 'resource',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissions', 'FK_action_id');
        await queryRunner.dropForeignKey('permissions', 'FK_resource_id');
        await queryRunner.dropTable('permissions');
        await queryRunner.dropTable('resource');
        await queryRunner.dropTable('actions');
    }

}
