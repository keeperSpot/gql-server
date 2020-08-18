import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { User } from 'apps/user.entity';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


const $register = ({ email, name }) => `
    mutation {
        testRegister(email: "${email}", name: "${name}") {
        id
        name
        emails {
            email
            verified
            }
        }
    }
`;

describe('register test', () => {
    test('register success', async () => {
        const client = new TestClient();
        const { email, name } = TestClient.createCredentials();

        const usersInDb = await User.count();
        const { testRegister } = await client.query($register({
            email, name,
        }));
        const usersInDbAfterInsert = await User.count();

        expect(usersInDb + 1).toEqual(usersInDbAfterInsert);

        const { name: newName, emails } = testRegister;
        expect(newName).toEqual(name);
        expect(emails).toHaveLength(1);
    });
});
