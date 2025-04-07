import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744029208267 implements MigrationInterface {
    name = 'Init1744029208267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_state_enum" AS ENUM('LAMBDA', 'MAIN_MENU')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" bigint NOT NULL, "state" "public"."user_state_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_state_enum"`);
    }

}
