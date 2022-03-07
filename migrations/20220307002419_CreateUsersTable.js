/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.timestamp("created_at").defaultTo(knex.raw("now()"));
        table.timestamp("updated_at").defaultTo(knex.raw("now()"));
        table.string("email").unique();
        table.string("password");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
