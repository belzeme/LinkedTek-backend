const { body } = require('express-validator/check');
const User = require('../models/user.model');

const validationHandler = next => result => {
  if (result.isEmpty()) {
    return;
  }
  if (!next) {
    throw new Error(result.array().map(error => error.msg));
  } else {
    return next(new Error(result.array().map(error => error.msg)));
  }

}

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('email', 'Missing email'.toUpperCase()).exists(),
        body('email', 'Invalid email'.toUpperCase()).isEmail(),
        body('password', 'Missing password'.toUpperCase()).exists(),
      ]
    }
  }
}

exports.createUser = (req, res, next) => {
  req
  .getValidationResult()
  .then(validationHandler())
  .then(() => {
    const { email, password } = req.body;
    User.createUser({email, password})
    .then((userData) => res.send(userData));
  })
  .catch(next);
}