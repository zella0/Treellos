
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('leafs').del()
    .then(function () {
      // Inserts seed entries
      return knex('leafs').insert([
        // {todoItem_content: "todo item1 for l3c3", branch_pid: 3},
        // {todoItem_content: "todo item2 for l3c3", branch_pid: 3},
        // {todoItem_content: "todo item3 for l3c3", branch_pid: 3},
        // {todoItem_content: "todo item4 for l3c3", branch_pid: 3},
      ]);
    });
};
