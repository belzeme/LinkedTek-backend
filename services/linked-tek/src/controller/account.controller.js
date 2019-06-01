const { check, validationResult } = require('express-validator/check');
const { Account } = require('../models');

exports.validate = (method) => {
  switch (method) {
  case 'createUser': {
    return [
      check('email').isEmail(),
      check('name').exists().isString()
    ];
  }
  case 'checkUser': {
    return [
      check('email').isEmail()
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
  case 'sendMessage': {
    return [
      check('sender').isEmail(),
      check('receiver').isEmail(),
      check('title').isString(),
      check('content').isString()
    ];
  }
  case 'updateProfileData': {
    return [
      check('email').isEmail(),
      check('properties').isArray()
    ];
  }
  case 'updateProfileCountry': {
    return [
      check('email').isEmail(),
      check('country').isString()
    ];
  }
  case 'updateProfileCompany': {
    return [
      check('email').isEmail(),
      check('company').isString(),
      check('title').isString()
    ];
  }
  }
};

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.createUser(req.body)
    .then((userData) => res.send(userData))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.subscribeUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.subscribeUser(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` })); 
};

exports.listUserSubscription = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.listUserSubscription(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` })); 
};

exports.deleteUserSubscription = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  Account.deleteUserSubscription(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.addLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.addLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.listLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.listLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.deleteLeader = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.deleteLeader(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.listSuggestion = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.listSuggestion(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.getActualityFeed = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.getActualityFeed(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.sendMessage = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.sendMessage(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.inbox = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.inbox(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));

};

exports.outbox = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.outbox(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};


exports.getProfile = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.getProfile(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.patchProfile = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.patchProfile(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};

exports.patchProfileCountry = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.patchProfileCountry(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};


exports.patchProfileCurrentJob = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Account.patchProfileCurrentJob(req.body)
    .then((resp) => res.send(resp))
    .catch((error) => res.status(403).send({ detail: ` ${error}` }));
};