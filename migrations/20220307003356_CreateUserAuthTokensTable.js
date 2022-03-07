/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_auth_tokens", (table) => {
        table.increments("id");
        table.timestamp("created_at").defaultTo(knex.raw("now()"));
        table.timestamp("updated_at").defaultTo(knex.raw("now()"));
        table.string("token");
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("user_auth_tokens");
};
