import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedEmailUnique1597162342591 implements MigrationInterface {
    name = 'FixedEmailUnique1597162342591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "UQ_fee9013b697946e8129caba8983" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "UQ_cb31da999c9c3a752470c3cfa7d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "UQ_cb31da999c9c3a752470c3cfa7d" UNIQUE ("verified")`);
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "UQ_fee9013b697946e8129caba8983"`);
    }

}
