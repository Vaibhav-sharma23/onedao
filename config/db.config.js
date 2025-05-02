import dotenv from 'dotenv';
dotenv.config();

export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        seederStorage: 'sequelize'
    },
    test: {
        username: "root",
        password: "dj@mw@r3",
        database: "node_sequelize",
        host: "127.0.0.1",
        dialect: "postgres",
        seederStorage: 'sequelize'
    },
    production: {
        username: "root",
        password: "dj@mw@r3",
        database: "node_sequelize",
        host: "127.0.0.1",
        dialect: "postgres",
        seederStorage: 'sequelize'
    }
}