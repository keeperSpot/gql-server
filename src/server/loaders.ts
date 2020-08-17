import { join as joinPath } from 'path';
import { readFileSync } from 'fs';
import { Application } from 'express';

import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { sync as globSync } from 'glob';
import { GraphQLSchema } from 'graphql';
import { isTest } from 'server/constants';


const APP_FOLDER: string = joinPath(__dirname, '../apps');
const paths = (ext: string): string[] => {
    const all = globSync(`${APP_FOLDER}/**/?(*.)${ext}`);
    const tests = globSync(`${APP_FOLDER}/**/?(*.)test.${ext}`);
    return all.filter(x => {
        if (!isTest) return tests.indexOf(x) < 0;
        return true;
    });
};

export const generateTypeDefs = (): string =>
    mergeTypes(
        paths('schema.@(gql|graphql)')
            .map((path: string) =>
                importSchema(
                    readFileSync(path, { encoding: 'utf8' })
                ),
            ),
    );

export const generateResolverSchema = (): any =>
    mergeResolvers(
        paths('resolvers.{t,j}s')
            .map(
                (path: string) => require(path).default,
            ),
    );

export const generateSchema = (): GraphQLSchema =>
    makeExecutableSchema({
        typeDefs: generateTypeDefs(),
        resolvers: generateResolverSchema(),
    });

export const hookViews = (express: Application): void => {
    const patterns = paths('views.?s')
        .map((views: string) => require(views).default);

    patterns.map((app) => {
        for (const method in app) {
            if (app.hasOwnProperty(method)) {
                app[method].map((viewConf) => express[method](...viewConf));
            }
        }
    });
};
