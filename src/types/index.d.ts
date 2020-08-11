import { Server as OrgHttpServer } from 'http';
import { Server as OrgHttpsServer } from 'https';
import { Request } from 'express';

export type HttpServer = OrgHttpServer | OrgHttpsServer;
export interface ContextProvider {
    request: Request;
}

export interface ResolverContext {
    request: Request;
    host: string;
    ip: string;
}


export type Resolver = (parent: any, args: any, context: ResolverContext, info: any) => any;
export interface ResolverMap {
    [query: string]: {
        [func: string]: Resolver;
    };
}
