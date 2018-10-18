
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trees').del()
    .then(function () {
      // Inserts seed entries
      return knex('trees').insert([
        // {project_name: "tab1"},
        // {project_name: "tab2"},
        // {project_name: "tab3"},
        // {project_name: "tab4"},
      ]);
    });
};
