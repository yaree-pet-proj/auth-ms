// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = {
    dialect: 'postgres',
    host: process.env.DB_URL,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    define: {
        hooks: {
            beforeFind: (model) => {
                model.attributes = {}
                model.attributes.exclude = ['createdAt', 'updatedAt']
            }
        },
        timestamps: false
    }
};

const sslConfig = {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

const databaseConfig = {
    dev: config,
    stage: {...config, ...sslConfig},
    prod: {...config, ...sslConfig}
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = databaseConfig;
