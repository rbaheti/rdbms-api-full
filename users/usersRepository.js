const db = require('../configuration/db.js');

module.exports = {
  get: function(id) {
    let query = db('users');
    if (id) {
      query.where('id', id).first();
    }
    return query.then();
  },
  update: function(id, user) {
    let query = db('users')
      .where('id', id)
      .update(user);

    return query.then();
  },
};

// server > endpoints(router) > repository > db