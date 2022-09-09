import { Application, NextFunction, Request, Response } from "express";
import Logger from "../logger";
import { NotFoundError, ServerError } from "../responses";

export default (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        Logger.http(`Route not found: ${req.path}`);
        return NotFoundError(res);
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        Logger.error(err.stack);
        return ServerError(res, err.message);
    });
};