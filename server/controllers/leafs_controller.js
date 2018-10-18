const knex = require("../db/knex.js");

module.exports = {
  renderAll: (req, res) => {
    knex('leafs')
      .then((response) => {
        res.json(response)
      })
  },
  addLeaf: (req, res) => {
    knex('leafs')
      .insert({
        todoItem_content: req.body.todoItem_content,
        branch_pid: Number(req.params.branch_id)
      }, '*')
      .then((response) => {
        res.json(response)
      })
  },
  removeLeaf: (req, res) => {
    knex('leafs')
      .where('leafs.leaf_id', req.params.leaf_id)
      .del()
      .then(()=>{
        res.sendStatus(200);
      })
  }
}
// 'leafs.branch_pid', 'branches.branch_id'