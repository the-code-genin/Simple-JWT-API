import "reflect-metadata";
import config from "./config";
import express from "express";
import corsMiddleware from "cors";
import routes from "./routes";
import knex from "knex";
import Logger from "./logger";

process.on("SIGINT", () => process.exit());

(async function () {
    try {
        // Connect to db.
        global.db = knex({
            client: "mysql2",
            connection: {
                host: config.db.host,
                port: config.db.port,
                user: config.db.username,
                password: config.db.password,
                database: config.db.name,
                enableKeepAlive: true
            }
        });
        Logger.debug("Connected to DB");
    
        // Create and configure express router
        const app = express();
        app.use(corsMiddleware());
        app.use(express.json());
        Logger.debug("Configured router");
    
        // Register all app routes.
        routes(app);
        Logger.debug("Registered app routes");
    
        // Start server.
        app.listen(config.app.port, () => {
            Logger.info(`App running on :${config.app.port}`);
        });
    } catch(e) {
        Logger.error((e as Error).stack);
    }
})();
