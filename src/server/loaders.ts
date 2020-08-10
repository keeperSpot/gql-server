import { join as joinPath } from 'path';
import { readFileSync } from 'fs';

import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { sync as globSync } from 'glob';
import { GraphQLSchema } from 'graphql';

const APP_FOLDER: string = joinPath(__dirname, '../apps');

export const generateTypeDefs = (): string =>
  mergeTypes(
    globSync(`${APP_FOLDER}/**/*.@(gql|graphql)`).map((path: string) =>
      readFileSync(path, { encoding: 'utf8' })
    )
  );

export const generateResolverSchema = (): any =>
  mergeResolvers(
    globSync(`${APP_FOLDER}/**/resolvers.{t,j}s`).map(
      (path: string) => require(path).default
    )
  );

export const generateSchema = (): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: generateTypeDefs(),
    resolvers: generateResolverSchema(),
  });
