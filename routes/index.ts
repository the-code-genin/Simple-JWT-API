import { Application } from "express";
import HomeRoutes from './home';
import AuthRoutes from './auth';

export default (app: Application) => {
    HomeRoutes(app);
    AuthRoutes(app);
}