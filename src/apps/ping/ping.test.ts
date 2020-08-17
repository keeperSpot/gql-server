import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { Ping } from './ping.entity';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


const $ping = () => `
    query {
        ping
    }
`;

describe('ping test', () => {
    test('ping', async () => {
        const client = new TestClient();
        const { ping } = await client.query($ping());
        expect(ping).toEqual('pong');
    });

    test('ping db addition', async () => {
        const client = new TestClient();

        const count = await Ping.count();
        const { ping } = await client.query($ping());
        expect(ping).toEqual('pong');

        const newCount = await Ping.count();
        expect(count + 1).toEqual(newCount);
    });
});
