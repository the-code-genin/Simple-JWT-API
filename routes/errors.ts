import { Application, NextFunction, Request, Response } from 'express';
import { NotFoundError, ServerError } from '../lib/errors';

export default (app: Application) => {
    // Default API 404 page
    app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
        res.status(404);
        res.json(NotFoundError());
    });

    // Default API 500 page
    app.use('/api/*', (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500);
        res.json(ServerError(err.message));
    });

    // General 404 page
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404);
        res.render('404.twig');
    });

    // General 500 page
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500);
        res.render('500.twig');
    });
}