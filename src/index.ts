import { config as dotEnvConfig } from 'dotenv';
import { Server } from './server';

dotEnvConfig();
const port = process.argv[2] || 4000;
const server = new Server(port, process.env.NODE_ENV);

server
  .start()
  .then(() => console.log(`Started server on port ${port}... http://localhost:${port}/`))
  .catch((error) => console.log('Problem in starting server...', error));
