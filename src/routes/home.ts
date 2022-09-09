import { Application } from "express";
import HomeController from "../controllers/home";

export default (app: Application) => {
    app.get("/", HomeController.index);
};