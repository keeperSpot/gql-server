import { Server } from 'server';
import { Connection } from 'typeorm';
import { Product } from '../product.entity';
import {Brand} from '../brand.entity';
import {Variant} from '../variant.entity';
import arrayContaining = jasmine.arrayContaining;
import { User } from '../user.entity';

let conn: Connection;

beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const createBrand =async (name,description,country)=>{
    const brand = new Brand();
    brand.name = name;
    brand.description = description;
    brand.country = country;

    await brand.save()

    return brand
}

const createVariant =async (name,barcode,price,sku)=>{
    const variant = new Variant();
    variant.name = name
    variant.barcode = barcode
    variant.price = price
    variant.sku = sku
    variant.details = {size:'23',activated:true,shortDescription:'ashaksdfh'}
    await variant.save()

    return variant
}

const createProduct =async (name,brand,container,country,variant) => {
    const product = new Product();

    product.name = name
    product.brand = brand
    product.containerType = container
    product.country = country
    product.variant = variant
    await product.save()
    return product
}

describe('Product Test', () => {

    test('product addition', async () => {
        const variant = await createVariant('Nokia 8081 3GB | 32GB',
            'Ggg Asher',3000,'CellPhone')

        const variant2 = await createVariant('Nokia 8081 4GB | 64GB',
            'Ggg Asher',5000,'CellPhone')

        const brand = await createBrand('Nokia','Connecting People','IND')
        await createProduct('Nokia 8081',brand,'EN','IND',[variant,variant2])

        const newProduct = await Product.findOne({where:{name:'Nokia 8081'},relations:['variant','brand']})
        expect(newProduct.name).toEqual('Nokia 8081');

    });

    test('Finding by Brand', async () => {
        const variant = await createVariant('Nokia! 8081 3GB | 32GB',
            'Ggg Asher',3000,'CellPhone')

        const variant2 = await createVariant('Nokia! 8081 4GB | 64GB',
            'Ggg Asher',5000,'CellPhone')

        const variant3 = await createVariant('Nokia! 8281 4GB | 64GB',
            'Ggg Asher',6000,'CellPhone')

        const brand = await createBrand('Nokia!','Connecting People','IND')
        await createProduct('Nokia! 8081',brand,'EN','IND',[variant,variant2])
        await createProduct('Nokia! 8281',brand,'EN','IND',[variant3])

        const newBrand =  await  Brand.findOne({where:{name:'Nokia!'},relations:['product']})
        expect(newBrand.name).toEqual('Nokia!');
        expect(newBrand.product.some(Item=>(Item.name==='Nokia! 8081'))).toEqual(true)
    });

    test('Finding by Variant', async () => {
        const variant = await createVariant('Nokia2 8081 3GB | 32GB',
            'Ggg Asher',3000,'CellPhone')

        const variant2 = await createVariant('Nokia2 8081 4GB | 64GB',
            'Ggg Asher',5000,'CellPhone')

        const brand = await createBrand('Nokia2','Connecting People','IND')
        await createProduct('Nokia2 8081',brand,'EN','IND',[variant,variant2])

        const newVariant =  await  Variant.findOne({where:{name:'Nokia2 8081 4GB | 64GB'},relations:['product',]})
        expect(newVariant.name).toEqual('Nokia2 8081 4GB | 64GB');
        expect(newVariant.product.name).toEqual('Nokia2 8081');
    });

});
