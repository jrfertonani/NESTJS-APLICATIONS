import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnimalTable1759340053746 implements MigrationInterface {
    name = 'CreateAnimalTable1759340053746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer, CONSTRAINT "FK_c4b7ef1b97799c67d0643770fea" FOREIGN KEY ("tutorId") REFERENCES "tutor" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_animal"("id", "name", "tutorId") SELECT "id", "name", "tutorId" FROM "animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`ALTER TABLE "temporary_animal" RENAME TO "animal"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" RENAME TO "temporary_animal"`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer)`);
        await queryRunner.query(`INSERT INTO "animal"("id", "name", "tutorId") SELECT "id", "name", "tutorId" FROM "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "temporary_animal"`);
        await queryRunner.query(`DROP TABLE "animal"`);
    }

}
