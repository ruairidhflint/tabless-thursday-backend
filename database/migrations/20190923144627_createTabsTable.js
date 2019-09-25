
exports.up = function (knex) {
  return knex.schema
    .createTable('tabs', (table) => {
      table.increments();
      table.string('url')
        .notNullable();
      table.string('title')
        .notNullable();
      table.blob('notes');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tabs');
};
