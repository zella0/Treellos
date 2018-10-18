const knex = require("../db/knex.js");

module.exports = {
  renderAll: (req, res) => {
    knex('trees')
      .then((response) => {
        res.json(response)
      })
  },
  addTree: (req, res) => {
    knex('trees')
      .insert({
        project_name: req.body.project_name
      }, 'id')
      .then((response) => {
        knex('branches')
          .insert({
            todoList_name: `project ${response}`,
            tree_pid: Number(response)
          }, '*')
          .then((response) => {
            res.json(response)
          })
      })
  },
  removeTree: (req, res) => {
    knex('trees')
      .where('trees.id', req.params.tree_id)
      .del()
      .then(() => {
        knex('branches')
          .where('branches.tree_pid', req.params.tree_id)
          .del()
          .then(()=>{
            res.sendStatus(200);
          })
      })
  }
}