const { check, validationResult } = require('express-validator/check');
const User = require('../models/user.model');

exports.validate = (method) => {
  switch (method) {
  case 'createUser': {
    return [
      check('email').isEmail(),
      check('password').exists(),
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