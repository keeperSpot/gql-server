import { join as joinPath } from 'path';
import { readFileSync } from 'fs';
import { Application } from 'express';

import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { sync as globSync } from 'glob';
import { GraphQLSchema } from 'graphql';

const APP_FOLDER: string = joinPath(__dirname, '../apps');

export const generateTypeDefs = (): string =>
    mergeTypes(
        globSync(`${APP_FOLDER}/**/?(*.)schema.@(gql|graphql)`).map((path: string) =>
            readFileSync(path, { encoding: 'utf8' }),
        ),
    );

export const generateResolverSchema = (): any =>
    mergeResolvers(
        globSync(`${APP_FOLDER}/**/?(*.)resolvers.{t,j}s`).map(
            (path: string) => require(path).default,
        ),
    );

export const generateSchema = (): GraphQLSchema =>
    makeExecutableSchema({
        typeDefs: generateTypeDefs(),
        resolvers: generateResolverSchema(),
    });

export const hookViews = (express: Application): void => {
    const patterns = globSync(`${APP_FOLDER}/**/?(*.)views.?s`)
        .map((views: string) => require(views).default);

    patterns.map((app) => {
        for (const method in app) {
            if (app.hasOwnProperty(method)) {
                app[method].map((viewConf) => express[method](...viewConf));
            }
        }
    });
};
