import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});

const $me = () => `
    query {
        me {
            id
        }
    }
`;


describe('logout', () => {
    test('try logout', async () => {
        const client = new TestClient();
        const { email, user: { id } } = await client.registerRandomUser();

        await client.login({ userId: id, email });
        const { me } = await client.query($me());
        expect(me.id).toEqual(id);

        await client.logout();
        const { me: newMe } = await client.query($me());
        expect(newMe).toEqual(null);
    });

    test('without logout', async () => {
        const client = new TestClient();
        const { email, user: { id } } = await client.registerRandomUser();

        await client.login({ userId: id, email });
        const { me } = await client.query($me());
        expect(me.id).toEqual(id);

        const { me: newMe } = await client.query($me());
        expect(newMe.id).toEqual(id);
    });
});
