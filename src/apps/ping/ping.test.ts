import { TestClient } from 'server/client';

const $pingQuery = () => `
    query {
        ping
    }
`;

describe('ping test', () => {
    test('ping', async () => {
        const client = new TestClient();
        const { ping } = await client.query($pingQuery());
        expect(ping).toEqual('pong');
    })
});
