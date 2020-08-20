import { Server } from 'server';
import { Connection } from 'typeorm';
import { Product } from '../product.entity';
import {Brand} from '../brand.entity';
import {Variant} from '../variant.entity';

let conn: Connection;

beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


describe('Product Test', () => {

    test('product', async () => {
        const brand = new Brand();
        brand.name = 'Nokia';
        brand.description = 'Connecting People';
        brand.country = 'IND';
        brand.isIndian = await brand.setIsIndian()

        // create a photo metadata
        const variant = new Variant();
        variant.name = 'Nokia 8081 3GB | 32GB'
        variant.barcode = 'Ggg Asher'
        variant.price = 3000
        variant.sku = 'CellPhone'
        variant.isIndian = await brand.setIsIndian()

        const variant2 = new Variant();

        variant2.name = 'Nokia 8081 4GB | 64GB'
        variant2.barcode = 'Ggg Asher'
        variant2.price = 5000
        variant2.sku = 'CellPhone'
        variant2.isIndian = await brand.setIsIndian()


        const product = new Product();

        product.name = 'Nokia 8081'
        product.brand = brand
        product.containerType = 'EN'
        product.country = 'IND'
        product.variant = [variant,variant2]

        await product.save()

        const newProduct = await Product.findOne({name:product.name})
        expect(newProduct.name).toEqual('Nokia 8081');
        expect(newProduct.variant[0]).toEqual(variant)
        expect(newProduct.variant[1]).toEqual(variant2)
    });

    test('product finding', async () => {
        const brand = new Brand();
        brand.name = 'Nokia1';
        brand.description = 'Connecting People1';
        brand.country = 'IND';
        brand.isIndian = await brand.setIsIndian()

        const variant = new Variant();
        variant.name = 'Nokia1 8081 3GB | 32GB'
        variant.barcode = 'Ggg Ashejhgr'
        variant.price = 3000
        variant.sku = 'CellPhone'
        variant.isIndian = await brand.setIsIndian()

        const variant2 = new Variant();

        variant2.name = 'Nokia1 8081 4GB | 64GB'
        variant2.barcode = 'Gggghjg Asher'
        variant2.price = 5000
        variant2.sku = 'CellPhonejhg'
        variant2.isIndian = await brand.setIsIndian()


        const product = new Product();

        product.name = 'Nokia1 8081'
        product.brand = brand
        product.containerType = 'EN'
        product.country = 'IND'
        product.variant = [variant,variant2]
        product.isIndian = await brand.setIsIndian()

        await product.save()

        const product1 =  await Product.findOne({brand:{name:'Nokia1 8081 4GB | 64GB'}})
        const product2 =  await Product.findOne({variant:[{name:'Nokia 8081 4GB | 64GB'}]})
            expect(product1.brand.name).toEqual('Nokia1')
            expect(product2.variant[1].name).toEqual('Nokia 8081 4GB | 64GB')

    });
});
