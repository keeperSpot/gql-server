import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddedJson1598014140138 implements MigrationInterface {
    name = 'AddedJson1598014140138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "variant" ADD "details" json NOT NULL');
        await queryRunner.query('ALTER TABLE "brand" ADD "productId" uuid');
        await queryRunner.query('ALTER TABLE "brand" ADD CONSTRAINT "UQ_0db442cf192b23eb920b5b6d593" UNIQUE ("productId")');
        await queryRunner.query('ALTER TABLE "brand" ADD CONSTRAINT "FK_0db442cf192b23eb920b5b6d593" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "brand" DROP CONSTRAINT "FK_0db442cf192b23eb920b5b6d593"');
        await queryRunner.query('ALTER TABLE "brand" DROP CONSTRAINT "UQ_0db442cf192b23eb920b5b6d593"');
        await queryRunner.query('ALTER TABLE "brand" DROP COLUMN "productId"');
        await queryRunner.query('ALTER TABLE "variant" DROP COLUMN "details"');
    }

}
