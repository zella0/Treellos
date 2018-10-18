
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('branches').del()
    .then(function () {
      // Inserts seed entries
      return knex('branches').insert([
        // {todoList_name: 'layer 1 ROOT 1', tree_pid: 2},
        // {todoList_name: 'layer 2', branch_pid: 1, tree_pid: 2},
        // {todoList_name: 'layer 3 // child 1', branch_pid: 2, tree_pid: 2},
        // {todoList_name: 'layer 3 // child 2', branch_pid: 2, tree_pid: 2},
        // {todoList_name: 'layer 3 // child 3', branch_pid: 2, tree_pid: 2},
        // {todoList_name: 'layer 3 // child 4', branch_pid: 2, tree_pid: 2},
        // {todoList_name: 'layer 4', branch_pid: 5, tree_pid: 2},
        // {todoList_name: 'layer 4', branch_pid: 5, tree_pid: 2},
        // {todoList_name: 'layer 1 ROOT 2', tree_pid: 2},
        // {todoList_name: 'layer 2', branch_pid: 9, tree_pid: 2},
        // {todoList_name: 'layer 3', branch_pid: 9, tree_pid: 2},
        // {todoList_name: 'layer 4 // child 1', branch_pid: 11, tree_pid: 2},
        // {todoList_name: 'layer 4 // child 2', branch_pid: 11, tree_pid: 2},
      ]);
    });
};

