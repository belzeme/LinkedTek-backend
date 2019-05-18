const { check, validationResult } = require('express-validator/check');
const { Post } = require('../models');

exports.validate = (method) => {
  switch(method) {
  case 'createPost': {
    return [
      check('email').isEmail(),
      check('title').isString(),
      check('content').isString()
    ];
  }
  case 'listPost': {
    return [
      check('email').isEmail()
    ];
  }
  case 'updatePost': {
    return [
      check('id').isNumeric(),
      check('properties').isArray()
    ];
  }
  }
};

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.createPost(req.body)
    .then(postData => res.send(postData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};

exports.listPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.listPost(req.body)
    .then(postData => {
      res.send(postData);
    })
    .catch(error => res.status(403).send({ detail: `${error}` }));
};

exports.updatePost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.updatePost(req.body)
    .then(postData => res.send(postData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};