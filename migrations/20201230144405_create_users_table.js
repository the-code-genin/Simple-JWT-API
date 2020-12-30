exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.bigIncrements('id');
    table.string('email');
    table.string('password');
    table.timestamps(true, true);

    table.unique(['email']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
