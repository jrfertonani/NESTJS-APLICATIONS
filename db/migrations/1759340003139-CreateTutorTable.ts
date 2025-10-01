import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTutorTable1759340003139 implements MigrationInterface {
    name = 'CreateTutorTable1759340003139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
             await queryRunner.query(`DROP TABLE "tutor"`);
    }

}
