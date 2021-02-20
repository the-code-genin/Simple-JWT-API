import dotenv from 'dotenv'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import corsMiddleware from 'cors'
import routes from './routes'


(async function() {
    // Load env variables.
    dotenv.config();

    // Connect to db.
    const db = await createConnection();

    // Configure server.
    const app = express();
    app.set('app_url', process.env.APP_URL);
    app.set('app_key', process.env.APP_KEY);
    app.set('port', process.env.PORT || 8080);
    app.set('db', db);
    app.set('view engine', 'ejs');


    // Add middleware
    app.use(express.static(__dirname + '/public'));
    app.use(corsMiddleware());
    app.use('/api/*', express.json());


    // Register routes.
    routes(app);


    // Start server.
    app.listen(app.get('port'), () => {
        console.log(`App running on ${app.get('app_url')}`);
    });
})();
