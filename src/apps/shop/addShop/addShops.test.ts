import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Shop } from 'apps/shop.entity';
import * as _ from 'lodash';

let conn: Connection;
const kebabCase = (value) =>{
    return _.kebabCase(value)
}
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
const $addShop =( name: string , address:string , slug:string) =>`
    mutation {
        addShop(
            name: "${name}",
            slug: "${slug}",
            address: "${address}"
        ){
        ...on Exceptions{
            __typename
                exceptions{
                code
                message
            }
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
    test('request with null name', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const { addShop } = await client.query($addShop( '', name, name ));
        const {__typename,exceptions} = addShop;
        expect(__typename).toEqual('Exceptions');
        expect(exceptions[0].message).toEqual('Name is required for the shop.');
        
    });
    test('request with null address', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const { addShop } = await client.query($addShop( name, '', name ));
        const {__typename,exceptions} = addShop;
        expect(__typename).toEqual('Exceptions');
        expect(exceptions[0].message).toEqual('Shop needs an address.');
        
    });
    test('slug not provided but created by name', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const { addShop: {id} } = await client.query($addShop( name, name, '' ));
        const allShops = await Shop.findOne({ id:id })
        expect(allShops.slug).toEqual(kebabCase(name));
        
    });



    //////
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
