import { Application } from "express";
import HomeRoutes from "./home";
import AuthRoutes from "./auth";
import ErrorRoutes from "./errors";

export default (app: Application) => {
    HomeRoutes(app);
    AuthRoutes(app);
    ErrorRoutes(app);
};