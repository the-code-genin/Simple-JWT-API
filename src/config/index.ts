import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

export default {
    app: {
        env: String(process.env.NODE_ENV),
        port: Number(process.env.PORT || 8080),
        key: String(process.env.APP_KEY)
    },
    db: {
        host: String(process.env.MYSQL_HOST),
        port: Number(process.env.MYSQL_PORT),
        username: String(process.env.MYSQL_USERNAME),
        password: String(process.env.MYSQL_PASSWORD),
        name: String(process.env.MYSQL_DATABASE)
    }
};