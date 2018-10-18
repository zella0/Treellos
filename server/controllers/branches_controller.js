const knex = require("../db/knex.js");

module.exports = {
  renderAll: (req, res) => {
    knex('branches')
      .orderBy('branch_id')
      .then((response) => {
        res.json(memoData(response))
      })
  },
  renderOne: (req, res) => {
    knex('branches')
      .where('branches.tree_pid', req.params.tree_pid)
      .orderBy('branch_id')
      .then((response) => {
        res.json(memoData(response))
      })
  },
  addBranch: (req, res) => {
    knex('branches')
      .insert({
        todoList_name: "test",
        tree_pid: req.params.tree_id,
        branch_pid: req.params.branch_id
      }, '*')
      .then((response)=>{
        res.json(response)
      })
      .catch(function (err) {
        console.error(err);
      });
  },
  removeBranch: (req, res) => {
    knex('branches')
    .where('branches.branch_id', req.params.branch_id)
    .del()
    .then(()=>{
      res.sendStatus(200);
    })
  }
}

function memoData(data) {
  let cache = {
    roots: []
  }

  for (let i = 0; i < data.length; i++) {
    cache[data[i].branch_id] = data[i]

    let parent_id = data[i].branch_pid
    if (parent_id) {
      cache[parent_id].children ?
        cache[parent_id].children.push(data[i]) :
        cache[parent_id].children = [data[i]]
    } else {
      cache.roots.push(data[i])
    }
  }
  return cache.roots
}