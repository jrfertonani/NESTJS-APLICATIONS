import { MigrationInterface, QueryRunner } from "typeorm";

export class NovaMudanca1760467736701 implements MigrationInterface {
    name = 'NovaMudanca1760467736701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer, "especie" varchar CHECK( "especie" IN ('cachorro','cavalo','gato','passarinho','peixe') ) DEFAULT ('cachorro'), "raca" varchar NOT NULL DEFAULT ('Desconhecida'), "idade" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_22cfa8368debb7a89ff6a97a3fa" FOREIGN KEY ("tutorId") REFERENCES "tutor" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pet"("id", "name", "tutorId", "especie", "raca", "idade", "created_at", "updated_at") SELECT "id", "name", "tutorId", "especie", "raca", "idade", "created_at", "updated_at" FROM "pet"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`ALTER TABLE "temporary_pet" RENAME TO "pet"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" RENAME TO "temporary_pet"`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tutorId" integer, "especie" varchar CHECK( "especie" IN ('cachorro','cavalo','gato','passarinho','peixe') ) DEFAULT ('cachorro'), "raca" varchar NOT NULL DEFAULT ('Desconhecida'), "idade" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_22cfa8368debb7a89ff6a97a3fa" FOREIGN KEY ("tutorId") REFERENCES "tutor" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pet"("id", "name", "tutorId", "especie", "raca", "idade", "created_at", "updated_at") SELECT "id", "name", "tutorId", "especie", "raca", "idade", "created_at", "updated_at" FROM "temporary_pet"`);
        await queryRunner.query(`DROP TABLE "temporary_pet"`);
    }

}
