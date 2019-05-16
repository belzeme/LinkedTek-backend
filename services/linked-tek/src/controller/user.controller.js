const { check, validationResult } = require('express-validator/check');
const { User } = require('../models');

exports.validate = (method) => {
  switch(method) {
  case 'listUser': {
    return [
      check('name').optional().isString()
    ];
  }
  }
};

exports.listUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.listUser(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};