const { check, validationResult } = require('express-validator/check');
const { User } = require('../models');

exports.validate = (method) => {
  switch (method) {
  case 'createUser': {
    return [
      check('email').isEmail(),
      check('name').exists().isString()
    ];
  }
  case 'subscribeUser': {
    return [
      check('email').exists().isEmail(),
      check('target').exists().isString(),
      check('name').exists().isString(),
    ];
  }
  case 'relationData': {
    return [
      check('follower').exists().isEmail(),
      check('leader').exists().isEmail()
    ];
  }
  }
};

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.createUser(req.body)
    .then((userData) => res.send(userData))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.subscribeUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.subscribeUser(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` })); 
};

exports.listUserSubscription = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.listUserSubscription(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` })); 
};

exports.deleteUserSubscription = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  User.deleteUserSubscription(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.addLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.addLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.listLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.listLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.deleteLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.deleteLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};