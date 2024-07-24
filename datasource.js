const path = require('path');
const {DataSource} = require('typeorm');
require('dotenv').config();

const commonConfig = {
    synchronize: false,
    entities: [path.join(__dirname, 'src/entity/**/*.entity.ts')],
    migrations: [path.join(__dirname, 'db/migration/**/*.ts')],
};

const stageConfig = {
    type: 'postgres',
    host: process.env.DB_URL,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    ...commonConfig
}

const environments = {
    dev: {
        type: 'better-sqlite3',
        database: './dev.sqlite3',
        logging: true,
        ...commonConfig
    },
    stage: stageConfig,
    prod: {...stageConfig, logging: true}
}

const environment = process.env.NODE_ENV || 'dev';
const config = environments[environment];

const AppDataSource = new DataSource(config);

module.exports = {AppDataSource};