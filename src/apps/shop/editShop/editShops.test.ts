import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Shop } from 'apps/shop.entity';
import * as _ from 'lodash';
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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

const $product = () => `
    query {
        allShop{
            name
        }
    }
`;

const $addShop =( name: string , address:string ,  slug:string ) =>`
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
            name
            address
            slug
        }
    }
    }
`
const $editShop =( name: string ,  address:string, slug:string ) =>`mutation {
    editShop(
        name: "${name}",
        slug: "${slug}",
        address: "${address}"
    ){
    ...on Exceptions{
    __typename
    }
    ...on Shop{
        id
          name
          address
          slug
    }
}
}`

describe('editShops test', () => {
    test('edit shops after adding', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const {addShop : { id }} = await client.query($addShop( name, name, name ));
        {
            const { name } = await client.registerRandomUser();
            const {editShop : { id }} = await client.query($editShop( name, name, name ));
            await sleep(100)
            const shop = await Shop.findOne({where : {id: id}})
            expect(shop.name).toEqual(name);
            expect(shop.address).toEqual(name);
            expect(shop.slug).toEqual(kebabCase(name));  
        }      
    });
    ////// additional testing
    test('request with null name', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const {addShop} = await client.query($addShop( name, name, name ));
        const {id} = addShop;
        {
            const { name } = await client.registerRandomUser();
            const {editShop } = await client.query($editShop( '', name, name ));
            const {id} = editShop;
            await sleep(100)
            const shop = await Shop.findOne({where : {id: id}})
            expect(shop.address).toEqual(name);
            expect(shop.slug).toEqual(kebabCase(name)); 
        }

    });
    test('request with null address', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const {addShop } = await client.query($addShop( name, name, name ));
        const { id } = addShop;
        {
            const { name } = await client.registerRandomUser();
            const {editShop } = await client.query($editShop( name, '', name ));
            const  { id } = editShop;
            await sleep(100)
            const shop = await Shop.findOne({where : {id: id}})
            expect(shop.name).toEqual(name);
            expect(shop.slug).toEqual(kebabCase(name));  
        }
    });
    test('request with null slug', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const {addShop } = await client.query($addShop( name, name, name ));
        const { id } = addShop;
        {
            const { name } = await client.registerRandomUser();
            const {editShop } = await client.query($editShop( name, name, '' ));
            const  { id } = editShop;
            await sleep(100)
            const shop = await Shop.findOne({where : {id: id}})
            expect(shop.name).toEqual(name);
            expect(shop.address).toEqual(name);  
        }
    });


});
