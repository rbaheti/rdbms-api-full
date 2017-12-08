const express = require('express');

const repository = require('./tagsRepository');

const tagsRouter = express.Router();

tagsRouter.get('/', function(req, res) {
  repository
    .get()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the tags' });
    });
});

tagsRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  repository
    .get(id)
    .then(function(records) {
      if (records.length > 0) {
        res.status(200).json(records);
      } else {
        res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve the tag' });
    });
});

tagsRouter.post('/', function(req, res) {
  const { tag } = req.body;

  repository
    .insert(tag)
    .then(function(ids) {
      res.status(200).json(ids);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create the tag' });
    });
});

module.exports = tagsRouter;
