import {MigrationInterface, QueryRunner} from 'typeorm';

export class ProductEntityNew47651597937510822 implements MigrationInterface {
    name = 'ProductEntityNew47651597937510822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "brand" DROP COLUMN "isIndian"');
        await queryRunner.query('ALTER TABLE "variant" DROP COLUMN "isIndian"');
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "isIndian"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" ADD "isIndian" boolean');
        await queryRunner.query('ALTER TABLE "variant" ADD "isIndian" boolean');
        await queryRunner.query('ALTER TABLE "brand" ADD "isIndian" boolean');
    }

}
