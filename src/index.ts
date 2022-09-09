import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express';
import corsMiddleware from 'cors';
import routes from './routes';
import path from 'path';
import knex from "knex";
import 'twig';

process.on('SIGINT', () => process.exit());

(async function () {
    // Load env variables.
    dotenv.config();

    // Connect to db.
    const db = knex({
        client: 'mysql2',
        connection: {
            host: String(process.env.MYSQL_HOST),
            port: Number(process.env.MYSQL_PORT),
            user: String(process.env.MYSQL_USERNAME),
            password: String(process.env.MYSQL_PASSWORD),
            database: String(process.env.MYSQL_DATABASE),
            enableKeepAlive: true
        },
        migrations: {
            tableName: "migrations",
            directory: path.resolve(__dirname, "./migrations"),
            disableTransactions: false
        }
    });
    global.db = db;
    console.log("Connected to db");

    // Configure server.
    const app = express();
    app.set('app_url', process.env.APP_URL);
    app.set('app_key', process.env.APP_KEY);
    app.set('root_dir', __dirname);
    app.set('port', process.env.PORT || 8080);
    app.set('db', db);
    app.set('view engine', 'twig');


    // Add middleware
    app.use(corsMiddleware());
    app.use(express.json());

    // Register all app routes.
    routes(app);

    // Start server.
    app.listen(app.get('port'), () => {
        console.log(`App running on ${app.get('app_url')}`);
    });
})();
