import { HttpServer, ResolverContext, ContextProvider } from 'types';
import { Connection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import { Application } from 'express';

import { createConnection } from 'typeorm';
import { GraphQLSchema } from 'graphql';
import { generateSchema, hookViews } from 'server/loaders';
import { middlewares } from './middlewares';


export class Server {
    db: Connection;
    schema: GraphQLSchema;

    server: GraphQLServer;
    express: Application;
    app: HttpServer;

    constructor(
        public port: string | number = process.env.PORT || 4000,
        public type: string = process.env.NODE_ENV || 'development',
    ) {
    }

    async config(): Promise<void> {
        this.db = await Server.connectToDB();
        this.schema = generateSchema();
        this.server = new GraphQLServer({
            schema: this.schema,
            context: this.getRequestContext,
        });
        this.configureExpress();
        this.addMiddleware();
    }

    static connectToDB(): Promise<Connection> {
        return createConnection('default');
    }

    getRequestContext({ request }: ContextProvider): ResolverContext {
        return {
            request,
            host: `${request.protocol}://${request.get('host')}`,
            ip: request.ip,
        };
    }

    configureExpress(): void {
        this.express = this.server.express;
        this.server.express.disable('x-powered-by');
        this.server.express.set('trust proxy', 1);
    }

    addMiddleware(): void {
        middlewares.map((middleware) => this.server.express.use(middleware));
        this.server.express.set('view engine', 'ejs');

        // this.server.express.set('views', getTemplateDirs());
        hookViews(this.server.express);
    }

    async start(): Promise<HttpServer> {
        await this.config();
        this.app = await this.server.start({ port: this.port });
        return this.app;
    }
}
