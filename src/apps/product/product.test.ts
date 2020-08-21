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

    test('product', async () => {


        const variant = await createVariant('Nokia 8081 3GB | 32GB',
            'Ggg Asher',3000,'CellPhone')

        const variant2 = await createVariant('Nokia 8081 4GB | 64GB',
            'Ggg Asher',5000,'CellPhone')

        const brand = await createBrand('Nokia','Connecting People','IND')
        await createProduct('Nokia 8081',brand,'EN','IND',[variant,variant2])

        const newProduct = await Product.findOne({where:{name:'Nokia 8081'},relations:['variant','brand']})
        expect(newProduct.name).toEqual('Nokia 8081');

        const newBrand =  await  Brand.findOne({where:{name:'Nokia'}})
        const newVariant =  await  Variant.findOne({where:{name:'Nokia 8081 4GB | 64GB'},relations:['product',]})
        const newProduct1 = await Product.findOne({where:{brand:newBrand},relations:['variant','brand']})



        console.log(newVariant,newBrand)

        // const isVariant1
        // expect(newProduct.variant[0]).toEqual(variant)
        // expect(newProduct.variant[1]).toEqual(variant2)
    });

    test('product finding', async () => {
        const brand = new Brand();
        brand.name = 'Nokia1';
        brand.description = 'Connecting People1';
        brand.country = 'IND';

        const variant = new Variant();
        variant.name = 'Nokia1 8081 3GB | 32GB'
        variant.barcode = 'Ggg Ashejhgr'
        variant.price = 3000
        variant.sku = 'CellPhone'

        const variant2 = new Variant();

        variant2.name = 'Nokia1 8081 4GB | 64GB'
        variant2.barcode = 'Gggghjg Asher'
        variant2.price = 5000
        variant2.sku = 'CellPhonejhg'


        const product = new Product();

        product.name = 'Nokia1 8081'
        product.brand = brand
        product.containerType = 'EN'
        product.country = 'IND'
        product.variant = [variant,variant2]

        await product.save()

        const product1 =  await Product.findOne({brand:{name:'Nokia1 8081 4GB | 64GB'}})
        const product2 =  await Product.findOne({variant:[{name:'Nokia 8081 4GB | 64GB'}]})
            expect(product1.brand.name).toEqual('Nokia1')
            expect(product2.variant[1].name).toEqual('Nokia 8081 4GB | 64GB')
    });
});
