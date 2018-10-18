
exports.up = function (knex, Promise) {
  return knex.schema.createTable('leafs', (table) => {
    table.increments('leaf_id');
    table.string('todoItem_content');
    table.boolean('isCompleted').defaultTo(false);
    table.integer('branch_pid')
      .references('branch_id')
      .inTable('branches')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('leafs');
};