import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePetsTable1759349322371 implements MigrationInterface {
  name = 'CreatePetsTable1759349322371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer, CONSTRAINT "FK_22cfa8368debb7a89ff6a97a3fa" FOREIGN KEY ("tutorId") REFERENCES "tutor" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pet"("id", "name", "tutorId") SELECT "id", "name", "tutorId" FROM "pet"`,
    );
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`ALTER TABLE "temporary_pet" RENAME TO "pet"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" RENAME TO "temporary_pet"`);
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "pet"("id", "name", "tutorId") SELECT "id", "name", "tutorId" FROM "temporary_pet"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pet"`);
    await queryRunner.query(`DROP TABLE "pet"`);
  }
}
