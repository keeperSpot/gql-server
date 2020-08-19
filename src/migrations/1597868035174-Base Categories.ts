import {MigrationInterface, QueryRunner} from 'typeorm';

export class BaseCategories1597868035174 implements MigrationInterface {
    name = 'BaseCategories1597868035174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "representation" character varying NOT NULL, "parent" character varying NOT NULL, CONSTRAINT "UQ_652a15c02538138f021f1320de8" UNIQUE ("code"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "domain" character varying, "_slug" character varying NOT NULL, "name" character varying NOT NULL, "address" text NOT NULL, "ownerId" uuid, CONSTRAINT "UQ_07a78dd92833e563f17205e3bd5" UNIQUE ("_slug"), CONSTRAINT "REL_28fb7269a26c4e112e151e46f5" UNIQUE ("ownerId"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"');
        await queryRunner.query('DROP TABLE "shop"');
        await queryRunner.query('DROP TABLE "category"');
    }

}
