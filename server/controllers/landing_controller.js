const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  renderIndex: function (req, res) {
    if (req.session.user_id) {
      // change: if statement to false for redirecting sessions
      res.redirect(`/${req.session.user_id}`)
    } else {
      
    }
  },
  userRegister: (req, res) => {
    knex('users')
      .insert({
        user_name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password
      })
      .then(() => {
        res.redirect('/');
      })
  },
  userLogin: (req, res) => {
    knex('users')
      .where('users.email', req.body.user_email)
      .then((user) => {
        if (user[0].password === req.body.user_password) {
          req.session.user_id = user[0].id;
          res.redirect(`/user/${user[0].id}`);
        } else {
          res.redirect('/');
        }
      })
  },
}