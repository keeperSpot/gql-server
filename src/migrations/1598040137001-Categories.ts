import {MigrationInterface, QueryRunner} from 'typeorm';

export class Categories1598040137001 implements MigrationInterface {
    name = 'Categories1598040137001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "representation" character varying NOT NULL, "parentId" uuid, CONSTRAINT "UQ_03fcdc62f478303d3621b06c917" UNIQUE ("representation"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"');
        await queryRunner.query('DROP TABLE "category"');
    }

}
