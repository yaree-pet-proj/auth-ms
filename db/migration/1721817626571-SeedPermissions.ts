import { MigrationInterface, QueryRunner } from "typeorm";
import {ActionsEntity} from "../../src/entity/actions.entity";

export class SeedPermissions1721817626571 implements MigrationInterface {
    name = 'SeedPermissions1721817626571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(ActionsEntity).save([
            { name: 'create' },
            { name: 'read' },
            { name: 'update' },
            { name: 'delete' },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(ActionsEntity).delete({});
    }

}
