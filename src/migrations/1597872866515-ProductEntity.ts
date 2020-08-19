import {MigrationInterface, QueryRunner} from 'typeorm';

export class ProductEntity1597872866515 implements MigrationInterface {
    name = 'ProductEntity1597872866515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(225) NOT NULL, "description" character varying, "country" character varying(3) NOT NULL, "isIndian" boolean NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(21) NOT NULL, "price" integer NOT NULL, "sku" character varying(49) NOT NULL, "barcode" character varying(255), "isIndian" boolean, "productId" uuid, CONSTRAINT "PK_f8043a8a34fa021a727a4718470" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(255) NOT NULL, "containerType" character varying(2) NOT NULL, "country" character varying(3), "isIndian" boolean NOT NULL, "brandId" uuid, CONSTRAINT "REL_bb7d3d9dc1fae40293795ae39d" UNIQUE ("brandId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "variant" ADD CONSTRAINT "FK_cb0df5c8d79ac0ea08a87119673" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"');
        await queryRunner.query('ALTER TABLE "variant" DROP CONSTRAINT "FK_cb0df5c8d79ac0ea08a87119673"');
        await queryRunner.query('DROP TABLE "product"');
        await queryRunner.query('DROP TABLE "variant"');
        await queryRunner.query('DROP TABLE "brand"');
    }

}
