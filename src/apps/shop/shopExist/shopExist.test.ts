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

const $shopExist = (slug:string) => `
    query {
        shopExist(slug: "${slug}")
    }
`;
describe('shop exist test', () => {
    test('shop exist true', async () => {

        const client = new TestClient();
        const shop = new Shop()
        shop.name = 'testShop'
        shop._slug = 'testSlug'
        shop.address = 'asdlk asdf aldff'
        await shop.save()
        {
            const { shopExist } = await client.query($shopExist(shop._slug));
            expect(shopExist).toEqual(true);
        }
        {
            const { shopExist } = await client.query($shopExist(shop._slug + shop.name));
            expect(shopExist).toEqual(false);
        }
    });
});

