import { Application, NextFunction, Request, Response } from "express";
import { NotFoundError, ServerError } from "../responses";

export default (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        return NotFoundError(res);
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        return ServerError(res, err.message);
    });
};