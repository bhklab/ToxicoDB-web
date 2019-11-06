/* eslint-disable import/newline-after-import */
const dotenv = require('dotenv');
dotenv.config();

// Different Configuration settings based on the environment.
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: `${__dirname}/db/migrations`,
        },
        seeds: {
            directory: `${__dirname}/db/seeds`,
        },
    },
    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: `${__dirname}/db/migrations`,
        },
        seeds: {
            directory: `${__dirname}/db/seeds`,
        },
    },
};
