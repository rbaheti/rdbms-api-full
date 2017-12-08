const express = require('express');

const repository = require('./usersRepository');

const userRouter = express.Router();

userRouter.get('/', function(req, res) {
  console.log("recieved req: ");
  repository
    .get()
    .then(function(records) {
      console.log("records: ", records);
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the users' });
    });
});

userRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the user' });
    });
});

userRouter.get('/:id/posts', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the posts' });
    });
});

userRouter.put('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .update(id, req.body)
    .then(function(count) {
      if (count > 0) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not update the user' });
    });
});

userRouter.post('/', function(req, res) {
  const { user } = req.body;

  repository
    .insert(user)
    .then(function(ids) {
      res.status(200).json(ids);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create the users' });
    });
});

module.exports = userRouter;
