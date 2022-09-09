import { Knex } from "knex";

declare global {
    namespace NodeJS {
        interface Global {
            db: Knex<any, unknown[]>;
        }
    }
}