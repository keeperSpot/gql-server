import { Server } from 'server';
import { Connection } from 'typeorm';
import { Product } from './product.entity';
import { TestClient } from '../../server/client';


let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const $products = () => `
    query{
           products{
             name
             price
           }
    }
`;


const $addProduct = ({ name,price }) => `
    mutation {
        addProduct(name: "${name}", price: "${price}") {
        name
        price
    }
`;



describe('products',()=>{
    test('fetch products', async () => {
        const client = new TestClient();
        const count =await Product.count();
        const {products} = await client.query($products());
        expect(count).toEqual(products.length);
    });

   //  test('after add product',async()=>{
   //      const client = new TestClient();
   //      const {name} = await client.query($addProduct({
   //          name: 'default',
   //          price: '111',
   //      }));
   //      console.log(name);
   //      expect(name).toEqual('default');
   // })
})