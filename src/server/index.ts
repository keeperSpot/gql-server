import { HttpServer } from "types";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { GraphQLServer } from "graphql-yoga";
import { Application } from "express";

import { GraphQLSchema } from "graphql";
import { generateSchema } from "./loaders";

export class Server {
  schema: GraphQLSchema;

  server: GraphQLServer;
  express: Application;
  app: HttpServer;

  constructor(
    public databaseConfig: Partial<PostgresConnectionOptions> = {},
    public port: string | number = process.env.PORT || 4000,
    public type: string = process.env.NODE_ENV || "development"
  ) {}

  async config(): Promise<void> {
    this.schema = generateSchema();
    this.server = new GraphQLServer({
      schema: this.schema,
    });
    this.express = this.server.express;
  }

  async start(): Promise<HttpServer> {
    await this.config();
    this.app = await this.server.start({ port: this.port });
    return this.app;
  }
}
