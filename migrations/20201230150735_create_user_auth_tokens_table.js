exports.up = function(knex) {
    return knex.schema.createTable('user_auth_tokens', function(table) {
        table.bigIncrements('id');
        table.bigInteger('user_id');
        table.string('token');
        table.timestamps(true, true);

        table.index(['user_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_auth_tokens');
};
