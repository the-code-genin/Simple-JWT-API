import dotenv from 'dotenv'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express, { NextFunction, Request, Response } from 'express'
import corsMiddleware from 'cors'
import {NotFoundError, ServerError} from './lib/errors'
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
    

    // Api 404 page
    app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
        res.status(404);
        res.json(NotFoundError());
    });

    // Api 500 page
    app.use('/api/*', function(err: Error, req: Request, res: Response, next: NextFunction){
        console.error(err.stack);
        res.status(500);
        res.json(ServerError(err.message));
    });

    // General 404 page
    app.use(function(req: Request, res: Response, next: NextFunction){
        res.status(404);
        res.render('404');
    });

    // General 500 page
    app.use(function(err: Error, req: Request, res: Response, next: NextFunction){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });


    // Start server.
    app.listen(app.get('port'), () => {
        console.log(`App running on ${app.get('app_url')}`);
    });
})();
