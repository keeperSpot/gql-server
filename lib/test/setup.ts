import { config as dotEnvConfig } from 'dotenv';
import { Server } from '../../src/server';

dotEnvConfig();
export const setup = async (): Promise<any> => {
    const server = new Server(4001, 'test');
    const app = await server.start();
    const { port } = app.address();
    process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};

export default setup;
