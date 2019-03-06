const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = function(req, res) {
  const newUser = new UserModel(req.body);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      user.password = undefined;
      return res.json(user);
    }
  });
};

exports.signIn = function(req, res) {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (!user.comparePassword(req.body.password)) {
      res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    } else {
      return res.json({ token: jwt.sign({ email: user.email, id: user._id }, 'IBADATSECURITY') });
    }
  });
};

exports.delete = function(req, res) {
  UserModel.findOneAndDelete({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    } if (!user) {
      res.status(401).json({ message: 'Deletion failed. User not found' });
    } else {
      return res.json({ user });
    }
  });
};
