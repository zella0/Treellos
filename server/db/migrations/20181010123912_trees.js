
exports.up = function(knex, Promise) {
  return knex.schema.createTable(('trees'), table =>{
    table.increments();
    table.string('project_name');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trees');
};
