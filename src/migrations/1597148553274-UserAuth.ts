import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAuth1597148553274 implements MigrationInterface {
    name = 'UserAuth1597148553274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ping" RENAME COLUMN "time" TO "created"`);
        await queryRunner.query(`CREATE TABLE "phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "country" character varying NOT NULL DEFAULT '91', "number" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "UQ_7d5e2c8e3159f5711aa37bb134e" UNIQUE ("number"), CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "UQ_cb31da999c9c3a752470c3cfa7d" UNIQUE ("verified"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_13e97b4a1d6074fd75ea1bb844e"`);
        await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(`DROP TABLE "phone"`);
        await queryRunner.query(`ALTER TABLE "ping" RENAME COLUMN "created" TO "time"`);
    }

}
