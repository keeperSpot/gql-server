import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddCategories1598027525954 implements MigrationInterface {
    name = 'AddCategories1598027525954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" DROP COLUMN "parent"');
        await queryRunner.query('ALTER TABLE "category" ADD "parentId" uuid');
        await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "UQ_652a15c02538138f021f1320de8"');
        await queryRunner.query('ALTER TABLE "category" ADD CONSTRAINT "UQ_03fcdc62f478303d3621b06c917" UNIQUE ("representation")');
        await queryRunner.query('ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"');
        await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "UQ_03fcdc62f478303d3621b06c917"');
        await queryRunner.query('ALTER TABLE "category" ADD CONSTRAINT "UQ_652a15c02538138f021f1320de8" UNIQUE ("code")');
        await queryRunner.query('ALTER TABLE "category" DROP COLUMN "parentId"');
        await queryRunner.query('ALTER TABLE "category" ADD "parent" character varying NOT NULL');
    }

}
