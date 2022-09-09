import "reflect-metadata";
import config from "./config";
import express from "express";
import corsMiddleware from "cors";
import routes from "./routes";
import knex from "knex";
import "twig";

process.on("SIGINT", () => process.exit());

(async function () {
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
    console.log("Connected to db");

    // Create and configure express router
    const app = express();
    app.use(corsMiddleware());
    app.use(express.json());

    // Register all app routes.
    routes(app);

    // Start server.
    app.listen(config.app.port, () => {
        console.log(`App running on :${config.app.port}`);
    });
})();
