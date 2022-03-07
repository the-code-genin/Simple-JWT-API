import { Knex } from "knex";

declare global {
    module NodeJS {
        interface Global {
            db: Knex<any, any[]>;
        }
    }
}