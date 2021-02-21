import dotenv from 'dotenv'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import corsMiddleware from 'cors'
// import fileUploadMiddleware from 'express-fileupload'
import routes from './routes'
import path from 'path'


(async function() {
    // Load env variables.
    dotenv.config();

    // Connect to db.
    const db = await createConnection();

    // Configure server.
    const app = express();
    app.set('app_url', process.env.APP_URL);
    app.set('app_key', process.env.APP_KEY);
    app.set('root_dir', __dirname);
    app.set('port', process.env.PORT || 8080);
    app.set('db', db);
    app.set('view engine', 'ejs');


    // Add middleware
    app.use('/storage', express.static(path.join(__dirname, '/storage/public')));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(corsMiddleware());
    // app.use(fileUploadMiddleware());
    app.use('/api/*', express.json());


    // Register all app routes.
    routes(app);


    // Start server.
    app.listen(app.get('port'), () => {
        console.log(`App running on ${app.get('app_url')}`);
    });
})();
