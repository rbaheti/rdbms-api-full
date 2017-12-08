const express = require('express');

const repository = require('./postsRepository');

const postsRouter = express.Router();

postsRouter.get('/', function(req, res) { // /api/posts/
  repository
    .get()
    .then(function(records) {
      console.log("records: ", records);
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the posts' });
    });
});

postsRouter.get('/:id', function(req, res) {
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
      res.status(500).json({ error: 'Could not retrieve the post' });
    });
});

postsRouter.get('/:id/tags', function(req, res) { // /api/posts/:id/tags
  const { id } = req.params;

  repository
    .getPostTags(id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the post tags' });
    });
});

postsRouter.post('/', function(req, res) {
  const { post } = req.body;

  repository
    .insert(post)
    .then(function(ids) {
      res.status(200).json(ids);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create the posts' });
    });
});

module.exports = postsRouter;
