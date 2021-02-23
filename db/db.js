import mariadb from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const conn = mariadb.createConnection({
    host: process.env.dbHost,
    port: process.env.dbPort,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.database
});

export default conn;