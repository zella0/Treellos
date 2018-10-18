
exports.up = function (knex, Promise) {
  return knex.schema.createTable('branches', (table) => {
    table.increments('branch_id');
    table.string('todoList_name');
    table.integer('branch_pid')
      .references('branch_id')
      .inTable('branches')
      .onDelete('cascade')
      .index();
    table.integer('tree_pid')
      .references('id')
      .inTable('trees')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('branches');
};