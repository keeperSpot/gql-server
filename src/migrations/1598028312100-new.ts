import {MigrationInterface, QueryRunner} from 'typeorm';

export class new1598028312100 implements MigrationInterface {
    name = 'new1598028312100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "variant" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "variant" ADD "name" character varying(225) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "variant" DROP COLUMN "name"');
        await queryRunner.query('ALTER TABLE "variant" ADD "name" character varying(21) NOT NULL');
    }

}
