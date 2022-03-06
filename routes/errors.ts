import { Application, NextFunction, Request, Response } from 'express';
import { NotFoundError, ServerError } from '../lib/errors';

export default (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json(NotFoundError());
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json(ServerError(err.message));
    });
}