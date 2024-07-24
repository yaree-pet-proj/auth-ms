import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPermissions1721816303885 implements MigrationInterface {
    name = 'initPermissionsDb1721816303885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resource_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_8df40c9e2ce0ce05d3a65347a80" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "actions_entity" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_bc13b73e5b8841da7e41f9d3120" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "permissions_entity" ("id" varchar PRIMARY KEY NOT NULL, "action_id" varchar, "resource_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_permissions_entity" ("id" varchar PRIMARY KEY NOT NULL, "action_id" varchar, "resource_id" varchar, CONSTRAINT "FK_da2c04f0a4fb9ef4c949a2e1959" FOREIGN KEY ("action_id") REFERENCES "actions_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4dcbffbc2ca251b70642d4d189e" FOREIGN KEY ("resource_id") REFERENCES "resource_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_permissions_entity"("id", "action_id", "resource_id") SELECT "id", "action_id", "resource_id" FROM "permissions_entity"`);
        await queryRunner.query(`DROP TABLE "permissions_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_permissions_entity" RENAME TO "permissions_entity"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions_entity" RENAME TO "temporary_permissions_entity"`);
        await queryRunner.query(`CREATE TABLE "permissions_entity" ("id" varchar PRIMARY KEY NOT NULL, "action_id" varchar, "resource_id" varchar)`);
        await queryRunner.query(`INSERT INTO "permissions_entity"("id", "action_id", "resource_id") SELECT "id", "action_id", "resource_id" FROM "temporary_permissions_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_permissions_entity"`);
        await queryRunner.query(`DROP TABLE "permissions_entity"`);
        await queryRunner.query(`DROP TABLE "actions_entity"`);
        await queryRunner.query(`DROP TABLE "resource_entity"`);
    }

}
