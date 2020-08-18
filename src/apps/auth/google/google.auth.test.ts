import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { INVALID_GOOGLE_SIGN_IN } from './exceptions';

let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


const $loginWithGoogle = ({ id, token }) => `
    mutation {
      loginWithGoogle(id: "${id}", token: "${token}") {
        __typename
        ... on Exceptions {
          exceptions {
            code
            path
          }
          arguments
        }
    
        ... on User {
          id
          name
        }
      }
    }
`;

const expectLoginWithGoogle = TestClient.checkError('loginWithGoogle');

describe('google auth', function() {
    test('google authentication failure', async () => {
        const client = new TestClient();
        const data = await client.query($loginWithGoogle({ id: 'random', token: 'random' }));
        expectLoginWithGoogle(data)(INVALID_GOOGLE_SIGN_IN, null);
    });

    test('google login success', async () => {
        // we can't do that as token is generated only by physical signin
    });
});
