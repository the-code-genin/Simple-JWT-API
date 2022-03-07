const path = require("path");
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'mysql',
    connection: {
        host: String(process.env.MYSQL_HOST),
        port: Number(process.env.MYSQL_PORT),
        user: String(process.env.MYSQL_USERNAME),
        password: String(process.env.MYSQL_PASSWORD),
        database: String(process.env.MYSQL_DATABASE)
    },
    migrations: {
        tableName: "migrations",
        directory: path.resolve(__dirname, "./migrations"),
        disableTransactions: false
    }
};
