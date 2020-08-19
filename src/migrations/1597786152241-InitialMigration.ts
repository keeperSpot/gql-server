import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialMigration1597786152241 implements MigrationInterface {
    name = 'InitialMigration1597786152241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "ping" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "ip" character varying NOT NULL, CONSTRAINT "PK_b01cab9d614b77bac5973937663" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "country" character varying NOT NULL DEFAULT \'91\', "number" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "UQ_7d5e2c8e3159f5711aa37bb134e" UNIQUE ("number"), CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "UQ_fee9013b697946e8129caba8983" UNIQUE ("email"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "domain" character varying, "_slug" character varying NOT NULL, "name" character varying NOT NULL, "address" text NOT NULL, "ownerId" uuid, CONSTRAINT "UQ_07a78dd92833e563f17205e3bd5" UNIQUE ("_slug"), CONSTRAINT "REL_28fb7269a26c4e112e151e46f5" UNIQUE ("ownerId"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "phone" ADD CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "email" ADD CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "shop" ADD CONSTRAINT "FK_28fb7269a26c4e112e151e46f50" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "shop" DROP CONSTRAINT "FK_28fb7269a26c4e112e151e46f50"');
        await queryRunner.query('ALTER TABLE "email" DROP CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e"');
        await queryRunner.query('ALTER TABLE "phone" DROP CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6"');
        await queryRunner.query('DROP TABLE "shop"');
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP TABLE "email"');
        await queryRunner.query('DROP TABLE "phone"');
        await queryRunner.query('DROP TABLE "ping"');
    }

}
