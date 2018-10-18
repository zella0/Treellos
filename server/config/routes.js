//Update the name of the controller below and rename the file.
const landing_controller = require("../controllers/landing_controller.js")
const trees_controller = require("../controllers/trees_controller.js")
const branches_controller = require("../controllers/branches_controller.js")
const leafs_controller = require("../controllers/leafs_controller.js");

module.exports = function(app){

  app.get('/dashboard', trees_controller.renderAll);
  app.post('/dashboard/add', trees_controller.addTree);
  app.get('/dashboard/:tree_id/remove', trees_controller.removeTree);

  app.get('/dashboard/leafs', leafs_controller.renderAll);
  app.post('/dashboard/leafs/add/:branch_id', leafs_controller.addLeaf);
  app.get('/dashboard/leafs/remove/:leaf_id', leafs_controller.removeLeaf);

  app.get('/dashboard/branches', branches_controller.renderAll);
  app.post('/dashboard/branch/add/:branch_id/:tree_id', branches_controller.addBranch);
  app.get('/dashboard/branch/remove/:branch_id', branches_controller.removeBranch);
  app.get('/dashboard/:tree_pid', branches_controller.renderOne);


}


 // app.get('/', landing_controller.renderIndex);
 // app.post('/register', landing_controller.userRegister);
 // app.post('/login', landing_controller.userLogin);

 // app.use(authMiddleWare);

// function authMiddleWare(req, res, next) {
//   if (!req.session.user_id) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// }
