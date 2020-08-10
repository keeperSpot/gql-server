import { config as dotEnvConfig } from 'dotenv';
import { Server } from './server';

dotEnvConfig();
const server = new Server();

server
  .start()
  .then(() => console.log('Started server...'))
  .catch((error) => console.log('Problem in starting server...', error));
