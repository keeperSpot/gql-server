import {MigrationInterface, QueryRunner} from 'typeorm';

export class ResettingMigration1597828007418 implements MigrationInterface {
    name = 'ResettingMigration1597828007418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" ADD "price" character varying NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "price"');
    }

}
