import { HttpServer } from 'types';
import { Connection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import { Application } from 'express';

import { createConnection } from 'typeorm';
import { GraphQLSchema } from 'graphql';
import { generateSchema } from './loaders';

export class Server {
  db: Connection;
  schema: GraphQLSchema;

  server: GraphQLServer;
  express: Application;
  app: HttpServer;

  constructor(
    public port: string | number = process.env.PORT || 4000,
    public type: string = process.env.NODE_ENV || 'development'
  ) {}

  async config(): Promise<void> {
    this.db = await this.connectToDB();
    this.schema = generateSchema();
    this.server = new GraphQLServer({
      schema: this.schema,
    });
    this.express = this.server.express;
  }

  connectToDB(): Promise<Connection> {
    return createConnection('default');
  }

  async start(): Promise<HttpServer> {
    await this.config();
    this.app = await this.server.start({ port: this.port });
    return this.app;
  }
}
