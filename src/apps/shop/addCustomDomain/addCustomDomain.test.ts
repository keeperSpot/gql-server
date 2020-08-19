import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Shop } from 'apps/shop.entity';
import { Ping } from '../../ping/ping.entity';


let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const $addCustomDomain = (slug:string,customDomain:string) => `
    mutation {
  addCustomDomain(slug: "${slug}",customDomain:"${customDomain}"){
         __typename
    ...on Exceptions{
     __typename
  exceptions
      {
        code
        message
        path
        data
      }
    }
  ...on Shop{
    name
    domain
  }
  }
}
`;
describe('CustomDomain test', () => {
    test('addCustomDomain with valid params', async () => {

        const client = new TestClient();
        const shop = new Shop()
        shop.name = 'testShop1'
        shop.slug = 'testSlug1'
        shop.address = 'asdlk asdf aldff'
        await shop.save()
        const { addCustomDomain } = await client.query($addCustomDomain(shop.slug,'keeperspot.in'));
        expect(addCustomDomain.name).toEqual(shop.name);
        expect(addCustomDomain.domain).toEqual('keeperspot.in');

    });

    test('addCustomDomain with null customDomain', async () => {
        const client = new TestClient();
        const shop = new Shop()
        shop.name = 'testShop2'
        shop.slug = 'testSlug2'
        shop.address = 'asdlk asdf aldff'
        await shop.save()
        const { addCustomDomain } = await client.query($addCustomDomain(shop.slug,''));
        const {__typename,exceptions} = addCustomDomain;
        expect(__typename).toEqual('Exceptions');
        expect(exceptions[0].code).toEqual('VALIDATION_EXCEPTION');
        expect(exceptions[0].message).toEqual('customDomain is needed.');
    });

    test('addCustomDomain with invalid slug', async () => {
        const client = new TestClient();
        const shop = new Shop()
        shop.name = 'testShop3'
        shop.slug = 'testSlug3'
        shop.address = 'asdlk asdf aldff'
        await shop.save()
        const { addCustomDomain } = await client.query($addCustomDomain(shop.name+shop.slug+shop.address,'keeperspot.in'));
        const {__typename,exceptions} = addCustomDomain;
        expect(__typename).toEqual('Exceptions');
        expect(exceptions[0].code).toEqual('SHOP_NOT_FOUND');
        expect(exceptions[0].message).toEqual('The shop you are looking for does not exist.');
    });
    test('addCustomDomain with invalid type', async () => {
        const client = new TestClient();
        const shop = new Shop()
        shop.name = 'testShop4'
        shop.slug = 'testSlug4'
        shop.address = 'asdlk asdf aldff'
        await shop.save()
        const { addCustomDomain } = await client.query($addCustomDomain(shop.name+shop.slug+shop.address,'keeperspot'));
        const {__typename,exceptions} = addCustomDomain;
        expect(__typename).toEqual('Exceptions');
        expect(exceptions[0].code).toEqual('VALIDATION_EXCEPTION');
        expect(exceptions[0].message).toEqual('Enter correct url!');
        expect(exceptions[1].code).toEqual('INVALID_ARGUMENTS_TYPE');
        expect(exceptions[1].message).toEqual('Expected a valid slug and customDomain a valid url');
    });
});

