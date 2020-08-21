import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Product } from '../product.entity';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


const $product = () => `
    query {
        product{name}
    }
`;
const $addProduct =({ name }) =>`
    mutation {
        addProduct(name:"${name}"){
            name
            id
        }
    }
`
describe('product test', () => {
    test('addproduct query', async () => {
        const client = new TestClient();
        const { name } = TestClient.createCredentials();
        const { addProduct } = await client.query($addProduct({ name }));
        expect(addProduct.name).toEqual(name);
    });

    test('addproduct db addition', async () => {
        const client = new TestClient();
        const { name } = TestClient.createCredentials();
        const { addProduct: { id } } = await client.query($addProduct({ name }));
        const product = await Product.findOne({ id:id })
        expect(product.name).toEqual(name);
    });

    // test('product db addition', async () => {
    //     const client = new TestClient();
    //     const count = await Product.count();
    //     const { product } = await client.query($product());
    //     expect(product).toEqual(Product.find());

    //     const newCount = await Product.count();
    //     expect(count + 1).toEqual(newCount);
    // });
});
