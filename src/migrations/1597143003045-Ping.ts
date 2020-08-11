import {MigrationInterface, QueryRunner} from "typeorm";

export class Ping1597143003045 implements MigrationInterface {
    name = 'Ping1597143003045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ping" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "ip" character varying NOT NULL, CONSTRAINT "PK_b01cab9d614b77bac5973937663" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ping"`);
    }

}
