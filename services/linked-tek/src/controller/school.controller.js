const { check, validationResult } = require('express-validator/check');
const { School } = require('../models');

exports.validate = (method) => {
  switch(method) {
  case 'createSchool': 
  {
    return [
      check('name').exists(),
      check('description').exists(),
      check('country').exists()
    ];
  }
  case 'filterSchool':
  {
    return [
      check('name').exists()
    ];
  }
  case 'updateSchool': {
    return [
      check('name').exists(),
      check('properties').isArray()
    ];
  }
  }
};

exports.createSchool = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  School.createSchool(req.body)
    .then((schoolData) => res.send(schoolData))
    .catch((error) => res.status(403).send({ detail: `${error}`, fields: [{ field: req.body, status: 'already used' }] }));
};

exports.listSchool = (req, res) => {
  School.listSchool()
    .then((schoolList) => res.send(schoolList))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.filterSchool = (req, res) => {
  School.filterSchool(req.body)
    .then((filtrate) => res.send(filtrate))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};

exports.updateSchool = (req, res) => {
  School.updateSchool(req.body)
    .then((data) => res.send(data))
    .catch((error) => res.status(403).send({ detail: `${error}` }));
};