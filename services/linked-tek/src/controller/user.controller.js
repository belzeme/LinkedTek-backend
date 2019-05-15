const { check, validationResult } = require('express-validator/check');
const { User } = require('../models');

exports.validate = (method) => {
  switch (method) {
  case 'createUser': {
    return [
      check('email').isEmail(),
    ];
  }
  case 'subscribeUser': {
    return [
      check('email').isEmail(),
      check('target').isString(),
      check('name').isString(),
    ];
  }
  }
};

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  User.createUser({ email, password })
    .then((userData) => res.send(userData))
    .catch((error) => res.status(403).send({ detail: `${error}` , fields: [{ field: email, status: 'already used' }] }));
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