import { Server as OrgHttpServer } from 'http';
import { Server as OrgHttpsServer } from 'https';

export type HttpServer = OrgHttpServer | OrgHttpsServer;
