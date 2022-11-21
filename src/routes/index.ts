import { Application } from "express";
import AuthRoutes from "./auth";
import ErrorRoutes from "./errors";

export default (app: Application) => {
    AuthRoutes(app);
    ErrorRoutes(app);
};