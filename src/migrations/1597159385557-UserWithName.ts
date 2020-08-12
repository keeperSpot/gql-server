import {MigrationInterface, QueryRunner} from "typeorm";

export class UserWithName1597159385557 implements MigrationInterface {
    name = 'UserWithName1597159385557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
