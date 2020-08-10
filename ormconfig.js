const { config} = require('dotenv');
config();

const isTest = process.env.NODE_ENV === 'test';
const dbName = isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME;

const options = [
    {
        name: 'default',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbName,
        type: 'postgres',
        dropSchema: isTest,
        synchronize: isTest,
        logging: process.env.NODE_ENV === 'development',
        entities: ['src/**/entities/**/*.ts', 'apps/**/entities/**/*.js'],
        migrations: ['src/**/migrations/**/*.ts', 'apps/**/migrations/**/*.js'],
        subscribers: ['src/**/subscribers/**/*.ts', 'apps/**/subscribers/**/*.js'],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/migrations',
            subscribersDir: 'src/subscribers',
        },
    },
];

module.exports = options;
