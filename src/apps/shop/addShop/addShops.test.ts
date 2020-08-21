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
describe('addShops test', () => {
    test('retrive after adding', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const { addShop: {id} } = await client.query($addShop( name, name, name ));
        const allShops = await Shop.findOne({ id:id })
        expect(allShops.name).toEqual(name);
    });

    test('Shop db addition', async () => {
        const client = new TestClient();
        const count = await Shop.count();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const { addShop: {id} } = await client.query($addShop( name, name, name ));

        const newCount = await Shop.count();
        expect(count + 1).toEqual(newCount);
    });
});
