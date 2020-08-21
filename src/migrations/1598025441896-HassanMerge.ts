import {MigrationInterface, QueryRunner} from 'typeorm';

export class HassanMerge1598025441896 implements MigrationInterface {
    name = 'HassanMerge1598025441896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "product" ADD "name" character varying(255) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "product" ADD "name" character varying NOT NULL');
    }

}
