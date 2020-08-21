import {MigrationInterface, QueryRunner} from 'typeorm';

export class ProductEntityNew41597931866358 implements MigrationInterface {
    name = 'ProductEntityNew41597931866358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "brand" ALTER COLUMN "isIndian" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "product" ALTER COLUMN "isIndian" DROP NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" ALTER COLUMN "isIndian" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "brand" ALTER COLUMN "isIndian" SET NOT NULL');
    }

}
