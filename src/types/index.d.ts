import { Server as OrgHttpServer } from 'http';
import { Server as OrgHttpsServer } from 'https';
import { Request as ExpressRequest, Express } from 'express';


export interface User {
    name: string;
    id: string;
    created: Date;
}

export type HttpServer = OrgHttpServer | OrgHttpsServer;

export type Session = Express.Session;

export interface Request extends ExpressRequest {
    session: Session;
}

export interface ContextProvider {
    request: Request;
}

export interface ResolverContext {
    request: Request;
    host: string;
    ip: string;
    session: Session;
    user: User | null;
}

export type Resolver = (parent: any, args: any, context: ResolverContext, info: any) => any;

export interface ResolverMap {
    [query: string]: {
        [func: string]: Resolver;
    };
}

export interface IException {
    code: string;
    message?: string | null;
    path?: string | null;
    data?: {
        [key: string]: any;
    };
}

export interface IExceptions {
    __typename: string;
    exceptions: IException[];
    arguments: any
}
