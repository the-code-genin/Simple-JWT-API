import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express';
import corsMiddleware from 'cors';
import routes from './routes';
import path from 'path';
import knex from "knex";
import dbConfig from "./config/db";
import 'twig';

process.on('SIGINT', () => process.exit());

(async function () {
    // Load env variables.
    dotenv.config();

    // Connect to db.
    const db = knex(dbConfig);
    global.db = db;

    // Configure server.
    const app = express();
    app.set('app_url', process.env.APP_URL);
    app.set('app_key', process.env.APP_KEY);
    app.set('root_dir', __dirname);
    app.set('port', process.env.PORT || 8080);
    app.set('db', db);
    app.set('view engine', 'twig');


    // Add middleware
    app.use('/storage', express.static(path.join(__dirname, '/storage/public')));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(corsMiddleware());
    app.use('/v1', express.json());

    // Register all app routes.
    routes(app);

    // Start server.
    app.listen(app.get('port'), () => {
        console.log(`App running on ${app.get('app_url')}`);
    });
})();
