import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Shop } from 'apps/shop.entity';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
})

const $allShop = () => `
    query {
        allShop{
            name
        }
    }
`;

const $addShop =( name: string , slug:string , address:string ) =>`
    mutation {
        addShop(
            name: "${name}",
            slug: "${slug}",
            address: "${address}"
        ){
        ...on Exceptions{
        __typename
        }
        ...on Shop{
            id
        }
    }
    }
`

describe('allShops test', () => {
    test('allShops retrive after adding', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        await client.query($addShop( name, name, name ));
        const {allShop} = await client.query($allShop());
        allShop.map(shop=>{
            expect(shop.name).toEqual(name);
        })
        const count = await Shop.count();
        expect(count).toEqual(allShop.length);
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
