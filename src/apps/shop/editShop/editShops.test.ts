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

const $product = () => `
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
const $editShop =( name: string , slug:string , address:string ) =>`mutation {
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
    test('edit shops after adding after adding', async () => {
        const client = new TestClient();
        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });
        const {addShop : { id }} = await client.query($addShop( name, name, name ));
        {
            const { name } = await client.registerRandomUser();
            const {editShop : { id }} = await client.query($editShop( name, name, name ));
            
            const shop = await Shop.findOne({where : {id: id}})
            
            expect(shop.name).toEqual(name);
            expect(shop.address).toEqual(name);
            expect(shop.slug).toEqual(kebabCase(name));
            
        }
        
        
    });


});
