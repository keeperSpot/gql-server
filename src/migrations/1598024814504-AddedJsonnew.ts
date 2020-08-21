import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddedJsonnew1598024814504 implements MigrationInterface {
    name = 'AddedJsonnew1598024814504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "containerType"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "country"');
        await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "REL_bb7d3d9dc1fae40293795ae39d"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "brandId"');
        await queryRunner.query('ALTER TABLE "product" ADD "containerType" character varying(2) NOT NULL');
        await queryRunner.query('ALTER TABLE "product" ADD "country" character varying(3)');
        await queryRunner.query('ALTER TABLE "product" ADD "brandId" uuid');
        await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "UQ_bb7d3d9dc1fae40293795ae39d6" UNIQUE ("brandId")');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "product" ADD "name" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "product" ADD "name" character varying(255) NOT NULL');
        await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "UQ_bb7d3d9dc1fae40293795ae39d6"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "brandId"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "country"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "containerType"');
        await queryRunner.query('ALTER TABLE "product" ADD "brandId" uuid');
        await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "REL_bb7d3d9dc1fae40293795ae39d" UNIQUE ("brandId")');
        await queryRunner.query('ALTER TABLE "product" ADD "country" character varying(3)');
        await queryRunner.query('ALTER TABLE "product" ADD "containerType" character varying(2) NOT NULL');
        await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
