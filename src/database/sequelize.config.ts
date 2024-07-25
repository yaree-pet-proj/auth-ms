import dotenv from 'dotenv';
import {SequelizeModuleOptions} from "@nestjs/sequelize";

dotenv.config();
const env = process.env.NODE_ENV || 'dev';

const getSequelizeConfig = (): SequelizeModuleOptions => {
    if (env === 'development') {
        return {
            dialect: 'sqlite',
            storage: './dev.sqlite3',
            models: [__dirname + '../model/*.model.ts'],
        };
    }

    const commonConfig: SequelizeModuleOptions = {
        dialect: 'postgres',
        host: process.env.DB_URL,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [__dirname + '../model/*.model.ts'],
        logging: env === 'development',
    };

    if (env === 'stage' || env === 'prod') {
        return {
            ...commonConfig,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        };
    }

    return commonConfig;
};

export default getSequelizeConfig;