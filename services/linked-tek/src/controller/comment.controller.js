const { check, validationResult } = require('express-validator/check');
const { Comment } = require('../models');

exports.validate = (method) => {
  switch(method) {
  case 'createComment': {
    return [
      check('email').isEmail(),
      check('content').isString(),
      check('id').isNumeric()
    ];
  }
  case 'listUserComment': {
    return [
      check('email').isEmail()
    ];
  }
  case 'deleteComment': {
    return [
      check('id').isNumeric()
    ];
  }
  case 'updateComment': {
    return [
      check('id').isNumeric(),
      check('properties').isArray()
    ];
  }
  }
};

exports.createComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Comment.createComment(req.body)
    .then(commentData => res.send(commentData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};

exports.listUserComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Comment.listUserComment(req.body)
    .then(commentData => res.send(commentData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};

exports.updateComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Comment.updateComment(req.body)
    .then(commentData => res.send(commentData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};

exports.deleteComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Comment.deleteComment(req.body)
    .then(commentData => res.send(commentData))
    .catch(error => res.status(403).send({ detail: `${error}` }));
};