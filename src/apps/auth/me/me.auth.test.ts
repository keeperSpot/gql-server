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
            name
            emails {
                email
                verified  
              }
            phones {
                country
                number
              }
          }
    }
`;

describe('me', () => {
    test('me without login', async () => {
        const client = new TestClient();
        const { me } = await client.query($me());
        expect(me).toEqual(null);
    });

    test('me after login', async () => {
        const client = new TestClient();

        const { user, email, name } = await client.registerRandomUser();
        await client.login({ userId: user.id, email });

        const { me } = await client.query($me());

        expect(me.id).toEqual(user.id);
        expect(me.name).toEqual(name);
    });

    test('me after logout', async () => {
        const client = new TestClient();
        const { user: { id }, email } = await client.registerRandomUser();
        await client.login({ userId: id, email });
        await client.logout();

        const { me } = await client.query($me());
        expect(me).toEqual(null);
    });
});
